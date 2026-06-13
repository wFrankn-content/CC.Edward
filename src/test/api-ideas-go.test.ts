import { POST } from '@/app/api/ideas/go/route'
import { NextRequest } from 'next/server'

describe('POST /api/ideas/go', () => {
  it('returns ok:true for a valid idea payload', async () => {
    const req = new NextRequest('http://localhost/api/ideas/go', {
      method: 'POST',
      body: JSON.stringify({
        idea: {
          id: 'wf-i1a',
          title: 'Test Idea',
          outline: 'An outline.',
          contentType: 'short',
          channelTarget: 'wfrankn',
        },
      }),
    })
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.ok).toBe(true)
  })

  it('returns 400 when body is missing idea', async () => {
    const req = new NextRequest('http://localhost/api/ideas/go', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
