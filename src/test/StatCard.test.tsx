import { render, screen } from '@testing-library/react'
import { StatCard } from '@/components/StatCard'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Views" value="24.1K" accent="#3b82f6" />)
    expect(screen.getByText('Views')).toBeInTheDocument()
    expect(screen.getByText('24.1K')).toBeInTheDocument()
  })

  it('renders skeleton when skeleton prop is true', () => {
    const { container } = render(<StatCard label="Views" value="" accent="#3b82f6" skeleton />)
    expect(container.querySelector('[data-skeleton]')).toBeInTheDocument()
  })

  it('applies accent color to value', () => {
    render(<StatCard label="Views" value="24.1K" accent="#3b82f6" />)
    const value = screen.getByText('24.1K')
    expect(value).toHaveStyle({ color: '#3b82f6' })
  })
})
