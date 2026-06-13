import manifest from '@/app/manifest'

describe('PWA manifest', () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_APP_NAME
    delete process.env.NEXT_PUBLIC_THEME_COLOR
    delete process.env.NEXT_PUBLIC_BASE_PATH
  })

  it('uses default app name and theme color when env is unset', () => {
    const m = manifest()
    expect(m.name).toBe('Edward')
    expect(m.short_name).toBe('Edward')
    expect(m.theme_color).toBe('#0a0a0a')
  })

  it('reads app name and theme color from env config', () => {
    process.env.NEXT_PUBLIC_APP_NAME = 'Command Center'
    process.env.NEXT_PUBLIC_THEME_COLOR = '#123456'
    const m = manifest()
    expect(m.name).toBe('Command Center')
    expect(m.short_name).toBe('Command Center')
    expect(m.theme_color).toBe('#123456')
  })

  it('declares 192 and 512 icons', () => {
    const sizes = manifest().icons?.map(i => i.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')
  })

  it('uses root paths when no basePath is set', () => {
    const m = manifest()
    expect(m.start_url).toBe('/')
    expect(m.icons?.[0]?.src).toBe('/icons/icon-192.png')
  })

  it('prefixes start_url, scope and icons with basePath', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/CC.Edward'
    const m = manifest()
    expect(m.start_url).toBe('/CC.Edward/')
    expect(m.scope).toBe('/CC.Edward/')
    expect(m.icons?.[0]?.src).toBe('/CC.Edward/icons/icon-192.png')
  })
})
