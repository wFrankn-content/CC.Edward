import { renderHook, act } from '@testing-library/react'
import { useChannel } from '@/hooks/useChannel'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useChannel', () => {
  beforeEach(() => localStorageMock.clear())

  it('returns null as initial state when localStorage is empty', () => {
    const { result } = renderHook(() => useChannel())
    expect(result.current.channelId).toBeNull()
  })

  it('setChannel updates the channel id', () => {
    const { result } = renderHook(() => useChannel())
    act(() => result.current.setChannel('vgfam'))
    expect(result.current.channelId).toBe('vgfam')
  })

  it('persists channel to localStorage', () => {
    const { result } = renderHook(() => useChannel())
    act(() => result.current.setChannel('techyfrankn'))
    expect(localStorageMock.getItem('edward-channel')).toBe('techyfrankn')
  })

  it('reads channel from localStorage on mount', () => {
    localStorageMock.setItem('edward-channel', 'wfrankn')
    const { result } = renderHook(() => useChannel())
    expect(result.current.channelId).toBe('wfrankn')
  })
})
