/**
 * Site-wide constants — single source of truth for nav, metadata, etc.
 * Keep this file lean. Anything more than a handful of static values
 * belongs in its own module under /lib.
 */

export const SITE = {
  title: 'Governance Platform — Case Study',
  shortTitle: 'Governance Platform',
  author: 'Pratik Raj',
  description:
    'An end-to-end enterprise governance case study: SSO orchestration, SCIM lifecycle, break-glass access, teammate governance, and the operational intelligence layer that unifies them.',
  repoUrl: 'https://github.com/pratikraj-git/governance-platform-case-study',
} as const;

export type SectionId =
  | 'hero'
  | 'problem-space'
  | 'governance-architecture'
  | 'sso-orchestration'
  | 'scim-lifecycle'
  | 'break-glass-access'
  | 'teammate-governance'
  | 'operational-intelligence'
  | 'outcomes';

export interface SectionMeta {
  id: SectionId;
  index: string;       // editorial section number ("01" … "08")
  label: string;       // nav label
  title: string;       // editorial title
  /** Whether this section appears in the top navigation rail. */
  inNav: boolean;
}

export const SECTIONS: readonly SectionMeta[] = [
  { id: 'hero',                     index: '00', label: 'Overview',     title: 'Overview',                inNav: true  },
  { id: 'problem-space',            index: '01', label: 'Problem',      title: 'Problem Space',           inNav: true  },
  { id: 'governance-architecture',  index: '02', label: 'Architecture', title: 'Governance Architecture', inNav: true  },
  { id: 'sso-orchestration',        index: '03', label: 'SSO',          title: 'SSO Orchestration',       inNav: true  },
  { id: 'scim-lifecycle',           index: '04', label: 'SCIM',         title: 'SCIM Lifecycle',          inNav: true  },
  { id: 'break-glass-access',       index: '05', label: 'BGU',          title: 'Break-Glass Access',      inNav: true  },
  // Teammate governance sits inline in the page flow but is not a top-level nav anchor.
  { id: 'teammate-governance',      index: '06', label: 'Teammates',    title: 'Teammate Governance',     inNav: false },
  { id: 'operational-intelligence', index: '07', label: 'Governance',   title: 'Operational Intelligence',inNav: true  },
  { id: 'outcomes',                 index: '08', label: 'Outcomes',     title: 'Outcomes',                inNav: true  },
] as const;
