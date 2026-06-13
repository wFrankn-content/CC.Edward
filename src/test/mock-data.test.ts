import { getMockBriefing, getMockIdeas } from '@/lib/mock-data'

describe('mock data', () => {
  it('getMockBriefing returns a DailyBriefing with all 4 channels', () => {
    const briefing = getMockBriefing()
    expect(briefing.channels).toHaveLength(4)
    expect(briefing.hotChannel).toBeTruthy()
  })

  it('each channel has 3 recent videos', () => {
    const briefing = getMockBriefing()
    briefing.channels.forEach(channel => {
      expect(channel.recentVideos).toHaveLength(3)
    })
  })

  it('getMockBriefing filters by channel id', () => {
    const briefing = getMockBriefing('techyfrankn')
    expect(briefing.channels).toHaveLength(1)
    expect(briefing.channels[0]?.id).toBe('techyfrankn')
  })

  it('getMockIdeas returns 3 ideas for a channel', () => {
    const ideas = getMockIdeas('wfrankn', 0)
    expect(ideas).toHaveLength(3)
    ideas.forEach(idea => {
      expect(idea.channelTarget).toBe('wfrankn')
      expect(['short', 'long', 'stream']).toContain(idea.contentType)
    })
  })

  it('getMockIdeas returns different ideas for different rotation indices', () => {
    const set0 = getMockIdeas('wfrankn', 0)
    const set1 = getMockIdeas('wfrankn', 1)
    expect(set0[0]?.id).not.toBe(set1[0]?.id)
  })
})
