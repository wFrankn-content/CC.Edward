// Client-side data layer. Static export forbids server route handlers, so the
// app talks to this module directly. v1 returns mock data; #23 adds the USE_MOCK
// flag + real Flask backend path behind the same signatures.
import { getMockBriefing, getMockIdeas } from '@/lib/mock-data'
import type { DailyBriefing, ContentIdea } from '@/lib/types'

export async function getBriefing(channelId?: string): Promise<DailyBriefing> {
  return getMockBriefing(channelId)
}

export async function generateIdeas(channelId: string): Promise<ContentIdea[]> {
  const rotation = Math.floor(Math.random() * 3)
  return getMockIdeas(channelId, rotation)
}

export async function goIdea(idea: ContentIdea): Promise<{ ok: boolean }> {
  // v1 stub. Future: POST to the n8n pipeline via the Flask backend.
  console.log('[ideas/go] triggered:', idea.title, `(${idea.contentType})`, 'channel:', idea.channelTarget)
  return { ok: true }
}
