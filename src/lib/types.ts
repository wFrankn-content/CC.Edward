export interface Channel {
  id: string
  name: string
  handle: string
  subscriberCount: number
  subscriberDelta: number // 7-day change
  totalViews: number
  recentVideos: Video[]
}

export interface Video {
  id: string
  title: string
  publishedAt: string
  views: number
  viewsDelta: number // 48h change
  watchTimeMinutes: number
  likes: number
  thumbnailUrl: string
}

export interface ContentIdea {
  id: string
  title: string
  outline: string
  contentType: 'short' | 'long' | 'stream'
  channelTarget: string
  trendSource?: string
}

export interface DailyBriefing {
  generatedAt: string
  channels: Channel[]
  hotChannel: string
  ideas: ContentIdea[]
  trending: TrendingItem[]
}

export interface TrendingItem {
  name: string
  source: 'steam_most_played' | 'steam_trending' | 'google_trends'
  metric: string
}

export const CHANNELS = [
  { id: 'wfrankn',          name: 'wFrankn',           handle: '@wFrankn',           accent: '#3b82f6' },
  { id: 'techyfrankn',      name: 'TechyFRNK',         handle: '@TechyFRNK',         accent: '#8b5cf6' },
  { id: 'justfrankngaming', name: 'justFRNKNGaming',   handle: '@justFRNKNGaming',   accent: '#22c55e' },
  { id: 'vgfam',            name: 'VGFAM',             handle: '@VGFAM',             accent: '#f59e0b' },
] as const

export type ChannelId = typeof CHANNELS[number]['id']

export function getChannelAccent(channelId: string | null): string {
  return CHANNELS.find(c => c.id === channelId)?.accent ?? '#3b82f6'
}
