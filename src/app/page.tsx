'use client'

import { useState, useEffect } from 'react'
import { useChannel } from '@/hooks/useChannel'
import { ChannelSelector } from '@/components/ChannelSelector'
import { ChannelCard } from '@/components/ChannelCard'
import { VideoRow } from '@/components/VideoRow'
import { getChannelAccent } from '@/lib/channels'
import { getBriefing } from '@/lib/api'
import type { Channel } from '@/lib/types'

export default function ScoreboardPage() {
  const { channelId, setChannel } = useChannel()
  const [channel, setChannelData] = useState<Channel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // channelId is null until localStorage resolves — wait for it
    if (channelId === null) return

    setLoading(true)
    getBriefing(channelId).then(data => {
      setChannelData(data.channels[0] ?? null)
      setLoading(false)
    })
  }, [channelId])

  // On first visit (nothing in localStorage), resolve the hot channel
  useEffect(() => {
    if (channelId !== null) return
    getBriefing().then(data => {
      setChannel(data.hotChannel)
    })
  }, [channelId, setChannel])

  const accent = getChannelAccent(channelId)

  return (
    <div
      data-testid="scoreboard-root"
      className="px-4 pt-5 pb-2 max-w-lg mx-auto"
      style={{ '--channel-accent': accent } as React.CSSProperties}
    >
      {/* Header */}
      {channelId !== null && (
        <div className="mb-3">
          <ChannelSelector channelId={channelId} onChange={setChannel} />
        </div>
      )}
      <div className="flex items-center justify-end mb-3">
        <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Last 48h</span>
      </div>

      {/* Stat cards */}
      <ChannelCard channel={channel} loading={loading} />

      {/* Top videos */}
      <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
        Top Videos
      </p>
      <div className="flex flex-col gap-2">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <VideoRow key={i} video={{ id: '', title: '', publishedAt: '', views: 0, viewsDelta: 0, watchTimeMinutes: 0, likes: 0, thumbnailUrl: '' }} skeleton />
            ))
          : (channel?.recentVideos ?? []).slice(0, 3).map(video => (
              <VideoRow key={video.id} video={video} />
            ))
        }
      </div>
    </div>
  )
}
