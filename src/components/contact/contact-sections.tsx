"use client";

import React, { useState } from "react";
import {
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  MessageSquare,
  Navigation,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/**
 * Section 1 Right Visual: Abstract Connected-Node Illustration
 * Represents conversations connecting Educators, Institutions, Learners, and iGUIDE.
 */
export function ContactConnectedNodesVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* Radial Ambient Glow */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(30,72,131,0.2)_0%,rgba(43,100,176,0.1)_48%,transparent_72%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/85 p-6 shadow-elevated backdrop-blur-xl sm:p-8">
        <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-iris" />
            <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-muted uppercase">
              Intelligence Path • Dialogue Network
            </span>
          </div>
          <span className="rounded-full bg-iris/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-iris">
            Bengaluru Hub
          </span>
        </div>

        <svg
          viewBox="0 0 460 300"
          className="h-auto w-full"
          role="img"
          aria-label="Abstract connected-node illustration representing collaborative dialogue with iGUIDE"
        >
          <defs>
            <linearGradient
              id="contactPathGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1E4883" />
              <stop offset="55%" stopColor="#2B64B0" />
              <stop offset="100%" stopColor="#F0C32A" />
            </linearGradient>
            <radialGradient id="centerHubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1E4883" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#1E4883" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle Grid Lines */}
          <g stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 5" opacity="0.7">
            <line x1="30" y1="60" x2="430" y2="60" />
            <line x1="30" y1="150" x2="430" y2="150" />
            <line x1="30" y1="240" x2="430" y2="240" />
            <line x1="115" y1="20" x2="115" y2="280" />
            <line x1="230" y1="20" x2="230" y2="280" />
            <line x1="345" y1="20" x2="345" y2="280" />
          </g>

          {/* Connecting Curves */}
          <path
            d="M 85 75 C 145 75, 175 150, 230 150 C 285 150, 315 75, 375 75"
            fill="none"
            stroke="url(#contactPathGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 85 225 C 145 225, 175 150, 230 150 C 285 150, 315 225, 375 225"
            fill="none"
            stroke="url(#contactPathGrad)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />

          {/* Center Glow & iGUIDE Node */}
          <circle cx="230" cy="150" r="56" fill="url(#centerHubGlow)" />
          <circle
            cx="230"
            cy="150"
            r="34"
            fill="#0B1D3A"
            stroke="url(#contactPathGrad)"
            strokeWidth="2.5"
          />
          <text
            x="230"
            y="147"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            iGUIDE
          </text>
          <text
            x="230"
            y="161"
            textAnchor="middle"
            fill="#F0C32A"
            fontSize="8"
            fontFamily="monospace"
          >
            CONNECT
          </text>

          {/* Satellite Node 1: Institutions */}
          <g transform="translate(85, 75)">
            <rect
              x="-52"
              y="-22"
              width="104"
              height="44"
              rx="14"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <circle cx="-32" cy="0" r="6" fill="#1E4883" />
            <text
              x="-18"
              y="-2"
              fill="#0F172A"
              fontSize="10"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              Institutions
            </text>
            <text
              x="-18"
              y="10"
              fill="#64748B"
              fontSize="8"
              fontFamily="sans-serif"
            >
              Schools & Univ.
            </text>
          </g>

          {/* Satellite Node 2: Educators */}
          <g transform="translate(375, 75)">
            <rect
              x="-52"
              y="-22"
              width="104"
              height="44"
              rx="14"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <circle cx="-32" cy="0" r="6" fill="#2B64B0" />
            <text
              x="-18"
              y="-2"
              fill="#0F172A"
              fontSize="10"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              Educators
            </text>
            <text
              x="-18"
              y="10"
              fill="#64748B"
              fontSize="8"
              fontFamily="sans-serif"
            >
              Faculty & Teams
            </text>
          </g>

          {/* Satellite Node 3: Learners */}
          <g transform="translate(85, 225)">
            <rect
              x="-52"
              y="-22"
              width="104"
              height="44"
              rx="14"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <circle cx="-32" cy="0" r="6" fill="#F0C32A" />
            <text
              x="-18"
              y="-2"
              fill="#0F172A"
              fontSize="10"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              Learners
            </text>
            <text
              x="-18"
              y="10"
              fill="#64748B"
              fontSize="8"
              fontFamily="sans-serif"
            >
              Adaptive Paths
            </text>
          </g>

          {/* Satellite Node 4: Collaborators */}
          <g transform="translate(375, 225)">
            <rect
              x="-52"
              y="-22"
              width="104"
              height="44"
              rx="14"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <circle cx="-32" cy="0" r="6" fill="#10B981" />
            <text
              x="-18"
              y="-2"
              fill="#0F172A"
              fontSize="10"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              Partners
            </text>
            <text
              x="-18"
              y="10"
              fill="#64748B"
              fontSize="8"
              fontFamily="sans-serif"
            >
              Collaboration
            </text>
          </g>
        </svg>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-lavender/35 bg-[#F4F8FD]/80 px-4 py-3 text-xs text-ink-secondary">
          <span className="inline-flex items-center gap-2 font-medium text-ink">
            <MessageSquare className="h-3.5 w-3.5 text-iris" aria-hidden="true" />
            <span>Every conversation shapes more thoughtful learning.</span>
          </span>
          <span className="font-mono text-[10px] font-semibold text-iris uppercase">
            Koramangala, BLR
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Section 2 Left Column Subtle Abstract Visual
 */
export function ContactVisionAbstractVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-lavender/40 bg-gradient-to-br from-navy via-[#142D57] to-[#163868] p-6 text-white shadow-subtle">
      <div
        className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-iris/25 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-lavender uppercase">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          <span>Human-Centred Dialogue</span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-bold text-white">
          Where Human Potential Meets Intelligence
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
          Whether you are exploring one adaptive capability or a connected institutional vision, our team listens first to understand your learners and educators.
        </p>

        {/* Subtle SVG Wave Motif */}
        <svg
          viewBox="0 0 320 48"
          className="mt-4 h-10 w-full"
          aria-hidden="true"
        >
          <path
            d="M 4 32 C 65 8, 125 44, 185 22 C 235 6, 275 34, 316 14"
            fill="none"
            stroke="#F0C32A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="65" cy="20" r="4" fill="#1E4883" />
          <circle cx="185" cy="22" r="4.5" fill="#2B64B0" />
          <circle cx="316" cy="14" r="4" fill="#F0C32A" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Section 5: Location ("Find Us in Bengaluru.") with Privacy-Conscious Map Embed
 * Uses the configured map URL rather than an invented exact pin.
 */
export function PrivacyConsciousLocationMap({
  address,
  officeHours,
  mapSearchUrl,
  mapEmbedUrl,
}: {
  address: string;
  officeHours: string;
  mapSearchUrl: string;
  mapEmbedUrl: string;
}) {
  const [embedLoaded, setEmbedLoaded] = useState(false);

  return (
    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
      {/* Location Details Card */}
      <div className="flex flex-col justify-between rounded-[32px] border border-border bg-white p-8 shadow-subtle sm:p-10 lg:col-span-5">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-iris/20 bg-iris/10 px-3.5 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-iris uppercase">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            <span>BENGALURU WORKSPACE</span>
          </span>

          <h3 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-ink">
            Aspire Co-works, Koramangala
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            {address}
          </p>

          <div className="mt-6 space-y-4 border-t border-border/80 pt-6">
            <div className="flex items-start gap-3">
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-iris"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold text-ink uppercase tracking-wider">
                  Working Hours
                </p>
                <p className="mt-0.5 text-xs text-ink-secondary">
                  {officeHours}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe
                className="mt-0.5 h-4 w-4 shrink-0 text-intelligence"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold text-ink uppercase tracking-wider">
                  District & Hub
                </p>
                <p className="mt-0.5 text-xs text-ink-secondary">
                  Koramangala, Bengaluru, Karnataka, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border/80 pt-6">
          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-iris px-5 py-3 text-xs font-bold text-white shadow-subtle transition hover:bg-iris-hover"
          >
            <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Open in Google Maps</span>
            <ExternalLink className="h-3 w-3 opacity-80" aria-hidden="true" />
          </a>

          {!embedLoaded && (
            <button
              type="button"
              onClick={() => setEmbedLoaded(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-cloud px-4 py-3 text-xs font-semibold text-ink transition hover:border-iris hover:text-iris"
            >
              <span>Load Interactive Map</span>
            </button>
          )}
        </div>
      </div>

      {/* Privacy-Conscious Map Frame */}
      <div className="relative min-h-[340px] overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-[#F4F3FF] via-white to-[#EEF4FF] shadow-subtle lg:col-span-7">
        {embedLoaded ? (
          <iframe
            title="iGUIDE Location — Aspire Co-works, Koramangala, Bengaluru"
            src={mapEmbedUrl}
            className="h-full min-h-[360px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="relative flex h-full min-h-[360px] flex-col items-center justify-center p-8 text-center">
            {/* Decorative Architectural Map Grid Background */}
            <svg
              viewBox="0 0 600 340"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
              aria-hidden="true"
            >
              <g stroke="#CBD5E1" strokeWidth="1">
                <line x1="0" y1="68" x2="600" y2="68" />
                <line x1="0" y1="136" x2="600" y2="136" />
                <line x1="0" y1="204" x2="600" y2="204" />
                <line x1="0" y1="272" x2="600" y2="272" />
                <line x1="120" y1="0" x2="120" y2="340" />
                <line x1="240" y1="0" x2="240" y2="340" />
                <line x1="360" y1="0" x2="360" y2="340" />
                <line x1="480" y1="0" x2="480" y2="340" />
              </g>
              <path
                d="M 40 280 Q 190 190 300 170 T 560 70"
                fill="none"
                stroke="#1E4883"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <circle cx="300" cy="170" r="38" fill="#1E4883" fillOpacity="0.12" />
              <circle cx="300" cy="170" r="8" fill="#1E4883" />
            </svg>

            <div className="relative z-10 max-w-md rounded-3xl border border-white/90 bg-white/90 p-7 shadow-elevated backdrop-blur-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-iris/10 text-iris">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>

              <h4 className="mt-4 font-heading text-lg font-bold text-ink">
                Aspire Co-works, Koramangala, Bengaluru
              </h4>

              <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                {address}
              </p>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-ink-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-iris" aria-hidden="true" />
                <span>
                  External map embed is loaded only on request to respect your privacy.
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setEmbedLoaded(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-bold text-white shadow-subtle transition hover:bg-iris-hover"
                >
                  <span>Load Google Map Here</span>
                </button>
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2.5 text-xs font-semibold text-ink transition hover:border-iris hover:text-iris"
                >
                  <span>Open External Map</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
