import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[*_`~]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripBasicHtmlTags(input: string): string {
  return input
    .replace(/<\/?(p|div|span|br|blockquote|ul|ol|li|h[1-6])[^>]*>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .trim();
}

/**
 * Extracts H2 and H3 headings from article content so the Table of Contents
 * and heading anchors stay strictly in sync.
 */
export function extractArticleHeadings(content: string): ArticleHeading[] {
  const blocks = content.split(/\n\n+/);
  const headings: ArticleHeading[] = [];
  const usedIds = new Map<string, number>();

  const registerHeading = (rawText: string, level: 2 | 3) => {
    const cleanText = stripBasicHtmlTags(rawText)
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .trim();
    if (!cleanText) return;

    const baseId = slugifyHeading(cleanText) || `section-${headings.length + 1}`;
    const count = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, count + 1);
    const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`;

    headings.push({
      id: uniqueId,
      text: cleanText,
      level,
    });
  };

  for (const block of blocks) {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      registerHeading(trimmed.slice(4), 3);
    } else if (trimmed.startsWith("## ")) {
      registerHeading(trimmed.slice(3), 2);
    } else if (/^<h3[^>]*>([\s\S]*?)<\/h3>$/i.test(trimmed)) {
      const match = trimmed.match(/^<h3[^>]*>([\s\S]*?)<\/h3>$/i);
      if (match?.[1]) registerHeading(match[1], 3);
    } else if (/^<h2[^>]*>([\s\S]*?)<\/h2>$/i.test(trimmed)) {
      const match = trimmed.match(/^<h2[^>]*>([\s\S]*?)<\/h2>$/i);
      if (match?.[1]) registerHeading(match[1], 2);
    }
  }

  return headings;
}

/**
 * Validates that a link href uses a safe protocol before rendering.
 */
function isSafeUrl(url: string): boolean {
  const trimmed = url.trim();
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:")
  ) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Safely parses inline formatting (links, bold, italic, inline code) into React nodes
 * without ever injecting unsanitised HTML.
 */
export function renderSafeInlineNodes(
  rawText: string,
  keyPrefix = "inline"
): React.ReactNode[] {
  const normalized = rawText
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<code>([\s\S]*?)<\/code>/gi, "`$1`");

  const cleanText = stripBasicHtmlTags(normalized);

  const tokenRegex =
    /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g;
  const parts = cleanText.split(tokenRegex);

  return parts.filter(Boolean).map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;

    // Markdown link: [label](url)
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const splitIdx = part.indexOf("](");
      const label = part.slice(1, splitIdx);
      const rawHref = part.slice(splitIdx + 2, -1).trim();

      if (!isSafeUrl(rawHref)) {
        return <span key={key}>{label}</span>;
      }

      const isInternal = rawHref.startsWith("/") || rawHref.startsWith("#");
      if (isInternal) {
        return (
          <Link
            key={key}
            href={rawHref}
            className="font-semibold text-iris underline decoration-iris/35 underline-offset-4 transition-colors hover:text-intelligence hover:decoration-intelligence"
          >
            {label}
          </Link>
        );
      }

      return (
        <a
          key={key}
          href={rawHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-iris underline decoration-iris/35 underline-offset-4 transition-colors hover:text-intelligence hover:decoration-intelligence"
        >
          <span>{label}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={key} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={key} className="italic text-ink">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline code: `text`
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={key}
          className="rounded-md border border-lavender/35 bg-ice/80 px-1.5 py-0.5 font-mono text-[0.9em] text-navy"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

/**
 * Safe Rich-Text Renderer for long-form CMS articles.
 * Supports H2, H3, paragraphs, unordered & ordered lists, blockquotes,
 * responsive images, links, and Markdown tables.
 */
export function SafeArticleContent({
  content,
  headings,
}: {
  content: string;
  headings: ArticleHeading[];
}) {
  const blocks = content.split(/\n\n+/);
  let headingCursor = 0;

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. H3 Heading
        if (
          trimmed.startsWith("### ") ||
          /^<h3[^>]*>[\s\S]*?<\/h3>$/i.test(trimmed)
        ) {
          const headingMeta = headings[headingCursor];
          headingCursor += 1;
          const rawHeadingText = trimmed.startsWith("### ")
            ? trimmed.slice(4)
            : trimmed.replace(/^<h3[^>]*>([\s\S]*?)<\/h3>$/i, "$1");

          return (
            <h3
              key={index}
              id={headingMeta?.id || `heading-${index}`}
              className="mt-10 mb-3 scroll-mt-28 font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl"
            >
              {renderSafeInlineNodes(rawHeadingText, `h3-${index}`)}
            </h3>
          );
        }

        // 2. H2 Heading
        if (
          trimmed.startsWith("## ") ||
          /^<h2[^>]*>[\s\S]*?<\/h2>$/i.test(trimmed)
        ) {
          const headingMeta = headings[headingCursor];
          headingCursor += 1;
          const rawHeadingText = trimmed.startsWith("## ")
            ? trimmed.slice(3)
            : trimmed.replace(/^<h2[^>]*>([\s\S]*?)<\/h2>$/i, "$1");

          return (
            <div key={index} className="pt-6 first:pt-0">
              <div className="mb-2.5 flex items-center gap-2">
                <span
                  className="h-1.5 w-6 rounded-full bg-gradient-to-r from-iris to-intelligence"
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-iris uppercase">
                  Section {String(headingCursor).padStart(2, "0")}
                </span>
              </div>
              <h2
                id={headingMeta?.id || `heading-${index}`}
                className="scroll-mt-28 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-[28px] sm:leading-[1.25]"
              >
                {renderSafeInlineNodes(rawHeadingText, `h2-${index}`)}
              </h2>
            </div>
          );
        }

        // 3. Standalone Image: ![alt](src "optional caption")
        const imageMatch = trimmed.match(
          /^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]+)")?\)$/
        );
        if (imageMatch) {
          const alt = imageMatch[1] || "Article illustration";
          const src = imageMatch[2];
          const caption = imageMatch[3];

          if (isSafeUrl(src)) {
            return (
              <figure key={index} className="my-10">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-navy shadow-subtle">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 740px"
                    className="object-cover"
                  />
                </div>
                {(caption || alt) && (
                  <figcaption className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
                    {caption || alt}
                  </figcaption>
                )}
              </figure>
            );
          }
        }

        // 4. Blockquote: > quote lines
        if (
          trimmed.startsWith(">") ||
          /^<blockquote[^>]*>[\s\S]*?<\/blockquote>$/i.test(trimmed)
        ) {
          const lines = trimmed
            .replace(/^<blockquote[^>]*>([\s\S]*?)<\/blockquote>$/i, "$1")
            .split("\n")
            .map((line) => line.replace(/^>\s?/, "").trim())
            .filter(Boolean);

          const lastLine = lines[lines.length - 1] || "";
          const hasAttribution =
            lines.length > 1 &&
            (lastLine.startsWith("—") || lastLine.startsWith("--"));
          const quoteLines = hasAttribution ? lines.slice(0, -1) : lines;
          const attribution = hasAttribution
            ? lastLine.replace(/^(--|—)\s*/, "")
            : null;

          return (
            <blockquote
              key={index}
              className="relative my-8 overflow-hidden rounded-3xl border border-lavender/45 bg-gradient-to-br from-[#F6F5FF] via-white to-[#EEF4FF] p-7 sm:p-9 shadow-subtle"
            >
              <div
                className="pointer-events-none absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-iris via-intelligence to-lavender"
                aria-hidden="true"
              />
              <Quote
                className="mb-3 h-7 w-7 text-iris/35"
                aria-hidden="true"
              />
              <div className="space-y-3 font-heading text-lg font-semibold leading-relaxed text-ink sm:text-xl">
                {quoteLines.map((qLine, qIdx) => (
                  <p key={qIdx}>
                    {renderSafeInlineNodes(qLine, `quote-${index}-${qIdx}`)}
                  </p>
                ))}
              </div>
              {attribution && (
                <footer className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-iris uppercase">
                  <span className="h-px w-5 bg-iris/40" aria-hidden="true" />
                  <cite className="not-italic">{attribution}</cite>
                </footer>
              )}
            </blockquote>
          );
        }

        // 5. Markdown Table: | Header 1 | Header 2 |
        const lines = trimmed.split("\n").map((l) => l.trim());
        const isMarkdownTable =
          lines.length >= 2 &&
          lines[0].startsWith("|") &&
          lines[0].endsWith("|") &&
          /^\|[\s:-]+\|/.test(lines[1]);

        if (isMarkdownTable) {
          const parseRow = (row: string) =>
            row
              .slice(1, -1)
              .split("|")
              .map((cell) => cell.trim());

          const headers = parseRow(lines[0]);
          const rows = lines
            .slice(2)
            .filter((r) => r.startsWith("|") && r.endsWith("|"))
            .map(parseRow);

          return (
            <div
              key={index}
              className="my-8 overflow-x-auto rounded-2xl border border-border bg-white shadow-subtle"
            >
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-cloud/90">
                    {headers.map((header, hIdx) => (
                      <th
                        key={hIdx}
                        scope="col"
                        className="px-5 py-3.5 font-heading text-xs font-bold tracking-wider text-ink uppercase"
                      >
                        {renderSafeInlineNodes(
                          header,
                          `th-${index}-${hIdx}`
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="transition-colors hover:bg-ice/35"
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={cn(
                            "px-5 py-3.5 leading-relaxed text-ink-secondary",
                            cIdx === 0 && "font-semibold text-ink"
                          )}
                        >
                          {renderSafeInlineNodes(
                            cell,
                            `td-${index}-${rIdx}-${cIdx}`
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // 6. Ordered List (1. , 2. , etc.)
        if (/^\d+\.\s+/.test(trimmed)) {
          const items = trimmed
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => line.replace(/^\d+\.\s+/, ""));

          return (
            <ol
              key={index}
              className="my-6 space-y-3.5 rounded-3xl border border-border/80 bg-cloud/60 p-6 sm:p-7"
            >
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 text-base leading-[1.8] text-ink-secondary sm:text-[17px]"
                >
                  <span
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-iris/12 font-mono text-xs font-bold text-iris"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    {renderSafeInlineNodes(item, `ol-${index}-${i}`)}
                  </div>
                </li>
              ))}
            </ol>
          );
        }

        // 7. Unordered List (- or *)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => line.replace(/^[-*]\s+/, ""));

          return (
            <ul
              key={index}
              className="my-6 space-y-3.5 rounded-3xl border border-border/80 bg-cloud/60 p-6 sm:p-7"
            >
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 text-base leading-[1.8] text-ink-secondary sm:text-[17px]"
                >
                  <span
                    className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-iris to-intelligence ring-4 ring-iris/10"
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    {renderSafeInlineNodes(item, `ul-${index}-${i}`)}
                  </div>
                </li>
              ))}
            </ul>
          );
        }

        // 8. Standard Editorial Paragraph
        return (
          <p
            key={index}
            className="text-[17px] leading-[1.85] text-ink-secondary sm:text-[18px] sm:leading-[1.9]"
          >
            {renderSafeInlineNodes(trimmed, `p-${index}`)}
          </p>
        );
      })}
    </div>
  );
}
