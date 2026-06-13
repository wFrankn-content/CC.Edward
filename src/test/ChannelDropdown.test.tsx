import { render, screen, fireEvent } from '@testing-library/react'
import { ChannelDropdown } from '@/components/ChannelDropdown'

const mockOnChange = vi.fn()

describe('ChannelDropdown', () => {
  beforeEach(() => mockOnChange.mockClear())

  it('renders the active channel name', () => {
    render(<ChannelDropdown channelId="main" onChange={mockOnChange} />)
    expect(screen.getByText('Main Channel')).toBeInTheDocument()
  })

  it('opens the channel list on click', () => {
    render(<ChannelDropdown channelId="main" onChange={mockOnChange} />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Tech Channel')).toBeInTheDocument()
    expect(screen.getByText('Gaming Channel')).toBeInTheDocument()
    expect(screen.getByText('Family Channel')).toBeInTheDocument()
  })

  it('calls onChange with the selected channel id', () => {
    render(<ChannelDropdown channelId="main" onChange={mockOnChange} />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Family Channel'))
    expect(mockOnChange).toHaveBeenCalledWith('family')
  })

  it('closes after selection', () => {
    render(<ChannelDropdown channelId="main" onChange={mockOnChange} />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Family Channel'))
    expect(screen.queryByText('Tech Channel')).not.toBeInTheDocument()
  })
})
