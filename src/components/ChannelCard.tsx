import { StatCard } from '@/components/StatCard'
import type { Channel } from '@/lib/types'

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

function formatWatchTime(minutes: number): string {
  const hours = Math.round(minutes / 60)
  if (hours >= 1000) return `${(hours / 1000).toFixed(1)}K`
  return `${hours}`
}

interface ChannelCardProps {
  channel: Channel | null
  loading: boolean
}

// The selected channel's 48h metric cluster: views, watch hours, subscriber delta.
export function ChannelCard({ channel, loading }: ChannelCardProps) {
  const views48h = channel?.recentVideos.reduce((sum, v) => sum + v.viewsDelta, 0) ?? 0
  const watchHrs = channel?.recentVideos.reduce((sum, v) => sum + v.watchTimeMinutes, 0) ?? 0
  const subDelta = channel?.subscriberDelta ?? 0

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <StatCard
        label="Views"
        value={loading ? '' : formatViews(views48h)}
        accent="var(--channel-accent)"
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
  )
}
