"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error.includes("TOO_MANY_ATTEMPTS")) {
          setError(
            "Too many failed sign-in attempts. Please wait 10 minutes before trying again."
          );
        } else {
          setError(
            "Invalid administrator credentials or inactive account. Please verify your email and password."
          );
        }
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Authentication request failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-[#F4F8FD] via-[#F8FAFD] to-[#EEF4FF] px-4 py-12 text-ink sm:px-6 lg:px-8">
      {/* Subtle Gradient Ambient Orbs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,72,131,0.14)_0%,rgba(43,100,176,0.06)_50%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 -bottom-24 h-[400px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(240,195,42,0.16)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-ink-secondary transition-colors hover:text-iris"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Return to iGUIDE Public Website</span>
        </Link>

        <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-[36px] border border-border bg-white shadow-elevated lg:grid-cols-12">
          {/* Left Column: Subtle Gradient Intelligence Path Brand Panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-navy p-10 text-white lg:col-span-5 lg:flex">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,72,131,0.34),transparent_60%),radial-gradient(circle_at_85%_85%,rgba(43,100,176,0.25),transparent_55%)]"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3">
                <div className="rounded-2xl bg-white px-3.5 py-2 shadow-subtle ring-1 ring-gold/40">
                  <Image
                    src="/brand/iguide-logo.png"
                    alt="iGUIDE"
                    width={112}
                    height={46}
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">
                  Enterprise CMS
                </span>
              </div>

              <h2 className="mt-8 font-heading text-2xl font-extrabold leading-snug text-white">
                Where Human Potential Meets Intelligence.
              </h2>

              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Manage hero banners, page sections, educational solutions, visual gallery exhibitions, community perspectives, editorial blogs, and institutional enquiries from a unified workspace.
              </p>
            </div>

            {/* Subtle Abstract Intelligence Path Illustration */}
            <div className="relative z-10 my-8">
              <svg
                viewBox="0 0 320 150"
                className="w-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="loginPathGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#1E4883" />
                    <stop offset="50%" stopColor="#2B64B0" />
                    <stop offset="100%" stopColor="#F0C32A" />
                  </linearGradient>
                </defs>
                <path
                  d="M 12 115 C 85 25, 165 130, 240 50 C 270 20, 295 40, 308 24"
                  fill="none"
                  stroke="url(#loginPathGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="85" cy="68" r="6" fill="#1E4883" />
                <circle cx="178" cy="86" r="6" fill="#2B64B0" />
                <circle cx="240" cy="50" r="7" fill="#F0C32A" />
                <circle cx="308" cy="24" r="5" fill="#10B981" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center gap-2.5 border-t border-white/10 pt-5 text-[11px] text-slate-300">
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-lavender"
                aria-hidden="true"
              />
              <span>
                Role-based access control, rate-limited authentication & audit logging enabled.
              </span>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="p-8 sm:p-12 lg:col-span-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-iris/10 text-iris">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-iris uppercase">
                  Protected Administration
                </span>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  Administrator Sign In
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              Enter your authorised administrator email and password to access the iGUIDE Content Management System.
            </p>

            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs leading-relaxed text-red-700"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                  aria-hidden="true"
                />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-bold text-ink"
                >
                  Administrator Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@advaita1.com"
                  className="mt-2 w-full rounded-2xl border border-border bg-cloud/70 px-4 py-3.5 text-sm text-ink placeholder:text-ink-muted focus:border-iris focus:bg-white focus:outline-none focus:ring-4 focus:ring-lavender/35"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold text-ink"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-border bg-cloud/70 py-3.5 pr-12 pl-4 text-sm text-ink placeholder:text-ink-muted focus:border-iris focus:bg-white focus:outline-none focus:ring-4 focus:ring-lavender/35"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute top-1/2 right-3.5 -translate-y-1/2 rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-cloud hover:text-ink"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-iris to-intelligence px-6 py-4 text-sm font-bold text-white shadow-elevated transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Signing In…</span>
                  </>
                ) : (
                  <span>Sign In to iGUIDE CMS</span>
                )}
              </button>
            </form>

            <div className="mt-7 rounded-2xl border border-border/80 bg-cloud/70 p-4 text-xs leading-relaxed text-ink-muted">
              <strong className="text-ink">Security Notice:</strong> Public registration is disabled. Administrator accounts are provisioned via environment variables (<code className="font-mono text-iris">ADMIN_EMAIL</code> / <code className="font-mono text-iris">ADMIN_PASSWORD</code>) or by a Super Administrator inside <code className="font-mono text-iris">/admin/users</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
