import { render, screen } from '@testing-library/react'
import { ChannelCard } from '@/components/ChannelCard'
import type { Channel } from '@/lib/types'

const channel: Channel = {
  id: 'main', name: 'Main Channel', handle: '@main',
  subscriberCount: 10000, subscriberDelta: 84, totalViews: 500000,
  recentVideos: [
    { id: 'v1', title: 'A', publishedAt: '', views: 0, viewsDelta: 1200, watchTimeMinutes: 60000, likes: 0, thumbnailUrl: '' },
    { id: 'v2', title: 'B', publishedAt: '', views: 0, viewsDelta: 800, watchTimeMinutes: 30000, likes: 0, thumbnailUrl: '' },
  ],
}

describe('ChannelCard', () => {
  it('renders the 48h metrics', () => {
    render(<ChannelCard channel={channel} loading={false} />)
    expect(screen.getByText('2.0K')).toBeInTheDocument()   // views delta 1200+800
    expect(screen.getByText('+84')).toBeInTheDocument()    // subscriber delta
    expect(screen.getByText('1.5K')).toBeInTheDocument()   // watch hours 90000m -> 1500h
  })

  it('shows skeletons while loading', () => {
    const { container } = render(<ChannelCard channel={null} loading={true} />)
    expect(container.querySelectorAll('[data-skeleton]').length).toBe(3)
  })
})
