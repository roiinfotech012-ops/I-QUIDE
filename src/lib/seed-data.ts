export interface SolutionCapability {
  title: string;
  description: string;
  iconName?: string;
  imageUrl?: string;
}

export interface SolutionBenefit {
  title: string;
  description: string;
  tag?: string;
}

export interface SolutionUseCase {
  audience: string;
  scenario: string;
}

export interface SolutionArchitectureStep {
  step: string;
  title: string;
  detail: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export type SolutionSectionKey =
  | "overview"
  | "capabilities"
  | "benefits"
  | "how-it-works"
  | "applications"
  | "related-solutions"
  | "enquiry-cta";

export const DEFAULT_SOLUTION_SECTION_ORDER: SolutionSectionKey[] = [
  "overview",
  "capabilities",
  "benefits",
  "how-it-works",
  "applications",
  "related-solutions",
  "enquiry-cta",
];

export interface SolutionRecord {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle?: string;
  tagline: string;
  category: string;
  summary: string;
  heroDescription?: string;
  description: string;
  overviewHeading?: string;
  overviewLead?: string;
  overviewPillars?: string[];
  challengeText: string;
  approachText: string;
  outcomeText: string;
  iconName: string;
  heroImage: string;
  mobileHeroImage?: string;
  accentColor: string;
  keyCapabilities: SolutionCapability[];
  benefits?: SolutionBenefit[];
  useCases: SolutionUseCase[];
  architectureSteps: SolutionArchitectureStep[];
  faqs: SolutionFaq[];
  sectionOrder?: SolutionSectionKey[];
  relatedSlugs?: string[];
  ctaText?: string;
  displayOrder: number;
  featured: boolean;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  label: string;
  url: string;
  enabled: boolean;
  displayOrder: number;
}

export interface SiteSettingsRecord {
  id: string;
  brandName: string;
  tagline: string;
  visionStatement: string;
  missionStatement: string;
  logoUrl: string;
  logoDarkUrl?: string;
  faviconUrl: string;
  defaultOgImage?: string;
  analyticsMeasurementId?: string;
  primaryEmail: string;
  primaryPhone: string;
  whatsappNumber: string;
  whatsappVerified: boolean;
  whatsappDefaultMessage?: string;
  googleMapsUrl?: string;
  address: string;
  officeHours: string;
  footerDescription: string;
  copyrightText: string;
  socialLinks: {
    linkedin?: string;
    x?: string;
    youtube?: string;
    instagram?: string;
  };
  socialLinksList?: SocialLinkItem[];
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  updatedAt: string;
}

export interface HeroBannerRecord {
  id: string;
  pageSlug: string;
  eyebrow: string;
  headline: string;
  highlightedText: string;
  subheadline: string;
  desktopImage?: string;
  mobileImage?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  visualCaption: string;
  published: boolean;
  displayOrder: number;
  updatedAt: string;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
  enabled: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogRecord {
  id: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
  createdAt: string;
}

export interface PageContentRecord {
  id: string;
  pageSlug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  sectionsJson: Record<string, unknown>;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  updatedAt: string;
}

export interface GalleryItemRecord {
  id: string;
  title: string;
  caption: string;
  category: string;
  imageUrl: string;
  altText: string;
  location: string;
  aspect: "landscape" | "portrait" | "square";
  featured: boolean;
  published: boolean;
  displayOrder: number;
  updatedAt: string;
}

export interface TestimonialRecord {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  institution: string;
  category: string;
  avatarUrl?: string;
  rating?: number;
  contextNote: string;
  isVerified: boolean;
  isFeatured: boolean;
  published: boolean;
  displayOrder: number;
  updatedAt: string;
}

export interface BlogPostRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTimeMinutes: number;
  authorName: string;
  authorRole: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

export interface EnquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  institutionName: string;
  roleType: string;
  solutionInterest: string;
  subject: string;
  message: string;
  consentAccepted: boolean;
  status: "NEW" | "IN_REVIEW" | "RESPONDED" | "ARCHIVED";
  adminNotes: string;
  notificationSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaAssetRecord {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  altText: string;
  category: string;
  createdAt: string;
}

export interface CmsStoreData {
  siteSettings: SiteSettingsRecord;
  heroBanners: HeroBannerRecord[];
  pageContents: PageContentRecord[];
  solutions: SolutionRecord[];
  galleryItems: GalleryItemRecord[];
  testimonials: TestimonialRecord[];
  blogPosts: BlogPostRecord[];
  enquiries: EnquiryRecord[];
  mediaAssets: MediaAssetRecord[];
  adminUsers?: AdminUserRecord[];
  auditLogs?: AuditLogRecord[];
}

const nowIso = "2026-11-12T09:00:00.000Z";

export const INITIAL_CMS_DATA: CmsStoreData = {
  siteSettings: {
    id: "global",
    brandName: "iGUIDE",
    tagline: "Learning, Reimagined by Intelligence.",
    visionStatement:
      "Make learning adaptive, engaging, and accessible through intelligent technology.",
    missionStatement:
      "Leverage intelligent technology to support effective, personalised learning.",
    logoUrl: "/brand/iguide-logo.png",
    logoDarkUrl: "/brand/iguide-logo.png",
    faviconUrl: "/favicon.svg",
    defaultOgImage: "/images/solution-institutional-solutions.jpg",
    analyticsMeasurementId: "",
    primaryEmail: "admin@advaita1.com",
    primaryPhone: "+91 8247654106",
    whatsappNumber: "",
    whatsappVerified: false,
    whatsappDefaultMessage:
      "Hello iGUIDE Team, I would like to enquire about your intelligent educational solutions.",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Aspire+Co-works,+Koramangala,+Bengaluru,+Karnataka,+India",
    address: "Aspire Co-works, Koramangala, Bengaluru, Karnataka, India",
    officeHours: "Monday – Saturday, 9:30 AM – 6:30 PM IST",
    footerDescription:
      "iGUIDE is an AI-powered education technology organisation dedicated to making learning adaptive, engaging, personalised, and accessible across academic and professional institutions.",
    copyrightText: "© 2026 iGUIDE Education Technology. All rights reserved.",
    socialLinks: {},
    socialLinksList: [
      {
        id: "soc-linkedin",
        platform: "linkedin",
        label: "LinkedIn",
        url: "",
        enabled: false,
        displayOrder: 1,
      },
      {
        id: "soc-x",
        platform: "x",
        label: "X (Twitter)",
        url: "",
        enabled: false,
        displayOrder: 2,
      },
      {
        id: "soc-youtube",
        platform: "youtube",
        label: "YouTube",
        url: "",
        enabled: false,
        displayOrder: 3,
      },
      {
        id: "soc-instagram",
        platform: "instagram",
        label: "Instagram",
        url: "",
        enabled: false,
        displayOrder: 4,
      },
    ],
    defaultSeoTitle:
      "iGUIDE — Where Human Potential Meets Intelligence | AI-Powered EdTech",
    defaultSeoDescription:
      "Discover a more adaptive, engaging, and human-centred approach to education—powered by intelligent technology.",
    updatedAt: nowIso,
  },

  heroBanners: [
    {
      id: "hero-home-main",
      pageSlug: "home",
      eyebrow: "THE FUTURE OF INTELLIGENT LEARNING",
      headline: "Every Mind Learns Differently.",
      highlightedText: "Intelligence Makes It Possible.",
      subheadline:
        "Discover a more adaptive, engaging, and human-centred approach to education—powered by intelligent technology.",
      desktopImage: "/images/solution-personalised-learning.jpg",
      mobileImage: "/images/solution-personalised-learning.jpg",
      primaryCtaLabel: "Explore Our Solutions",
      primaryCtaHref: "/solutions",
      secondaryCtaLabel: "Discover iGUIDE",
      secondaryCtaHref: "/about",
      visualCaption:
        "Conceptual Intelligence Path ecosystem — illustrating connected learning nodes and adaptive progression.",
      published: true,
      displayOrder: 1,
      updatedAt: nowIso,
    },
  ],

  pageContents: [
    {
      id: "page-home",
      pageSlug: "home",
      eyebrow: "WELCOME TO iGUIDE",
      title: "Intelligence That Understands Every Learner.",
      subtitle:
        "Discover how adaptive pedagogy and thoughtful artificial intelligence come together to honour the way every individual mind explores, questions, and masters new ideas.",
      sectionsJson: {
        welcomeLabel: "WELCOME TO iGUIDE",
        welcomeHeading: "Intelligence That Understands Every Learner.",
        welcomeParagraph1:
          "At iGUIDE, we believe education is most powerful when it responds to the individual behind the screen. Traditional classrooms and static digital platforms often treat learning as a single uniform conveyor belt—yet curiosity, prior knowledge, and comprehension tempo vary from person to person.",
        welcomeParagraph2:
          "We design AI-powered educational technologies that bridge human potential and intelligent systems. By combining adaptive pathways, conversational guidance, and clear educator insights, iGUIDE helps schools, universities, and training organisations cultivate deeper understanding without visual noise or unnecessary complexity.",
        welcomeCtaLabel: "Our Story",
        welcomeCtaHref: "/about",
        welcomeDecorativeText: "Learn. Adapt. Evolve.",
        visionEyebrow: "OUR VISION",
        visionStatement:
          "Make learning adaptive, engaging, and accessible through intelligent technology.",
        solutionsHeading: "One Vision. Six Intelligent Possibilities.",
        solutionsDescription:
          "Explore the technologies and approaches shaping more personalised and engaging learning experiences.",
        optionalFutureOffering: {
          enabled: false,
          badge: "Optional Future Horizon Module",
          title: "Workplace Communications — The Giraffe Edition",
          description:
            "An extensible communication and empathetic leadership learning track supported by the iGUIDE architecture for future release.",
          href: "/contact",
        },
        whyChooseHeading: "Built for the Way Learning Should Be.",
        journeyHeading: "From Curiosity to Capability.",
        galleryHeading: "Moments That Inspire Learning.",
        testimonialsHeading: "Voices from Our Learning Community.",
        insightsHeading: "Ideas Shaping Tomorrow's Learning.",
        signatureCtaHeading: "Let's Shape What's Next in Learning.",
        signatureCtaDescription:
          "Discover how intelligent educational technology can support your learning community.",
      },
      seoTitle:
        "iGUIDE | Every Mind Learns Differently. Intelligence Makes It Possible.",
      seoDescription:
        "Discover a more adaptive, engaging, and human-centred approach to education—powered by intelligent technology. Explore iGUIDE's six core AI education solutions.",
      published: true,
      updatedAt: nowIso,
    },
    {
      id: "page-about",
      pageSlug: "about",
      eyebrow: "ABOUT iGUIDE",
      title: "Technology with Intelligence. Learning with Purpose.",
      subtitle:
        "Explore our vision for a world where intelligent technology helps create more adaptive, engaging, and accessible learning experiences.",
      sectionsJson: {
        storyEyebrow: "OUR STORY",
        storyHeading: "Reimagining What's Possible in Education.",
        storyLead:
          "iGUIDE focuses on AI-powered educational technology intended to support personalised, effective, and engaging learning across diverse academic and training environments.",
        storyBody:
          "Learning is deeply personal. Every learner brings unique curiosity, prior knowledge, and ways of understanding complex concepts. Yet traditional educational tools often deliver uniform content at a single fixed pace. iGUIDE exists to bridge that gap—bringing together thoughtful artificial intelligence and human-centred design so technology adapts to the learner, rather than forcing the learner to adapt to rigid software.",
        humanPurposeTitle: "The Human-Centred Purpose of Technology",
        humanPurposeBody:
          "Technology in education should never exist for complexity or novelty. Its true purpose is to remove friction, clarify understanding, empower educators with meaningful insight, and open accessible pathways for every mind to grow.",
        visionCardLabel: "OUR VISION",
        visionCardStatement:
          "Make learning adaptive, engaging, and accessible through intelligent technology.",
        visionCardSubtext:
          "Expanding educational opportunity through responsive pathways that adapt to how each individual learns best.",
        missionCardLabel: "OUR MISSION",
        missionCardStatement:
          "Leverage intelligent technology to support effective, personalised learning.",
        missionCardSubtext:
          "Connecting intelligent systems, pedagogical clarity, and actionable insights to elevate everyday learning.",
        approachEyebrow: "OUR APPROACH",
        approachHeading:
          "Human-Centred by Design. Intelligence-Led by Innovation.",
        approachDescription:
          "Explore the four core principles that guide how we design, architect, and refine every educational experience at iGUIDE.",
        principles: [
          {
            code: "01",
            title: "Artificial Intelligence",
            tagline: "Adaptive intelligence that responds to individual comprehension.",
            detail:
              "We apply artificial intelligence thoughtfully to model concept dependencies, calibrate learning paths, and provide conversational Socratic support—ensuring intelligence serves genuine understanding rather than passive automation.",
            pillars: [
              "Adaptive pathway routing tailored to learner readiness",
              "Contextual Socratic assistance and concept scaffolding",
              "Explainable, educator-aligned pedagogical boundaries",
            ],
          },
          {
            code: "02",
            title: "Educational Innovation",
            tagline: "Modernising how knowledge is structured and experienced.",
            detail:
              "Educational innovation means moving beyond static slides and one-size-fits-all curricula. We design multi-modal learning environments that combine visual topologies, structured explanations, and guided inquiry.",
            pillars: [
              "Connected curriculum knowledge graphs",
              "Multi-modal representations for diverse learning styles",
              "Universal Design for Learning (UDL) accessibility focus",
            ],
          },
          {
            code: "03",
            title: "Meaningful Engagement",
            tagline: "Cultivating active curiosity and intellectual discovery.",
            detail:
              "Engagement is strongest when learners actively participate in solving problems. Through interactive challenges, conceptual puzzles, and constructive feedback loops, we turn study time into purposeful exploration.",
            pillars: [
              "Interactive challenges and conceptual logic activities",
              "Low-stress formative checkpoints that build confidence",
              "Clear mastery progression along the Intelligence Path",
            ],
          },
          {
            code: "04",
            title: "Learning Analytics",
            tagline: "Illuminating progress and knowledge gaps with clarity.",
            detail:
              "Actionable learning insights help both learners and educators understand where competencies are strong and where additional support is needed—transforming assessment from a post-mortem score into an ongoing compass.",
            pillars: [
              "Early knowledge-gap and prerequisite identification",
              "Clear progress monitoring across concepts and skills",
              "Privacy-conscious insights for educators and institutions",
            ],
          },
        ],
        ecosystemEyebrow: "OUR EDUCATIONAL ECOSYSTEM",
        ecosystemHeading: "Six Connected Capabilities. One Unified Vision.",
        ecosystemDescription:
          "Every iGUIDE solution is linked along the Intelligence Path—working together to support learners, educators, and institutions.",
        whyEyebrow: "WHY iGUIDE?",
        whyHeading: "Designed Around Learning. Built for Possibility.",
        whyDescription:
          "Our strengths bring together intelligent engineering, pedagogical empathy, and institutional scalability.",
        strengths: [
          {
            code: "01",
            title: "Intelligent education technology",
            subtitle: "Purpose-built AI architecture for education",
            description:
              "Rather than retrofitting generic software for classrooms, iGUIDE designs intelligent systems specifically around comprehension, curriculum alignment, and human-centred learning.",
          },
          {
            code: "02",
            title: "Personalisation",
            subtitle: "Pathways calibrated to every individual mind",
            description:
              "Adaptive pacing, prerequisite scaffolding, and flexible concept representations ensure learners receive the right level of challenge and support at the right moment.",
          },
          {
            code: "03",
            title: "Interactive experiences",
            subtitle: "Dialogue, challenges, and active discovery",
            description:
              "From conversational AI tutors to gamified logic challenges, learners engage actively with ideas instead of passively consuming static pages.",
          },
          {
            code: "04",
            title: "Data-informed learning insights",
            subtitle: "Clarity on strengths, progress, and knowledge gaps",
            description:
              "Continuous skill diagnostics and readable analytics empower educators and learners to make timely, informed decisions throughout the learning journey.",
          },
          {
            code: "05",
            title: "Scalable institutional applications",
            subtitle: "Built for schools, colleges, universities & training",
            description:
              "A modular, extensible ecosystem that adapts smoothly to single departments, entire campuses, or specialised professional training programmes.",
          },
        ],
        closingCtaHeading:
          "Let's Build a More Intelligent Future for Learning.",
        closingCtaDescription:
          "Explore our six core solutions or connect with the iGUIDE team to discuss how intelligent educational technology can support your institution.",
      },
      seoTitle:
        "About Us | iGUIDE — Technology with Intelligence. Learning with Purpose.",
      seoDescription:
        "Explore iGUIDE's vision to make learning adaptive, engaging, and accessible through intelligent technology, and our mission to support effective, personalised learning.",
      published: true,
      updatedAt: nowIso,
    },
    {
      id: "page-solutions",
      pageSlug: "solutions",
      eyebrow: "OUR SOLUTIONS",
      title: "Intelligent Solutions for Evolving Learning Needs.",
      subtitle:
        "Explore a connected vision of personalised learning, AI-supported tutoring, interactive engagement, meaningful assessment, and data-informed education.",
      sectionsJson: {
        discoveryEyebrow: "SOLUTION DISCOVERY",
        discoveryHeading: "Explore the Possibilities.",
        discoveryDescription:
          "Six interconnected capabilities designed to make learning more adaptive, engaging, and accessible across every stage of growth.",
        ecosystemEyebrow: "CONNECTED LEARNING ECOSYSTEM",
        ecosystemHeading: "Different Capabilities. One Shared Vision.",
        ecosystemDescription:
          "Explore how the six iGUIDE solutions connect along the Intelligence Path—sharing context between personalised pathways, conversational support, assessment, engagement, analytics, and institutional delivery.",
        whoWeSupportEyebrow: "WHO WE SUPPORT",
        whoWeSupportHeading: "Designed for Diverse Learning Communities.",
        whoWeSupportDescription:
          "Discover how iGUIDE's educational technology architecture can be applied across academic and training environments.",
        audiences: [
          {
            title: "Schools",
            subtitle: "K-12 & Senior Secondary Education",
            description:
              "Potential applications include supporting mixed-ability classrooms with adaptive concept pathways, reinforcing foundational numeracy and literacy through interactive challenges, and providing teachers with clear knowledge-gap insights.",
            highlights: [
              "Adaptive prerequisite support for diverse classroom pacing",
              "Age-appropriate interactive challenges, puzzles, and riddles",
              "Clear progress visibility to help teachers guide each learner",
            ],
          },
          {
            title: "Colleges and Universities",
            subtitle: "Higher Education & Academic Departments",
            description:
              "Potential applications include bridging foundational readiness across incoming cohorts, offering Socratic AI tutoring for independent study, and mapping competency progression across degree programmes.",
            highlights: [
              "Conversational learning support for complex analytical subjects",
              "Continuous competency mapping and formative skill assessment",
              "Department-level learning analytics and curriculum alignment",
            ],
          },
          {
            title: "Training Organisations",
            subtitle: "Professional, Vocational & Upskilling Programmes",
            description:
              "Potential applications include tailoring learning paths to each participant's baseline competencies, evaluating practical skill readiness, and monitoring cohort progress across structured training tracks.",
            highlights: [
              "Individualised skill pathways that respect prior experience",
              "Competency and strength identification for targeted upskilling",
              "Scalable multi-cohort programme insights and reporting",
            ],
          },
        ],
        ctaEyebrow: "NEXT STEPS",
        ctaHeading: "Find the Right Direction for Your Learning Needs.",
        ctaDescription:
          "Speak with the iGUIDE team to explore how our educational technology solutions can align with your learners, educators, and institutional goals.",
      },
      seoTitle:
        "Our Solutions | iGUIDE — Intelligent Solutions for Evolving Learning Needs",
      seoDescription:
        "Explore iGUIDE's connected vision of Personalised Learning, AI Tutors, Skill Assessment, Gamified Learning, Learning Analytics, and Institutional Solutions.",
      published: true,
      updatedAt: nowIso,
    },
    {
      id: "page-gallery",
      pageSlug: "gallery",
      eyebrow: "THE iGUIDE GALLERY",
      title: "A Glimpse into the World of Learning and Innovation.",
      subtitle:
        "Explore a curated digital exhibition of educational initiatives, intelligent learning architecture studies, interactive workshop concepts, and visual innovation.",
      sectionsJson: {
        categories: [
          "Events & Activities",
          "Educational Initiatives",
          "Technology & Innovation",
          "Workshops & Training",
          "General Gallery",
        ],
        closingCtaHeading: "Discover More About iGUIDE.",
        closingCtaDescription:
          "Learn more about our vision, mission, and human-centred philosophy for AI-powered education.",
        closingCtaButtonLabel: "Get to Know Us",
        closingCtaButtonHref: "/about",
      },
      seoTitle:
        "The iGUIDE Gallery — A Glimpse into the World of Learning and Innovation",
      seoDescription:
        "Explore the iGUIDE digital gallery across Events & Activities, Educational Initiatives, Technology & Innovation, Workshops & Training, and General Gallery.",
      published: true,
      updatedAt: nowIso,
    },
    {
      id: "page-testimonials",
      pageSlug: "testimonials",
      eyebrow: "COMMUNITY VOICES",
      title: "Perspectives That Inspire Our Journey.",
      subtitle:
        "Explore experiences and perspectives shared by people and organisations connected with iGUIDE.",
      sectionsJson: {
        philosophyEyebrow: "OUR HUMAN-CENTRED PHILOSOPHY",
        philosophyHeading:
          "Every Voice Shapes More Thoughtful, Adaptive Learning.",
        philosophyStatement:
          "At iGUIDE, our mission is to leverage intelligent technology to support effective, personalised learning—guided by the real experiences of learners, educators, and institutions.",
        ctaHeading: "Let's Start a Conversation About Learning.",
        ctaDescription:
          "Connect with our team to explore how iGUIDE can support your learners, educators, or organisation.",
        ctaButtonLabel: "Contact iGUIDE",
        ctaButtonHref: "/contact",
      },
      seoTitle:
        "Community Voices & Testimonials — Perspectives That Inspire Our Journey | iGUIDE",
      seoDescription:
        "Explore experiences and perspectives shared by learners, educators, institutions, and partners connected with iGUIDE.",
      published: true,
      updatedAt: nowIso,
    },
    {
      id: "page-blog",
      pageSlug: "blog",
      eyebrow: "INSIGHTS & IDEAS",
      title: "Exploring What's Next in Intelligent Learning.",
      subtitle:
        "Perspectives on education, artificial intelligence, meaningful engagement, and emerging learning technologies.",
      sectionsJson: {
        categories: [
          "Artificial Intelligence",
          "Education Technology",
          "Personalised Learning",
          "Learning Innovation",
          "Industry Insights",
          "Company Updates",
        ],
        ctaHeading: "Let's Turn Ideas into Conversations.",
        ctaDescription:
          "Connect with our team to discuss how intelligent learning technologies can support your educational vision.",
        ctaButtonLabel: "Connect with iGUIDE",
        ctaButtonHref: "/contact",
      },
      seoTitle:
        "Insights & Ideas — Exploring What's Next in Intelligent Learning | iGUIDE",
      seoDescription:
        "Perspectives on education, artificial intelligence, meaningful engagement, and emerging learning technologies from iGUIDE.",
      published: true,
      updatedAt: nowIso,
    },
    {
      id: "page-contact",
      pageSlug: "contact",
      eyebrow: "LET'S CONNECT",
      title: "Great Learning Experiences Begin with a Conversation.",
      subtitle:
        "Whether you're exploring intelligent educational solutions, representing an institution, or interested in collaboration, we'd love to hear from you.",
      sectionsJson: {
        leftColumnHeading: "Let's Talk About Your Vision.",
        leftColumnIntro:
          "Reach out to the iGUIDE team to discuss adaptive learning solutions, institutional requirements, educator initiatives, or collaborative opportunities.",
        locationHeading: "Find Us in Bengaluru.",
        locationDescription:
          "Our workspace is located at Aspire Co-works in Koramangala, Bengaluru, Karnataka, India.",
        mapSearchUrl:
          "https://www.google.com/maps/search/?api=1&query=Aspire+Co-works,+Koramangala,+Bengaluru,+Karnataka,+India",
        mapEmbedUrl:
          "https://www.google.com/maps?q=Aspire+Co-works,+Koramangala,+Bengaluru,+Karnataka,+India&output=embed",
        closingCtaHeading:
          "Let's Explore What Intelligent Learning Could Make Possible.",
      },
      seoTitle:
        "Contact iGUIDE — Great Learning Experiences Begin with a Conversation",
      seoDescription:
        "Connect with iGUIDE at Aspire Co-works, Koramangala, Bengaluru, Karnataka, India (+91 8247654106, admin@advaita1.com) to explore AI-powered educational solutions.",
      published: true,
      updatedAt: nowIso,
    },
    {
      id: "page-privacy",
      pageSlug: "privacy-policy",
      eyebrow: "LEGAL & INFORMATION",
      title: "Privacy Policy (Draft for Review)",
      subtitle:
        "Draft informational overview of how the iGUIDE website handles enquiry submissions and visitor contact details, prepared for administrator and legal review.",
      sectionsJson: {
        lastUpdated: "November 2026 (Draft)",
        isDraftForReview: true,
        reviewNotice:
          "DRAFT CONTENT FOR ADMINISTRATOR & LEGAL REVIEW — This page contains structured draft text describing website enquiry handling for iGUIDE. It is provided for internal administrative and legal counsel review and does not constitute a final legally binding policy or legal compliance certification until formally approved.",
        richContent: `## 1. Purpose of This Draft Notice

This draft Privacy Policy is prepared for **iGUIDE** administrator and legal review. It outlines how visitor contact details submitted through the [Contact & Enquiry page](/contact) are handled on this website.

> Draft Note for Administrators: Please review and update this text with your legal advisor in the iGUIDE CMS before removing the draft label.

## 2. Information Submitted via Website Enquiries

When a visitor voluntarily submits an enquiry through the iGUIDE website, the form collects:

- **Full Name**
- **Email Address**
- **Phone Number**
- **Institution or Organisation Name** (optional)
- **Interested Solution** (optional selection from [Our Solutions](/solutions))
- **Enquiry Message**

### Technical & Operational Logs

Standard web server logs may record basic technical request information (such as request timestamps and browser headers) to help prevent automated spam and maintain website availability.

## 3. Intended Use of Enquiry Information

Information submitted through the website enquiry form is intended to be used by the iGUIDE team to:

1. Respond to visitor questions, institutional enquiries, and partnership requests.
2. Provide requested information regarding iGUIDE educational technology solutions.
3. Maintain an internal administrative record of website enquiries within the iGUIDE CMS.

## 4. Third-Party Embeds & External Links

On the [Contact Us](/contact) page, external Google Maps embeds are loaded on request so visitors can choose whether to load third-party map content or open the location link directly.

## 5. Administrative Contact Details

For questions regarding this draft document or to request updates to enquiry details you have shared with iGUIDE, please contact:

- **Email:** [admin@advaita1.com](mailto:admin@advaita1.com)
- **Phone:** +91 8247654106
- **Address:** Aspire Co-works, Koramangala, Bengaluru, Karnataka, India`,
      },
      seoTitle: "Privacy Policy (Draft for Review) | iGUIDE",
      seoDescription:
        "Draft Privacy Policy for iGUIDE website enquiries and visitor information, prepared for administrator and legal review.",
      published: true,
      updatedAt: nowIso,
    },
    {
      id: "page-terms",
      pageSlug: "terms-and-conditions",
      eyebrow: "LEGAL & INFORMATION",
      title: "Terms & Conditions (Draft for Review)",
      subtitle:
        "Draft informational terms regarding access to and use of the iGUIDE website and its educational solution descriptions, prepared for administrator and legal review.",
      sectionsJson: {
        lastUpdated: "November 2026 (Draft)",
        isDraftForReview: true,
        reviewNotice:
          "DRAFT CONTENT FOR ADMINISTRATOR & LEGAL REVIEW — This page contains structured draft terms for the iGUIDE website. It is provided for internal administrative and legal counsel review and does not constitute a final legally binding agreement until formally reviewed and approved.",
        richContent: `## 1. Scope of This Draft Document

These draft Terms & Conditions are prepared for **iGUIDE** administrator and legal counsel review. They describe the general informational nature of the iGUIDE website and its public pages.

> Draft Note for Administrators: Please review and customise these terms with your legal advisor via the iGUIDE Admin CMS before publishing final approved terms.

## 2. Informational Nature of Website Content

Content presented across the iGUIDE website—including descriptions of [Personalised Learning](/solutions/personalised-learning), [AI Tutors](/solutions/ai-tutors), [Skill Assessment](/solutions/skill-assessment), [Gamified Learning](/solutions/gamified-learning), [Learning Analytics](/solutions/learning-analytics), and [Institutional Solutions](/solutions/institutional-solutions)—is provided for general informational and conceptual illustration purposes.

### Visual & Conceptual Illustrations

Visual diagrams, interface illustrations, and *Intelligence Path* graphics on this website represent conceptual design studies and educational technology workflows rather than guaranteed outcomes or contractual specifications.

## 3. Website Enquiries & Communications

Visitors may use the [Contact & Enquiry form](/contact) to reach out to the iGUIDE team:

- Please provide accurate contact details when submitting an enquiry.
- Do not use automated scripts or spam tools to submit forms or disrupt website operations.
- Submitting a website enquiry initiates an informational conversation and does not by itself create a formal service contract.

## 4. Intellectual Property & Brand Assets

Unless otherwise noted, the iGUIDE name, branding, editorial articles on [Insights & Blogs](/blogs), and custom visual illustrations are managed by iGUIDE.

## 5. Contact Information

For questions regarding this draft document or the iGUIDE website, please reach out to:

- **Email:** [admin@advaita1.com](mailto:admin@advaita1.com)
- **Phone:** +91 8247654106
- **Address:** Aspire Co-works, Koramangala, Bengaluru, Karnataka, India`,
      },
      seoTitle: "Terms & Conditions (Draft for Review) | iGUIDE",
      seoDescription:
        "Draft Terms & Conditions for the iGUIDE corporate website, prepared for administrator and legal review.",
      published: true,
      updatedAt: nowIso,
    },
  ],

  solutions: [
    {
      id: "sol-1",
      slug: "personalised-learning",
      title: "Personalised Learning",
      shortTitle: "Personalised Learning",
      subtitle:
        "Adaptive learning paths, customised learning experiences, and learner-centred approaches.",
      tagline: "Learning Paths as Individual as Every Mind.",
      category: "Adaptive Pathways",
      summary:
        "Adaptive learning paths and individualised educational experiences.",
      heroDescription:
        "Discover an educational approach built around adaptive learning paths, customised learning experiences, and learner-centred progression that responds to how each individual mind explores and understands.",
      description:
        "Every learning environment spans a wide spectrum of prior knowledge, pace, and conceptual confidence. iGUIDE Personalised Learning is designed to support adaptive learning pathways that adjust explanation depth, offer alternative representations, and reinforce foundational prerequisites around each learner's needs.",
      overviewHeading:
        "Supporting Individual Learning Journeys Through Adaptive Pathways.",
      overviewLead:
        "Rather than treating education as a single uniform sequence, iGUIDE Personalised Learning focuses on understanding individual learning needs and structuring flexible pathways toward curriculum mastery.",
      overviewPillars: [
        "Understanding individual learning needs",
        "Adaptive learning pathways",
        "Personalised experiences",
        "Learner-centred educational support",
      ],
      challengeText:
        "Standard digital courses move every learner through identical modules at a uniform pace, leaving some learners unchallenged while others encounter unaddressed prerequisite gaps.",
      approachText:
        "iGUIDE structures curriculum topics into connected learning pathways—calibrating pacing, multimodal explanations, and foundational scaffolding to suit individual readiness.",
      outcomeText:
        "Learners experience supportive, structured progression tailored to how they learn best, while educators maintain clear alignment with curriculum goals.",
      iconName: "Waypoints",
      heroImage: "/images/solution-personalised-learning.jpg",
      mobileHeroImage: "/images/solution-personalised-learning.jpg",
      accentColor: "#1E4883",
      keyCapabilities: [
        {
          title: "Understanding Individual Learning Needs",
          description:
            "Recognises differences in baseline familiarity, learning pace, and preferred conceptual representations.",
          iconName: "Compass",
          imageUrl: "/images/solution-personalised-learning.jpg",
        },
        {
          title: "Adaptive Learning Pathways",
          description:
            "Dynamically adjusts learning routes, prerequisite refreshers, and worked examples as comprehension develops.",
          iconName: "Waypoints",
        },
        {
          title: "Personalised Experiences",
          description:
            "Presents concepts through visual diagrams, structured explanations, and guided inquiry suited to the individual learner.",
          iconName: "Sparkles",
        },
        {
          title: "Learner-Centred Educational Support",
          description:
            "Places human understanding at the centre of the experience, encouraging calm, steady progress without unnecessary complexity.",
          iconName: "Users",
        },
      ],
      benefits: [
        {
          title: "Respects Individual Learning Pace",
          description:
            "Allows learners to spend thoughtful time on foundational ideas or explore deeper extensions when ready.",
          tag: "Learner Agency",
        },
        {
          title: "Bridges Foundational Gaps Early",
          description:
            "Identifies when a prerequisite concept needs reinforcement before moving into more complex material.",
          tag: "Conceptual Clarity",
        },
        {
          title: "Supports Diverse Learning Styles",
          description:
            "Combines visual, analytical, and example-led explanations so concepts become accessible to more minds.",
          tag: "Inclusive Design",
        },
        {
          title: "Complements Educator Guidance",
          description:
            "Works alongside classroom instruction to give teachers clearer context on how each learner is progressing.",
          tag: "Educator Alignment",
        },
      ],
      useCases: [
        {
          audience: "Schools & Classroom Learning",
          scenario:
            "Supporting differentiated learning routes in mixed-ability classrooms while keeping all students aligned with core subject themes.",
        },
        {
          audience: "Colleges & Universities",
          scenario:
            "Helping students strengthen foundational concepts alongside lectures, seminars, and independent coursework.",
        },
        {
          audience: "Training & Upskilling Programmes",
          scenario:
            "Tailoring professional learning tracks so participants focus on new competencies rather than repeating familiar material.",
        },
      ],
      architectureSteps: [
        {
          step: "01",
          title: "Understand Learning Context",
          detail:
            "Begins by establishing the learner's starting point, subject goals, and familiarity with prerequisite concepts.",
        },
        {
          step: "02",
          title: "Adapt the Learning Pathway",
          detail:
            "Sequences appropriate explanations, progressive content tiles, and supportive examples along a tailored path.",
        },
        {
          step: "03",
          title: "Reinforce & Evolve",
          detail:
            "Continuously refines the learning journey as understanding deepens across connected topics.",
        },
      ],
      faqs: [
        {
          question: "Does personalised learning replace the role of teachers or syllabus goals?",
          answer:
            "No. Personalised Learning is designed to support educators and institutional curricula by adapting how concepts are explained and reinforced.",
        },
      ],
      sectionOrder: [
        "overview",
        "capabilities",
        "benefits",
        "how-it-works",
        "applications",
        "related-solutions",
        "enquiry-cta",
      ],
      relatedSlugs: ["ai-tutors", "skill-assessment", "learning-analytics"],
      ctaText: "Interested in Exploring This Solution?",
      displayOrder: 1,
      featured: true,
      published: true,
      seoTitle:
        "Personalised Learning — Learning Paths as Individual as Every Mind | iGUIDE",
      seoDescription:
        "Explore iGUIDE Personalised Learning: adaptive learning paths, customised learning experiences, and learner-centred educational support.",
      updatedAt: nowIso,
    },
    {
      id: "sol-2",
      slug: "ai-tutors",
      title: "AI Tutors",
      shortTitle: "AI Tutors",
      subtitle:
        "AI-supported assistance, conversational experiences, and educational interactions.",
      tagline: "Intelligent Guidance for Every Learning Journey.",
      category: "Conversational Intelligence",
      summary:
        "Intelligent assistance and conversational learning.",
      heroDescription:
        "Explore our vision for AI-supported tutoring assistance, thoughtful conversational learning experiences, and guided educational exploration that helps learners work through questions with clarity.",
      description:
        "Questions often arise during independent study when immediate classroom help isn't available. iGUIDE AI Tutors are conceptualised to provide calm, structured conversational guidance—helping learners unpack complex topics through questions, hints, and guided exploration rather than passive answer generation.",
      overviewHeading:
        "Thoughtful Conversational Support Designed Around Understanding.",
      overviewLead:
        "iGUIDE AI Tutors focus on educational dialogue that encourages curiosity, clarifies difficult concepts step by step, and supports learners as they reason through ideas.",
      overviewPillars: [
        "Intelligent tutoring assistance",
        "Conversational learning",
        "Guided educational exploration",
        "Interactive learning support",
      ],
      challengeText:
        "When learners encounter a conceptual hurdle outside classroom hours, lack of timely guidance can interrupt momentum and confidence.",
      approachText:
        "iGUIDE envisions structured conversational tutoring that breaks complex ideas into manageable steps, asks guiding questions, and encourages active reasoning.",
      outcomeText:
        "Learners receive supportive, concept-focused guidance that nurtures independent thinking alongside educator-led instruction.",
      iconName: "Sparkles",
      heroImage: "/images/solution-ai-tutors.jpg",
      mobileHeroImage: "/images/solution-ai-tutors.jpg",
      accentColor: "#2B64B0",
      keyCapabilities: [
        {
          title: "Intelligent Tutoring Assistance",
          description:
            "Provides structured, context-aware conceptual hints and explanations tailored to the learner's question.",
          iconName: "Sparkles",
          imageUrl: "/images/solution-ai-tutors.jpg",
        },
        {
          title: "Conversational Learning",
          description:
            "Engages learners through clear, supportive dialogue that encourages questioning and step-by-step comprehension.",
          iconName: "BrainCircuit",
        },
        {
          title: "Guided Educational Exploration",
          description:
            "Helps learners explore connected ideas, analogies, and worked examples without overwhelming them.",
          iconName: "Compass",
        },
        {
          title: "Interactive Learning Support",
          description:
            "Reinforces study and revision sessions with responsive educational interactions aligned to learning goals.",
          iconName: "Lightbulb",
        },
      ],
      benefits: [
        {
          title: "Encourages Active Reasoning",
          description:
            "Guides learners through the 'why' and 'how' of a topic rather than encouraging rote memorisation.",
          tag: "Pedagogical Depth",
        },
        {
          title: "Supports Independent Study",
          description:
            "Helps learners navigate challenging homework or revision concepts in a calm, approachable format.",
          tag: "Learner Confidence",
        },
        {
          title: "Adaptable Explanation Styles",
          description:
            "Can reframe complex ideas using simpler terms, step-by-step breakdowns, or relatable analogies.",
          tag: "Clarity",
        },
        {
          title: "Aligned with Educational Purpose",
          description:
            "Designed specifically around learning support and academic inquiry rather than generic open-ended chat.",
          tag: "Purpose-Built",
        },
      ],
      useCases: [
        {
          audience: "School Study & Revision Support",
          scenario:
            "Helping students review classroom concepts, unpack multi-step problems, and prepare for topic checks.",
        },
        {
          audience: "Higher Education Independent Inquiry",
          scenario:
            "Supporting university and college learners as they explore foundational theory and seminar readings.",
        },
        {
          audience: "Professional & Vocational Learning",
          scenario:
            "Offering guided concept explanations as trainees work through technical or analytical learning modules.",
        },
      ],
      architectureSteps: [
        {
          step: "01",
          title: "Question & Context Framing",
          detail:
            "The learner shares a question or identifies the concept they are exploring.",
        },
        {
          step: "02",
          title: "Guided Conversational Prompts",
          detail:
            "The tutoring flow offers structured hints, clarifying questions, and digestible explanations.",
        },
        {
          step: "03",
          title: "Concept Exploration & Check",
          detail:
            "Encourages the learner to apply the idea and connect it to the wider learning pathway.",
        },
      ],
      faqs: [
        {
          question: "Is there a live chatbot embedded on this website?",
          answer:
            "No. This page presents the conceptual overview of iGUIDE AI Tutors as part of our educational technology solutions portfolio.",
        },
      ],
      sectionOrder: [
        "overview",
        "capabilities",
        "benefits",
        "how-it-works",
        "applications",
        "related-solutions",
        "enquiry-cta",
      ],
      relatedSlugs: [
        "personalised-learning",
        "skill-assessment",
        "gamified-learning",
      ],
      ctaText: "Interested in Exploring This Solution?",
      displayOrder: 2,
      featured: true,
      published: true,
      seoTitle:
        "AI Tutors — Intelligent Guidance for Every Learning Journey | iGUIDE",
      seoDescription:
        "Explore iGUIDE AI Tutors: intelligent tutoring assistance, conversational learning, guided educational exploration, and interactive learning support.",
      updatedAt: nowIso,
    },
    {
      id: "sol-3",
      slug: "skill-assessment",
      title: "Skill Assessment",
      shortTitle: "Skill Assessment",
      subtitle:
        "Continuous evaluation, competency mapping, and identifying improvement areas.",
      tagline: "Understand Strengths. Discover Opportunities.",
      category: "Competency Diagnostics",
      summary:
        "Understanding competencies, strengths, and opportunities for improvement.",
      heroDescription:
        "Explore a thoughtful approach to skill assessment—combining continuous evaluation, structured competency mapping, strength identification, and clear insight into areas for development.",
      description:
        "Effective assessment should illuminate how understanding is developing, not simply assign a final score after learning concludes. iGUIDE Skill Assessment focuses on mapping competencies, recognising learner strengths, and highlighting specific opportunities for further growth.",
      overviewHeading:
        "Meaningful Evaluation That Guides the Next Step in Learning.",
      overviewLead:
        "By connecting assessment directly to learning pathways, iGUIDE Skill Assessment helps learners and educators understand current capabilities and focus attention where it matters most.",
      overviewPillars: [
        "Continuous assessment approaches",
        "Competency mapping",
        "Strength identification",
        "Areas for development",
      ],
      challengeText:
        "One-off examinations often summarise performance in a single grade without showing which underlying skills are strong and which need targeted support.",
      approachText:
        "iGUIDE approaches assessment as an ongoing, constructive lens—mapping competencies across clear categories and surfacing actionable learning insights.",
      outcomeText:
        "Learners and educators gain a balanced understanding of strengths and development areas to guide future study.",
      iconName: "Radar",
      heroImage: "/images/solution-skill-assessment.jpg",
      mobileHeroImage: "/images/solution-skill-assessment.jpg",
      accentColor: "#F0C32A",
      keyCapabilities: [
        {
          title: "Continuous Assessment Approaches",
          description:
            "Integrates constructive evaluation checkpoints throughout the learning process to support ongoing reflection.",
          iconName: "Radar",
          imageUrl: "/images/solution-skill-assessment.jpg",
        },
        {
          title: "Competency Mapping",
          description:
            "Organises skills and subject knowledge into clear, structured competency frameworks.",
          iconName: "Layers",
        },
        {
          title: "Strength Identification",
          description:
            "Recognises areas where learners demonstrate confident understanding and applied capability.",
          iconName: "CheckCircle2",
        },
        {
          title: "Areas for Development",
          description:
            "Highlights specific concepts or skills that would benefit from focused review and personalised practice.",
          iconName: "Compass",
        },
      ],
      benefits: [
        {
          title: "Constructive Learning Visibility",
          description:
            "Turns evaluation into a helpful guidepost for learners rather than a source of unnecessary anxiety.",
          tag: "Growth Mindset",
        },
        {
          title: "Clear Competency Structure",
          description:
            "Helps educators and learners view progress across distinct skill domains rather than a single aggregate score.",
          tag: "Structured Insight",
        },
        {
          title: "Informs Personalised Pathways",
          description:
            "Connects assessment insights directly to next-step learning recommendations and review topics.",
          tag: "Connected Learning",
        },
        {
          title: "Applicable Across Disciplines",
          description:
            "Supports academic subjects, foundational skills, and professional training competencies alike.",
          tag: "Versatile Framework",
        },
      ],
      useCases: [
        {
          audience: "Schools & Classroom Checkpoints",
          scenario:
            "Understanding student readiness at the start of a unit and checking concept comprehension along the way.",
        },
        {
          audience: "Colleges & Universities",
          scenario:
            "Mapping analytical, foundational, and subject-specific competencies across academic programmes.",
        },
        {
          audience: "Training & Capability Development",
          scenario:
            "Identifying baseline strengths and focus areas for professional upskilling cohorts.",
        },
      ],
      architectureSteps: [
        {
          step: "01",
          title: "Define Competency Dimensions",
          detail:
            "Establishes the key knowledge areas and skill categories relevant to the learning goal.",
        },
        {
          step: "02",
          title: "Evaluate Understanding Continuously",
          detail:
            "Gathers insights through structured checkpoints and applied concept questions.",
        },
        {
          step: "03",
          title: "Highlight Strengths & Next Steps",
          detail:
            "Presents a clear competency profile showing demonstrated strengths and areas for development.",
        },
      ],
      faqs: [
        {
          question: "How does Skill Assessment connect with other iGUIDE solutions?",
          answer:
            "Insights from Skill Assessment help inform Personalised Learning pathways and contribute to broader Learning Analytics views.",
        },
      ],
      sectionOrder: [
        "overview",
        "capabilities",
        "benefits",
        "how-it-works",
        "applications",
        "related-solutions",
        "enquiry-cta",
      ],
      relatedSlugs: [
        "personalised-learning",
        "learning-analytics",
        "institutional-solutions",
      ],
      ctaText: "Interested in Exploring This Solution?",
      displayOrder: 3,
      featured: true,
      published: true,
      seoTitle:
        "Skill Assessment — Understand Strengths. Discover Opportunities | iGUIDE",
      seoDescription:
        "Explore iGUIDE Skill Assessment: continuous evaluation, competency mapping, strength identification, and areas for development.",
      updatedAt: nowIso,
    },
    {
      id: "sol-4",
      slug: "gamified-learning",
      title: "Gamified Learning",
      shortTitle: "Gamified Learning",
      subtitle:
        "Puzzles, riddles, learning challenges, activities, and game-based engagement.",
      tagline: "Make Curiosity an Adventure.",
      category: "Interactive Engagement",
      summary:
        "Interactive challenges, puzzles, and learning activities.",
      heroDescription:
        "Discover how educational puzzles, thoughtful riddles, interactive challenges, and game-based learning engagement can transform passive review into active intellectual curiosity.",
      description:
        "Engagement deepens when learners are invited to think, solve, and explore actively. iGUIDE Gamified Learning focuses on sophisticated educational puzzles, riddles, and interactive challenges that stimulate curiosity and problem-solving while keeping the experience refined and purposeful.",
      overviewHeading:
        "Creative Challenge Design That Inspires Active Thinking.",
      overviewLead:
        "Rather than relying on noisy distractions, iGUIDE Gamified Learning uses puzzle-inspired mechanics, riddles, and structured learning challenges to make concept exploration genuinely engaging.",
      overviewPillars: [
        "Educational puzzles",
        "Riddles",
        "Interactive challenges",
        "Game-based learning engagement",
      ],
      challengeText:
        "Passive reading and repetitive drills can struggle to hold attention or inspire deeper curiosity about how concepts fit together.",
      approachText:
        "iGUIDE weaves curriculum concepts into thoughtful puzzles, riddles, and interactive challenges that invite learners to test ideas and discover solutions.",
      outcomeText:
        "Learners participate more actively in their educational journey, building problem-solving confidence through engaging activities.",
      iconName: "Lightbulb",
      heroImage: "/images/solution-gamified-learning.jpg",
      mobileHeroImage: "/images/solution-gamified-learning.jpg",
      accentColor: "#16A085",
      keyCapabilities: [
        {
          title: "Educational Puzzles",
          description:
            "Concept-driven logic and subject puzzles designed to strengthen analytical thinking and pattern recognition.",
          iconName: "Lightbulb",
          imageUrl: "/images/solution-gamified-learning.jpg",
        },
        {
          title: "Riddles",
          description:
            "Thought-provoking educational riddles that spark lateral thinking, vocabulary depth, and curiosity.",
          iconName: "Sparkles",
        },
        {
          title: "Interactive Challenges",
          description:
            "Structured learning activities and scenario challenges where learners apply knowledge to progress.",
          iconName: "Compass",
        },
        {
          title: "Game-Based Learning Engagement",
          description:
            "Refined progression milestones and achievement motifs that celebrate curiosity and persistence without looking childish.",
          iconName: "Layers",
        },
      ],
      benefits: [
        {
          title: "Sparks Intrinsic Curiosity",
          description:
            "Uses the natural appeal of puzzles and riddles to draw learners into exploring new subject matter.",
          tag: "Active Curiosity",
        },
        {
          title: "Reinforces Applied Problem-Solving",
          description:
            "Encourages learners to apply concepts in novel situations rather than simply recalling definitions.",
          tag: "Critical Thinking",
        },
        {
          title: "Sophisticated, Age-Appropriate Tone",
          description:
            "Designed with clean, modern visual storytelling that feels engaging without juvenile clutter.",
          tag: "Refined Design",
        },
        {
          title: "Supports Memorable Practice",
          description:
            "Helps learners revisit and consolidate key topics through enjoyable interactive activities.",
          tag: "Concept Retention",
        },
      ],
      useCases: [
        {
          audience: "School Classrooms & Enrichment",
          scenario:
            "Introducing new topics with curiosity-sparking riddles and reinforcing lessons through interactive concept puzzles.",
        },
        {
          audience: "Higher Education & Seminars",
          scenario:
            "Using logic challenges and scenario-based problem sets to encourage active participation.",
        },
        {
          audience: "Training & Team Workshops",
          scenario:
            "Incorporating structured challenge activities to make professional learning workshops more interactive.",
        },
      ],
      architectureSteps: [
        {
          step: "01",
          title: "Concept-Aligned Challenge Framing",
          detail:
            "Each puzzle, riddle, or challenge is anchored to a clear educational concept or reasoning skill.",
        },
        {
          step: "02",
          title: "Interactive Problem Exploration",
          detail:
            "Learners engage with clues, test hypotheses, and work through progressive challenge stages.",
        },
        {
          step: "03",
          title: "Learning Reflection",
          detail:
            "Connects the completed challenge back to the underlying subject insight and learning pathway.",
        },
      ],
      faqs: [
        {
          question: "How does iGUIDE keep gamified learning sophisticated rather than childish?",
          answer:
            "We focus on intellectual curiosity—using clean geometric design, thoughtful riddles, and meaningful conceptual challenges rather than noisy arcade gimmicks.",
        },
      ],
      sectionOrder: [
        "overview",
        "capabilities",
        "benefits",
        "how-it-works",
        "applications",
        "related-solutions",
        "enquiry-cta",
      ],
      relatedSlugs: [
        "personalised-learning",
        "ai-tutors",
        "skill-assessment",
      ],
      ctaText: "Interested in Exploring This Solution?",
      displayOrder: 4,
      featured: true,
      published: true,
      seoTitle:
        "Gamified Learning — Make Curiosity an Adventure | iGUIDE",
      seoDescription:
        "Explore iGUIDE Gamified Learning: educational puzzles, riddles, interactive challenges, and sophisticated game-based learning engagement.",
      updatedAt: nowIso,
    },
    {
      id: "sol-5",
      slug: "learning-analytics",
      title: "Learning Analytics",
      shortTitle: "Learning Analytics",
      subtitle:
        "Learner progress tracking, identifying knowledge gaps, and data-informed performance understanding.",
      tagline: "Turn Learning Insights into Meaningful Direction.",
      category: "Pedagogical Insights",
      summary:
        "Learning insights, progress monitoring, and knowledge-gap identification.",
      heroDescription:
        "Explore how clear learner progress tracking, early knowledge-gap identification, and readable performance insights can help educators and institutions make data-informed educational decisions.",
      description:
        "Educational data is only valuable when it brings clarity to human decisions. iGUIDE Learning Analytics is designed to translate learning progression and competency signals into clear, understandable insights—helping educators track progress, spot knowledge gaps early, and guide instruction thoughtfully.",
      overviewHeading:
        "Clarity on Progress, Readiness, and Learning Opportunities.",
      overviewLead:
        "Instead of overwhelming educators with complex spreadsheets, iGUIDE Learning Analytics focuses on presenting meaningful patterns that support timely academic guidance.",
      overviewPillars: [
        "Learning progress tracking",
        "Knowledge-gap identification",
        "Learning performance insights",
        "Data-informed educational decisions",
      ],
      challengeText:
        "Educators often receive fragmented data or end-of-term summaries too late to adjust instruction for learners who need support.",
      approachText:
        "iGUIDE organises progress indicators, competency visuals, and knowledge-gap signals into clean, readable views tailored for educational decision-making.",
      outcomeText:
        "Educators and academic leaders gain clearer visibility into learning progression so they can plan supportive interventions.",
      iconName: "BarChart3",
      heroImage: "/images/solution-learning-analytics.jpg",
      mobileHeroImage: "/images/solution-learning-analytics.jpg",
      accentColor: "#2B64B0",
      keyCapabilities: [
        {
          title: "Learning Progress Tracking",
          description:
            "Provides a structured view of how learners and cohorts are moving through topics and learning pathways.",
          iconName: "BarChart3",
          imageUrl: "/images/solution-learning-analytics.jpg",
        },
        {
          title: "Knowledge-Gap Identification",
          description:
            "Highlights foundational concepts or topic areas where learners may require additional explanation or practice.",
          iconName: "Radar",
        },
        {
          title: "Learning Performance Insights",
          description:
            "Summarises competency development and engagement patterns into clear, educator-friendly visual views.",
          iconName: "Layers",
        },
        {
          title: "Data-Informed Educational Decisions",
          description:
            "Helps teachers, mentors, and academic coordinators plan focused review sessions and curriculum refinements.",
          iconName: "Compass",
        },
      ],
      benefits: [
        {
          title: "Readable, Uncluttered Visuals",
          description:
            "Presents insights with visual calm and clarity so educators can interpret information quickly.",
          tag: "Clarity First",
        },
        {
          title: "Timely Identification of Needs",
          description:
            "Surfaces conceptual bottlenecks while learning is underway, supporting proactive guidance.",
          tag: "Proactive Support",
        },
        {
          title: "Connects Assessment to Action",
          description:
            "Links competency observations with curriculum topics and personalised learning pathways.",
          tag: "Actionable Insight",
        },
        {
          title: "Supports Both Educators & Coordinators",
          description:
            "Provides relevant perspective for classroom instruction as well as broader programme planning.",
          tag: "Multi-Level View",
        },
      ],
      useCases: [
        {
          audience: "Classroom Teachers & Mentors",
          scenario:
            "Understanding which topics a class has grasped comfortably and which concepts need a focused review session.",
        },
        {
          audience: "Colleges & University Departments",
          scenario:
            "Observing module progression and foundational readiness trends across academic cohorts.",
        },
        {
          audience: "Training Programme Coordinators",
          scenario:
            "Tracking competency completion and identifying where trainees may need additional learning support.",
        },
      ],
      architectureSteps: [
        {
          step: "01",
          title: "Gather Learning Signals",
          detail:
            "Brings together progress milestones from learning pathways, activities, and skill assessments.",
        },
        {
          step: "02",
          title: "Illuminate Patterns & Gaps",
          detail:
            "Organises observations into clear progress indicators and knowledge-gap highlights.",
        },
        {
          step: "03",
          title: "Guide Instructional Direction",
          detail:
            "Supports educators in choosing the most helpful next step for individuals or groups.",
        },
      ],
      faqs: [
        {
          question: "Are the analytics charts shown on this page live student data?",
          answer:
            "No. All charts and dashboards displayed on this website are conceptual illustrations showing the intended design direction of iGUIDE Learning Analytics.",
        },
      ],
      sectionOrder: [
        "overview",
        "capabilities",
        "benefits",
        "how-it-works",
        "applications",
        "related-solutions",
        "enquiry-cta",
      ],
      relatedSlugs: [
        "skill-assessment",
        "personalised-learning",
        "institutional-solutions",
      ],
      ctaText: "Interested in Exploring This Solution?",
      displayOrder: 5,
      featured: true,
      published: true,
      seoTitle:
        "Learning Analytics — Turn Learning Insights into Meaningful Direction | iGUIDE",
      seoDescription:
        "Explore iGUIDE Learning Analytics: learner progress tracking, knowledge-gap identification, learning performance insights, and data-informed educational decisions.",
      updatedAt: nowIso,
    },
    {
      id: "sol-6",
      slug: "institutional-solutions",
      title: "Institutional Solutions",
      shortTitle: "Institutional Solutions",
      subtitle:
        "Educational technology solutions for schools, colleges, universities, and training organisations.",
      tagline: "Intelligent Learning Possibilities at Institutional Scale.",
      category: "Campus & Enterprise Ecosystem",
      summary:
        "Technology solutions for schools, colleges, universities, and training organisations.",
      heroDescription:
        "Discover how iGUIDE brings together personalised learning, AI tutoring concepts, skill assessment, gamified engagement, and analytics into cohesive educational technology solutions for institutions.",
      description:
        "Schools, colleges, universities, and training organisations each have distinct academic goals, learner communities, and curriculum structures. iGUIDE Institutional Solutions focus on connecting intelligent learning capabilities into a coherent, scalable educational ecosystem tailored to institutional needs.",
      overviewHeading:
        "A Connected Educational Ecosystem for Diverse Institutions.",
      overviewLead:
        "Rather than isolated tools, iGUIDE Institutional Solutions provide a unified vision where educators, learners, and academic coordinators benefit from connected intelligent technology.",
      overviewPillars: [
        "School-focused educational technology",
        "College and university applications",
        "Training organisation solutions",
        "Scalable learning technology approaches",
      ],
      challengeText:
        "Institutions often face a patchwork of disconnected digital tools that do not share pedagogical context or align smoothly with curriculum goals.",
      approachText:
        "iGUIDE brings adaptive pathways, conversational support, competency mapping, interactive engagement, and analytics together under a single human-centred philosophy.",
      outcomeText:
        "Institutions gain a cohesive, extensible approach to AI-powered education that supports both educators and learners.",
      iconName: "Network",
      heroImage: "/images/solution-institutional-solutions.jpg",
      mobileHeroImage: "/images/solution-institutional-solutions.jpg",
      accentColor: "#1E4883",
      keyCapabilities: [
        {
          title: "School-Focused Educational Technology",
          description:
            "Designed to support primary, middle, and senior secondary learning environments with adaptive pathways and engaging activities.",
          iconName: "GraduationCap",
          imageUrl: "/images/solution-institutional-solutions.jpg",
        },
        {
          title: "College and University Applications",
          description:
            "Supports higher education faculties and students with foundational readiness, guided inquiry, and competency mapping.",
          iconName: "BookOpen",
        },
        {
          title: "Training Organisation Solutions",
          description:
            "Helps professional and vocational training providers deliver structured skill development and progress visibility.",
          iconName: "Users",
        },
        {
          title: "Scalable Learning Technology Approaches",
          description:
            "Built on a modular architecture that can begin with focused initiatives and evolve alongside institutional priorities.",
          iconName: "Network",
        },
      ],
      benefits: [
        {
          title: "Cohesive Multi-Capability Vision",
          description:
            "Connects learning pathways, assessment, engagement, and insights into one consistent experience.",
          tag: "Unified Ecosystem",
        },
        {
          title: "Adaptable Across Institution Types",
          description:
            "Tailored thoughtfully for K-12 schools, higher education campuses, and structured training programmes.",
          tag: "Institutional Fit",
        },
        {
          title: "Educator-Supportive Architecture",
          description:
            "Designed to empower faculty, teachers, and trainers with clear tools rather than adding administrative burden.",
          tag: "Human-Centred",
        },
        {
          title: "Extensible for Future Needs",
          description:
            "Provides a flexible foundation ready to accommodate evolving educational programmes and modules.",
          tag: "Future-Ready",
        },
      ],
      useCases: [
        {
          audience: "Schools",
          scenario:
            "Integrating adaptive learning support, creative learning challenges, and formative skill checks across grade levels.",
        },
        {
          audience: "Colleges and Universities",
          scenario:
            "Supporting academic departments with modular learning companions, competency visibility, and student study guidance.",
        },
        {
          audience: "Training Organisations",
          scenario:
            "Delivering structured capability pathways, skill assessments, and clear progress insights for professional learners.",
        },
      ],
      architectureSteps: [
        {
          step: "01",
          title: "Understand Institutional Goals",
          detail:
            "Explores curriculum structure, learner profiles, and educator priorities across the organisation.",
        },
        {
          step: "02",
          title: "Align Relevant Capabilities",
          detail:
            "Combines the appropriate iGUIDE solutions into a coherent pathway for the institution.",
        },
        {
          step: "03",
          title: "Support Sustainable Adoption",
          detail:
            "Focuses on educator alignment, clear communication, and thoughtful evolution over time.",
        },
      ],
      faqs: [
        {
          question: "How can an institution explore how iGUIDE fits its requirements?",
          answer:
            "You can reach out through our enquiry form to discuss your institution's educational goals, learner context, and areas of interest with the iGUIDE team.",
        },
      ],
      sectionOrder: [
        "overview",
        "capabilities",
        "benefits",
        "how-it-works",
        "applications",
        "related-solutions",
        "enquiry-cta",
      ],
      relatedSlugs: [
        "personalised-learning",
        "learning-analytics",
        "skill-assessment",
      ],
      ctaText: "Interested in Exploring This Solution?",
      displayOrder: 6,
      featured: true,
      published: true,
      seoTitle:
        "Institutional Solutions — Intelligent Learning Possibilities at Institutional Scale | iGUIDE",
      seoDescription:
        "Explore iGUIDE Institutional Solutions: educational technology solutions for schools, colleges, universities, and training organisations.",
      updatedAt: nowIso,
    },
  ],

  galleryItems: [
    {
      id: "gal-1",
      title: "Adaptive Intelligence Path — System Topology",
      caption:
        "Conceptual visual study illustrating how adaptive learning nodes dynamically respond to individual comprehension tempo.",
      category: "Technology & Innovation",
      imageUrl: "/images/solution-personalised-learning.jpg",
      altText: "Adaptive Intelligence Path system topology study",
      location: "iGUIDE Innovation Studio",
      aspect: "landscape",
      featured: true,
      published: true,
      displayOrder: 1,
      updatedAt: nowIso,
    },
    {
      id: "gal-2",
      title: "Human-Centred Pedagogical Design Initiative",
      caption:
        "Visual framework exploring how Universal Design for Learning (UDL) principles combine with adaptive AI pathways.",
      category: "Educational Initiatives",
      imageUrl: "/images/solution-ai-tutors.jpg",
      altText: "Human-centred pedagogical design initiative",
      location: "Educational Initiatives Desk",
      aspect: "portrait",
      featured: true,
      published: true,
      displayOrder: 2,
      updatedAt: nowIso,
    },
    {
      id: "gal-3",
      title: "Curriculum Architecture & Faculty Alignment Workshop",
      caption:
        "Conceptual blueprint for educator workshops focused on mapping subject concepts into connected knowledge graphs.",
      category: "Workshops & Training",
      imageUrl: "/images/welcome-editorial.jpg",
      altText: "Curriculum architecture workshop visual blueprint",
      location: "Pedagogical Workshop Series",
      aspect: "landscape",
      featured: true,
      published: true,
      displayOrder: 3,
      updatedAt: nowIso,
    },
    {
      id: "gal-4",
      title: "Interactive Challenge & Curiosity Activity Showcase",
      caption:
        "Design exploration of puzzle-inspired learning activities, riddles, and collaborative classroom challenges.",
      category: "Events & Activities",
      imageUrl: "/images/solution-gamified-learning.jpg",
      altText: "Interactive challenge and curiosity activity study",
      location: "Interactive Learning Showcase",
      aspect: "square",
      featured: true,
      published: true,
      displayOrder: 4,
      updatedAt: nowIso,
    },
    {
      id: "gal-5",
      title: "Collaborative Learning Commons Concept",
      caption:
        "Architectural study of modern learning spaces where digital intelligence and human mentorship work in harmony.",
      category: "General Gallery",
      imageUrl: "/images/solution-institutional-solutions.jpg",
      altText: "Collaborative learning commons conceptual visual",
      location: "iGUIDE Design Collection",
      aspect: "landscape",
      featured: true,
      published: true,
      displayOrder: 5,
      updatedAt: nowIso,
    },
    {
      id: "gal-6",
      title: "Conversational Tutoring & Guided Inquiry Study",
      caption:
        "Interface design study illustrating Socratic dialogue states—Question, Guidance, and Exploration.",
      category: "Technology & Innovation",
      imageUrl: "/images/blog-educator-human-ai.jpg",
      altText: "Conversational tutoring and guided inquiry visual study",
      location: "AI Systems Architecture",
      aspect: "portrait",
      featured: true,
      published: true,
      displayOrder: 6,
      updatedAt: nowIso,
    },
    {
      id: "gal-7",
      title: "Knowledge-Gap & Competency Mapping Symposium",
      caption:
        "Visual synthesis demonstrating how continuous skill assessment illuminates strengths and learning opportunities.",
      category: "Events & Activities",
      imageUrl: "/images/about-vision.jpg",
      altText: "Knowledge-gap and competency mapping visual study",
      location: "Academic Research Series",
      aspect: "landscape",
      featured: false,
      published: true,
      displayOrder: 7,
      updatedAt: nowIso,
    },
    {
      id: "gal-8",
      title: "Educator Enablement & Analytics Interpretation Module",
      caption:
        "Training framework designed to help educators translate learning analytics into supportive classroom action.",
      category: "Workshops & Training",
      imageUrl: "/images/solution-learning-analytics.jpg",
      altText: "Educator enablement and analytics training visual",
      location: "Educator Training Track",
      aspect: "square",
      featured: false,
      published: true,
      displayOrder: 8,
      updatedAt: nowIso,
    },
    {
      id: "gal-9",
      title: "Connected Institutional Learning Ecosystem",
      caption:
        "Overview study uniting schools, colleges, universities, and training organisations around shared learning intelligence.",
      category: "Educational Initiatives",
      imageUrl: "/images/solution-institutional-solutions.jpg",
      altText: "Connected institutional learning ecosystem visual",
      location: "Institutional Ecosystem Initiative",
      aspect: "landscape",
      featured: false,
      published: true,
      displayOrder: 9,
      updatedAt: nowIso,
    },
  ],

  // Strict ethical standard: no fabricated reviews are published by default.
  // Genuine verified testimonials published via the Admin CMS will automatically render on the Homepage and Testimonials page.
  testimonials: [],

  blogPosts: [
    {
      id: "blog-1",
      slug: "why-adaptive-pedagogy-must-go-beyond-static-branching",
      title: "Why Adaptive Pedagogy Must Go Beyond Static Quiz Branching",
      excerpt:
        "First-generation digital learning platforms treated adaptation as a simple pass-or-repeat flowchart. Modern cognitive intelligence allows us to respond to how a learner reasons, not just what score they achieved.",
      content: `## Moving From Linear Checklists to Connected Understanding

For over two decades, educational software promised personalisation while delivering rigid decision trees. If a student scored below a threshold on Module A, the system simply forced them to watch the exact same video a second time.

True human tutoring never works that way. When an experienced educator notices hesitation, they ask a clarifying question to discover *why* the concept felt opaque—was it an unfamiliar term, a missing prerequisite from a previous term, or an abstract framing that needed a concrete analogy?

> Every mind approaches a new idea through its own mosaic of prior experiences. Adaptive technology reaches its potential only when it listens to the reasoning process rather than merely grading the final output.
> — iGUIDE Pedagogical Architecture Principle

### The Intelligence Path Approach

At iGUIDE, we architect [Personalised Learning](/solutions/personalised-learning) around three core pedagogical principles:

1. **Prerequisite Graph Awareness:** Concepts do not exist in isolation. Understanding calculus depends on algebraic fluency and geometric intuition. When a learner stumbles, the pathway gently illuminates the underlying foundation.
2. **Modality Flexibility:** Some minds grasp a principle immediately through a visual spatial diagram; others prefer formal symbolic notation or a real-world narrative example.
3. **Metacognitive Calm:** High-stress timers and punitive error screens increase cognitive load. Adaptive interfaces should feel calm, encouraging, and purposeful.

## Comparing Static Branching and Connected Adaptive Pathways

| Pedagogical Dimension | Legacy Static Branching | iGUIDE Connected Intelligence Path |
| :--- | :--- | :--- |
| Diagnostic Signal | Single pass/fail quiz threshold | Step-level reasoning & prerequisite checks |
| Remediation Strategy | Repeat the identical module | Reframe via alternative representation or prerequisite review |
| Learner Experience | Repetitive and often frustrating | Calm, scaffolded, and confidence-building |
| Educator Visibility | End-of-unit percentage score | Early visibility into specific conceptual bottlenecks |

### Designing for Institutional Reality

Schools, colleges, and universities do not operate in a vacuum; they work within semester calendars and accredited syllabus standards. Effective AI in education respects institutional pacing milestones while personalising the scaffolding that helps every student arrive prepared alongside [Learning Analytics](/solutions/learning-analytics).`,
      category: "Personalised Learning",
      readTimeMinutes: 6,
      authorName: "iGUIDE Editorial Desk",
      authorRole: "Pedagogical Systems Architecture",
      coverImage: "/images/blog-adaptive-pedagogy.jpg",
      tags: ["Personalised Learning", "Pedagogy", "Cognitive Load", "Curriculum Design"],
      featured: true,
      published: true,
      publishedAt: "2026-11-10T09:00:00.000Z",
      seoTitle: "Why Adaptive Pedagogy Must Go Beyond Static Branching | iGUIDE Blog",
      seoDescription:
        "Explore how iGUIDE designs connected knowledge graphs and multi-modal scaffolding that go beyond legacy pass-or-repeat quiz branching.",
      updatedAt: nowIso,
    },
    {
      id: "blog-2",
      slug: "human-in-the-loop-ai-keeping-educators-at-the-centre",
      title: "Human-in-the-Loop AI: Keeping Educators at the Centre of Learning",
      excerpt:
        "Artificial intelligence should never diminish the mentorship bond between teacher and student. Here is how thoughtful AI tutoring and analytics amplify faculty judgement while removing friction.",
      content: `## The Irreplaceable Role of Educator Presence

Every meaningful educational breakthrough in a student's life is anchored in human connection—a teacher who noticed curiosity, a professor who challenged an assumption, or a mentor who restored confidence after a setback.

When technology enters the classroom without humility, it risks turning educators into passive dashboard monitors. At iGUIDE, our architectural North Star is **Human-in-the-Loop Amplification**.

> Technology is at its best in education when it clears space for human mentorship—illuminating where learners need support while leaving pedagogical judgement firmly in the hands of educators.
> — iGUIDE Instructional Governance Framework

### Where Intelligence Adds the Highest Value

Instead of attempting to replace classroom dialogue, [AI Tutors](/solutions/ai-tutors) and intelligent systems excel at three behind-the-scenes tasks:

- **Differentiated Preparation:** Transforming a core syllabus topic into foundational, standard, and extension practice sets so faculty can serve mixed-readiness cohorts.
- **Early Misconception Synthesis:** Summarising patterns across pre-seminar responses so an educator walks into the room knowing which concepts deserve deep discussion.
- **Constructive Rubric Drafting:** Helping instructional teams articulate clear, transparent assessment criteria.

### Governance by Design

In the iGUIDE ecosystem, technology proposes and illuminates—while educators guide and decide. Explore how this philosophy scales across campuses through [Institutional Solutions](/solutions/institutional-solutions).`,
      category: "Artificial Intelligence",
      readTimeMinutes: 5,
      authorName: "iGUIDE Editorial Desk",
      authorRole: "Instructional Design & Governance",
      coverImage: "/images/blog-educator-human-ai.jpg",
      tags: ["Artificial Intelligence", "AI Tutors", "Human-in-the-Loop", "Educators"],
      featured: false,
      published: true,
      publishedAt: "2026-11-06T09:00:00.000Z",
      seoTitle: "Human-in-the-Loop AI for Educators | iGUIDE Insights",
      seoDescription:
        "Learn why iGUIDE places educators at the centre of AI-powered education technology through reviewable lesson synthesis and cohort diagnostics.",
      updatedAt: nowIso,
    },
    {
      id: "blog-3",
      slug: "rethinking-formative-assessment-as-a-continuous-dialogue",
      title: "Rethinking Skill Assessment as a Continuous Learning Dialogue",
      excerpt:
        "When feedback only arrives after a high-stakes end-of-semester exam, it functions as a post-mortem rather than a guide. Continuous skill diagnostics turn assessment into a supportive catalyst.",
      content: `## Why Timing Determines the Value of Feedback

In traditional academic calendars, weeks of instruction pass before a major midterm or final examination reveals that a student misunderstood a core principle introduced early in the term. By then, the curriculum has moved on.

Continuous skill assessment—low-stakes, frequent checks for understanding embedded directly within the learning process—solves this timing gap.

> Assessment should feel like a compass during the journey rather than a verdict at the finish line.

### Beyond Multiple-Choice Guessing

A right answer chosen for the wrong reason masks a fragile foundation. Conversely, an incorrect final number in a physics or economics problem might conceal five steps of sound conceptual reasoning followed by a minor arithmetic slip.

[iGUIDE Skill Assessment](/solutions/skill-assessment) focuses on **step-level reasoning**:

1. **Socratic Prompts:** Encouraging learners to articulate *why* a relationship holds before jumping to formulas.
2. **Calibration Checks:** Helping students compare their perceived confidence with their actual mastery.
3. **Actionable Next Steps:** Linking every diagnostic checkpoint directly to a targeted concept review.

## Formative vs. Summative Balance

| Evaluation Mode | Primary Purpose | Ideal Frequency | Learner Mindset |
| :--- | :--- | :--- | :--- |
| Continuous Formative Checkpoints | Identify gaps early & guide next steps | Embedded throughout each concept | Curious, reflective, low-stress |
| Summative Milestones | Verify synthesis across a broader unit | End of module or academic term | Prepared, confident, structured |`,
      category: "Education Technology",
      readTimeMinutes: 7,
      authorName: "iGUIDE Editorial Desk",
      authorRole: "Assessment Architecture",
      coverImage: "/images/solution-skill-assessment.jpg",
      tags: ["Education Technology", "Skill Assessment", "Diagnostics"],
      featured: false,
      published: true,
      publishedAt: "2026-11-02T09:00:00.000Z",
      seoTitle: "Rethinking Skill Assessment as Continuous Dialogue | iGUIDE",
      seoDescription:
        "How continuous, low-stakes skill diagnostics help students master complex concepts before summative exams.",
      updatedAt: nowIso,
    },
    {
      id: "blog-4",
      slug: "architecting-accessible-learning-environments-with-udl-and-ai",
      title: "Architecting Accessible Learning Environments with UDL and AI",
      excerpt:
        "Accessibility is not a compliance checklist; it is the foundation of equitable comprehension. Discover how Universal Design for Learning (UDL) combines with multi-modal AI to support every learner.",
      content: `## Accessibility as Core Pedagogical Excellence

Our vision at iGUIDE is explicit: *Make learning adaptive, engaging, and accessible through intelligent technology.*

When educational materials are locked inside dense walls of uniform text, institutions inadvertently filter students by their tolerance for visual crowding rather than their intellectual capability.

> Designing for accessibility at the outset makes explanations clearer, calmer, and more comprehensible for every learner in the room.

### Three Pillars of Multi-Modal Accessibility

Drawing on Universal Design for Learning (UDL), intelligent interfaces can adapt presentation without diluting academic rigour:

- **Multiple Means of Representation:** Allowing learners to toggle between structured analytical prose, visual concept maps, and step-by-step guided synthesis in [Personalised Learning](/solutions/personalised-learning).
- **Contextual Vocabulary Support:** Surfacing clear, inline explanations of domain-specific terminology for multilingual learners via [AI Tutors](/solutions/ai-tutors).
- **Calm, WCAG-Conscious Interaction:** Respecting reduced-motion preferences, high-contrast legibility, and full keyboard navigation across desktop and mobile devices.`,
      category: "Learning Innovation",
      readTimeMinutes: 5,
      authorName: "iGUIDE Editorial Desk",
      authorRole: "Inclusive Systems Design",
      coverImage: "/images/about-vision.jpg",
      tags: ["Learning Innovation", "Accessibility", "UDL", "Inclusive Education"],
      featured: false,
      published: true,
      publishedAt: "2026-10-27T09:00:00.000Z",
      seoTitle: "Accessible Learning Environments with UDL and AI | iGUIDE Blog",
      seoDescription:
        "Discover how iGUIDE combines Universal Design for Learning (UDL) and AI to create accessible, multi-modal educational experiences.",
      updatedAt: nowIso,
    },
    {
      id: "blog-5",
      slug: "designing-educational-puzzles-that-deepen-analytical-curiosity",
      title: "Designing Educational Puzzles That Deepen Analytical Curiosity",
      excerpt:
        "Why meaningful engagement in education comes from intellectual curiosity, well-crafted riddles, and conceptual challenges rather than superficial points and noisy leaderboards.",
      content: `## Beyond Superficial Gamification

When educators critique gamification in learning, their concern is almost always directed at extrinsic gimmicks—flashing badges, countdown timers, and leaderboards that reward speed over comprehension.

Genuine intellectual play is very different. A well-constructed logic puzzle or conceptual riddle invites the mind to slow down, notice patterns, test hypotheses, and experience the intrinsic satisfaction of discovery.

> True engagement is not noise; it is the quiet absorption of a mind solving a meaningful puzzle.

### Principles of Sophisticated Gamified Learning

At iGUIDE, our approach to [Gamified Learning](/solutions/gamified-learning) is anchored in three design principles:

- **Concept-First Mechanics:** Every puzzle or riddle is built around an underlying subject relationship rather than a generic game skin.
- **Calm Visual Craft:** Interfaces remain clean, legible, and age-appropriate across schools, universities, and professional learning.
- **Reflective Synthesis:** Completing a challenge connects directly back to the formal curriculum principle it illustrated.`,
      category: "Learning Innovation",
      readTimeMinutes: 5,
      authorName: "iGUIDE Editorial Desk",
      authorRole: "Interactive Learning Design",
      coverImage: "/images/solution-gamified-learning.jpg",
      tags: ["Gamified Learning", "Puzzles", "Curiosity", "Learning Innovation"],
      featured: false,
      published: true,
      publishedAt: "2026-10-21T09:00:00.000Z",
      seoTitle: "Designing Educational Puzzles That Deepen Curiosity | iGUIDE",
      seoDescription:
        "Explore how thoughtful puzzles, riddles, and interactive challenges cultivate intrinsic motivation in education.",
      updatedAt: nowIso,
    },
    {
      id: "blog-6",
      slug: "from-raw-data-to-pedagogical-clarity-in-learning-analytics",
      title: "From Raw Data to Pedagogical Clarity in Learning Analytics",
      excerpt:
        "How educational institutions can move away from overwhelming spreadsheets toward calm, actionable learning insights that highlight progress and knowledge gaps early.",
      content: `## Clarity Over Complexity in Educational Reporting

Data in education only creates value when it helps an educator or learner make a better decision while learning is still in progress.

Too often, analytics platforms overwhelm teachers with dozens of disconnected charts without answering the fundamental question: *Which concept does my class need to revisit tomorrow morning?*

> An insight is only as valuable as the pedagogical action it inspires.

### Designing Readable Learning Insights

[iGUIDE Learning Analytics](/solutions/learning-analytics) focuses on three core questions:

1. **How is progression unfolding?** Clear milestone tracking across topics and modules.
2. **Where are the prerequisite bottlenecks?** Early identification of shared knowledge gaps before summative evaluations.
3. **What is the most helpful next step?** Connecting insights directly to review pathways and classroom discussion topics.`,
      category: "Industry Insights",
      readTimeMinutes: 6,
      authorName: "iGUIDE Editorial Desk",
      authorRole: "Learning Analytics Research",
      coverImage: "/images/solution-learning-analytics.jpg",
      tags: ["Industry Insights", "Learning Analytics", "Data-Informed Education"],
      featured: false,
      published: true,
      publishedAt: "2026-10-15T09:00:00.000Z",
      seoTitle: "From Raw Data to Pedagogical Clarity in Learning Analytics | iGUIDE",
      seoDescription:
        "Discover how iGUIDE approaches learning analytics with clarity, early knowledge-gap identification, and educator-focused insights.",
      updatedAt: nowIso,
    },
    {
      id: "blog-7",
      slug: "introducing-the-iguide-intelligence-path-design-philosophy",
      title: "Introducing the iGUIDE Intelligence Path Design Philosophy",
      excerpt:
        "A look inside our creative and architectural vision—Where Human Potential Meets Intelligence—and why we combine intelligent minimalism with human-centred learning.",
      content: `## Where Human Potential Meets Intelligence

When we set out to shape the digital identity and product architecture of iGUIDE, we began with a simple conviction: educational technology should communicate **intelligence without complexity** and **innovation without visual noise**.

> Where Human Potential Meets Intelligence—technology that adapts to the learner rather than asking the learner to conform to the tool.

### The Intelligence Path Motif

Across the iGUIDE ecosystem, the *Intelligence Path* represents a learner's journey from initial curiosity to confident capability. Connected nodes, adaptive pathways, and calm typography reflect our belief that every mind learns differently—and intelligent technology makes it possible to honour those differences across [our six core solutions](/solutions).`,
      category: "Company Updates",
      readTimeMinutes: 4,
      authorName: "iGUIDE Editorial Desk",
      authorRole: "Brand & Product Architecture",
      coverImage: "/images/solution-institutional-solutions.jpg",
      tags: ["Company Updates", "Intelligence Path", "Design Philosophy"],
      featured: false,
      published: true,
      publishedAt: "2026-10-08T09:00:00.000Z",
      seoTitle: "Introducing the iGUIDE Intelligence Path Philosophy | iGUIDE",
      seoDescription:
        "Learn about iGUIDE's creative vision—Where Human Potential Meets Intelligence—and the Intelligence Path design system.",
      updatedAt: nowIso,
    },
  ],

  enquiries: [
    {
      id: "enq-sample-1",
      fullName: "System Verification Check",
      email: "admin@advaita1.com",
      phone: "+91 8247654106",
      institutionName: "iGUIDE Internal QA Readiness",
      roleType: "Administrator",
      solutionInterest: "Personalised Learning",
      subject: "Initial CMS Enquiry Pipeline Verification",
      message:
        "This initial system verification record confirms that the iGUIDE enquiry management pipeline, status workflows, and CSV export are operational.",
      consentAccepted: true,
      status: "RESPONDED",
      adminNotes: "System verification record created during initial seed.",
      notificationSent: false,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
  ],

  mediaAssets: [
    {
      id: "media-1",
      fileName: "iguide-logo.svg",
      originalName: "iguide-logo.svg",
      mimeType: "image/svg+xml",
      sizeBytes: 842,
      url: "/brand/iguide-logo.png",
      altText: "iGUIDE primary brand logo",
      category: "Brand",
      createdAt: nowIso,
    },
    {
      id: "media-2",
      fileName: "solution-adaptive-engine.svg",
      originalName: "solution-adaptive-engine.svg",
      mimeType: "image/svg+xml",
      sizeBytes: 1840,
      url: "/images/solution-personalised-learning.jpg",
      altText: "Personalised Learning illustration",
      category: "Solutions",
      createdAt: nowIso,
    },
    {
      id: "media-3",
      fileName: "gallery-learning-commons.svg",
      originalName: "gallery-learning-commons.svg",
      mimeType: "image/svg+xml",
      sizeBytes: 1920,
      url: "/images/solution-institutional-solutions.jpg",
      altText: "Collaborative Learning Studio illustration",
      category: "Gallery",
      createdAt: nowIso,
    },
  ],

  adminUsers: [
    {
      id: "admin-primary",
      email: "admin@advaita1.com",
      name: "iGUIDE Primary Administrator",
      passwordHash: "",
      role: "SUPER_ADMIN",
      enabled: true,
      lastLoginAt: nowIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
  ],

  auditLogs: [
    {
      id: "audit-init-1",
      actorEmail: "admin@advaita1.com",
      actorRole: "SUPER_ADMIN",
      action: "SYSTEM_SEED",
      entityType: "CMS",
      entityId: "global",
      summary: "Initialised iGUIDE Enterprise CMS store and core educational solutions.",
      createdAt: nowIso,
    },
  ],
};
