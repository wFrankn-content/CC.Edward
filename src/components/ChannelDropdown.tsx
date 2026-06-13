'use client'

import { useState } from 'react'
import { getChannels } from '@/lib/channels'

interface ChannelDropdownProps {
  channelId: string
  onChange: (id: string) => void
}

export function ChannelDropdown({ channelId, onChange }: ChannelDropdownProps) {
  const [open, setOpen] = useState(false)
  const channels = getChannels()
  const active = channels.find(c => c.id === channelId) ?? channels[0]!

  function select(id: string) {
    onChange(id)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold"
        style={{ background: 'var(--surface-elevated)', color: 'var(--text-primary)' }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: active.accent }}
          aria-hidden="true"
        />
        {active.name}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 rounded-lg overflow-hidden z-10 min-w-[180px]"
          style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
        >
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => select(channel.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium hover:bg-black/20"
              style={{ color: channel.id === channelId ? channel.accent : 'var(--text-primary)' }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: channel.accent }}
                aria-hidden="true"
              />
              {channel.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
