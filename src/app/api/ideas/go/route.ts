import { NextRequest, NextResponse } from 'next/server'
import type { ContentIdea } from '@/lib/types'

export async function POST(request: NextRequest) {
  let body: { idea?: ContentIdea }
  try {
    body = await request.json() as { idea?: ContentIdea }
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }

  if (!body.idea) {
    return NextResponse.json({ error: 'idea required' }, { status: 400 })
  }

  // v1 stub — logs to console. Future: POST to n8n webhook.
  console.log('[ideas/go] triggered:', body.idea.title, `(${body.idea.contentType})`, 'channel:', body.idea.channelTarget)

  return NextResponse.json({ ok: true })
}
