# /docs

Written context for the case study — the documents that drove the design decisions.

```
docs/
├── RECREATION_PROMPT.md      ← interactive Admin Dashboard build spec (source of truth)
├── prd/                       ← Product Requirements Documents and design specs
└── business-context/          ← business cases, baseline existing-state, design explorations
```

## prd/

| File | What it is |
| --- | --- |
| `admin-dashboard-ai-prd-wip.pdf` | AI-augmented Admin Dashboard PRD (work-in-progress) |
| `enterprise-admin-roles-and-permissions-prd.pdf` | Enterprise Admin + custom roles/permissions PRD |
| `scim-v2.0-multi-ent-orchestration-prd.pdf` | SCIM v2.0 PRD — multi-ENT orchestration, token portability, role mapping |
| `scim-v2.0-design.pdf` | SCIM v2.0 full design document |
| `sso-and-eua-self-serve-flow-prd.pdf` | SSO + End-User Auth self-serve flow PRD |
| `sso-and-eua-self-serve-flow-design.pdf` | SSO + EUA self-serve flow — design walkthrough |
| `break-glass-user-prd.pdf` | Break-Glass User & Temporary Fallback Access PRD |
| `break-glass-user-setup.pdf` | Break-Glass User setup design |
| `teammates-design.pdf` | Teammates governance — full design (**local only**, >100 MB; not pushed to GitHub) |
| `teammates-refined-post-feedback.pdf` | Teammates governance — refined after stakeholder feedback |
| `content-transfer-design.pdf` | Content transfer flow design |

## business-context/

| File | What it is |
| --- | --- |
| `admin-dashboard-business-case.pdf` | Admin Dashboard business case |
| `admin-dashboard-exploration-1.pdf` | Early design exploration #1 |
| `sso-existing-design.pdf` | Baseline of the existing SSO surface before redesign (**local only**, >100 MB) |

## A note on the two "local only" PDFs

Two files exceed GitHub's 100 MB per-file hard limit and are listed in `.gitignore`:

- `docs/business-context/sso-existing-design.pdf` (~136 MB)
- `docs/prd/teammates-design.pdf` (~128 MB)

They remain on disk and are referenced by file path in the case-study narrative.
If they ever need to ship publicly, migrate them to **Git LFS** or upload them to an
external store (Drive / Notion / Dropbox) and link from the website.
