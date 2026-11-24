# iGUIDE — AI-Powered Education Technology Website & CMS

**Design Concept:** *"Where Human Potential Meets Intelligence."*  
**Tagline:** *"Learning, Reimagined by Intelligence."*  
**Documented Vision:** *"Make learning adaptive, engaging, and accessible through intelligent technology."*

---

## 1. Architecture & Technical Stack

- **Framework:** Next.js 15 App Router (TypeScript, Server Components + Client Components, Server Actions, Route Handlers)
- **Styling & Design System:** Tailwind CSS (`#0B1026` Midnight Navy, `#635BFF` Electric Iris, `#387BFA` Intelligence Blue, `#A78BFA` Soft Lavender, `#EAF5FF` Ice Blue, `#FAFBFF` Cloud White), Plus Jakarta Sans + Inter typography
- **Signature Visual Motif:** **The Intelligence Path** — custom interactive SVG topology, constellation nodes, and adaptive pathway simulator
- **Motion:** Framer Motion with `useReducedMotion()` accessibility support
- **Database & Persistence:** Prisma ORM (`prisma/schema.prisma`) with PostgreSQL + resilient server-side persistent store (`data/cms-store.json`) so the site and CMS work out-of-the-box and sync with PostgreSQL when `DATABASE_URL` is connected
- **Authentication:** Auth.js v5 (`next-auth`) administrator credentials provider protecting `/admin` and all CMS mutations
- **Forms & Validation:** React Hook Form + Zod client & server validation
- **Transactional Notifications:** Resend integration (`src/lib/email.ts`) with structured server audit logging when `RESEND_API_KEY` is not yet provided

---

## 2. Public & Admin Routes

- `/` — **Home** (Midnight Navy Hero + Interactive Ecosystem Topology, Philosophy Bento Grid, Interactive Intelligence Path Simulator, 6 Solutions Showcase, Institutional Audiences, Perspectives, Research Monographs, Inline Institutional Enquiry Desk)
- `/about` — **About Us** (Documented Vision, Mission, Pedagogical Philosophy, Four Architectural Principles)
- `/solutions` — **Our Solutions Listing** (6 Modular Capabilities, Interoperability Matrix, Interactive Pathway Simulator)
- `/solutions/[slug]` — **Six Dynamic Solution Detail Pages**:
  1. `/solutions/adaptive-learning-pathways`
  2. `/solutions/educator-copilot-studio`
  3. `/solutions/formative-assessment-diagnostics`
  4. `/solutions/intelligent-curriculum-architecture`
  5. `/solutions/institutional-learning-telemetry`
  6. `/solutions/accessible-inclusive-learning`
- `/gallery` — **Visual Gallery** (Category filter + accessible keyboard-navigable lightbox modal)
- `/testimonials` — **Stakeholder Perspectives & Testimonials** (With transparent verification badges)
- `/blogs` — **Blogs & Research Monographs** (Category filter, instant search, pagination)
- `/blogs/[slug]` — **Dynamic Blog Detail Pages**
- `/contact` — **Contact Us** (Bengaluru Headquarters details, verified WhatsApp/Phone desk, validated institutional enquiry form)
- `/privacy-policy` — **Privacy Policy**
- `/terms-and-conditions` — **Terms & Conditions**
- `/admin/login` & `/admin` — **Protected Enterprise CMS** (Manage Hero Banners, Page Headings & SEO, Solutions, Gallery, Testimonials, Blogs, Institutional Enquiries + CSV Export, Media Uploads, and Global Site Settings)
- `/sitemap.xml` & `/robots.txt` — **Dynamic Technical SEO Routes**

---

## 3. Environment Setup & Server Deployment

Copy `.env.example` to `.env` and configure your server port, allowed hosts, and credentials:

```env
PORT=3000
HOSTNAME="0.0.0.0"
ALLOWED_HOSTS="*"
AUTH_TRUST_HOST="true"
DATABASE_URL="postgresql://postgres:password@localhost:5432/iguide_cms?schema=public"
AUTH_SECRET="replace-with-secure-random-secret"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@advaita1.com"
ADMIN_PASSWORD="iGuide@Admin2026!"
RESEND_API_KEY=""
ENQUIRY_NOTIFICATION_EMAIL="admin@advaita1.com"
NEXT_PUBLIC_SITE_URL="https://iguide.edu.in"
```

### Production Server Deployment
All port binding and allowed host settings are controlled exclusively via `.env`:
```bash
npm install
npm run build
npm start
```

### Connecting Live PostgreSQL & Seeding
Once a PostgreSQL instance is running and reachable via `DATABASE_URL`:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```
*(When PostgreSQL is not yet running locally, the data layer in `src/lib/cms.ts` automatically persists all CMS updates and enquiries to `data/cms-store.json` on the server filesystem and displays the active persistence engine inside the `/admin` overview panel.)*

### Running Locally
```bash
npm run dev
```
