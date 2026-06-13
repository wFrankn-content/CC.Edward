import { getBriefing, generateIdeas, goIdea } from '@/lib/api'
import { CHANNELS } from '@/lib/channels'
import type { ContentIdea } from '@/lib/types'

describe('lib/api client', () => {
  it('getBriefing() returns a briefing with a hot channel', async () => {
    const briefing = await getBriefing()
    expect(briefing.channels.length).toBeGreaterThan(0)
    expect(briefing.hotChannel).toBeTruthy()
  })

  it('getBriefing(channelId) returns that channel first', async () => {
    const id = CHANNELS[1]!.id
    const briefing = await getBriefing(id)
    expect(briefing.channels[0]?.id).toBe(id)
  })

  it('generateIdeas() returns 2-3 ideas for a channel', async () => {
    const ideas = await generateIdeas(CHANNELS[0]!.id)
    expect(ideas.length).toBeGreaterThanOrEqual(2)
    expect(ideas.length).toBeLessThanOrEqual(3)
    expect(ideas[0]?.title).toBeTruthy()
  })

  it('goIdea() resolves ok for a valid idea', async () => {
    const idea: ContentIdea = {
      id: 't1', title: 'Test', outline: 'o', contentType: 'long', channelTarget: CHANNELS[0]!.id,
    }
    await expect(goIdea(idea)).resolves.toEqual({ ok: true })
  })
})
