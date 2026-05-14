'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SECTIONS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * SiteShell — sticky top navigation + content + minimal footer.
 *
 * Restrained header: brand mark on the left, section anchors on the right.
 * No drop shadows, no backdrop blur. A 1px line appears on scroll. The
 * active section is detected via IntersectionObserver and surfaced as a
 * single-weight emphasis (no underline glyphs).
 *
 * A 1px scroll-progress bar lives at the bottom of the header — quiet
 * reading-position cue, never an animation.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Nav items: trimmed by `inNav` flag from the SECTIONS source-of-truth.
  const navSections = useMemo(() => SECTIONS.filter((s) => s.inNav && s.id !== 'hero'), []);

  // Over the dark hero, the nav inherits a dark surface to avoid the bright
  // bar / dark hero seam. Switches back to the light editorial surface as soon
  // as the reader crosses into the body of the case study.
  const overDarkHero = activeId === 'hero';

  return (
    <>
      <header
        data-tone={overDarkHero ? 'dark' : 'light'}
        className={cn(
          'sticky top-0 z-40 transition-colors duration-300',
          overDarkHero
            ? 'bg-surface-ink text-ink-inverse'
            : 'bg-canvas/95 text-ink-1',
          scrolled
            ? overDarkHero
              ? 'border-b border-[rgba(250,250,247,0.10)]'
              : 'border-b border-line'
            : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-14 max-w-[var(--container-max)] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
          {/* Brand + optional portfolio back-link */}
          <div className="flex items-center gap-5">
            {SITE.portfolioUrl && (
              <a
                href={SITE.portfolioUrl}
                className={cn(
                  'hidden items-center gap-1.5 text-[11px] transition-colors duration-200 sm:inline-flex',
                  overDarkHero
                    ? 'text-[rgba(250,250,247,0.45)] hover:text-ink-inverse'
                    : 'text-ink-4 hover:text-ink-2',
                )}
                aria-label="Back to portfolio"
              >
                <span aria-hidden className="text-[10px]">←</span>
                <span className="uppercase tracking-[0.14em]">Portfolio</span>
              </a>
            )}
            <Link
              href="#hero"
              className={cn(
                'flex items-center gap-2.5 text-caption font-semibold tracking-tight transition-opacity hover:opacity-70',
                overDarkHero ? 'text-ink-inverse' : 'text-ink-1',
              )}
            >
              <BrandMark tone={overDarkHero ? 'dark' : 'light'} />
              <span className="hidden sm:inline">
                {SITE.shortTitle}{' '}
                <span className={overDarkHero ? 'text-[rgba(250,250,247,0.55)]' : 'text-ink-3'}>
                  / Case Study
                </span>
              </span>
              <span className="sm:hidden">{SITE.shortTitle}</span>
            </Link>
          </div>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-7">
              {navSections.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'group inline-flex items-center gap-2 text-[13px] transition-colors duration-200',
                        overDarkHero
                          ? isActive
                            ? 'text-ink-inverse'
                            : 'text-[rgba(250,250,247,0.55)] hover:text-ink-inverse'
                          : isActive
                            ? 'text-ink-1'
                            : 'text-ink-3 hover:text-ink-1',
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'h-1 w-1 rounded-full transition-colors duration-200',
                          isActive
                            ? overDarkHero
                              ? 'bg-ink-inverse'
                              : 'bg-ink-1'
                            : overDarkHero
                              ? 'bg-transparent group-hover:bg-[rgba(250,250,247,0.45)]'
                              : 'bg-transparent group-hover:bg-line-strong',
                        )}
                      />
                      <span className={cn(isActive && 'font-medium')}>{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Tablet fallback — show only the active section as a quiet anchor crumb. */}
          <p
            className={cn(
              'hidden font-mono text-[11px] uppercase tracking-[0.16em] sm:inline-flex lg:hidden',
              overDarkHero ? 'text-[rgba(250,250,247,0.55)]' : 'text-ink-3',
            )}
          >
            {activeSectionLabel(activeId)}
          </p>

          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'hidden text-[12px] transition-colors lg:inline-flex',
              overDarkHero
                ? 'text-[rgba(250,250,247,0.55)] hover:text-ink-inverse'
                : 'text-ink-3 hover:text-ink-1',
            )}
          >
            Source ↗
          </a>
        </div>

        {/* Scroll progress — 1px reading-position cue */}
        <ScrollProgress overDarkHero={overDarkHero} />
      </header>

      <main>{children}</main>

      <footer className="border-t border-line-soft">
        <div className="mx-auto flex flex-col gap-8 px-6 py-14 sm:px-10 lg:px-16 max-w-[var(--container-max)]">
          {/* Top row: identity + navigation */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-body font-semibold text-ink-1">{SITE.author}</p>
              <p className="max-w-[52ch] text-body-sm text-ink-3 text-pretty">
                Senior Product Designer — enterprise platform UX, governance systems, operational infrastructure.
              </p>
              {SITE.portfolioUrl && (
                <a
                  href={SITE.portfolioUrl}
                  className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-ink-3 transition-colors hover:text-ink-1"
                >
                  <span aria-hidden className="text-[10px]">←</span>
                  Back to portfolio
                </a>
              )}
            </div>

            <ul className="flex flex-wrap items-start gap-x-8 gap-y-2 text-[12px] text-ink-3 sm:flex-col sm:items-end sm:gap-y-3">
              <li>
                <a
                  href={SITE.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-ink-1"
                >
                  Source on GitHub ↗
                </a>
              </li>
              <li>
                <a href="#hero" className="transition-colors hover:text-ink-1">
                  Back to top
                </a>
              </li>
            </ul>
          </div>

          {/* Bottom row: colophon */}
          <div className="flex flex-col gap-1.5 border-t border-line-soft pt-6 text-[12px] text-ink-4 sm:flex-row sm:items-baseline sm:justify-between">
            <p>
              © {new Date().getFullYear()} {SITE.author}.
              {' '}Case study artifact — not affiliated with any employer.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Enterprise Platform Design · 2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Active section detection
 * ──────────────────────────────────────────────────────────────────── */

function useActiveSection() {
  const [activeId, setActiveId] = useState<string>('hero');
  const visibleRef = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    const visible = visibleRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e);
          else visible.delete(e.target.id);
        }

        if (visible.size === 0) return;

        // Pick the entry closest to (but not above) the viewport's reference line.
        // `rootMargin` already biases toward the top of the viewport, so we just
        // pick whichever currently-visible entry has the smallest top coordinate.
        let best: IntersectionObserverEntry | null = null;
        for (const e of visible.values()) {
          if (!best || e.boundingClientRect.top < best.boundingClientRect.top) {
            best = e;
          }
        }
        if (best) setActiveId(best.target.id);
      },
      {
        // Active band: top ~96px (under the sticky nav) down to roughly 50% of viewport.
        rootMargin: '-96px 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

function activeSectionLabel(activeId: string): string {
  const match = SECTIONS.find((s) => s.id === activeId);
  if (!match) return 'Overview';
  // Hero reads cleanly as "Overview"; other sections show their editorial number + label.
  return match.id === 'hero' ? 'Overview' : `${match.index} · ${match.label}`;
}

/* ──────────────────────────────────────────────────────────────────── *
 * Scroll progress — a 1px reading-position cue at the base of the nav.
 * Tone-aware: light fill on dark hero, ink-1 on the body.
 * ──────────────────────────────────────────────────────────────────── */

function ScrollProgress({ overDarkHero }: { overDarkHero: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0 h-px transition-colors',
        overDarkHero ? 'bg-[rgba(250,250,247,0.06)]' : 'bg-line-soft',
      )}
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className={cn(
          'h-full origin-left transition-colors',
          overDarkHero ? 'bg-ink-inverse/85' : 'bg-ink-1',
        )}
      />
    </div>
  );
}

function BrandMark({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  // Abstract architectural mark — three stacked lines, monochrome.
  const bar = tone === 'dark' ? 'bg-ink-inverse' : 'bg-ink-1';
  return (
    <span
      aria-hidden
      className="inline-flex h-4 w-4 flex-col justify-between transition-colors"
    >
      <span className={cn('h-px w-full', bar)} />
      <span className={cn('h-px w-3/4', bar)} />
      <span className={cn('h-px w-1/2', bar)} />
    </span>
  );
}
