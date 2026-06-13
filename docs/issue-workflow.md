# Edward Issue Workflow

Single source of truth for how issues move through `wFrankn-content/CC.Edward`.
The `to-issues`, `triage`, and `work-issue` skills all follow this document.

## Repo

GitHub: `wFrankn-content/CC.Edward`
(The CLAUDE.md tech-stack table historically said GitLab — the live remote is GitHub.)

## Labels

An issue carries **one category** label and **exactly one state** label.

### Category — what the work is
| Label | Meaning |
|-------|---------|
| `bug` | Something broken |
| `enhancement` | New feature/behavior |
| `chore` | Scaffold, config, infra, tooling |

### State — where it is in the lifecycle
| Label | Meaning |
|-------|---------|
| `needs-triage` | Created, not yet assessed |
| `needs-info` | Blocked on a human answer |
| `ready-for-agent` | An agent can implement it unattended |
| `ready-for-human` | Needs a human decision or credentials |
| `in-progress` | Being worked right now |
| `blocked` | Has an unmet dependency |
| `wontfix` | Closed, will not be built |

## Lifecycle

```
spec ──[to-issues]──▶ issues (needs-triage)
     ──[triage]─────▶ ready-for-agent | ready-for-human | needs-info | wontfix
     ──[work-issue]─▶ in-progress ──▶ PR ──▶ closes issue
```

## State transitions

| From | To | Who | When |
|------|----|-----|------|
| (created) | `needs-triage` | to-issues | On publish |
| `needs-triage` | `ready-for-agent` / `ready-for-human` / `needs-info` / `wontfix` | triage | After assessment |
| any | `blocked` | any | A `Blocked by:` issue is still open (replaces state label until cleared) |
| `ready-for-agent` | `in-progress` | work-issue | On start |
| `in-progress` | (closed) | work-issue | PR merged via `Closes #N` |

An issue holds one state label at a time. Moving states means removing the old
label and adding the new one.

## Dependencies

Dependencies are recorded as `Blocked by: #N` in the issue body. While any listed
blocker is still open, the issue also carries the `blocked` label in place of its
state label. When the last blocker closes, restore the prior state label.

## Build state

Active implementation branch: `feature/edward-v1` (lives in the `.worktrees/edward-v1`
worktree). PWA configuration (`@serwist/next`, manifest, service worker) has been
started there. Workers should check that branch before re-building scaffolding.

## Setup (run once)

```bash
gh label create chore           --repo wFrankn-content/CC.Edward --color 5a6b7b --description "Scaffold, config, infra, tooling"
gh label create needs-triage    --repo wFrankn-content/CC.Edward --color ededed --description "Created, not yet assessed"
gh label create needs-info      --repo wFrankn-content/CC.Edward --color fbca04 --description "Blocked on a human answer"
gh label create ready-for-agent --repo wFrankn-content/CC.Edward --color 0e8a16 --description "An agent can implement unattended"
gh label create ready-for-human --repo wFrankn-content/CC.Edward --color 5319e7 --description "Needs a human decision or credentials"
gh label create in-progress     --repo wFrankn-content/CC.Edward --color 1d76db --description "Being worked right now"
gh label create blocked         --repo wFrankn-content/CC.Edward --color b60205 --description "Has an unmet dependency"
```
