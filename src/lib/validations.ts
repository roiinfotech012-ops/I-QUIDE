import { z } from "zod";

export const enquiryFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(24, "Phone number must be 24 characters or fewer.")
    .regex(
      /^[+\d\s().-]{7,24}$/,
      "Please enter a valid phone number (digits, spaces, or + country code)."
    ),
  institutionName: z
    .string()
    .trim()
    .max(140, "Institution or organisation name must be 140 characters or fewer.")
    .optional(),
  roleType: z.string().trim().max(100).optional(),
  solutionInterest: z.string().trim().max(120).optional(),
  subject: z.string().trim().max(160).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please share a few details about how we can help (at least 10 characters).")
    .max(3000, "Message must be 3000 characters or fewer."),
  consentAccepted: z.boolean().refine((val) => val === true, {
    message: "Please confirm consent so our team can respond to your enquiry.",
  }),
  honeypot: z.string().optional(),
  formLoadedAt: z.number().optional(),
});

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

export const siteSettingsSchema = z.object({
  brandName: z.string().min(2),
  tagline: z.string().min(4),
  visionStatement: z.string().min(10),
  missionStatement: z.string().min(10),
  logoUrl: z.string().min(1),
  faviconUrl: z.string().min(1),
  primaryEmail: z.string().email(),
  primaryPhone: z.string().min(6),
  whatsappNumber: z.string().optional().default(""),
  whatsappVerified: z.boolean().default(false),
  address: z.string().min(5),
  officeHours: z.string().min(3),
  footerDescription: z.string().min(10),
  copyrightText: z.string().min(4),
  linkedin: z.string().optional().default(""),
  x: z.string().optional().default(""),
  youtube: z.string().optional().default(""),
  instagram: z.string().optional().default(""),
  defaultSeoTitle: z.string().min(5),
  defaultSeoDescription: z.string().min(10),
});
