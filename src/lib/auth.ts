import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {
  checkPostgresConnection,
  getAdminUsers,
  recordAuditLog,
} from "./cms";
import { prisma } from "./prisma";

const LOGIN_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_FAILED_ATTEMPTS = 6;
const failedLoginAttempts = new Map<string, number[]>();

function isRateLimited(emailKey: string): boolean {
  const now = Date.now();
  const attempts = (failedLoginAttempts.get(emailKey) || []).filter(
    (ts) => now - ts < LOGIN_WINDOW_MS
  );
  failedLoginAttempts.set(emailKey, attempts);
  return attempts.length >= MAX_FAILED_ATTEMPTS;
}

function recordFailedAttempt(emailKey: string) {
  const now = Date.now();
  const attempts = (failedLoginAttempts.get(emailKey) || []).filter(
    (ts) => now - ts < LOGIN_WINDOW_MS
  );
  attempts.push(now);
  failedLoginAttempts.set(emailKey, attempts);
}

function clearFailedAttempts(emailKey: string) {
  failedLoginAttempts.delete(emailKey);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret:
    process.env.AUTH_SECRET ||
    "iguide-production-grade-secret-replace-in-production-env-98a7f6d5c4b3",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12, // 12 hours
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "iGUIDE Administrator Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        // 1. Login Rate Limiting Check
        if (isRateLimited(email)) {
          throw new Error("TOO_MANY_ATTEMPTS");
        }

        // 2. Check PostgreSQL AdminUser table if connected
        if (await checkPostgresConnection()) {
          try {
            const dbAdmin = await prisma.adminUser.findUnique({
              where: { email },
            });
            if (dbAdmin) {
              if (!dbAdmin.enabled) {
                return null;
              }
              const valid = await bcrypt.compare(password, dbAdmin.passwordHash);
              if (valid) {
                clearFailedAttempts(email);
                await recordAuditLog({
                  actorEmail: dbAdmin.email,
                  actorRole: dbAdmin.role,
                  action: "ADMIN_LOGIN",
                  entityType: "AdminUser",
                  entityId: dbAdmin.id,
                  summary: `Administrator ${dbAdmin.email} signed in.`,
                });
                return {
                  id: dbAdmin.id,
                  email: dbAdmin.email,
                  name: dbAdmin.name,
                  role: dbAdmin.role,
                };
              }
            }
          } catch {
            // Fall through to CMS store / env verification
          }
        }

        // 3. Check CMS Store AdminUser records (with bcrypt passwordHash)
        try {
          const storeAdmins = await getAdminUsers();
          const matchedAdmin = storeAdmins.find(
            (u) => u.email.toLowerCase() === email
          );
          if (matchedAdmin) {
            if (!matchedAdmin.enabled) {
              return null;
            }
            if (matchedAdmin.passwordHash) {
              const validHash = await bcrypt.compare(
                password,
                matchedAdmin.passwordHash
              );
              if (validHash) {
                clearFailedAttempts(email);
                await recordAuditLog({
                  actorEmail: matchedAdmin.email,
                  actorRole: matchedAdmin.role,
                  action: "ADMIN_LOGIN",
                  entityType: "AdminUser",
                  entityId: matchedAdmin.id,
                  summary: `Administrator ${matchedAdmin.email} signed in.`,
                });
                return {
                  id: matchedAdmin.id,
                  email: matchedAdmin.email,
                  name: matchedAdmin.name,
                  role: matchedAdmin.role,
                };
              }
            }
          }
        } catch {
          // Continue to env fallback
        }

        // 4. Environment Variable Bootstrap Administrator Verification
        const configuredEmail = (
          process.env.ADMIN_EMAIL || "admin@advaita1.com"
        )
          .trim()
          .toLowerCase();
        const configuredPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
        const configuredPassword =
          process.env.ADMIN_PASSWORD || "iGuide@Admin2026!";

        if (email === configuredEmail) {
          const isPasswordValid = configuredPasswordHash
            ? await bcrypt.compare(password, configuredPasswordHash)
            : password === configuredPassword;

          if (isPasswordValid) {
            clearFailedAttempts(email);
            await recordAuditLog({
              actorEmail: configuredEmail,
              actorRole: "SUPER_ADMIN",
              action: "ADMIN_LOGIN",
              entityType: "AdminUser",
              entityId: "admin-primary",
              summary: `Primary administrator ${configuredEmail} signed in.`,
            });
            return {
              id: "admin-primary",
              email: configuredEmail,
              name: "iGUIDE Primary Administrator",
              role: "SUPER_ADMIN",
            };
          }
        }

        recordFailedAttempt(email);
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "SUPER_ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || "admin-primary";
        (session.user as { role?: string }).role =
          (token.role as string) || "SUPER_ADMIN";
      }
      return session;
    },
  },
});
