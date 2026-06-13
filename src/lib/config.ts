// Single env-driven config layer. Every brand-specific value is injected via
// NEXT_PUBLIC_* environment variables so the source repo names no real channels.
// Components must read config only through getConfig() — never process.env.

export interface ChannelConfig {
  id: string
  name: string
  handle: string
  accent: string
}

export interface AppConfig {
  appName: string
  apiBaseUrl: string
  themeColor: string
  channels: ChannelConfig[]
  useMock: boolean
  /** Subpath prefix when hosted under a project path (e.g. "/CC.Edward"); "" at root. */
  basePath: string
}

// Fictional placeholders — keep the app runnable and the repo brand-free when no
// NEXT_PUBLIC_CHANNELS is supplied. Real channels come from .env.local at deploy.
const DEFAULT_CHANNELS: ChannelConfig[] = [
  { id: 'main',   name: 'Main Channel',   handle: '@main',   accent: '#3b82f6' },
  { id: 'tech',   name: 'Tech Channel',   handle: '@tech',   accent: '#8b5cf6' },
  { id: 'gaming', name: 'Gaming Channel', handle: '@gaming', accent: '#22c55e' },
  { id: 'family', name: 'Family Channel', handle: '@family', accent: '#f59e0b' },
]

const REQUIRED_CHANNEL_FIELDS: (keyof ChannelConfig)[] = ['id', 'name', 'handle', 'accent']

function parseChannels(raw: string | undefined): ChannelConfig[] {
  if (!raw || raw.trim() === '') return DEFAULT_CHANNELS

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (e) {
    throw new Error(`NEXT_PUBLIC_CHANNELS is not valid JSON: ${(e as Error).message}`)
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('NEXT_PUBLIC_CHANNELS must be a non-empty JSON array of channels')
  }

  return parsed.map((entry, i) => {
    if (typeof entry !== 'object' || entry === null) {
      throw new Error(`NEXT_PUBLIC_CHANNELS[${i}] must be an object`)
    }
    const record = entry as Record<string, unknown>
    for (const field of REQUIRED_CHANNEL_FIELDS) {
      if (typeof record[field] !== 'string' || record[field] === '') {
        throw new Error(`NEXT_PUBLIC_CHANNELS[${i}] is missing a valid "${field}"`)
      }
    }
    return {
      id: record.id as string,
      name: record.name as string,
      handle: record.handle as string,
      accent: record.accent as string,
    }
  })
}

function resolveUseMock(apiBaseUrl: string): boolean {
  const explicit = process.env.NEXT_PUBLIC_USE_MOCK
  if (explicit === 'true') return true
  if (explicit === 'false') return false
  // Default: use mock data whenever no backend URL is configured.
  return apiBaseUrl === ''
}

export function getConfig(): AppConfig {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
  return {
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'Edward',
    apiBaseUrl,
    themeColor: process.env.NEXT_PUBLIC_THEME_COLOR || '#0a0a0a',
    channels: parseChannels(process.env.NEXT_PUBLIC_CHANNELS),
    useMock: resolveUseMock(apiBaseUrl),
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  }
}
