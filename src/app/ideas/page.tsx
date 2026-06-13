'use client'

import { useState, useEffect, useCallback } from 'react'
import { useChannel } from '@/hooks/useChannel'
import { IdeaCard } from '@/components/IdeaCard'
import { getChannelAccent } from '@/lib/channels'
import { generateIdeas, goIdea } from '@/lib/api'
import type { ContentIdea } from '@/lib/types'

export default function PlayCallerPage() {
  const { channelId } = useChannel()
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [loading, setLoading] = useState(true)

  const fetchIdeas = useCallback(() => {
    if (!channelId) return
    setLoading(true)
    generateIdeas(channelId).then(ideas => {
      setIdeas(ideas)
      setLoading(false)
    })
  }, [channelId])

  useEffect(() => { fetchIdeas() }, [fetchIdeas])

  async function handleGo(idea: ContentIdea) {
    await goIdea(idea)
  }

  const accent = getChannelAccent(channelId)

  return (
    <div className="px-4 pt-5 pb-2 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
          Today&apos;s Ideas
        </h1>
        <button
          onClick={fetchIdeas}
          className="text-[12px] font-medium px-3 py-1.5 rounded-lg"
          style={{ background: 'var(--surface-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          aria-label="Shuffle ideas"
        >
          ⟳ Shuffle
        </button>
      </div>

      {/* Idea cards */}
      <div className="flex flex-col gap-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <IdeaCard
                key={i}
                idea={{ id: '', title: '', outline: '', contentType: 'long', channelTarget: '' }}
                accent={accent}
                onGo={() => {}}
                skeleton
              />
            ))
          : ideas.map((idea, i) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                accent={accent}
                onGo={handleGo}
                primary={i === 0}
              />
            ))
        }
      </div>
    </div>
  )
}
