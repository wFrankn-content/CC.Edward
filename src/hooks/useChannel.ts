'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'edward-channel'

export function useChannel() {
  // null = not yet resolved from localStorage
  const [channelId, setChannelId] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setChannelId(stored)
    // If nothing stored, Scoreboard will set it from hotChannel on first fetch
  }, [])

  function setChannel(id: string) {
    setChannelId(id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  return { channelId, setChannel }
}
