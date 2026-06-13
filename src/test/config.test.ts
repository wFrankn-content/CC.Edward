import { getConfig } from '@/lib/config'

const ENV_KEYS = [
  'NEXT_PUBLIC_CHANNELS',
  'NEXT_PUBLIC_APP_NAME',
  'NEXT_PUBLIC_API_BASE_URL',
  'NEXT_PUBLIC_THEME_COLOR',
] as const

describe('getConfig', () => {
  beforeEach(() => {
    for (const k of ENV_KEYS) delete process.env[k]
  })

  it('parses NEXT_PUBLIC_CHANNELS into a typed channel array', () => {
    process.env.NEXT_PUBLIC_CHANNELS = JSON.stringify([
      { id: 'a', name: 'Alpha', handle: '@alpha', accent: '#111111' },
      { id: 'b', name: 'Bravo', handle: '@bravo', accent: '#222222' },
    ])
    const { channels } = getConfig()
    expect(channels).toHaveLength(2)
    expect(channels[0]).toEqual({ id: 'a', name: 'Alpha', handle: '@alpha', accent: '#111111' })
  })

  it('throws a descriptive error on malformed JSON', () => {
    process.env.NEXT_PUBLIC_CHANNELS = '{not json'
    expect(() => getConfig()).toThrow(/NEXT_PUBLIC_CHANNELS/)
  })

  it('throws when a channel is missing a required field', () => {
    process.env.NEXT_PUBLIC_CHANNELS = JSON.stringify([{ id: 'a', name: 'Alpha' }])
    expect(() => getConfig()).toThrow(/NEXT_PUBLIC_CHANNELS/)
  })

  it('falls back to documented defaults when vars are unset', () => {
    const cfg = getConfig()
    expect(cfg.appName).toBe('Edward')
    expect(cfg.apiBaseUrl).toBe('')
    expect(cfg.themeColor).toBe('#0a0a0a')
    expect(cfg.channels.length).toBeGreaterThan(0)
  })

  it('reads optional scalar vars when present', () => {
    process.env.NEXT_PUBLIC_APP_NAME = 'Command Center'
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.net'
    process.env.NEXT_PUBLIC_THEME_COLOR = '#123456'
    const cfg = getConfig()
    expect(cfg.appName).toBe('Command Center')
    expect(cfg.apiBaseUrl).toBe('https://api.example.net')
    expect(cfg.themeColor).toBe('#123456')
  })
})
