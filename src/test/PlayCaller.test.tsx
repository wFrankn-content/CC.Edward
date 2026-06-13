import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import { PlayCaller } from '@/components/PlayCaller'
import { generateIdeas } from '@/lib/api'
import type { ContentIdea } from '@/lib/types'

const mockIdeas: ContentIdea[] = [
  { id: 'm-i1a', title: 'Idea concept one', outline: 'A placeholder outline.', contentType: 'long', channelTarget: 'main' },
  { id: 'm-i1b', title: 'Idea concept two', outline: 'Another placeholder outline.', contentType: 'short', channelTarget: 'main' },
]

vi.mock('@/lib/api', () => ({
  generateIdeas: vi.fn(async () => mockIdeas),
  goIdea: vi.fn(async () => ({ ok: true })),
}))

vi.mock('@/hooks/useChannel', () => ({
  useChannel: () => ({ channelId: 'main', setChannel: vi.fn() }),
}))

describe('PlayCaller', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders idea titles after loading', async () => {
    render(<PlayCaller />)
    await waitFor(() => screen.getByText('Idea concept one'))
    expect(screen.getByText('Idea concept two')).toBeInTheDocument()
  })

  it('re-fetches ideas when Shuffle is clicked', async () => {
    render(<PlayCaller />)
    await waitFor(() => screen.getByText('Idea concept one'))
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /shuffle/i }))
    })
    expect(generateIdeas).toHaveBeenCalledTimes(2)
  })
})
