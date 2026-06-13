import { GET } from '@/app/api/briefing/route'
import { NextRequest } from 'next/server'

describe('GET /api/briefing', () => {
  it('returns a DailyBriefing with all 4 channels when no param', async () => {
    const req = new NextRequest('http://localhost/api/briefing')
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.channels).toHaveLength(4)
    expect(data.hotChannel).toBeTruthy()
  })

  it('returns a single channel when channel param is provided', async () => {
    const req = new NextRequest('http://localhost/api/briefing?channel=wfrankn')
    const res = await GET(req)
    const data = await res.json()
    expect(data.channels).toHaveLength(1)
    expect(data.channels[0].id).toBe('wfrankn')
  })

  it('returns 400 for unknown channel id', async () => {
    const req = new NextRequest('http://localhost/api/briefing?channel=unknown')
    const res = await GET(req)
    expect(res.status).toBe(400)
  })
})
