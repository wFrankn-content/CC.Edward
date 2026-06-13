import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

// #22 de-branding core: no real channel brand names may appear anywhere in src/.
// Real channels are injected at runtime via NEXT_PUBLIC_CHANNELS (.env.local).
const FORBIDDEN = ['wFrankn', 'TechyFRNK', 'justFRNKNGaming', 'VGFAM', '@wFrankn']

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

describe('src/ is brand-free', () => {
  // The guard tests themselves necessarily name the forbidden strings.
  const GUARD_FILES = ['brand-free.test.ts', 'types-no-hardcode.test.ts']
  const files = walk(resolve(process.cwd(), 'src'))
    .filter(f => /\.(ts|tsx|css)$/.test(f))
    .filter(f => !GUARD_FILES.some(g => f.endsWith(g)))

  it('contains no real channel brand strings', () => {
    const offenders: string[] = []
    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      for (const brand of FORBIDDEN) {
        if (source.includes(brand)) offenders.push(`${file}: ${brand}`)
      }
    }
    expect(offenders).toEqual([])
  })
})
