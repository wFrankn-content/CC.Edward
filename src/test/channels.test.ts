import { getChannels, getChannelAccent } from '@/lib/channels'

describe('channels accessors', () => {
  it('getChannels() exposes channels with id and accent', () => {
    const channels = getChannels()
    expect(channels.length).toBeGreaterThan(0)
    expect(channels[0]).toHaveProperty('id')
    expect(channels[0]).toHaveProperty('accent')
  })

  it('getChannelAccent returns the channel accent', () => {
    const first = getChannels()[0]!
    expect(getChannelAccent(first.id)).toBe(first.accent)
  })

  it('getChannelAccent falls back for unknown / null', () => {
    const firstAccent = getChannels()[0]!.accent
    expect(getChannelAccent('nope')).toBe(firstAccent)
    expect(getChannelAccent(null)).toBe(firstAccent)
  })
})
