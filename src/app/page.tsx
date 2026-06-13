'use client'

import { useState, useEffect } from 'react'
import { useChannel } from '@/hooks/useChannel'
import { ChannelDropdown } from '@/components/ChannelDropdown'
import { StatCard } from '@/components/StatCard'
import { VideoRow } from '@/components/VideoRow'
import { getChannelAccent } from '@/lib/types'
import type { DailyBriefing, Channel } from '@/lib/types'

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

function formatWatchTime(minutes: number): string {
  const hours = Math.round(minutes / 60)
  if (hours >= 1000) return `${(hours / 1000).toFixed(1)}K`
  return `${hours}`
}

export default function ScoreboardPage() {
  const { channelId, setChannel } = useChannel()
  const [channel, setChannelData] = useState<Channel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // channelId is null until localStorage resolves — wait for it
    if (channelId === null) return

    setLoading(true)
    fetch(`/api/briefing?channel=${channelId}`)
      .then(r => r.json())
      .then((data: DailyBriefing) => {
        setChannelData(data.channels[0] ?? null)
        setLoading(false)
      })
  }, [channelId])

  // On first visit (nothing in localStorage), fetch hotChannel from briefing
  useEffect(() => {
    if (channelId !== null) return
    fetch('/api/briefing')
      .then(r => r.json())
      .then((data: DailyBriefing) => {
        setChannel(data.hotChannel)
      })
  }, [channelId, setChannel])

  const accent = getChannelAccent(channelId)
  const views48h = channel?.recentVideos.reduce((sum, v) => sum + v.viewsDelta, 0) ?? 0
  const watchHrs = channel?.recentVideos.reduce((sum, v) => sum + v.watchTimeMinutes, 0) ?? 0
  const subDelta = channel?.subscriberDelta ?? 0

  return (
    <div className="px-4 pt-5 pb-2 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {channelId !== null && (
          <ChannelDropdown channelId={channelId} onChange={setChannel} />
        )}
        <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Last 48h</span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <StatCard
          label="Views"
          value={loading ? '' : formatViews(views48h)}
          accent={accent}
          skeleton={loading}
        />
        <StatCard
          label="Watch hrs"
          value={loading ? '' : formatWatchTime(watchHrs)}
          accent="var(--text-primary)"
          skeleton={loading}
        />
        <StatCard
          label="Subs"
          value={loading ? '' : `${subDelta >= 0 ? '+' : ''}${subDelta}`}
          accent={subDelta >= 0 ? 'var(--accent-green)' : '#ef4444'}
          skeleton={loading}
        />
      </div>

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
