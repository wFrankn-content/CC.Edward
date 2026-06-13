import type { Video } from '@/lib/types'

interface VideoRowProps {
  video: Video
  skeleton?: boolean
}

function TrendArrow({ delta }: { delta: number }) {
  if (delta > 0) return <span style={{ color: 'var(--accent-green)' }}>↑</span>
  if (delta < 0) return <span style={{ color: '#ef4444' }}>↓</span>
  return <span style={{ color: 'var(--text-secondary)' }}>→</span>
}

export function VideoRow({ video, skeleton }: VideoRowProps) {
  if (skeleton) {
    return (
      <div
        data-skeleton
        className="rounded-lg p-3 flex items-center gap-3 animate-pulse"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="w-9 h-6 rounded flex-shrink-0" style={{ background: 'var(--surface-elevated)' }} />
        <div className="flex-1 space-y-1">
          <div className="h-3 rounded w-3/4" style={{ background: 'var(--surface-elevated)' }} />
          <div className="h-2 rounded w-1/4" style={{ background: 'var(--surface-elevated)' }} />
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-lg p-3 flex items-center gap-3"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div
        className="w-9 h-6 rounded flex-shrink-0"
        style={{ background: 'var(--surface-elevated)' }}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <div
          className="text-[11px] font-medium truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {video.title}
        </div>
        <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          {video.views.toLocaleString()} views
        </div>
      </div>
      <TrendArrow delta={video.viewsDelta} />
    </div>
  )
}
