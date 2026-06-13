import { NextRequest, NextResponse } from 'next/server'
import { getMockIdeas } from '@/lib/mock-data'
import { CHANNELS } from '@/lib/types'

export async function GET(request: NextRequest) {
  const channelId = request.nextUrl.searchParams.get('channel')

  if (!channelId) {
    return NextResponse.json({ error: 'channel param required' }, { status: 400 })
  }

  const valid = CHANNELS.some(c => c.id === channelId)
  if (!valid) {
    return NextResponse.json({ error: 'Unknown channel' }, { status: 400 })
  }

  const rotation = Math.floor(Math.random() * 3)
  const ideas = getMockIdeas(channelId, rotation)
  return NextResponse.json({ ideas })
}
