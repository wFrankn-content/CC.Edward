import { getBriefing, generateIdeas, goIdea } from '@/lib/api'
import { getChannels } from '@/lib/channels'
import type { ContentIdea } from '@/lib/types'

const CHANNELS = getChannels()

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

describe('lib/api client — real backend path', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.net'
    process.env.NEXT_PUBLIC_USE_MOCK = 'false'
  })
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL
    delete process.env.NEXT_PUBLIC_USE_MOCK
    vi.restoreAllMocks()
  })

  it('getBriefing() fetches the backend with the channel query', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ channels: [], hotChannel: 'x', ideas: [], trending: [], generatedAt: '' }) })
    vi.stubGlobal('fetch', fetchMock)
    await getBriefing('main')
    expect(fetchMock).toHaveBeenCalledWith('https://api.example.net/api/briefing?channel=main')
  })

  it('generateIdeas() unwraps the ideas array from the backend', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ideas: [{ id: 'x' }] }) })
    vi.stubGlobal('fetch', fetchMock)
    const ideas = await generateIdeas('main')
    expect(ideas).toEqual([{ id: 'x' }])
    expect(fetchMock).toHaveBeenCalledWith('https://api.example.net/api/ideas/generate?channel=main')
  })

  it('getBriefing() throws on a non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    await expect(getBriefing()).rejects.toThrow(/500/)
  })
})
