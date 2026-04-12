# Edward v1 — Design Spec

**Date:** 2026-04-11
**Scope:** Frontend only (Next.js PWA). Flask backend is a separate future phase.

---

## Overview

Edward is a mobile-first PWA for a multi-channel YouTube content creator. It has two screens: a **Scoreboard** (channel performance) and a **Play Caller** (content idea suggestions). The user opens it each morning to review what's working and decide what to make next.

v1 is built entirely with mock data. API route handlers return static mock responses now; when the Flask backend is ready, those handlers are updated to proxy to `api.wfrankn.net`. No component code changes at that point.

---

## Architecture

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Scoreboard — channel stats + top videos |
| `/ideas` | Play Caller — content idea cards |
| `/api/briefing` | Returns mock `DailyBriefing` JSON |
| `/api/ideas/generate` | Returns mock `ContentIdea[]` |
| `/api/ideas/go` | Stub — logs to console, later triggers n8n |

Components always fetch from `/api/*`. Mock data lives exclusively inside the route handlers. Migration to Flask = updating route handlers only.

### Navigation

A persistent bottom navigation bar in `layout.tsx` with two icons: home (Scoreboard) and lightbulb (Play Caller). Active route is highlighted. No top nav bar, no sidebar.

### Channel State

The selected channel is stored in `localStorage` via `useChannel` hook. Both pages read from this hook — the Scoreboard sets it via the channel dropdown, the Play Caller reads it to know which channel to generate ideas for.

---

## Screen 1: Scoreboard (`/`)

### Channel Selector
A dropdown component at the top of the page. Shows a colored dot + channel name + chevron. Tapping opens a list of all 4 channels. Active channel gets its accent color:

| Channel | Accent |
|---------|--------|
| wFrankn | `#3b82f6` (blue) |
| TechyFRNK | `#8b5cf6` (purple) |
| justFRNKNGaming | `#22c55e` (green) |
| VGFAM | `#f59e0b` (amber) |

The default channel on load is whichever channel has the most momentum (`hotChannel` field from `DailyBriefing`).

### Metrics Row
Three equal `StatCard` components in a horizontal grid:

- **Views** — 48h view count, displayed in channel accent color
- **Watch hrs** — 48h watch time in hours
- **Subs** — 7-day subscriber delta, green if positive

Each `StatCard` has a `skeleton` prop that renders a pulsing placeholder at the same dimensions.

### Top Videos
A "Top Videos" label followed by up to 3 `VideoRow` components. Each row shows:

- Thumbnail placeholder (gray rectangle, 36×24px)
- Video title (truncated with ellipsis)
- View count
- Trend arrow: `↑` (green) if `viewsDelta > 0`, `→` (gray) if flat, `↓` (red) if declining

Each `VideoRow` has a `skeleton` prop.

---

## Screen 2: Play Caller (`/ideas`)

### Header
"Today's Ideas" label on the left. "⟳ Shuffle" button on the right — re-fetches `/api/ideas/generate` with the same channel param.

### Idea Cards
2–3 stacked `IdeaCard` components. Each card contains:

- Content type badge (top-left): `Long Form`, `Short`, or `Stream` — each with its own color (`#3b82f6`, `#22c55e`, `#8b5cf6`)
- Title (bold, 13px)
- Outline (2–3 sentences, secondary color, 11px)
- Full-width "Go →" button — uses channel accent color on the first idea, muted (`#262626`) on subsequent ones

Tapping "Go →" posts to `/api/ideas/go` with the idea payload. In v1 this logs to the console. In a future phase it triggers the n8n content pipeline.

Each `IdeaCard` has a `skeleton` prop.

---

## Component Tree

```
layout.tsx
├── BottomNav.tsx
└── {page}

app/page.tsx (Scoreboard)
├── ChannelDropdown.tsx
├── StatCard.tsx (×3)
└── VideoRow.tsx (×3)

app/ideas/page.tsx (Play Caller)
└── IdeaCard.tsx (×2–3)
```

---

## Data Layer

### TypeScript Interfaces (`src/lib/types.ts`)

```typescript
interface Channel {
  id: string;
  name: string;
  handle: string;
  subscriberCount: number;
  subscriberDelta: number; // 7-day change
  totalViews: number;
  recentVideos: Video[];
}

interface Video {
  id: string;
  title: string;
  publishedAt: string;
  views: number;
  viewsDelta: number; // 48h change
  watchTimeMinutes: number;
  likes: number;
  thumbnailUrl: string;
}

interface ContentIdea {
  id: string;
  title: string;
  outline: string;
  contentType: 'short' | 'long' | 'stream';
  channelTarget: string;
  trendSource?: string;
}

interface DailyBriefing {
  generatedAt: string;
  channels: Channel[];
  hotChannel: string;
  ideas: ContentIdea[];
  trending: TrendingItem[];
}

interface TrendingItem {
  name: string;
  source: 'steam_most_played' | 'steam_trending' | 'google_trends';
  metric: string;
}
```

### Mock Data (`src/lib/mock-data.ts`)

Contains one `DailyBriefing` object covering all 4 channels, 3 videos per channel, and 3 rotations of content ideas (so Shuffle shows different results). Used only by API route handlers — never imported by components.

### API Route Handlers

**`GET /api/briefing?channel=<id>`**
Returns the `DailyBriefing` filtered to the requested channel. If no channel param, returns the `hotChannel` default.

**`GET /api/ideas/generate?channel=<id>`**
Returns a `ContentIdea[]` for the given channel. Randomly selects one of 3 pre-written idea sets per channel — so Shuffle reliably returns a different set each tap.

**`POST /api/ideas/go`**
Accepts `{ idea: ContentIdea }`. Logs to console in v1. Returns `{ ok: true }`.

---

## PWA Configuration

- **Library:** `@serwist/next`
- **Manifest:** Name "Edward", short name "Edward", `standalone` display, theme color `#0a0a0a`, background color `#0a0a0a`
- **Icons:** 192×192 and 512×512 in `public/icons/`
- **Service worker:** Caches app shell (`/`, `/ideas`, static assets). Network-first for API routes (no offline data).
- **Installable:** On iOS (Add to Home Screen), Android, and desktop Chrome

---

## Design Tokens

```
Background:      #0a0a0a
Surface:         #141414
Border:          #262626
Text primary:    #fafafa
Text secondary:  #a1a1aa
Accent blue:     #3b82f6  (wFrankn)
Accent purple:   #8b5cf6  (TechyFRNK)
Accent green:    #22c55e  (justFRNKNGaming)
Accent amber:    #f59e0b  (VGFAM)
```

Font: system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`). Metric numbers: 32–48px bold. Body text: 16px minimum (11–13px inside cards at mobile density).

---

## Loading States

Every data-bearing component (`StatCard`, `VideoRow`, `IdeaCard`) accepts a `skeleton` boolean prop. When true, it renders a pulsing gray rectangle at the same dimensions as the real content. Pages pass `skeleton={true}` while fetching and switch to real data on resolution.

No spinners anywhere.

---

## Out of Scope for v1

- Real YouTube Analytics data (Flask phase)
- Real Claude API idea generation (Flask phase)
- n8n pipeline trigger (stub only — logs to console)
- Idea capture / quick-add
- Pipeline status view
- Content calendar
- Any v2/v3/v4 features listed in CLAUDE.md
