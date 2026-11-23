import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  getPageContentBySlug,
  getSiteSettings,
  getSolutions,
} from "@/lib/cms";
import { buildOrganizationJsonLd, buildPageMetadata } from "@/lib/seo";
import {
  Breadcrumbs,
  Container,
  EyebrowLabel,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/primitives";
import { WhatsAppButton } from "@/components/ui/cards";
import { EnquiryForm } from "@/components/ui/enquiry-form";
import {
  ContactConnectedNodesVisual,
  ContactVisionAbstractVisual,
  PrivacyConsciousLocationMap,
} from "@/components/contact/contact-sections";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getPageContentBySlug("contact");
  return buildPageMetadata({
    title:
      page?.seoTitle ||
      "Contact iGUIDE — Great Learning Experiences Begin with a Conversation",
    description:
      page?.seoDescription ||
      "Connect with iGUIDE in Koramangala, Bengaluru, Karnataka, India (+91 8247654106, admin@advaita1.com) to explore AI-powered educational solutions.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [settings, page, solutions] = await Promise.all([
    getSiteSettings(),
    getPageContentBySlug("contact"),
    getSolutions(true),
  ]);

  const sections = (page?.sectionsJson || {}) as {
    leftColumnHeading?: string;
    leftColumnIntro?: string;
    locationHeading?: string;
    locationDescription?: string;
    mapSearchUrl?: string;
    mapEmbedUrl?: string;
    closingCtaHeading?: string;
  };

  const heroEyebrow = page?.eyebrow || "LET'S CONNECT";
  const heroHeadline =
    page?.title || "Great Learning Experiences Begin with a Conversation.";
  const heroDescription =
    page?.subtitle ||
    "Whether you're exploring intelligent educational solutions, representing an institution, or interested in collaboration, we'd love to hear from you.";

  const leftColumnHeading =
    sections.leftColumnHeading || "Let's Talk About Your Vision.";
  const leftColumnIntro =
    sections.leftColumnIntro ||
    "Reach out to the iGUIDE team to discuss adaptive learning solutions, institutional requirements, educator initiatives, or collaborative opportunities.";

  const locationHeading = sections.locationHeading || "Find Us in Bengaluru.";
  const locationDescription =
    sections.locationDescription ||
    "Our office is located in Koramangala, Bengaluru, Karnataka, India.";

  const encodedAddress = encodeURIComponent(
    settings.address ||
      "Koramangala, Bengaluru, Karnataka, India"
  );
  const mapSearchUrl =
    sections.mapSearchUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const mapEmbedUrl =
    sections.mapEmbedUrl ||
    `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  const closingCtaHeading =
    sections.closingCtaHeading ||
    "Let's Explore What Intelligent Learning Could Make Possible.";

  const cleanTelHref = `tel:${settings.primaryPhone.replace(/[^\d+]/g, "")}`;
  const mailtoHref = `mailto:${settings.primaryEmail}`;

  const cleanWhatsappDigits = (
    settings.whatsappNumber || settings.primaryPhone
  ).replace(/[^\d]/g, "");
  const whatsappHref = `https://wa.me/${cleanWhatsappDigits}?text=${encodeURIComponent(
    "Hello iGUIDE Team, I would like to connect regarding your intelligent educational solutions."
  )}`;

  const solutionOptions = solutions.map((s) => ({
    slug: s.slug,
    title: s.title,
  }));

  const orgJsonLd = buildOrganizationJsonLd(settings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* SECTION 1: CONTACT HERO (Split Composition with Connected-Node Illustration) */}
      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-[#F4F8FD] via-[#F8FAFD] to-white pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div
          className="pointer-events-none absolute -top-28 left-1/4 h-[460px] w-[780px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,72,131,0.12)_0%,rgba(43,100,176,0.06)_50%,transparent_72%)] blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "Contact Us" }]} />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Editorial Copy Left */}
            <div className="lg:col-span-7">
              <EyebrowLabel>{heroEyebrow}</EyebrowLabel>

              <h1 className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[54px] lg:leading-[1.08]">
                {heroHeadline.includes("Conversation.") ? (
                  <>
                    Great Learning Experiences Begin with a{" "}
                    <span className="bg-gradient-to-r from-iris via-intelligence to-lavender bg-clip-text text-transparent">
                      Conversation.
                    </span>
                  </>
                ) : (
                  heroHeadline
                )}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
                {heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#enquiry-form"
                  className="inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3.5 text-sm font-bold text-white shadow-elevated transition hover:bg-iris-hover"
                >
                  <span>Send an Enquiry</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={cleanTelHref}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3.5 text-sm font-semibold text-ink shadow-subtle transition hover:border-iris hover:text-iris"
                >
                  <Phone className="h-4 w-4 text-iris" aria-hidden="true" />
                  <span>{settings.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Abstract Connected-Node Illustration Right */}
            <div className="lg:col-span-5">
              <ContactConnectedNodesVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 & SECTION 3: CONTACT INFORMATION & ENQUIRY FORM */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Vision Heading + Contact Cards + Subtle Abstract Visual */}
            <div className="space-y-6 lg:col-span-5">
              <div>
                <EyebrowLabel>REACH OUT DIRECTLY</EyebrowLabel>
                <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {leftColumnHeading}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-secondary">
                  {leftColumnIntro}
                </p>
              </div>

              {/* Email Contact Card */}
              <a
                href={mailtoHref}
                className="group flex items-start gap-4 rounded-3xl border border-border bg-white p-6 shadow-subtle transition-all duration-200 hover:-translate-y-0.5 hover:border-iris/40 hover:shadow-elevated"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-iris/10 text-iris transition-colors group-hover:bg-iris group-hover:text-white">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-muted uppercase">
                    Email Us
                  </span>
                  <p className="mt-1 truncate font-heading text-base font-bold text-ink transition-colors group-hover:text-iris sm:text-lg">
                    {settings.primaryEmail}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-secondary">
                    For institutional enquiries, partnerships, and general questions
                  </p>
                </div>
              </a>

              {/* Phone Contact Card */}
              <a
                href={cleanTelHref}
                className="group flex items-start gap-4 rounded-3xl border border-border bg-white p-6 shadow-subtle transition-all duration-200 hover:-translate-y-0.5 hover:border-iris/40 hover:shadow-elevated"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-intelligence/10 text-intelligence transition-colors group-hover:bg-intelligence group-hover:text-white">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-muted uppercase">
                    Call Us
                  </span>
                  <p className="mt-1 font-heading text-base font-bold text-ink transition-colors group-hover:text-intelligence sm:text-lg">
                    {settings.primaryPhone}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-secondary">
                    {settings.officeHours}
                  </p>
                </div>
              </a>

              {/* Location Contact Card */}
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-3xl border border-border bg-white p-6 shadow-subtle transition-all duration-200 hover:-translate-y-0.5 hover:border-iris/40 hover:shadow-elevated"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lavender/20 text-iris transition-colors group-hover:bg-iris group-hover:text-white">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-muted uppercase">
                      Visit Our Workspace
                    </span>
                    <ExternalLink
                      className="h-3 w-3 text-ink-muted group-hover:text-iris"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1 font-heading text-sm font-bold leading-snug text-ink transition-colors group-hover:text-iris sm:text-base">
                    {settings.address}
                  </p>
                  <p className="mt-1 text-xs font-medium text-iris">
                    View on Google Maps →
                  </p>
                </div>
              </a>

              {/* Optional WhatsApp Click-to-Chat (or Direct Call Fallback) */}
              <div className="pt-1">
                <WhatsAppButton
                  whatsappNumber={settings.whatsappNumber}
                  whatsappVerified={settings.whatsappVerified}
                  fallbackPhone={settings.primaryPhone}
                />
              </div>

              {/* Subtle Abstract Visual */}
              <ContactVisionAbstractVisual />
            </div>

            {/* Right Column: Premium White Enquiry Form Card */}
            <div id="enquiry-form" className="scroll-mt-28 lg:col-span-7">
              <EnquiryForm
                solutions={solutions.map((s) => s.title)}
                solutionOptions={solutionOptions}
                contactEmail={settings.primaryEmail}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 4: DIRECT CONTACT CARDS */}
      <section
        aria-labelledby="direct-contact-heading"
        className="border-t border-border/80 bg-cloud/70 py-16 sm:py-20"
      >
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <EyebrowLabel>DIRECT CHANNELS</EyebrowLabel>
            <h2
              id="direct-contact-heading"
              className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
            >
              Connect Through Your Preferred Channel
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1: Address */}
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-white p-7 shadow-subtle">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-iris/10 text-iris">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-ink">
                  Office Address
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                  {settings.address}
                </p>
              </div>
              <div className="mt-6 border-t border-border/70 pt-4">
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-iris transition-colors hover:text-intelligence"
                >
                  <span>Navigate with Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Card 2: Phone & Optional WhatsApp */}
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-white p-7 shadow-subtle">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-intelligence/10 text-intelligence">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-ink">
                  Phone Desk
                </h3>
                <p className="mt-2 font-heading text-lg font-extrabold text-ink">
                  <a
                    href={cleanTelHref}
                    className="transition-colors hover:text-iris"
                  >
                    {settings.primaryPhone}
                  </a>
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  {settings.officeHours}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/70 pt-4">
                <a
                  href={cleanTelHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-iris transition-colors hover:text-intelligence"
                >
                  <span>Call Now</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                {settings.whatsappVerified &&
                  Boolean(settings.whatsappNumber) && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 transition-colors hover:text-emerald-700"
                    >
                      <MessageCircle
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      <span>WhatsApp Chat</span>
                    </a>
                  )}
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-white p-7 shadow-subtle">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lavender/25 text-iris">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-ink">
                  Email Address
                </h3>
                <p className="mt-2 font-heading text-lg font-extrabold text-ink">
                  <a
                    href={mailtoHref}
                    className="transition-colors hover:text-iris"
                  >
                    {settings.primaryEmail}
                  </a>
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Direct inbox for institutional & partnership enquiries
                </p>
              </div>
              <div className="mt-6 border-t border-border/70 pt-4">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-iris transition-colors hover:text-intelligence"
                >
                  <span>Send an Email</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5: LOCATION ("Find Us in Bengaluru.") */}
      <section
        aria-labelledby="location-section-heading"
        className="border-t border-border/70 bg-white py-20 sm:py-24"
      >
        <Container>
          <div className="mb-12 max-w-2xl">
            <EyebrowLabel>OUR LOCATION</EyebrowLabel>
            <h2
              id="location-section-heading"
              className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
            >
              {locationHeading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-secondary">
              {locationDescription}
            </p>
          </div>

          <PrivacyConsciousLocationMap
            address={settings.address}
            officeHours={settings.officeHours}
            mapSearchUrl={mapSearchUrl}
            mapEmbedUrl={mapEmbedUrl}
          />
        </Container>
      </section>

      {/* SECTION 6: CLOSING CTA (Minimal & Elegant) */}
      <section className="relative overflow-hidden border-t border-border/80 bg-gradient-to-b from-[#F4F8FD] to-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-lavender/45 bg-white px-3.5 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-iris uppercase shadow-subtle">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              <span>THE INTELLIGENCE PATH</span>
            </div>

            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {closingCtaHeading}
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton href="/solutions">
                <span>Explore Our Solutions</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PrimaryButton>
              <SecondaryButton href="/about">
                <span>Discover About iGUIDE</span>
              </SecondaryButton>
            </div>

            <p className="mt-6 text-xs text-ink-muted">
              Looking for our latest educational perspectives?{" "}
              <Link
                href="/blogs"
                className="font-semibold text-iris underline-offset-4 hover:underline"
              >
                Read Insights & Blogs
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
