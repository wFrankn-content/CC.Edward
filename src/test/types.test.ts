import type { Channel, Video, ContentIdea, DailyBriefing, TrendingItem } from '@/lib/types'

describe('types', () => {
  it('Channel has required fields', () => {
    const channel: Channel = {
      id: 'main',
      name: 'Main Channel',
      handle: '@main',
      subscriberCount: 10000,
      subscriberDelta: 84,
      totalViews: 500000,
      recentVideos: [],
    }
    expect(channel.id).toBe('main')
  })

  it('ContentIdea contentType is a union', () => {
    const idea: ContentIdea = {
      id: '1',
      title: 'Test',
      outline: 'An outline.',
      contentType: 'short',
      channelTarget: 'main',
    }
    expect(['short', 'long', 'stream']).toContain(idea.contentType)
  })

  it('DailyBriefing has all required fields', () => {
    const briefing: DailyBriefing = {
      generatedAt: new Date().toISOString(),
      channels: [],
      hotChannel: 'main',
      ideas: [],
      trending: [],
    }
    expect(briefing.hotChannel).toBe('main')
  })
})
