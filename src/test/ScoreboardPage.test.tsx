import { render, screen, waitFor } from '@testing-library/react'
import ScoreboardPage from '@/app/page'

const mockBriefing = {
  generatedAt: '2026-04-12T09:00:00Z',
  channels: [{
    id: 'main',
    name: 'Main Channel',
    handle: '@main',
    subscriberCount: 48200,
    subscriberDelta: 84,
    totalViews: 2100000,
    recentVideos: [
      { id: 'v1', title: 'Test Video', publishedAt: '2026-04-10', views: 8420, viewsDelta: 1200, watchTimeMinutes: 42000, likes: 340, thumbnailUrl: '' },
    ],
  }],
  hotChannel: 'main',
  ideas: [],
  trending: [],
}

vi.mock('@/lib/api', () => ({
  getBriefing: vi.fn(async () => mockBriefing),
  generateIdeas: vi.fn(async () => []),
  goIdea: vi.fn(async () => ({ ok: true })),
}))

const mockSetChannel = vi.fn()

vi.mock('@/hooks/useChannel', () => ({
  useChannel: () => ({ channelId: 'main', setChannel: mockSetChannel }),
}))

describe('ScoreboardPage', () => {
  beforeEach(() => mockSetChannel.mockClear())

  it('renders skeleton cards initially then shows data', async () => {
    render(<ScoreboardPage />)
    await waitFor(() => {
      expect(screen.getByText('Main Channel')).toBeInTheDocument()
    })
    expect(screen.getByText('Test Video')).toBeInTheDocument()
  })

  it('shows subscriber delta as subs stat', async () => {
    render(<ScoreboardPage />)
    await waitFor(() => screen.getByText('Main Channel'))
    expect(screen.getByText('+84')).toBeInTheDocument()
  })

  it('exposes the active channel accent as a --channel-accent CSS variable', async () => {
    render(<ScoreboardPage />)
    await waitFor(() => screen.getByText('Main Channel'))
    const root = screen.getByTestId('scoreboard-root')
    expect(root.style.getPropertyValue('--channel-accent')).toBe('#3b82f6')
  })
})
