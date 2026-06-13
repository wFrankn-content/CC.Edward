import type { ContentIdea } from '@/lib/types'

const CONTENT_TYPE_LABELS: Record<ContentIdea['contentType'], string> = {
  long: 'Long Form',
  short: 'Short',
  stream: 'Stream',
}

const CONTENT_TYPE_COLORS: Record<ContentIdea['contentType'], string> = {
  long: '#3b82f6',
  short: '#22c55e',
  stream: '#8b5cf6',
}

interface IdeaCardProps {
  idea: ContentIdea
  accent: string
  onGo: (idea: ContentIdea) => void
  primary?: boolean
  skeleton?: boolean
}

export function IdeaCard({ idea, accent, onGo, primary = false, skeleton }: IdeaCardProps) {
  if (skeleton) {
    return (
      <div
        data-skeleton
        className="rounded-xl p-4 animate-pulse space-y-3"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="h-4 rounded w-16" style={{ background: 'var(--surface-elevated)' }} />
        <div className="h-4 rounded w-3/4" style={{ background: 'var(--surface-elevated)' }} />
        <div className="space-y-1">
          <div className="h-3 rounded" style={{ background: 'var(--surface-elevated)' }} />
          <div className="h-3 rounded w-5/6" style={{ background: 'var(--surface-elevated)' }} />
        </div>
        <div className="h-10 rounded-lg" style={{ background: 'var(--surface-elevated)' }} />
      </div>
    )
  }

  const typeColor = CONTENT_TYPE_COLORS[idea.contentType]
  const typeLabel = CONTENT_TYPE_LABELS[idea.contentType]

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <span
        className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-3"
        style={{ color: typeColor, background: `${typeColor}20` }}
      >
        {typeLabel}
      </span>

      <h3
        className="text-[13px] font-semibold leading-snug mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {idea.title}
      </h3>

      <p
        className="text-[11px] leading-relaxed mb-4"
        style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}
      >
        {idea.outline}
      </p>

      <button
        onClick={() => onGo(idea)}
        aria-label="Go"
        className="w-full rounded-lg py-2.5 text-[13px] font-semibold"
        style={{
          background: primary ? accent : 'var(--surface-elevated)',
          color: primary ? '#fff' : 'var(--text-primary)',
          border: primary ? 'none' : '1px solid var(--border)',
        }}
      >
        Go →
      </button>
    </div>
  )
}
