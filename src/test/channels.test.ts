import { CHANNELS, getChannelAccent } from '@/lib/channels'

describe('channels data module', () => {
  it('exposes channels with id and accent', () => {
    expect(CHANNELS.length).toBeGreaterThan(0)
    expect(CHANNELS[0]).toHaveProperty('id')
    expect(CHANNELS[0]).toHaveProperty('accent')
  })

  it('getChannelAccent returns the channel accent', () => {
    expect(getChannelAccent(CHANNELS[0]!.id)).toBe(CHANNELS[0]!.accent)
  })

  it('getChannelAccent falls back for unknown / null', () => {
    expect(getChannelAccent('nope')).toBe('#3b82f6')
    expect(getChannelAccent(null)).toBe('#3b82f6')
  })
})
