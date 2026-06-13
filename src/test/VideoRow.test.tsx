import { render, screen } from '@testing-library/react'
import { VideoRow } from '@/components/VideoRow'
import type { Video } from '@/lib/types'

const mockVideo: Video = {
  id: 'v1',
  title: 'I Played This Game For 100 Hours',
  publishedAt: '2026-04-10',
  views: 8420,
  viewsDelta: 1200,
  watchTimeMinutes: 42000,
  likes: 340,
  thumbnailUrl: '',
}

describe('VideoRow', () => {
  it('renders video title', () => {
    render(<VideoRow video={mockVideo} />)
    expect(screen.getByText('I Played This Game For 100 Hours')).toBeInTheDocument()
  })

  it('renders view count', () => {
    render(<VideoRow video={mockVideo} />)
    expect(screen.getByText(/8,420/)).toBeInTheDocument()
  })

  it('shows up arrow for positive viewsDelta', () => {
    render(<VideoRow video={mockVideo} />)
    expect(screen.getByText('↑')).toBeInTheDocument()
  })

  it('shows flat arrow for zero viewsDelta', () => {
    render(<VideoRow video={{ ...mockVideo, viewsDelta: 0 }} />)
    expect(screen.getByText('→')).toBeInTheDocument()
  })

  it('shows down arrow for negative viewsDelta', () => {
    render(<VideoRow video={{ ...mockVideo, viewsDelta: -100 }} />)
    expect(screen.getByText('↓')).toBeInTheDocument()
  })

  it('renders skeleton when skeleton prop is true', () => {
    const { container } = render(<VideoRow video={mockVideo} skeleton />)
    expect(container.querySelector('[data-skeleton]')).toBeInTheDocument()
  })
})
