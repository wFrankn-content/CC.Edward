import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// #21: the domain types file must contain only interfaces — no hardcoded channel
// names, handles, or colors. Channel data lives in src/lib/channels.ts.
describe('types.ts is brand-free', () => {
  const source = readFileSync(resolve(process.cwd(), 'src/lib/types.ts'), 'utf8')

  it('does not hardcode channel brand names or handles', () => {
    for (const brand of ['wFrankn', 'TechyFRNK', 'justFRNKNGaming', 'VGFAM']) {
      expect(source).not.toContain(brand)
    }
  })

  it('does not export a CHANNELS constant or accent helper', () => {
    expect(source).not.toMatch(/export const CHANNELS/)
    expect(source).not.toMatch(/getChannelAccent/)
  })
})
