'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

interface FallbackLoginMockProps {
  className?: string;
}

/**
 * FallbackLoginMock — the dual-path login entry, visualized.
 *
 * Two states, side-by-side:
 *   • SSO ENABLED: SSO primary button + subtle "Sign in with password" link
 *     intended for BGU and temporary users only.
 *   • SSO DISABLED: standard email/password (no fallback needed).
 *
 * The point is to make the design decision legible: 99% of users see SSO;
 * the 1% who need the bypass can find it without it being marketed.
 */
export function FallbackLoginMock({ className }: FallbackLoginMockProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6', className)}
    >
      <ScreenMock
        title="SSO enabled"
        eyebrow="Scenario A"
        body={
          <>
            <SSOButton />
            <Divider label="or" />
            <FallbackLink />
            <Note tone="muted">
              Standard users entering an SSO-required email see:
              <em className="block pt-1 text-ink-2">“This account requires SSO. Please return to the main login.”</em>
            </Note>
          </>
        }
        annotation="Discoverable for the 1% — invisible to the 99%."
      />

      <ScreenMock
        title="SSO disabled"
        eyebrow="Scenario B"
        body={
          <>
            <Field label="Email" value="admin@acme.com" />
            <Field label="Password" value="••••••••••••" />
            <PrimaryButton label="Sign in" />
            <Note tone="muted">
              No fallback rendered — passwords already work.
              <em className="block pt-1 text-ink-2">There is no glass to break.</em>
            </Note>
          </>
        }
        annotation="Temp users sign in directly."
      />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Screen mock
 * ──────────────────────────────────────────────────────────────────── */

function ScreenMock({
  title, eyebrow, body, annotation,
}: {
  title: string;
  eyebrow: string;
  body: React.ReactNode;
  annotation: string;
}) {
  return (
    <motion.figure variants={revealUp} className="flex flex-col">
      {/* Browser-chrome-style header */}
      <div className="flex items-center gap-2 rounded-t-md border border-b-0 border-line bg-canvas px-4 py-2.5">
        <span aria-hidden className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
        </span>
        <span className="font-mono text-[11px] text-ink-3">
          {eyebrow} · {title}
        </span>
      </div>

      {/* Login surface */}
      <div className="rounded-b-md border border-line bg-surface p-7 sm:p-9">
        <div className="mx-auto flex max-w-[340px] flex-col gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              Sign in
            </p>
            <h4 className="mt-2 text-h3 text-ink-1">Access the platform</h4>
          </div>
          <div className="flex flex-col gap-3">{body}</div>
        </div>
      </div>

      <figcaption className="mt-3 text-body-sm text-ink-3 text-pretty">
        {annotation}
      </figcaption>
    </motion.figure>
  );
}

function SSOButton() {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      className="flex items-center justify-center gap-2 rounded-md border border-ink-1 bg-ink-1 px-4 py-3 text-body-sm font-medium text-ink-inverse"
    >
      <span aria-hidden className="inline-flex h-2 w-2 rounded-sm border border-ink-inverse/70" />
      Continue with Single Sign-On
    </button>
  );
}

function PrimaryButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      className="rounded-md border border-ink-1 bg-ink-1 px-4 py-3 text-body-sm font-medium text-ink-inverse"
    >
      {label}
    </button>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-4">
      <span className="h-px flex-1 bg-line-soft" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-line-soft" />
    </div>
  );
}

function FallbackLink() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-dashed border-line-strong bg-surface-mute px-3 py-2">
      <motion.span
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: ease.quiet }}
        aria-hidden
        className="h-1 w-1 rounded-full bg-ink-3"
      />
      <span className="flex-1 text-body-sm font-medium text-ink-1">
        Sign in with password
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
        bgu · temp
      </span>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
        {label}
      </span>
      <span className="rounded-md border border-line bg-surface px-3 py-2.5 font-mono text-[13px] text-ink-1">
        {value}
      </span>
    </label>
  );
}

function Note({ children, tone }: { children: React.ReactNode; tone?: 'muted' | 'warn' }) {
  return (
    <p
      className={cn(
        'mt-2 text-body-sm text-pretty',
        tone === 'warn' ? 'text-signal-attention' : 'text-ink-3',
      )}
    >
      {children}
    </p>
  );
}
