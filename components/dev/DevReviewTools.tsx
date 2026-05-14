'use client';

import { useEffect, useState } from 'react';
import { SECTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * DevReviewTools — local review-and-iterate toolkit.
 *
 * Mounted from `app/layout.tsx`. Returns `null` in production builds — the
 * `NODE_ENV` check is statically evaluated by Next.js, so the entire inner
 * component (and its JSX) is dead-code-eliminated at build time. The
 * production bundle is unchanged.
 *
 * Keyboard shortcuts (development only):
 *   Shift + O   toggle section outlines + labels
 *   Shift + G   toggle 12-column layout grid overlay
 *   Shift + I   toggle visual boundaries + click-to-zoom on figures / svgs
 *   Shift + R   toggle the floating dev panel
 *   Escape      close the zoom modal
 *
 * Floating dev panel (bottom-right): jump-to-section nav, overlay toggles,
 * and a current-section indicator.
 */
export function DevReviewTools() {
  if (process.env.NODE_ENV !== 'development') return null;
  return <DevReviewToolsInner />;
}

/* ──────────────────────────────────────────────────────────────────── *
 * Inner component — only ever rendered in development
 * ──────────────────────────────────────────────────────────────────── */

function DevReviewToolsInner() {
  const [outlines, setOutlines] = useState(false);
  const [grid, setGrid]         = useState(false);
  const [visuals, setVisuals]   = useState(false);
  const [panel, setPanel]       = useState(true);
  const [zoom, setZoom]         = useState<string | null>(null);
  const [active, setActive]     = useState<string>('hero');

  /* Sync overlay state to DOM so CSS can target without re-renders. */
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.devOutlines = outlines ? 'on' : 'off';
    root.dataset.devGrid     = grid     ? 'on' : 'off';
    root.dataset.devVisuals  = visuals  ? 'on' : 'off';
  }, [outlines, grid, visuals]);

  /* Stamp each section with a human-readable label for the outline overlay. */
  useEffect(() => {
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) el.setAttribute('data-dev-label', `${s.index} · ${s.label}`);
    });
  }, []);

  /* Global keyboard shortcuts. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return;

      if (e.key === 'Escape') {
        if (zoom) {
          e.preventDefault();
          setZoom(null);
        }
        return;
      }

      if (!e.shiftKey) return;
      const k = e.key.toLowerCase();
      if      (k === 'o') { e.preventDefault(); setOutlines((v) => !v); }
      else if (k === 'g') { e.preventDefault(); setGrid((v) => !v); }
      else if (k === 'i') { e.preventDefault(); setVisuals((v) => !v); }
      else if (k === 'r') { e.preventDefault(); setPanel((v) => !v); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  /* Active-section detection (independent of SiteShell's own observer). */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        let best: { id: string; top: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const top = e.boundingClientRect.top;
          if (!best || top < best.top) best = { id: e.target.id, top };
        }
        if (best) setActive(best.id);
      },
      { rootMargin: '-96px 0px -50% 0px', threshold: [0, 0.2, 0.5, 0.8, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* Click-to-zoom on visuals when Shift+I overlay is on. */
  useEffect(() => {
    if (!visuals) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-dev-tool]')) return;
      const v = target.closest('figure, svg[role="img"], svg[aria-label]');
      if (!v) return;
      e.preventDefault();
      e.stopPropagation();
      setZoom((v as HTMLElement).outerHTML);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [visuals]);

  return (
    <>
      <DevStyles />
      {grid && <GridOverlay />}
      <DevPanel
        outlines={outlines}
        grid={grid}
        visuals={visuals}
        panel={panel}
        active={active}
        onToggleOutlines={() => setOutlines((v) => !v)}
        onToggleGrid={() => setGrid((v) => !v)}
        onToggleVisuals={() => setVisuals((v) => !v)}
        onTogglePanel={() => setPanel((v) => !v)}
      />
      {zoom && <ZoomModal content={zoom} onClose={() => setZoom(null)} />}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Stylesheet (overlays driven by html[data-dev-*] attributes)
 * ──────────────────────────────────────────────────────────────────── */

function DevStyles() {
  return (
    <style>{`
      /* ── Section outlines + labels ─────────────────────────────── */
      html[data-dev-outlines='on'] main section[id] {
        position: relative;
        outline: 1px dashed rgba(255, 99, 71, 0.55);
        outline-offset: -1px;
      }
      html[data-dev-outlines='on'] main section[id]::before {
        content: attr(data-dev-label);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 30;
        padding: 4px 8px;
        background: rgba(255, 99, 71, 0.94);
        color: #fff;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 10px;
        line-height: 1;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        font-weight: 600;
        pointer-events: none;
      }

      /* ── Visual boundaries + click-to-zoom affordance ──────────── */
      html[data-dev-visuals='on'] figure,
      html[data-dev-visuals='on'] svg[role="img"],
      html[data-dev-visuals='on'] svg[aria-label] {
        outline: 1px dashed rgba(34, 134, 58, 0.7);
        outline-offset: 4px;
        cursor: zoom-in;
        transition: outline-offset 180ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      html[data-dev-visuals='on'] figure:hover,
      html[data-dev-visuals='on'] svg[role="img"]:hover,
      html[data-dev-visuals='on'] svg[aria-label]:hover {
        outline-offset: 7px;
        outline-color: rgba(34, 134, 58, 1);
      }
    `}</style>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * 12-column grid overlay
 * ──────────────────────────────────────────────────────────────────── */

function GridOverlay() {
  return (
    <div
      data-dev-tool
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55]"
    >
      <div className="mx-auto h-full max-w-[var(--container-max)] px-6 sm:px-10 lg:px-16">
        <div className="grid h-full grid-cols-12 gap-x-6 sm:gap-x-8 lg:gap-x-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-full border-x border-[rgba(48,108,255,0.18)] bg-[rgba(48,108,255,0.04)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Floating dev panel (bottom-right)
 * ──────────────────────────────────────────────────────────────────── */

interface DevPanelProps {
  outlines: boolean;
  grid: boolean;
  visuals: boolean;
  panel: boolean;
  active: string;
  onToggleOutlines: () => void;
  onToggleGrid: () => void;
  onToggleVisuals: () => void;
  onTogglePanel: () => void;
}

function DevPanel({
  outlines, grid, visuals, panel, active,
  onToggleOutlines, onToggleGrid, onToggleVisuals, onTogglePanel,
}: DevPanelProps) {
  const activeMeta = SECTIONS.find((s) => s.id === active);

  return (
    <div
      data-dev-tool
      className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 font-sans"
    >
      {panel && (
        <div className="w-72 overflow-hidden rounded-md border border-line bg-surface text-ink-1 shadow-[0_8px_24px_-12px_rgba(14,15,14,0.18)]">
          <header className="flex items-center justify-between border-b border-line-soft bg-canvas px-4 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              Dev · Review
            </p>
            <button
              type="button"
              onClick={onTogglePanel}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3 transition-colors hover:text-ink-1"
              aria-label="Hide review panel"
            >
              hide · ⇧R
            </button>
          </header>

          <div className="space-y-1.5 px-3 py-3">
            <DevToggle label="Section outlines" hint="⇧O" on={outlines} onClick={onToggleOutlines} />
            <DevToggle label="Layout grid"      hint="⇧G" on={grid}     onClick={onToggleGrid} />
            <DevToggle label="Visual zoom"      hint="⇧I" on={visuals}  onClick={onToggleVisuals} />
          </div>

          <div className="border-t border-line-soft px-3 py-3">
            <p className="px-1 text-[10px] font-mono uppercase tracking-[0.16em] text-ink-3">
              Jump to section
            </p>
            <ul className="mt-2 flex flex-col gap-0.5">
              {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={cn(
                        'flex items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-[12px] transition-colors',
                        isActive
                          ? 'bg-canvas text-ink-1 font-medium'
                          : 'text-ink-2 hover:bg-canvas/70 hover:text-ink-1',
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] text-ink-4 tabular-nums w-4">
                          {s.index}
                        </span>
                        <span>{s.label}</span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          'h-1 w-1 rounded-full',
                          isActive ? 'bg-ink-1' : 'bg-transparent',
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <footer className="border-t border-line-soft bg-canvas px-3 py-2 text-[10px] text-ink-4">
            Local review · Shortcuts: ⇧O · ⇧G · ⇧I · ⇧R · Esc
          </footer>
        </div>
      )}

      {!panel && (
        <button
          type="button"
          onClick={onTogglePanel}
          className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-[11px] font-mono uppercase tracking-[0.14em] text-ink-2 shadow-sm transition-colors hover:border-line-strong hover:text-ink-1"
          aria-label="Show review panel"
        >
          <span aria-hidden className="inline-flex h-1.5 w-1.5 rounded-full bg-ink-1" />
          DEV · {activeMeta?.label ?? 'Review'}
        </button>
      )}
    </div>
  );
}

function DevToggle({
  label, hint, on, onClick,
}: { label: string; hint: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between rounded-sm border px-3 py-2 text-[12px] transition-colors',
        on
          ? 'border-ink-1 bg-canvas text-ink-1'
          : 'border-line-soft text-ink-2 hover:border-line-strong hover:text-ink-1',
      )}
      aria-pressed={on}
    >
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={cn(
            'h-1.5 w-1.5 rounded-full transition-colors',
            on ? 'bg-ink-1' : 'bg-line-strong',
          )}
        />
        {label}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
        {hint}
      </span>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Zoom modal — click a figure / svg to inspect it enlarged.
 *
 * Captures the visual's outerHTML at click time and re-renders it inside
 * a centered modal. Framer-motion animations don't replay (the HTML is
 * static), which is the desired behavior for an inspection view.
 * ──────────────────────────────────────────────────────────────────── */

function ZoomModal({ content, onClose }: { content: string; onClose: () => void }) {
  return (
    <div
      data-dev-tool
      role="dialog"
      aria-modal="true"
      aria-label="Visual inspector"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(14,15,14,0.85)] p-4 backdrop-blur-sm sm:p-10"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-[1400px] flex-col overflow-hidden rounded-md border border-line bg-canvas shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-line-soft bg-surface px-5 py-3">
          <div className="flex items-center gap-3">
            <span aria-hidden className="inline-flex h-1.5 w-1.5 rounded-full bg-ink-1" />
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              Visual · Inspector
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3 transition-colors hover:text-ink-1"
          >
            Close · Esc
          </button>
        </header>
        <div
          className="overflow-auto bg-canvas p-6 sm:p-10"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
