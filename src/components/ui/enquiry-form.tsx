"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { submitEnquiryAction } from "@/app/actions/enquiry-actions";
import { enquiryFormSchema, type EnquiryFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

export interface SolutionOptionItem {
  slug: string;
  title: string;
}

export function EnquiryForm({
  solutions = [
    "Personalised Learning",
    "AI Tutors",
    "Skill Assessment",
    "Gamified Learning",
    "Learning Analytics",
    "Institutional Solutions",
  ],
  solutionOptions,
  defaultSolution = "",
  contactEmail = "admin@advaita1.com",
}: {
  solutions?: string[];
  solutionOptions?: SolutionOptionItem[];
  defaultSolution?: string;
  contactEmail?: string;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    createdAt?: string;
    emailDelivered: boolean;
    detail: string;
    selectedSolution?: string;
  } | null>(null);

  const formLoadedAtRef = useRef<number>(0);

  const normalizedOptions: SolutionOptionItem[] = React.useMemo(() => {
    if (solutionOptions && solutionOptions.length > 0) {
      return solutionOptions;
    }
    return solutions.map((title) => ({
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
    }));
  }, [solutionOptions, solutions]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      institutionName: "",
      roleType: "Website Visitor",
      solutionInterest: defaultSolution || "",
      subject: defaultSolution ? `Enquiry regarding ${defaultSolution}` : "",
      message: "",
      consentAccepted: true,
      honeypot: "",
      formLoadedAt: 0,
    },
  });

  const watchedSolution = watch("solutionInterest");

  useEffect(() => {
    const now = Date.now();
    formLoadedAtRef.current = now;
    setValue("formLoadedAt", now);

    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const solutionParam = params.get("solution");
    const subjectParam = params.get("subject");

    if (solutionParam) {
      const normalized = solutionParam.trim().toLowerCase();
      const matched = normalizedOptions.find(
        (opt) =>
          opt.title.toLowerCase() === normalized ||
          opt.slug.toLowerCase() === normalized ||
          opt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized
      );
      const resolvedTitle = matched ? matched.title : solutionParam.trim();
      setValue("solutionInterest", resolvedTitle);
      if (!subjectParam) {
        setValue("subject", `Enquiry regarding ${resolvedTitle}`);
      }
    }

    if (subjectParam) {
      setValue("subject", subjectParam.trim());
    }
  }, [normalizedOptions, setValue]);

  const onSubmit = async (values: EnquiryFormValues) => {
    if (isSubmitting) return;
    setServerError(null);

    const payload: EnquiryFormValues = {
      ...values,
      formLoadedAt: formLoadedAtRef.current || Date.now() - 2000,
    };

    const res = await submitEnquiryAction(payload);
    if (!res.success) {
      setServerError(
        res.error || "Unable to submit your enquiry right now. Please try again."
      );
      return;
    }

    setSubmittedData({
      id: res.enquiryId || "RECEIVED",
      createdAt: res.createdAt,
      emailDelivered: Boolean(res.emailDelivered),
      detail:
        res.notificationDetail ||
        "Your enquiry has been securely recorded in the iGUIDE CMS.",
      selectedSolution: values.solutionInterest || undefined,
    });

    const resetTs = Date.now();
    formLoadedAtRef.current = resetTs;
    reset({
      fullName: "",
      email: "",
      phone: "",
      institutionName: "",
      roleType: "Website Visitor",
      solutionInterest: "",
      subject: "",
      message: "",
      consentAccepted: true,
      honeypot: "",
      formLoadedAt: resetTs,
    });
  };

  if (submittedData) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[32px] border border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 via-white to-[#F6F5FF] p-8 text-center shadow-elevated sm:p-12"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-subtle">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>

        <span className="mt-5 inline-block font-mono text-[11px] font-semibold tracking-[0.18em] text-emerald-700 uppercase">
          Enquiry Recorded • Status: New
        </span>

        <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Thank You for Connecting with iGUIDE.
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-secondary sm:text-base">
          Your enquiry has been securely saved (Reference:{" "}
          <code className="rounded-md border border-border bg-white px-2 py-0.5 font-mono text-xs font-semibold text-iris">
            {submittedData.id}
          </code>
          ){submittedData.selectedSolution ? (
            <>
              {" "}
              regarding{" "}
              <strong className="text-ink">
                {submittedData.selectedSolution}
              </strong>
            </>
          ) : null}
          .
        </p>

        <div className="mx-auto mt-5 max-w-md rounded-2xl border border-border/80 bg-white/90 px-4 py-3 text-xs leading-relaxed text-ink-muted">
          {submittedData.emailDelivered ? (
            <span>
              ✓ Administrator email notification confirmed and delivered.
            </span>
          ) : (
            <span>{submittedData.detail}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setSubmittedData(null)}
          className="mt-7 inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-xs font-semibold text-ink shadow-subtle transition hover:border-iris hover:text-iris"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  const inputBaseClass =
    "mt-2 w-full rounded-2xl border border-border bg-cloud/70 px-4 py-3.5 text-sm text-ink placeholder:text-ink-muted/80 transition-all duration-200 focus:border-iris focus:bg-white focus:outline-none focus:ring-4 focus:ring-lavender/35 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative overflow-hidden rounded-[32px] border border-border/90 bg-white p-7 shadow-elevated sm:p-10"
    >
      {/* Top Decorative Accent Line */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-iris via-intelligence to-lavender"
        aria-hidden="true"
      />

      <div className="mb-7 border-b border-border/80 pb-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-lavender/45 bg-[#F6F5FF] px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-iris uppercase">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          <span>ENQUIRY & CONSULTATION</span>
        </div>
        <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-[26px]">
          Share Your Learning Goals with Us
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
          Fill in your details below and our team in Bengaluru will get back to you thoughtfully.
        </p>
      </div>

      {/* Honeypot Spam Trap (Hidden from human visitors & screen readers) */}
      <div
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="enq-website-url">Website URL (Do not fill)</label>
        <input
          id="enq-website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-xs leading-relaxed text-red-700"
        >
          <AlertCircle
            className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            aria-hidden="true"
          />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* 1. Full Name (Required) */}
        <div>
          <label
            htmlFor="enq-fullName"
            className="flex items-center justify-between text-xs font-bold text-ink"
          >
            <span>
              Full Name <span className="text-iris">*</span>
            </span>
          </label>
          <input
            id="enq-fullName"
            type="text"
            autoComplete="name"
            disabled={isSubmitting}
            placeholder="Your full name"
            {...register("fullName")}
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={
              errors.fullName ? "enq-fullName-error" : undefined
            }
            className={cn(
              inputBaseClass,
              errors.fullName &&
                "border-red-400 focus:border-red-500 focus:ring-red-200/60"
            )}
          />
          {errors.fullName && (
            <p
              id="enq-fullName-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600"
            >
              <span>{errors.fullName.message}</span>
            </p>
          )}
        </div>

        {/* 2. Email Address (Required) */}
        <div>
          <label
            htmlFor="enq-email"
            className="flex items-center justify-between text-xs font-bold text-ink"
          >
            <span>
              Email Address <span className="text-iris">*</span>
            </span>
          </label>
          <input
            id="enq-email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            placeholder="you@organisation.com"
            {...register("email")}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enq-email-error" : undefined}
            className={cn(
              inputBaseClass,
              errors.email &&
                "border-red-400 focus:border-red-500 focus:ring-red-200/60"
            )}
          />
          {errors.email && (
            <p
              id="enq-email-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600"
            >
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        {/* 3. Phone Number (Required) */}
        <div>
          <label
            htmlFor="enq-phone"
            className="flex items-center justify-between text-xs font-bold text-ink"
          >
            <span>
              Phone Number <span className="text-iris">*</span>
            </span>
          </label>
          <input
            id="enq-phone"
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            placeholder="+91 98XXXXXXXX"
            {...register("phone")}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "enq-phone-error" : undefined}
            className={cn(
              inputBaseClass,
              errors.phone &&
                "border-red-400 focus:border-red-500 focus:ring-red-200/60"
            )}
          />
          {errors.phone && (
            <p
              id="enq-phone-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600"
            >
              <span>{errors.phone.message}</span>
            </p>
          )}
        </div>

        {/* 4. Institution / Organisation Name (Optional) */}
        <div>
          <label
            htmlFor="enq-institutionName"
            className="flex items-center justify-between text-xs font-bold text-ink"
          >
            <span>Institution / Organisation Name</span>
            <span className="font-normal text-ink-muted">Optional</span>
          </label>
          <input
            id="enq-institutionName"
            type="text"
            autoComplete="organization"
            disabled={isSubmitting}
            placeholder="School, College, University, or Organisation"
            {...register("institutionName")}
            aria-invalid={Boolean(errors.institutionName)}
            aria-describedby={
              errors.institutionName ? "enq-institutionName-error" : undefined
            }
            className={cn(
              inputBaseClass,
              errors.institutionName &&
                "border-red-400 focus:border-red-500 focus:ring-red-200/60"
            )}
          />
          {errors.institutionName && (
            <p
              id="enq-institutionName-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600"
            >
              <span>{errors.institutionName.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* 5. Interested Solution (Optional Select loaded from published CMS solutions) */}
      <div className="mt-5">
        <label
          htmlFor="enq-solutionInterest"
          className="flex items-center justify-between text-xs font-bold text-ink"
        >
          <span>Interested Solution</span>
          <span className="font-normal text-ink-muted">Optional</span>
        </label>
        <select
          id="enq-solutionInterest"
          disabled={isSubmitting}
          {...register("solutionInterest")}
          aria-invalid={Boolean(errors.solutionInterest)}
          className={cn(
            inputBaseClass,
            !watchedSolution && "text-ink-muted"
          )}
        >
          <option value="">Select a solution (optional)</option>
          {normalizedOptions.map((sol) => (
            <option key={sol.slug} value={sol.title} className="text-ink">
              {sol.title}
            </option>
          ))}
          <option value="General / Collaboration Enquiry" className="text-ink">
            General / Collaboration Enquiry
          </option>
        </select>
        {errors.solutionInterest && (
          <p
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {errors.solutionInterest.message}
          </p>
        )}
      </div>

      {/* 6. Message (Required) */}
      <div className="mt-5">
        <label
          htmlFor="enq-message"
          className="flex items-center justify-between text-xs font-bold text-ink"
        >
          <span>
            Message <span className="text-iris">*</span>
          </span>
        </label>
        <textarea
          id="enq-message"
          rows={4}
          disabled={isSubmitting}
          placeholder="Tell us about your learning needs, institution, or how you would like to collaborate with iGUIDE..."
          {...register("message")}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "enq-message-error" : undefined}
          className={cn(
            inputBaseClass,
            errors.message &&
              "border-red-400 focus:border-red-500 focus:ring-red-200/60"
          )}
        />
        {errors.message && (
          <p
            id="enq-message-error"
            role="alert"
            className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600"
          >
            <span>{errors.message.message}</span>
          </p>
        )}
      </div>

      {/* Privacy Consent Checkbox */}
      <div className="mt-5 flex items-start gap-3">
        <input
          id="enq-consent"
          type="checkbox"
          disabled={isSubmitting}
          {...register("consentAccepted")}
          className="mt-1 h-4 w-4 rounded border-border text-iris focus:ring-2 focus:ring-lavender"
        />
        <label
          htmlFor="enq-consent"
          className="text-xs leading-relaxed text-ink-secondary"
        >
          I consent to iGUIDE storing and processing my enquiry details to respond to my message in accordance with the{" "}
          <a
            href="/privacy-policy"
            className="font-semibold text-iris underline decoration-iris/40 underline-offset-4 hover:text-intelligence"
          >
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {errors.consentAccepted && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {errors.consentAccepted.message}
        </p>
      )}

      {/* Submit Bar */}
      <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border/80 pt-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <ShieldCheck
            className="h-4 w-4 shrink-0 text-iris"
            aria-hidden="true"
          />
          <span>
            Direct email:{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-semibold text-ink underline decoration-border underline-offset-4 hover:text-iris"
            >
              {contactEmail}
            </a>
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-iris to-intelligence px-8 py-4 text-sm font-bold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lavender/50 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Sending Enquiry…</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Send Enquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
