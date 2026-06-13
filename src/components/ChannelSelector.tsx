'use client'

import { getChannels } from '@/lib/channels'

interface ChannelSelectorProps {
  channelId: string
  onChange: (id: string) => void
}

// One pill per configured channel, each in its own accent color. Works for any
// number of channels (horizontal scroll on overflow).
export function ChannelSelector({ channelId, onChange }: ChannelSelectorProps) {
  const channels = getChannels()

  return (
    <div role="tablist" className="flex gap-2 overflow-x-auto no-scrollbar">
      {channels.map(channel => {
        const active = channel.id === channelId
        return (
          <button
            key={channel.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(channel.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap flex-shrink-0"
            style={{
              background: active ? `${channel.accent}22` : 'var(--surface-elevated)',
              color: active ? channel.accent : 'var(--text-secondary)',
              border: `1px solid ${active ? channel.accent : 'var(--border)'}`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: channel.accent }}
              aria-hidden="true"
            />
            {channel.name}
          </button>
        )
      })}
    </div>
  )
}
