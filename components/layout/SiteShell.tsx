'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SECTIONS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * SiteShell — sticky top navigation + content + minimal footer.
 *
 * Restrained header: brand mark on the left, section anchors on the right.
 * No drop shadows, no backdrop blur. A 1px line appears on scroll.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 bg-canvas/95 transition-colors duration-200',
          scrolled ? 'border-b border-line' : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-14 max-w-[var(--container-max)] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
          <Link
            href="#hero"
            className="flex items-center gap-2 text-caption font-semibold tracking-tight text-ink-1 transition-opacity hover:opacity-70"
          >
            <BrandMark />
            <span>
              {SITE.shortTitle} <span className="text-ink-3">/ Case Study</span>
            </span>
          </Link>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {SECTIONS.filter((s) => s.id !== 'hero').map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[13px] text-ink-3 transition-colors hover:text-ink-1"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden text-[12px] text-ink-3 transition-colors hover:text-ink-1 md:inline-flex"
          >
            Source ↗
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-line-soft">
        <div className="mx-auto flex flex-col gap-2 px-6 py-8 sm:px-10 sm:flex-row sm:items-center sm:justify-between sm:py-6 lg:px-16 max-w-[var(--container-max)]">
          <p className="text-[12px] text-ink-3">
            © {new Date().getFullYear()} {SITE.author}. Case study artifact for portfolio.
          </p>
          <p className="text-[12px] text-ink-3">
            <a href={SITE.repoUrl} target="_blank" rel="noreferrer" className="hover:text-ink-1">
              View source on GitHub ↗
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

function BrandMark() {
  // Abstract architectural mark — three stacked lines, monochrome.
  return (
    <span
      aria-hidden
      className="inline-flex h-4 w-4 flex-col justify-between"
    >
      <span className="h-px w-full bg-ink-1" />
      <span className="h-px w-3/4 bg-ink-1" />
      <span className="h-px w-1/2 bg-ink-1" />
    </span>
  );
}
