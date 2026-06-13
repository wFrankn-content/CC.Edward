import { render, screen, fireEvent } from '@testing-library/react'
import { ChannelSelector } from '@/components/ChannelSelector'
import { getChannels } from '@/lib/channels'

const onChange = vi.fn()

describe('ChannelSelector', () => {
  beforeEach(() => onChange.mockClear())

  it('renders one pill per configured channel', () => {
    render(<ChannelSelector channelId="main" onChange={onChange} />)
    expect(screen.getAllByRole('tab')).toHaveLength(getChannels().length)
  })

  it('marks the active channel pill as selected', () => {
    render(<ChannelSelector channelId="tech" onChange={onChange} />)
    expect(screen.getByText('Tech Channel').closest('[role="tab"]'))
      .toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Main Channel').closest('[role="tab"]'))
      .toHaveAttribute('aria-selected', 'false')
  })

  it('calls onChange with the selected channel id', () => {
    render(<ChannelSelector channelId="main" onChange={onChange} />)
    fireEvent.click(screen.getByText('Family Channel'))
    expect(onChange).toHaveBeenCalledWith('family')
  })
})
