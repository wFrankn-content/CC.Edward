// Channel data. v1 keeps this hardcoded; #22 replaces the contents with an
// env-driven config layer (getConfig) so the repo carries no real brand data.
export const CHANNELS = [
  { id: 'wfrankn',          name: 'wFrankn',           handle: '@wFrankn',           accent: '#3b82f6' },
  { id: 'techyfrankn',      name: 'TechyFRNK',         handle: '@TechyFRNK',         accent: '#8b5cf6' },
  { id: 'justfrankngaming', name: 'justFRNKNGaming',   handle: '@justFRNKNGaming',   accent: '#22c55e' },
  { id: 'vgfam',            name: 'VGFAM',             handle: '@VGFAM',             accent: '#f59e0b' },
] as const

export type ChannelId = typeof CHANNELS[number]['id']

export function getChannelAccent(channelId: string | null): string {
  return CHANNELS.find(c => c.id === channelId)?.accent ?? '#3b82f6'
}
