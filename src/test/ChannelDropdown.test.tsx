import { render, screen, fireEvent } from '@testing-library/react'
import { ChannelDropdown } from '@/components/ChannelDropdown'

const mockOnChange = vi.fn()

describe('ChannelDropdown', () => {
  beforeEach(() => mockOnChange.mockClear())

  it('renders the active channel name', () => {
    render(<ChannelDropdown channelId="wfrankn" onChange={mockOnChange} />)
    expect(screen.getByText('wFrankn')).toBeInTheDocument()
  })

  it('opens the channel list on click', () => {
    render(<ChannelDropdown channelId="wfrankn" onChange={mockOnChange} />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('TechyFRNK')).toBeInTheDocument()
    expect(screen.getByText('justFRNKNGaming')).toBeInTheDocument()
    expect(screen.getByText('VGFAM')).toBeInTheDocument()
  })

  it('calls onChange with the selected channel id', () => {
    render(<ChannelDropdown channelId="wfrankn" onChange={mockOnChange} />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('VGFAM'))
    expect(mockOnChange).toHaveBeenCalledWith('vgfam')
  })

  it('closes after selection', () => {
    render(<ChannelDropdown channelId="wfrankn" onChange={mockOnChange} />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('VGFAM'))
    expect(screen.queryByText('TechyFRNK')).not.toBeInTheDocument()
  })
})
