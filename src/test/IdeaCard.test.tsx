import { render, screen, fireEvent } from '@testing-library/react'
import { IdeaCard } from '@/components/IdeaCard'
import type { ContentIdea } from '@/lib/types'

const mockIdea: ContentIdea = {
  id: 'wf-i1a',
  title: 'I Tried Every Game That Blew Up This Week',
  outline: 'Steam charts show 3 breakout titles this week.',
  contentType: 'long',
  channelTarget: 'wfrankn',
}

const mockOnGo = vi.fn()

describe('IdeaCard', () => {
  beforeEach(() => mockOnGo.mockClear())

  it('renders idea title', () => {
    render(<IdeaCard idea={mockIdea} accent="#3b82f6" onGo={mockOnGo} />)
    expect(screen.getByText('I Tried Every Game That Blew Up This Week')).toBeInTheDocument()
  })

  it('renders content type badge', () => {
    render(<IdeaCard idea={mockIdea} accent="#3b82f6" onGo={mockOnGo} />)
    expect(screen.getByText('Long Form')).toBeInTheDocument()
  })

  it('renders the outline text', () => {
    render(<IdeaCard idea={mockIdea} accent="#3b82f6" onGo={mockOnGo} />)
    expect(screen.getByText(/Steam charts show 3 breakout titles/)).toBeInTheDocument()
  })

  it('calls onGo with the idea when Go is tapped', () => {
    render(<IdeaCard idea={mockIdea} accent="#3b82f6" onGo={mockOnGo} />)
    fireEvent.click(screen.getByRole('button', { name: /go/i }))
    expect(mockOnGo).toHaveBeenCalledWith(mockIdea)
  })

  it('renders skeleton when skeleton prop is true', () => {
    const { container } = render(<IdeaCard idea={mockIdea} accent="#3b82f6" onGo={mockOnGo} skeleton />)
    expect(container.querySelector('[data-skeleton]')).toBeInTheDocument()
  })

  it('renders Short badge for short contentType', () => {
    render(<IdeaCard idea={{ ...mockIdea, contentType: 'short' }} accent="#3b82f6" onGo={mockOnGo} />)
    expect(screen.getByText('Short')).toBeInTheDocument()
  })

  it('renders Stream badge for stream contentType', () => {
    render(<IdeaCard idea={{ ...mockIdea, contentType: 'stream' }} accent="#3b82f6" onGo={mockOnGo} />)
    expect(screen.getByText('Stream')).toBeInTheDocument()
  })
})
