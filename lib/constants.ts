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
  index: string;       // editorial section number ("01" … "09")
  label: string;       // nav label
  title: string;       // editorial title
}

export const SECTIONS: readonly SectionMeta[] = [
  { id: 'hero',                     index: '00', label: 'Overview',     title: 'Overview' },
  { id: 'problem-space',            index: '01', label: 'Problem',      title: 'Problem Space' },
  { id: 'governance-architecture',  index: '02', label: 'Architecture', title: 'Governance Architecture' },
  { id: 'sso-orchestration',        index: '03', label: 'SSO',          title: 'SSO Orchestration' },
  { id: 'scim-lifecycle',           index: '04', label: 'SCIM',         title: 'SCIM Lifecycle' },
  { id: 'break-glass-access',       index: '05', label: 'Break-Glass',  title: 'Break-Glass Access' },
  { id: 'teammate-governance',      index: '06', label: 'Teammates',    title: 'Teammate Governance' },
  { id: 'operational-intelligence', index: '07', label: 'Operations',   title: 'Operational Intelligence' },
  { id: 'outcomes',                 index: '08', label: 'Outcomes',     title: 'Outcomes' },
] as const;
