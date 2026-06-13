// Client-side data layer. Behind getConfig().useMock it returns mock data with a
// small artificial delay (so skeleton states are exercised); otherwise it talks
// to the Flask backend at getConfig().apiBaseUrl. Static export forbids server
// route handlers, so all data access goes through this module.
import { getConfig } from '@/lib/config'
import { getMockBriefing, getMockIdeas } from '@/lib/mock-data'
import type { DailyBriefing, ContentIdea } from '@/lib/types'

const MOCK_DELAY_MS = 250

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function apiUrl(path: string): string {
  const { apiBaseUrl } = getConfig()
  return `${apiBaseUrl.replace(/\/$/, '')}${path}`
}

export async function getBriefing(channelId?: string): Promise<DailyBriefing> {
  if (getConfig().useMock) {
    await delay(MOCK_DELAY_MS)
    return getMockBriefing(channelId)
  }
  const qs = channelId ? `?channel=${encodeURIComponent(channelId)}` : ''
  const res = await fetch(apiUrl(`/api/briefing${qs}`))
  if (!res.ok) throw new Error(`getBriefing failed: ${res.status}`)
  return res.json() as Promise<DailyBriefing>
}

export async function generateIdeas(channelId: string): Promise<ContentIdea[]> {
  if (getConfig().useMock) {
    await delay(MOCK_DELAY_MS)
    const rotation = Math.floor(Math.random() * 3)
    return getMockIdeas(channelId, rotation)
  }
  const res = await fetch(apiUrl(`/api/ideas/generate?channel=${encodeURIComponent(channelId)}`))
  if (!res.ok) throw new Error(`generateIdeas failed: ${res.status}`)
  const data = (await res.json()) as { ideas: ContentIdea[] }
  return data.ideas
}

export async function goIdea(idea: ContentIdea): Promise<{ ok: boolean }> {
  if (getConfig().useMock) {
    await delay(MOCK_DELAY_MS)
    console.log('[ideas/go] (mock) triggered:', idea.title, `(${idea.contentType})`, 'channel:', idea.channelTarget)
    return { ok: true }
  }
  const res = await fetch(apiUrl('/api/ideas/go'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  })
  if (!res.ok) throw new Error(`goIdea failed: ${res.status}`)
  return res.json() as Promise<{ ok: boolean }>
}
