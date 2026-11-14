import { Resend } from "resend";
import { getSiteSettings } from "./cms";
import type { EnquiryRecord } from "./seed-data";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEnquiryNotification(
  enquiry: EnquiryRecord
): Promise<{ sent: boolean; provider: string; detail: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const settings = await getSiteSettings();
  const toEmail =
    process.env.ENQUIRY_NOTIFICATION_EMAIL?.trim() ||
    settings.primaryEmail ||
    "admin@advaita1.com";
  const fromEmail =
    process.env.ENQUIRY_FROM_EMAIL?.trim() ||
    "iGUIDE Enquiries <onboarding@resend.dev>";

  if (!apiKey) {
    console.info(
      "[iGUIDE Enquiry Notification - Audit Mode (RESEND_API_KEY not configured)]:",
      {
        to: toEmail,
        subject: `New iGUIDE Enquiry: ${enquiry.subject}`,
        from: enquiry.fullName,
        institution: enquiry.institutionName || "Not specified",
        solution: enquiry.solutionInterest || "General Enquiry",
        timestamp: enquiry.createdAt,
      }
    );
    return {
      sent: false,
      provider: "audit-log",
      detail:
        "Your enquiry has been securely recorded in the iGUIDE CMS for our team to review.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const safeName = escapeHtml(enquiry.fullName);
    const safeEmail = escapeHtml(enquiry.email);
    const safePhone = escapeHtml(enquiry.phone);
    const safeInstitution = escapeHtml(
      enquiry.institutionName || "Individual / Not specified"
    );
    const safeSolution = escapeHtml(
      enquiry.solutionInterest || "General Enquiry"
    );
    const safeSubject = escapeHtml(enquiry.subject || "Website Enquiry");
    const safeMessage = escapeHtml(enquiry.message);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: enquiry.email,
      subject: `[iGUIDE Enquiry] ${enquiry.subject} — ${enquiry.fullName}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #0F172A; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E5EAF4; border-radius: 16px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #635BFF; font-weight: 700; margin: 0 0 8px;">iGUIDE Website Enquiry</p>
          <h2 style="margin: 0 0 16px; font-size: 20px;">${safeSubject}</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
            <tr><td style="padding: 8px 0; color: #475569;">Full Name:</td><td style="padding: 8px 0; font-weight: 600;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Email:</td><td style="padding: 8px 0; font-weight: 600;">${safeEmail}</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Phone:</td><td style="padding: 8px 0; font-weight: 600;">${safePhone}</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Institution / Organisation:</td><td style="padding: 8px 0; font-weight: 600;">${safeInstitution}</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Interested Solution:</td><td style="padding: 8px 0; font-weight: 600;">${safeSolution}</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Submitted At:</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(enquiry.createdAt)}</td></tr>
          </table>
          <div style="background: #F8FAFC; padding: 16px; border-radius: 12px; border: 1px solid #E5EAF4;">
            <p style="margin: 0 0 6px; font-size: 12px; color: #475569; font-weight: 600;">MESSAGE</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error || !data?.id) {
      console.error("Resend provider returned an error:", error);
      return {
        sent: false,
        provider: "resend-error",
        detail:
          "Your enquiry has been securely saved to our database for review.",
      };
    }

    return {
      sent: true,
      provider: "resend",
      detail: `An email notification has been confirmed and delivered to our team (${toEmail}).`,
    };
  } catch (err) {
    console.error("Failed to send Resend email:", err);
    return {
      sent: false,
      provider: "resend-error",
      detail:
        "Your enquiry has been securely saved to our database for review.",
    };
  }
}
