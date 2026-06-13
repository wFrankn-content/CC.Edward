import { NextRequest, NextResponse } from 'next/server'
import { getMockBriefing } from '@/lib/mock-data'
import { CHANNELS } from '@/lib/types'

export async function GET(request: NextRequest) {
  const channelId = request.nextUrl.searchParams.get('channel')

  if (channelId) {
    const valid = CHANNELS.some(c => c.id === channelId)
    if (!valid) {
      return NextResponse.json({ error: 'Unknown channel' }, { status: 400 })
    }
  }

  const briefing = getMockBriefing(channelId ?? undefined)
  return NextResponse.json(briefing)
}
