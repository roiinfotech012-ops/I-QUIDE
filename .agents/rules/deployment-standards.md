---
trigger: always_on
description: Strict deployment, environment, security vulnerability, and allowed-host standards for this project.
---

# Mandatory Deployment & Security Rules

1. **Ports Strictly Managed via `.env`**:
   - Never hardcode proxy, dev, or server port numbers in source code, config files, or `package.json` scripts.
   - `PORT` (and `HOSTNAME`) must be read exclusively from `.env` (via `scripts/run-next.mjs`).
2. **Zero Vulnerable Modules**:
   - Do not introduce or retain packages with known security vulnerabilities.
   - Run `npm audit` and verify **0 vulnerabilities** before every deployment.
3. **Allowed Hosts & Reverse-Proxy Compatibility via `.env`**:
   - Prevent host-blocking errors (such as `Blocked request. This host ("domainname") is not allowed` or Auth.js `UntrustedHost`) in all code and configs.
   - Map `ALLOWED_HOSTS`, `AUTH_TRUST_HOST`, `NEXT_PUBLIC_SITE_URL`, and `ALLOWED_IMAGE_HOSTS` cleanly from `.env` in `next.config.ts` and `src/lib/auth.ts` (and in `vite.config.*` if Vite is ever used).
4. **Full End-to-End Server Verification Before Every Deployment**:
   - Before delivering or pushing any deployment, always run and verify:
     1. `npm install`
     2. `npm audit` (0 vulnerabilities)
     3. `npm run build`
     4. `npm start` (verifying the app goes live on the exact `PORT` configured in `.env` and responds cleanly over HTTP).
