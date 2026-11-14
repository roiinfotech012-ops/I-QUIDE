"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createEnquiry, updateEnquiryStatus } from "@/lib/cms";
import { sendEnquiryNotification } from "@/lib/email";
import { enquiryFormSchema, type EnquiryFormValues } from "@/lib/validations";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const DUPLICATE_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes

const ipRequestTimestamps = new Map<string, number[]>();
const recentSubmissionFingerprints = new Map<string, number>();

function sanitizePlainText(input: string | undefined, maxLen = 3000): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export async function submitEnquiryAction(input: EnquiryFormValues) {
  // 1. Spam Honeypot Check
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return {
      success: false,
      error: "Submission could not be processed. Please refresh and try again.",
    };
  }

  // 2. Bot Timing Check (reject instant < 800ms automated form posts when timestamp is provided)
  if (
    typeof input.formLoadedAt === "number" &&
    input.formLoadedAt > 0 &&
    Date.now() - input.formLoadedAt < 800
  ) {
    return {
      success: false,
      error: "Please take a moment to review your details before submitting.",
    };
  }

  // 3. Server-Side Zod Validation
  const parsed = enquiryFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Please check your form details and try again.",
    };
  }

  // 4. Normalise & Sanitise Inputs
  const fullName = sanitizePlainText(parsed.data.fullName, 100);
  const email = sanitizePlainText(parsed.data.email, 160).toLowerCase();
  const phone = sanitizePlainText(parsed.data.phone, 24);
  const institutionName =
    sanitizePlainText(parsed.data.institutionName, 140) || "Not specified";
  const solutionInterest =
    sanitizePlainText(parsed.data.solutionInterest, 120) || "General Enquiry";
  const roleType =
    sanitizePlainText(parsed.data.roleType, 100) || "Website Visitor";
  const message = sanitizePlainText(parsed.data.message, 3000);
  const subject =
    sanitizePlainText(parsed.data.subject, 160) ||
    (solutionInterest !== "General Enquiry"
      ? `Enquiry regarding ${solutionInterest}`
      : `Website Enquiry from ${fullName}`);

  // 5. Request Rate Limiting & Duplicate Submission Guard
  try {
    const hdrs = await headers();
    const forwardedFor = hdrs.get("x-forwarded-for");
    const clientIp =
      forwardedFor?.split(",")[0]?.trim() ||
      hdrs.get("x-real-ip") ||
      "anonymous-client";

    const now = Date.now();
    const history = (ipRequestTimestamps.get(clientIp) || []).filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );

    if (history.length >= MAX_REQUESTS_PER_WINDOW) {
      return {
        success: false,
        error:
          "Too many enquiries submitted recently. Please wait a few minutes or contact us directly by phone or email.",
      };
    }

    const fingerprint = `${email}::${solutionInterest.toLowerCase()}::${message
      .slice(0, 120)
      .toLowerCase()}`;
    const lastDuplicateTs = recentSubmissionFingerprints.get(fingerprint);
    if (lastDuplicateTs && now - lastDuplicateTs < DUPLICATE_COOLDOWN_MS) {
      return {
        success: false,
        error:
          "We have already received this exact enquiry a moment ago. Our team will be in touch shortly.",
      };
    }

    history.push(now);
    ipRequestTimestamps.set(clientIp, history);
    recentSubmissionFingerprints.set(fingerprint, now);
  } catch {
    // Non-blocking if headers() is unavailable in test context
  }

  // 6. Persist Enquiry in PostgreSQL & CMS Store with status "NEW"
  try {
    const enquiry = await createEnquiry({
      fullName,
      email,
      phone,
      institutionName,
      roleType,
      solutionInterest,
      subject,
      message,
      consentAccepted: parsed.data.consentAccepted,
      notificationSent: false,
    });

    // 7. Dispatch Admin Notification Email
    const emailResult = await sendEnquiryNotification(enquiry);
    if (emailResult.sent) {
      await updateEnquiryStatus(
        enquiry.id,
        "NEW",
        `Notification email delivered via ${emailResult.provider}`,
        true
      );
    }

    revalidatePath("/admin");
    return {
      success: true,
      enquiryId: enquiry.id,
      createdAt: enquiry.createdAt,
      emailDelivered: emailResult.sent,
      notificationDetail: emailResult.detail,
    };
  } catch (err) {
    console.error("Failed to submit enquiry:", err);
    return {
      success: false,
      error:
        "We encountered an unexpected issue saving your enquiry. Please try again or email admin@advaita1.com directly.",
    };
  }
}
