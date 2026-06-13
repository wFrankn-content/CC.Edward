import { render, screen, waitFor } from '@testing-library/react'
import ScoreboardPage from '@/app/page'

// Mock fetch
const mockBriefing = {
  generatedAt: '2026-04-12T09:00:00Z',
  channels: [{
    id: 'wfrankn',
    name: 'wFrankn',
    handle: '@wFrankn',
    subscriberCount: 48200,
    subscriberDelta: 84,
    totalViews: 2100000,
    recentVideos: [
      { id: 'v1', title: 'Test Video', publishedAt: '2026-04-10', views: 8420, viewsDelta: 1200, watchTimeMinutes: 42000, likes: 340, thumbnailUrl: '' },
    ],
  }],
  hotChannel: 'wfrankn',
  ideas: [],
  trending: [],
}

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => mockBriefing,
})

const mockSetChannel = vi.fn()

vi.mock('@/hooks/useChannel', () => ({
  useChannel: () => ({ channelId: 'wfrankn', setChannel: mockSetChannel }),
}))

describe('ScoreboardPage', () => {
  beforeEach(() => mockSetChannel.mockClear())

  it('renders skeleton cards initially then shows data', async () => {
    render(<ScoreboardPage />)
    await waitFor(() => {
      expect(screen.getByText('wFrankn')).toBeInTheDocument()
    })
    expect(screen.getByText('Test Video')).toBeInTheDocument()
  })

  it('shows subscriber delta as subs stat', async () => {
    render(<ScoreboardPage />)
    await waitFor(() => screen.getByText('wFrankn'))
    expect(screen.getByText('+84')).toBeInTheDocument()
  })
})
