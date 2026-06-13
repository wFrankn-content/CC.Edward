interface StatCardProps {
  label: string
  value: string
  accent: string
  skeleton?: boolean
}

export function StatCard({ label, value, accent, skeleton }: StatCardProps) {
  if (skeleton) {
    return (
      <div
        data-skeleton
        className="rounded-lg p-3 animate-pulse"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="h-6 rounded mb-2" style={{ background: 'var(--surface-elevated)' }} />
        <div className="h-3 w-12 rounded" style={{ background: 'var(--surface-elevated)' }} />
      </div>
    )
  }

  return (
    <div
      className="rounded-lg p-3 text-center"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div
        className="text-[22px] font-bold tracking-tight"
        style={{ color: accent, letterSpacing: '-0.02em' }}
      >
        {value}
      </div>
      <div className="text-[11px] mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
    </div>
  )
}
