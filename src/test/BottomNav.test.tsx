import { render, screen } from '@testing-library/react'
import { BottomNav } from '@/components/BottomNav'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('BottomNav', () => {
  it('renders home and ideas links', () => {
    render(<BottomNav />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ideas/i })).toBeInTheDocument()
  })

  it('marks the home link as active on /', () => {
    render(<BottomNav />)
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })
})
