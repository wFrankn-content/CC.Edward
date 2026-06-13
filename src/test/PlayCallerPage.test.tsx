import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import PlayCallerPage from '@/app/ideas/page'
import { generateIdeas } from '@/lib/api'
import type { ContentIdea } from '@/lib/types'

const mockIdeas: ContentIdea[] = [
  { id: 'wf-i1a', title: 'I Tried Every Game That Blew Up This Week', outline: 'Steam charts show 3 breakout titles.', contentType: 'long', channelTarget: 'wfrankn' },
  { id: 'wf-i1b', title: 'Palworld Is Back', outline: 'Trending searches show a Palworld spike.', contentType: 'short', channelTarget: 'wfrankn' },
]

vi.mock('@/lib/api', () => ({
  generateIdeas: vi.fn(async () => mockIdeas),
  goIdea: vi.fn(async () => ({ ok: true })),
}))

vi.mock('@/hooks/useChannel', () => ({
  useChannel: () => ({ channelId: 'wfrankn', setChannel: vi.fn() }),
}))

describe('PlayCallerPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders idea titles after loading', async () => {
    render(<PlayCallerPage />)
    await waitFor(() => screen.getByText('I Tried Every Game That Blew Up This Week'))
    expect(screen.getByText('Palworld Is Back')).toBeInTheDocument()
  })

  it('re-fetches ideas when Shuffle is clicked', async () => {
    render(<PlayCallerPage />)
    await waitFor(() => screen.getByText('I Tried Every Game That Blew Up This Week'))
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /shuffle/i }))
    })
    expect(generateIdeas).toHaveBeenCalledTimes(2)
  })
})
