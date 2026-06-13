import { getMockBriefing, getMockIdeas } from '@/lib/mock-data'
import { getChannels } from '@/lib/channels'

describe('mock data', () => {
  it('getMockBriefing returns a DailyBriefing with one channel per config channel', () => {
    const briefing = getMockBriefing()
    expect(briefing.channels).toHaveLength(getChannels().length)
    expect(briefing.hotChannel).toBeTruthy()
  })

  it('each channel has 3 recent videos', () => {
    const briefing = getMockBriefing()
    briefing.channels.forEach(channel => {
      expect(channel.recentVideos).toHaveLength(3)
    })
  })

  it('getMockBriefing filters by channel id', () => {
    const id = getChannels()[1]!.id
    const briefing = getMockBriefing(id)
    expect(briefing.channels).toHaveLength(1)
    expect(briefing.channels[0]?.id).toBe(id)
  })

  it('getMockIdeas returns 3 ideas for a channel', () => {
    const id = getChannels()[0]!.id
    const ideas = getMockIdeas(id, 0)
    expect(ideas).toHaveLength(3)
    ideas.forEach(idea => {
      expect(idea.channelTarget).toBe(id)
      expect(['short', 'long', 'stream']).toContain(idea.contentType)
    })
  })

  it('getMockIdeas returns different ideas for different rotation indices', () => {
    const id = getChannels()[0]!.id
    const set0 = getMockIdeas(id, 0)
    const set1 = getMockIdeas(id, 1)
    expect(set0[0]?.id).not.toBe(set1[0]?.id)
  })
})
