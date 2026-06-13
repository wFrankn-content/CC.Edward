'use client'

import { useState, useEffect, useCallback } from 'react'
import { useChannel } from '@/hooks/useChannel'
import { IdeaCard } from '@/components/IdeaCard'
import { generateIdeas, goIdea } from '@/lib/api'
import type { ContentIdea } from '@/lib/types'

// Screen 2 — content ideas for the active channel, rendered below the scoreboard
// on the same page. Inherits --channel-accent from the page container.
export function PlayCaller() {
  const { channelId } = useChannel()
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [loading, setLoading] = useState(true)

  const fetchIdeas = useCallback(() => {
    if (!channelId) return
    setLoading(true)
    generateIdeas(channelId).then(next => {
      setIdeas(next)
      setLoading(false)
    })
  }, [channelId])

  useEffect(() => { fetchIdeas() }, [fetchIdeas])

  async function handleGo(idea: ContentIdea) {
    await goIdea(idea)
  }

  return (
    <section className="mt-7">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
          Today&apos;s Ideas
        </h2>
        <button
          onClick={fetchIdeas}
          className="text-[12px] font-medium px-3 py-1.5 rounded-lg"
          style={{ background: 'var(--surface-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          aria-label="Shuffle ideas"
        >
          ⟳ Shuffle
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <IdeaCard
                key={i}
                idea={{ id: '', title: '', outline: '', contentType: 'long', channelTarget: '' }}
                accent="var(--channel-accent)"
                onGo={() => {}}
                skeleton
              />
            ))
          : ideas.map((idea, i) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                accent="var(--channel-accent)"
                onGo={handleGo}
                primary={i === 0}
              />
            ))
        }
      </div>
    </section>
  )
}
