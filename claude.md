# Edward — Content Creator Command Center

## Project overview

Edward is a PWA (Progressive Web App) that serves as a morning briefing and command center for a multi-channel YouTube content creator. The primary user opens Edward each morning to review content performance across channels and decide what to create that day.

## Core philosophy

- **Ship v1 small.** Edward v1 is two screens: a performance scoreboard and a content play-caller. That's it. No feature creep.
- **Mobile-first.** This will be opened on a phone with coffee. Every design decision assumes a phone screen.
- **Finish it.** This project has a history of half-built tools. Keep scope ruthlessly small. A working v1 beats a half-built v3.

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 14+ (App Router) | Industry standard, deploys everywhere, React ecosystem |
| Language | TypeScript (strict mode) | Type safety, better DX |
| Styling | Tailwind CSS | Utility-first, fast iteration, clean output |
| PWA | next-pwa or @serwist/next | Service worker generation, manifest, offline support |
| Hosting (dev) | Cloudflare Pages | Free, unlimited bandwidth, GitHub integration |
| Backend API | Python Flask (runs on home server) | Heavy data processing, AI calls, n8n integration |
| Tunnel | Cloudflare Tunnel | Exposes home Flask API securely at api.wfrankn.net |
| Auth | Cloudflare Access | Zero-code auth layer, email OTP + MFA, free for <50 users |
| Source control | GitHub (wFrankn-content/CC.Edward) | Private repo, GitHub Actions + Cloudflare Pages integration |

## Architecture

```
[Phone/Browser]
       |
       v
[Cloudflare Access] — auth gate (email OTP + MFA)
       |
       v
[Cloudflare Pages] — serves Next.js PWA (myapp.pages.dev)
       |
       | fetch('/api/...') — API routes in Next.js for lightweight logic
       | fetch('https://api.wfrankn.net/...') — heavy lifting
       |
       v
[Cloudflare Tunnel] ──> [Home Server: Flask API]
                              |
                              ├── YouTube Data API v3 (analytics)
                              ├── Claude API (idea generation)
                              ├── n8n webhooks (pipeline triggers)
                              └── Steam/Google Trends (existing workflows)
```

## User flow (v1)

### Morning briefing flow

1. User opens Edward on their phone
2. Cloudflare Access authenticates (cached session, so usually instant)
3. **Screen 1: Scoreboard** loads showing:
   - Channel selector (4 channels: wFrankn, TechyFRNK, justFRNKNGaming, VGFAM)
   - Default view: whichever channel has the most activity/momentum
   - Key metrics for last 48 hours: views, watch time, subscriber delta
   - Top 3 performing videos with view counts and trend arrows
   - Simple spark lines or bar indicators (no complex charts in v1)
4. User reviews performance, taps on a channel or scrolls down
5. **Screen 2: Play caller** shows:
   - 2-3 content ideas generated based on:
     - What's performing well on that channel
     - What's trending (Steam, Google Trends, gaming news)
     - Channel-specific content patterns
   - Each idea shows: title concept, 2-3 sentence outline, estimated content type (short/long/stream)
   - "Go" button on each idea that triggers n8n workflow to start the content pipeline
   - "Shuffle" button to regenerate ideas

### Idea capture (v1 stretch goal, only if core is done)

- Quick-add input at the bottom of any screen
- Type an idea, hit enter, it saves to a simple list
- No organization, no tags, no categories — just a timestamped list
- Can be reviewed later

## Data sources

### YouTube Analytics (via Flask backend)

The Flask backend uses the YouTube Data API v3 and YouTube Analytics API to pull:

- Channel statistics (subscriber count, total views)
- Recent video performance (views, watch time, likes for videos published in last 30 days)
- 48-hour view counts for recent videos
- Subscriber change over 7 days

The API calls use the `wfrankn.ugc@gmail.com` OAuth credentials already configured for n8n.

Channels to track:
- wFrankn
- TechyFRNK
- justFRNKNGaming
- VGFAM

### Trending data (via Flask backend)

The Flask backend calls existing n8n webhook endpoints that already pull:
- Steam Most Played games
- Steam New and Trending games
- Google Trends data

These n8n workflows already exist and return JSON.

### Content idea generation (via Flask backend)

The Flask backend calls the Anthropic Claude API to generate content ideas. The prompt includes:
- Channel context (what type of content this channel makes)
- Recent performance data (what's working)
- Trending data (what's hot right now)
- Returns 2-3 structured ideas with titles and outlines

## Project structure

```
edward/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with PWA meta tags
│   │   ├── page.tsx            # Main page — scoreboard + play caller
│   │   ├── globals.css         # Tailwind imports
│   │   └── manifest.ts         # PWA manifest (or manifest.json in public/)
│   ├── components/
│   │   ├── Scoreboard.tsx      # Channel performance overview
│   │   ├── ChannelCard.tsx     # Individual channel metrics
│   │   ├── VideoRow.tsx        # Single video performance row
│   │   ├── PlayCaller.tsx      # Content idea suggestions
│   │   ├── IdeaCard.tsx        # Individual content idea
│   │   ├── ChannelSelector.tsx # Channel tab/pill selector
│   │   └── QuickCapture.tsx    # Idea input (stretch goal)
│   ├── lib/
│   │   ├── api.ts              # Flask API client functions
│   │   └── types.ts            # TypeScript interfaces
│   └── hooks/
│       └── useChannel.ts       # Channel selection state
├── public/
│   ├── icons/                  # PWA icons (192x192, 512x512)
│   └── sw.js                   # Service worker (if not auto-generated)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## TypeScript interfaces

```typescript
interface Channel {
  id: string;
  name: string;
  handle: string; // e.g. "@wFrankn"
  subscriberCount: number;
  subscriberDelta: number; // change over 7 days
  totalViews: number;
  recentVideos: Video[];
}

interface Video {
  id: string;
  title: string;
  publishedAt: string;
  views: number;
  viewsDelta: number; // change in last 48h
  watchTimeMinutes: number;
  likes: number;
  thumbnailUrl: string;
}

interface ContentIdea {
  id: string;
  title: string;
  outline: string; // 2-3 sentences
  contentType: 'short' | 'long' | 'stream';
  channelTarget: string;
  trendSource?: string; // what trend inspired this
}

interface DailyBriefing {
  generatedAt: string;
  channels: Channel[];
  hotChannel: string; // channel ID with most momentum
  ideas: ContentIdea[];
  trending: TrendingItem[];
}

interface TrendingItem {
  name: string;
  source: 'steam_most_played' | 'steam_trending' | 'google_trends';
  metric: string; // e.g. "245,000 players" or "breakout"
}
```

## Flask API endpoints (home server)

```
GET  /api/briefing              — full morning briefing (channels + ideas + trends)
GET  /api/channels              — all channel stats
GET  /api/channels/:id          — single channel detail
GET  /api/channels/:id/videos   — recent videos for a channel
GET  /api/trending              — current trending data from n8n
POST /api/ideas/generate        — generate content ideas (body: { channelId, count })
POST /api/ideas/go              — trigger n8n content pipeline (body: { idea })
POST /api/ideas/capture         — save a quick idea (body: { text })
GET  /api/ideas                 — list saved ideas
```

## Design direction

- **Dark mode default** — this is a creator tool, not a consumer app. Dark backgrounds, high contrast text.
- **Mobile-first** — single column layout, large touch targets, no hover-dependent interactions
- **Minimal UI** — no sidebar, no navigation bar. Just content flowing vertically.
- **Channel colors** — each channel gets a subtle accent color so you always know which context you're in
- **Loading states** — skeleton screens, not spinners. Content should feel like it's arriving, not loading.
- **Typography** — Inter or system font stack. Large numbers for metrics (32-48px), readable body text (16px minimum)

### Color palette suggestion

```
Background:     #0a0a0a (near black)
Surface:        #141414 (cards)
Border:         #262626 (subtle dividers)
Text primary:   #fafafa
Text secondary: #a1a1aa
Accent blue:    #3b82f6 (wFrankn)
Accent purple:  #8b5cf6 (TechyFRNK)
Accent green:   #22c55e (justFRNKNGaming)
Accent amber:   #f59e0b (VGFAM)
```

## PWA requirements

- Web app manifest with app name "Edward", standalone display mode
- Service worker caching the app shell for offline access
- Icons at 192x192 and 512x512
- Theme color matching the dark background
- Installable on iOS, Android, and desktop

## Deployment

### Cloudflare Pages

- Connect the GitHub repo (wFrankn-content/CC.Edward) to Cloudflare Pages
- Build command: `npm run build`
- Output directory: `.next` (or `out` if using static export)
- Use `@cloudflare/next-on-pages` adapter if using edge runtime
- Environment variables set in Cloudflare dashboard for API URLs

### Cloudflare Access

- Create an Access application for the Pages domain
- Policy: allow specific email addresses (creator + any collaborators)
- Session duration: 30 days (don't make the user re-auth every morning)

### Cloudflare Tunnel

- Run `cloudflared` on home server
- Map `api.wfrankn.net` to `localhost:5000` (Flask)
- Put Cloudflare Access in front of the tunnel endpoint too

## Development workflow

1. `npx create-next-app@latest edward --typescript --tailwind --app --src-dir`
2. Install PWA dependencies
3. Build the Scoreboard component with mock data first
4. Build the PlayCaller component with mock data
5. Wire up the Flask API client
6. Deploy to Cloudflare Pages
7. Set up Cloudflare Tunnel and Access
8. Connect real data

## What v1 is NOT

- Not a full analytics dashboard (YouTube Studio exists)
- Not a project management tool (don't rebuild Notion)
- Not a knowledge base (Obsidian handles that)
- Not a video editor or script writer (Claude Desktop/CLI does that)
- Not an n8n replacement (n8n stays as the automation engine)

Edward is the **decision layer** — it tells you what's working and what to make next, then triggers the tools that already exist to go make it.

## Agent skill behaviors

### `/to-issues`
When running the `to-issues` skill, **do not edit any files or make any commits**. The only output is GitHub issues created via `gh issue create`. Do not ask for approval unless you are about to create a pull request or commit.

### `/triage`
When running the `triage` skill, **do not edit any source files**. Only post comments and apply labels to GitHub issues. Every comment must start with the AI disclaimer.

## Future versions (parked, do not build yet)

- v2: Pipeline status view (what's in progress across n8n workflows)
- v2: Idea board with basic organization
- v3: Content calendar view
- v3: A/B thumbnail testing
- v4: Cross-channel analytics and correlation
- v4: Audience insights