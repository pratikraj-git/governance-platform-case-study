'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SECTIONS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * SiteShell — sticky top navigation, page content, minimal footer.
 *
 * Single editorial tone: warm canvas, ink-1 type, restrained type-led hierarchy.
 * A 1px hairline appears under the header on scroll; the active section is
 * surfaced as a quiet weight change, never a colored pill.
 *
 * A 1px springed scroll-progress bar sits at the base of the header — a
 * reading-position cue, not a flourish.
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

  const navSections = useMemo(() => SECTIONS.filter((s) => s.inNav && s.id !== 'hero'), []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 bg-canvas/92 backdrop-blur-[6px] transition-colors duration-200',
          scrolled ? 'border-b border-line-soft' : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-14 max-w-[var(--container-max)] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-5">
            {SITE.portfolioUrl && (
              <a
                href={SITE.portfolioUrl}
                className="hidden items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ink-4 transition-colors duration-200 hover:text-ink-2 sm:inline-flex"
                aria-label="Back to portfolio"
              >
                <span aria-hidden className="text-[10px]">←</span>
                <span>Portfolio</span>
              </a>
            )}
            <Link
              href="#hero"
              className="flex items-center gap-2.5 text-caption font-medium tracking-tight text-ink-1 transition-opacity hover:opacity-70"
            >
              <BrandMark />
              <span className="hidden sm:inline">
                Governance Platform <span className="text-ink-3">/ Case Study</span>
              </span>
              <span className="sm:hidden">Case Study</span>
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
                        isActive ? 'text-ink-1' : 'text-ink-3 hover:text-ink-1',
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'h-1 w-1 rounded-full transition-colors duration-200',
                          isActive ? 'bg-ink-1' : 'bg-transparent group-hover:bg-line-strong',
                        )}
                      />
                      <span className={cn(isActive && 'font-medium')}>{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <p className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 sm:inline-flex lg:hidden">
            {activeSectionLabel(activeId)}
          </p>

          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden text-[12px] text-ink-3 transition-colors hover:text-ink-1 lg:inline-flex"
          >
            Source ↗
          </a>
        </div>

        <ScrollProgress />
      </header>

      <main>{children}</main>

      <footer className="border-t border-line-soft">
        <div className="mx-auto flex flex-col gap-8 max-w-[var(--container-max)] px-6 py-14 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-body font-medium text-ink-1">{SITE.author}</p>
              <p className="max-w-[52ch] text-body-sm text-ink-3 text-pretty">
                Product designer working on enterprise governance, identity infrastructure, and
                operational platforms. Calm, scalable systems for high-complexity organizations.
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

          <div className="flex flex-col gap-1.5 border-t border-line-soft pt-6 text-[12px] text-ink-4 sm:flex-row sm:items-baseline sm:justify-between">
            <p>
              © {new Date().getFullYear()} {SITE.author}. Case study artifact — not affiliated with
              any employer.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Enterprise platform design · 2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Active-section detection
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

        let best: IntersectionObserverEntry | null = null;
        for (const e of visible.values()) {
          if (!best || e.boundingClientRect.top < best.boundingClientRect.top) {
            best = e;
          }
        }
        if (best) setActiveId(best.target.id);
      },
      { rootMargin: '-96px 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
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
  return match.id === 'hero' ? 'Overview' : `${match.index} · ${match.label}`;
}

/* ──────────────────────────────────────────────────────────────────── *
 * Scroll progress
 * ──────────────────────────────────────────────────────────────────── */

function ScrollProgress() {
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
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line-soft"
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-full origin-left bg-ink-1"
      />
    </div>
  );
}

function BrandMark() {
  return (
    <span aria-hidden className="inline-flex h-4 w-4 flex-col justify-between">
      <span className="h-px w-full bg-ink-1" />
      <span className="h-px w-3/4 bg-ink-1" />
      <span className="h-px w-1/2 bg-ink-1" />
    </span>
  );
}
