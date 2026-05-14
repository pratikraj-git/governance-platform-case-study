/**
 * Site-wide constants — single source of truth for nav, metadata, etc.
 *
 * portfolioUrl: Set NEXT_PUBLIC_PORTFOLIO_URL in your .env.local (or Vercel
 * environment variables) to enable the "← Portfolio" back-link in the header.
 * If unset, the link is not rendered.
 */

export const SITE = {
  title: 'Governance Platform — Enterprise Administration & Operational Infrastructure',
  shortTitle: 'Governance Platform',
  author: 'Pratik Raj',
  description:
    'A designer’s case study on simplifying enterprise governance — SSO, SCIM, RBAC, and lifecycle administration brought into one calm operational layer.',
  repoUrl: 'https://github.com/pratikraj-git/governance-platform-case-study',
  /** Set NEXT_PUBLIC_PORTFOLIO_URL in .env.local or Vercel to activate the back-link. */
  portfolioUrl: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? 'https://www.pratikrdesign.com/',
} as const;

export type SectionId =
  | 'hero'
  | 'problem'
  | 'signals'
  | 'identity'
  | 'resilience'
  | 'governance'
  | 'reflection';

export interface SectionMeta {
  id: SectionId;
  index: string;       // editorial section number ("00" … "06")
  label: string;       // nav label
  title: string;       // editorial title
  /** Whether this section appears in the top navigation rail. */
  inNav: boolean;
}

export const SECTIONS: readonly SectionMeta[] = [
  { id: 'hero',       index: '00', label: 'Overview',    title: 'Overview',                                  inNav: true },
  { id: 'problem',    index: '01', label: 'Problem',     title: 'The Growing Governance Problem',           inNav: true },
  { id: 'signals',    index: '02', label: 'Signals',     title: 'Enterprise Signals',                        inNav: true },
  { id: 'identity',   index: '03', label: 'Identity',    title: 'Simplifying Identity & Access',             inNav: true },
  { id: 'resilience', index: '04', label: 'Resilience',  title: 'Operational Resilience & Lifecycle',       inNav: true },
  { id: 'governance', index: '05', label: 'Governance',  title: 'Toward Centralized Governance',             inNav: true },
  { id: 'reflection', index: '06', label: 'Reflection',  title: 'Reflection & Outcomes',                     inNav: true },
] as const;
