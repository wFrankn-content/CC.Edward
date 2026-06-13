import type { Channel, ContentIdea, DailyBriefing } from '@/lib/types'

const mockVideos: Record<string, Channel['recentVideos']> = {
  wfrankn: [
    { id: 'wf-v1', title: 'I Played This Game For 100 Hours', publishedAt: '2026-04-10', views: 8420, viewsDelta: 1200, watchTimeMinutes: 42000, likes: 340, thumbnailUrl: '' },
    { id: 'wf-v2', title: 'Steam\'s Most Played Games Right Now', publishedAt: '2026-04-08', views: 5210, viewsDelta: 890, watchTimeMinutes: 26000, likes: 210, thumbnailUrl: '' },
    { id: 'wf-v3', title: 'Why Everyone Is Playing Palworld Again', publishedAt: '2026-04-06', views: 3890, viewsDelta: 0, watchTimeMinutes: 18000, likes: 155, thumbnailUrl: '' },
  ],
  techyfrankn: [
    { id: 'tf-v1', title: 'Best Budget GPU in 2026', publishedAt: '2026-04-11', views: 12300, viewsDelta: 2100, watchTimeMinutes: 61000, likes: 510, thumbnailUrl: '' },
    { id: 'tf-v2', title: 'I Built a $400 Gaming PC', publishedAt: '2026-04-09', views: 9800, viewsDelta: 750, watchTimeMinutes: 49000, likes: 420, thumbnailUrl: '' },
    { id: 'tf-v3', title: 'Stop Buying These Keyboards', publishedAt: '2026-04-07', views: 6200, viewsDelta: -200, watchTimeMinutes: 28000, likes: 270, thumbnailUrl: '' },
  ],
  justfrankngaming: [
    { id: 'jg-v1', title: 'Ranking Every Souls Game', publishedAt: '2026-04-10', views: 15600, viewsDelta: 3400, watchTimeMinutes: 93000, likes: 720, thumbnailUrl: '' },
    { id: 'jg-v2', title: '100% Completing Elden Ring DLC', publishedAt: '2026-04-08', views: 11200, viewsDelta: 1800, watchTimeMinutes: 78000, likes: 560, thumbnailUrl: '' },
    { id: 'jg-v3', title: 'Is Baldur\'s Gate 3 Still Worth It?', publishedAt: '2026-04-06', views: 7400, viewsDelta: 100, watchTimeMinutes: 44000, likes: 310, thumbnailUrl: '' },
  ],
  vgfam: [
    { id: 'vg-v1', title: 'Family Plays Minecraft For The First Time', publishedAt: '2026-04-11', views: 4300, viewsDelta: 900, watchTimeMinutes: 24000, likes: 280, thumbnailUrl: '' },
    { id: 'vg-v2', title: 'We Beat Mario Together', publishedAt: '2026-04-09', views: 3100, viewsDelta: 420, watchTimeMinutes: 17000, likes: 190, thumbnailUrl: '' },
    { id: 'vg-v3', title: 'Best Co-op Games For Families', publishedAt: '2026-04-07', views: 2800, viewsDelta: 50, watchTimeMinutes: 14000, likes: 160, thumbnailUrl: '' },
  ],
}

const mockChannels: Channel[] = [
  { id: 'wfrankn',          name: 'wFrankn',          handle: '@wFrankn',          subscriberCount: 48200, subscriberDelta: 84,  totalViews: 2100000, recentVideos: mockVideos['wfrankn']! },
  { id: 'techyfrankn',      name: 'TechyFRNK',        handle: '@TechyFRNK',        subscriberCount: 31500, subscriberDelta: 112, totalViews: 1400000, recentVideos: mockVideos['techyfrankn']! },
  { id: 'justfrankngaming', name: 'justFRNKNGaming',  handle: '@justFRNKNGaming',  subscriberCount: 72100, subscriberDelta: 230, totalViews: 3800000, recentVideos: mockVideos['justfrankngaming']! },
  { id: 'vgfam',            name: 'VGFAM',            handle: '@VGFAM',            subscriberCount: 18900, subscriberDelta: 45,  totalViews: 820000,  recentVideos: mockVideos['vgfam']! },
]

const mockIdeas: Record<string, ContentIdea[][]> = {
  wfrankn: [
    [
      { id: 'wf-i1a', title: 'I Tried Every Game That Blew Up This Week', outline: 'Steam charts show 3 breakout titles this week. This video tests all of them in one session — what\'s worth your time and what\'s just hype.', contentType: 'long', channelTarget: 'wfrankn', trendSource: 'steam_trending' },
      { id: 'wf-i1b', title: 'Palworld Is Back — Here\'s Why', outline: 'Trending searches show a Palworld spike. Quick reaction video on what brought players back and whether it\'s worth revisiting.', contentType: 'short', channelTarget: 'wfrankn', trendSource: 'google_trends' },
      { id: 'wf-i1c', title: 'Live Ranking Every Game in My Library', outline: 'Community engagement stream ranking your entire backlog live with chat votes. High-interaction format that performs well for your channel.', contentType: 'stream', channelTarget: 'wfrankn' },
    ],
    [
      { id: 'wf-i2a', title: 'The Most Played Game Nobody Is Talking About', outline: 'A deep cut from the Steam most-played chart that has 200k concurrent players but zero coverage. First-look format.', contentType: 'long', channelTarget: 'wfrankn', trendSource: 'steam_most_played' },
      { id: 'wf-i2b', title: 'I Spent $20 on Steam — Was It Worth It?', outline: 'Budget gaming series. Pick 4 games under $5 each from trending, play each for 30 min, rate them live.', contentType: 'short', channelTarget: 'wfrankn' },
      { id: 'wf-i2c', title: 'What Game Should I Cover Next? (Poll Stream)', outline: 'Audience-driven stream where chat votes determine the next video topic. High retention, easy to produce.', contentType: 'stream', channelTarget: 'wfrankn' },
    ],
    [
      { id: 'wf-i3a', title: 'Games That Are Trending But Aren\'t Worth It', outline: 'Counter-programming to hype videos. Honest takes on 3 trending games that don\'t live up to the Steam reviews.', contentType: 'long', channelTarget: 'wfrankn', trendSource: 'steam_trending' },
      { id: 'wf-i3b', title: 'One Hour With The #1 Most Played Game', outline: 'Simple format: boot the top game on Steam Most Played right now, play for 60 min, give a verdict.', contentType: 'short', channelTarget: 'wfrankn', trendSource: 'steam_most_played' },
      { id: 'wf-i3c', title: 'First Impressions Marathon — 5 Games, 5 Hours', outline: 'Long-form stream covering 5 new releases in one session. Variety keeps the audience engaged.', contentType: 'stream', channelTarget: 'wfrankn' },
    ],
  ],
  techyfrankn: [
    [
      { id: 'tf-i1a', title: 'Best GPU Under $300 in 2026', outline: 'GPU prices shifted again. Comprehensive benchmark of the top 3 budget options — raw fps, thermals, noise. Clear winner declared.', contentType: 'long', channelTarget: 'techyfrankn' },
      { id: 'tf-i1b', title: 'The GPU Everyone Is Buying Right Now', outline: 'Trending search: "best gpu 2026". Short answer video targeting that exact query — 90 seconds, one recommendation.', contentType: 'short', channelTarget: 'techyfrankn', trendSource: 'google_trends' },
      { id: 'tf-i1c', title: 'PC Build Help Stream — Your Questions Live', outline: 'Open stream where viewers submit their planned builds for live review and feedback. High engagement, community-driven.', contentType: 'stream', channelTarget: 'techyfrankn' },
    ],
    [
      { id: 'tf-i2a', title: '$500 Gaming PC Build Guide (April 2026)', outline: 'Updated budget build guide with current prices. Every component linked, benchmarks shown, no fluff.', contentType: 'long', channelTarget: 'techyfrankn' },
      { id: 'tf-i2b', title: 'Don\'t Buy This Before Watching', outline: 'Three products trending on Amazon tech charts that have misleading specs. Short warning video format.', contentType: 'short', channelTarget: 'techyfrankn' },
      { id: 'tf-i2c', title: 'Upgrade Advice Stream — Is It Worth It?', outline: 'Viewers submit their current specs for live upgrade recommendations. Helps the audience without requiring production.', contentType: 'stream', channelTarget: 'techyfrankn' },
    ],
    [
      { id: 'tf-i3a', title: 'I Tested 6 Mechanical Keyboards Under $80', outline: 'Keyboard category is heavily searched. Tested for typing feel, build quality, software. One clear pick per use case.', contentType: 'long', channelTarget: 'techyfrankn' },
      { id: 'tf-i3b', title: 'Is This Monitor Worth The Hype?', outline: 'One trending monitor, one honest take. Targets search traffic on the specific model name.', contentType: 'short', channelTarget: 'techyfrankn' },
      { id: 'tf-i3c', title: 'Battlestation Rating Stream', outline: 'Viewers submit their desk setups for live ratings and improvement suggestions. Popular format for tech channels.', contentType: 'stream', channelTarget: 'techyfrankn' },
    ],
  ],
  justfrankngaming: [
    [
      { id: 'jg-i1a', title: 'Every Soulslike Ranked — The Definitive List', outline: 'The souls genre is at peak saturation. Comprehensive ranking of every notable entry with criteria explained. Designed for long watch time.', contentType: 'long', channelTarget: 'justfrankngaming' },
      { id: 'jg-i1b', title: 'The Hardest Boss I\'ve Ever Fought', outline: 'Short punchy clip-format video targeting "hardest boss" search queries. High shareability.', contentType: 'short', channelTarget: 'justfrankngaming' },
      { id: 'jg-i1c', title: 'Challenge Run Stream — No Healing Allowed', outline: 'Constraint-based stream that creates natural drama and clip moments. Chat can vote on penalties.', contentType: 'stream', channelTarget: 'justfrankngaming' },
    ],
    [
      { id: 'jg-i2a', title: 'I Played Every Game Nominated for GOTY', outline: 'Awards season angle. All nominees covered, honest verdicts, final pick. Long-form format with strong search traffic.', contentType: 'long', channelTarget: 'justfrankngaming' },
      { id: 'jg-i2b', title: 'Games That Deserve a Second Chance', outline: 'Trending "hidden gems" searches. 3 underrated games from the last year that missed attention at launch.', contentType: 'short', channelTarget: 'justfrankngaming' },
      { id: 'jg-i2c', title: '24-Hour Gaming Marathon for Charity', outline: 'Long endurance stream. High-value for community building and clip generation.', contentType: 'stream', channelTarget: 'justfrankngaming' },
    ],
    [
      { id: 'jg-i3a', title: 'The Best RPG of the Decade (So Far)', outline: 'Definitive take on RPG of the decade — structured argument, multiple candidates considered, clear conclusion.', contentType: 'long', channelTarget: 'justfrankngaming' },
      { id: 'jg-i3b', title: 'This DLC Was Worth Every Penny', outline: 'Short review targeting trending DLC search queries. Strong opinion, 3 minutes max.', contentType: 'short', channelTarget: 'justfrankngaming' },
      { id: 'jg-i3c', title: 'Viewer vs Creator — You Pick My Restrictions', outline: 'Chat-controlled challenge stream. Viewers vote on game rules in real-time.', contentType: 'stream', channelTarget: 'justfrankngaming' },
    ],
  ],
  vgfam: [
    [
      { id: 'vg-i1a', title: 'Best Family Co-Op Games of 2026', outline: 'Evergreen list format. Tested each game with kids at different ages. Clear age recommendations for each pick.', contentType: 'long', channelTarget: 'vgfam' },
      { id: 'vg-i1b', title: 'This Game Surprised Our Whole Family', outline: 'Short reaction format. One game, unexpected positive response from the whole family. Authentic, easy to film.', contentType: 'short', channelTarget: 'vgfam' },
      { id: 'vg-i1c', title: 'Family Game Night Stream — Join Us Live', outline: 'Live family gaming session. Audience watches and participates via chat suggestions.', contentType: 'stream', channelTarget: 'vgfam' },
    ],
    [
      { id: 'vg-i2a', title: 'We Tried Every Nintendo Switch Family Game', outline: 'Comprehensive Switch family game review. Parents\' and kids\' perspectives included. High search volume category.', contentType: 'long', channelTarget: 'vgfam' },
      { id: 'vg-i2b', title: 'The Game That Finally Got Dad Hooked', outline: 'Personal story format. High emotional resonance, strong shareability with parents.', contentType: 'short', channelTarget: 'vgfam' },
      { id: 'vg-i2c', title: 'Couch Co-Op Saturday — Playing With Viewers', outline: 'Invite viewers to play online co-op with the family. Community building stream.', contentType: 'stream', channelTarget: 'vgfam' },
    ],
    [
      { id: 'vg-i3a', title: 'Games That Teach Kids Without Feeling Educational', outline: 'Parent-focused angle. Review of games with learning value that kids actually want to play.', contentType: 'long', channelTarget: 'vgfam' },
      { id: 'vg-i3b', title: 'Our Honest Review of [Trending Family Game]', outline: 'Targets the trending family game search query. Family perspective differentiates it from typical reviews.', contentType: 'short', channelTarget: 'vgfam', trendSource: 'google_trends' },
      { id: 'vg-i3c', title: 'Can We Beat This Together? Family Challenge Stream', outline: 'Difficult game played cooperatively by the whole family. Natural drama, good clip moments.', contentType: 'stream', channelTarget: 'vgfam' },
    ],
  ],
}

export function getMockBriefing(channelId?: string): DailyBriefing {
  const channels = channelId
    ? mockChannels.filter(c => c.id === channelId)
    : mockChannels

  return {
    generatedAt: new Date().toISOString(),
    channels,
    hotChannel: 'justfrankngaming',
    ideas: mockIdeas['wfrankn']?.[0] ?? [],
    trending: [
      { name: 'Palworld', source: 'steam_most_played', metric: '180,000 players' },
      { name: 'Elden Ring DLC', source: 'google_trends', metric: 'breakout' },
      { name: 'Manor Lords', source: 'steam_trending', metric: 'New & Trending #1' },
    ],
  }
}

export function getMockIdeas(channelId: string, rotation: number): ContentIdea[] {
  const sets = mockIdeas[channelId]
  if (!sets || sets.length === 0) return []
  return sets[rotation % sets.length] ?? []
}
