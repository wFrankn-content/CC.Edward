import type { Channel, Video, ContentIdea, DailyBriefing, TrendingItem } from '@/lib/types'

describe('types', () => {
  it('Channel has required fields', () => {
    const channel: Channel = {
      id: 'wfrankn',
      name: 'wFrankn',
      handle: '@wFrankn',
      subscriberCount: 10000,
      subscriberDelta: 84,
      totalViews: 500000,
      recentVideos: [],
    }
    expect(channel.id).toBe('wfrankn')
  })

  it('ContentIdea contentType is a union', () => {
    const idea: ContentIdea = {
      id: '1',
      title: 'Test',
      outline: 'An outline.',
      contentType: 'short',
      channelTarget: 'wfrankn',
    }
    expect(['short', 'long', 'stream']).toContain(idea.contentType)
  })

  it('DailyBriefing has all required fields', () => {
    const briefing: DailyBriefing = {
      generatedAt: new Date().toISOString(),
      channels: [],
      hotChannel: 'wfrankn',
      ideas: [],
      trending: [],
    }
    expect(briefing.hotChannel).toBe('wfrankn')
  })
})
