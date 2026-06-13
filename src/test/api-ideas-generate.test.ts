import { GET } from '@/app/api/ideas/generate/route'
import { NextRequest } from 'next/server'

describe('GET /api/ideas/generate', () => {
  it('returns 3 ContentIdeas for a valid channel', async () => {
    const req = new NextRequest('http://localhost/api/ideas/generate?channel=wfrankn')
    const res = await GET(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.ideas).toHaveLength(3)
    data.ideas.forEach((idea: { channelTarget: string; contentType: string }) => {
      expect(idea.channelTarget).toBe('wfrankn')
      expect(['short', 'long', 'stream']).toContain(idea.contentType)
    })
  })

  it('returns 400 when channel param is missing', async () => {
    const req = new NextRequest('http://localhost/api/ideas/generate')
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns different idea sets on subsequent calls (randomised)', async () => {
    // Run 10 times — expect at least 2 distinct sets (probability of all same: (1/3)^9 ≈ 0.005%)
    const req = () => new NextRequest('http://localhost/api/ideas/generate?channel=wfrankn')
    const results = await Promise.all(Array.from({ length: 10 }, () => GET(req())))
    const ids = await Promise.all(results.map(async r => {
      const d = await r.json()
      return d.ideas[0].id as string
    }))
    const unique = new Set(ids)
    expect(unique.size).toBeGreaterThan(1)
  })
})
