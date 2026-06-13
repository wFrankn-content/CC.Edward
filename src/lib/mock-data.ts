// Generic, config-driven mock data. Channels come from getConfig() so the repo
// carries no real brand data; numbers and titles are placeholders. #23 adds the
// USE_MOCK flag that toggles between this and the real Flask backend.
import { getConfig } from '@/lib/config'
import type { Channel, ContentIdea, DailyBriefing, Video } from '@/lib/types'

function mockVideos(channelId: string): Video[] {
  return [1, 2, 3].map(n => ({
    id: `${channelId}-v${n}`,
    title: `Sample Video ${n}`,
    publishedAt: '2026-04-10',
    views: 9000 - n * 1500,
    viewsDelta: 1500 - n * 400,
    watchTimeMinutes: 45000 - n * 9000,
    likes: 360 - n * 70,
    thumbnailUrl: '',
  }))
}

function mockChannels(): Channel[] {
  return getConfig().channels.map((c, i) => ({
    id: c.id,
    name: c.name,
    handle: c.handle,
    subscriberCount: 20000 + i * 15000,
    subscriberDelta: 50 + i * 45,
    totalViews: 800000 + i * 650000,
    recentVideos: mockVideos(c.id),
  }))
}

const CONTENT_TYPES: ContentIdea['contentType'][] = ['long', 'short', 'stream']
const TREND_SOURCES: (ContentIdea['trendSource'])[] = ['steam_trending', 'google_trends', undefined]

export function getMockIdeas(channelId: string, rotation: number): ContentIdea[] {
  const r = ((rotation % 3) + 3) % 3
  return [0, 1, 2].map(n => ({
    id: `${channelId}-i${r}${n}`,
    title: `Idea concept ${r + 1}.${n + 1}`,
    outline: `A placeholder content outline for idea ${r + 1}.${n + 1} on this channel, two to three sentences describing the concept.`,
    contentType: CONTENT_TYPES[n] ?? 'long',
    channelTarget: channelId,
    ...(TREND_SOURCES[n] ? { trendSource: TREND_SOURCES[n] } : {}),
  }))
}

export function getMockBriefing(channelId?: string): DailyBriefing {
  const channels = mockChannels()
  const filtered = channelId ? channels.filter(c => c.id === channelId) : channels
  const hot = channels[Math.min(2, channels.length - 1)]?.id ?? channels[0]?.id ?? ''

  return {
    generatedAt: new Date().toISOString(),
    channels: filtered,
    hotChannel: hot,
    ideas: getMockIdeas(channels[0]?.id ?? '', 0),
    trending: [
      { name: 'Trending Game A', source: 'steam_most_played', metric: '180,000 players' },
      { name: 'Trending Topic B', source: 'google_trends', metric: 'breakout' },
      { name: 'Trending Game C', source: 'steam_trending', metric: 'New & Trending #1' },
    ],
  }
}
