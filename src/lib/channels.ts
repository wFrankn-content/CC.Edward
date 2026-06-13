// Channel accessors derived from the env-driven config layer (#22). No channel
// data is hardcoded here — it all flows from getConfig().
import { getConfig } from '@/lib/config'
import type { ChannelConfig } from '@/lib/config'

export function getChannels(): ChannelConfig[] {
  return getConfig().channels
}

export function getChannelAccent(channelId: string | null): string {
  const channels = getConfig().channels
  return channels.find(c => c.id === channelId)?.accent ?? channels[0]?.accent ?? '#3b82f6'
}
