import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { useIsMobile } from '../hooks/useIsMobile'

interface GearRow {
  id: number
  name: string
  brand: string
  model_year: number | null
  category: string
  color: string | null
  description: string | null
  image_url: string | null
  price: number | null
  weight_g: number | null
  specs: Record<string, unknown>
  display_order: number
}

async function fetchGears(): Promise<GearRow[]> {
  const { data, error } = await supabase
    .from('gears')
    .select('*')
    .eq('published', true)
    .order('display_order')

  if (error) throw error
  return data ?? []
}

function resolveImageUrl(filename: string | null): string | undefined {
  if (!filename) return undefined
  const { data } = supabase.storage.from('gears').getPublicUrl(filename)
  return data.publicUrl
}

export const Route = createFileRoute('/gears')({
  loader: fetchGears,
  staleTime: 60_000,
  component: GearsPage,
})

const BR = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  soft: 'var(--br-soft)',
  font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
}

const WISHLIST = [
  'SHIMANO 105 SET',
  'BIANCHI SPRINT FRAME',
]

function SpecsTable({ specs, compact = false }: { specs: Record<string, unknown>; compact?: boolean }) {
  const entries = Object.entries(specs)
  if (entries.length === 0) return null
  return (
    <div style={{ border: `${compact ? 2 : 2.5}px solid ${BR.ink}` }}>
      {entries.map(([k, v], j) => (
        <div key={j} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderBottom: j < entries.length - 1 ? `1.5px solid ${BR.ink}` : 'none',
        }}>
          <div style={{ padding: compact ? '6px 10px' : '6px 12px', borderRight: `1.5px solid ${BR.ink}`, fontSize: 10, letterSpacing: '0.1em' }}>
            {k}
          </div>
          <div style={{ padding: compact ? '6px 10px' : '6px 12px', fontSize: compact ? 11 : 12, fontWeight: 700 }}>
            {String(v)}
          </div>
        </div>
      ))}
    </div>
  )
}

function HeroGear({ gear }: { gear: GearRow }) {
  const imageUrl = resolveImageUrl(gear.image_url)
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1.25fr 1fr',
      borderBottom: `3px solid ${BR.ink}`, flexShrink: 0,
    }} className="hero-gear">
      <div style={{
        borderRight: `3px solid ${BR.ink}`, position: 'relative',
        background: BR.bg, minHeight: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {imageUrl ? (
          <img src={imageUrl} alt={gear.name} style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }} />
        ) : (
          <div style={{ background: BR.bg, border: `3px solid ${BR.ink}`, padding: '14px 24px', fontSize: 13, fontWeight: 700 }}>
            [ PHOTO ]
          </div>
        )}
        <div style={{ position: 'absolute', top: 14, left: 16, fontSize: 10, letterSpacing: '0.15em' }}>
          ◎ 01 / {gear.category.toUpperCase()}
        </div>
        {gear.brand && (
          <div style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 10, letterSpacing: '0.15em' }}>
            {gear.brand.toUpperCase()}
          </div>
        )}
      </div>
      <div style={{ padding: '20px 26px' }}>
        <div style={{ display: 'inline-block', border: `2px solid ${BR.ink}`, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
          {gear.category.toUpperCase()}
        </div>
        <div style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginTop: 10, textTransform: 'uppercase' }}>
          {gear.name}
        </div>
        <div style={{ fontSize: 13, marginTop: 4 }}>
          {gear.brand}{gear.model_year ? ` · ${gear.model_year}` : ''}
        </div>
        {gear.description && (
          <div style={{ fontSize: 11, marginTop: 10, lineHeight: 1.55, maxWidth: 400 }}>
            {gear.description}
          </div>
        )}
        {gear.specs && Object.keys(gear.specs).length > 0 && (
          <div style={{ marginTop: 14 }}>
            <SpecsTable specs={gear.specs} />
          </div>
        )}
      </div>
    </div>
  )
}

function AccessoryCard({ gear, index }: { gear: GearRow; index: number }) {
  const imageUrl = resolveImageUrl(gear.image_url)
  const specs = gear.specs ? Object.entries(gear.specs).slice(0, 3) : []
  return (
    <div style={{ borderRight: index < 2 ? `3px solid ${BR.ink}` : 'none', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flex: 1, position: 'relative', borderBottom: `3px solid ${BR.ink}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: BR.bg, minHeight: 160,
      }}>
        {imageUrl ? (
          <img src={imageUrl} alt={gear.name} style={{ maxWidth: '70%', maxHeight: '80%', objectFit: 'contain' }} />
        ) : (
          <div style={{ fontSize: 11, opacity: 0.4 }}>[ PHOTO ]</div>
        )}
        <div style={{ position: 'absolute', top: 12, left: 14, fontSize: 10, letterSpacing: '0.15em' }}>
          ◎ 0{index + 2} / {gear.category.toUpperCase()}
        </div>
      </div>
      <div style={{ padding: '12px 18px' }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>{gear.name}</div>
        <div style={{ fontSize: 11, marginTop: 3 }}>{gear.brand}{gear.model_year ? ` · ${gear.model_year}` : ''}</div>
        {specs.length > 0 && (
          <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: `repeat(${specs.length}, 1fr)`, border: `2px solid ${BR.ink}` }}>
            {specs.map(([k, v], j) => (
              <div key={j} style={{ padding: '5px 6px', borderRight: j < specs.length - 1 ? `1.5px solid ${BR.ink}` : 'none' }}>
                <div style={{ fontSize: 8, letterSpacing: '0.1em' }}>{k}</div>
                <div style={{ fontSize: 11, fontWeight: 700, marginTop: 1 }}>{String(v)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MobileGears({ gears }: { gears: GearRow[] }) {
  const hero = gears[0]
  const rest = gears.slice(1)
  const heroImageUrl = hero ? resolveImageUrl(hero.image_url) : undefined

  return (
    <div style={{ flex: 1, overflow: 'auto', fontFamily: BR.font, background: BR.bg, color: BR.ink }}>
      {/* Header */}
      <div style={{ padding: '18px 16px 14px', borderBottom: `2.5px solid ${BR.ink}` }}>
        <div style={{ fontSize: 12, letterSpacing: '0.18em' }}>━ GEARS ━━━━━━━━━━━━━</div>
        <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 6 }}>
          WHAT I RIDE.
        </div>
      </div>

      {/* Hero gear */}
      {hero && (
        <>
          <div style={{
            height: 200, borderBottom: `2.5px solid ${BR.ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', background: BR.bg,
          }}>
            {heroImageUrl ? (
              <img src={heroImageUrl} alt={hero.name} style={{ maxWidth: '80%', maxHeight: '85%', objectFit: 'contain' }} />
            ) : (
              <div style={{ background: BR.bg, border: `2px solid ${BR.ink}`, padding: '8px 14px', fontSize: 10, fontWeight: 700 }}>
                [ PHOTO ]
              </div>
            )}
            <div style={{ position: 'absolute', top: 10, left: 12, fontSize: 12, letterSpacing: '0.15em' }}>◎ 01 / {hero.category.toUpperCase()}</div>
            {hero.brand && (
              <div style={{ position: 'absolute', bottom: 10, left: 12, fontSize: 12, letterSpacing: '0.15em' }}>{hero.brand.toUpperCase()}</div>
            )}
          </div>
          <div style={{ padding: 16, borderBottom: `2.5px solid ${BR.ink}` }}>
            <div style={{ display: 'inline-block', border: `2px solid ${BR.ink}`, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>
              {hero.category.toUpperCase()}
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, marginTop: 10, textTransform: 'uppercase' }}>
              {hero.name}
            </div>
            <div style={{ fontSize: 12, marginTop: 4 }}>
              {hero.brand}{hero.model_year ? ` · ${hero.model_year}` : ''}
            </div>
            {hero.description && (
              <div style={{ fontSize: 11, marginTop: 12, lineHeight: 1.55 }}>{hero.description}</div>
            )}
            {hero.specs && Object.keys(hero.specs).length > 0 && (
              <div style={{ marginTop: 16 }}>
                <SpecsTable specs={hero.specs} compact />
              </div>
            )}
          </div>
        </>
      )}

      {/* Remaining gears */}
      {rest.map((gear, i) => {
        const imageUrl = resolveImageUrl(gear.image_url)
        const topSpecs = gear.specs ? Object.entries(gear.specs).slice(0, 3) : []
        return (
          <div key={gear.id} style={{ borderBottom: `2.5px solid ${BR.ink}` }}>
            {imageUrl && (
              <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: BR.bg, borderBottom: `1.5px solid ${BR.ink}` }}>
                <img src={imageUrl} alt={gear.name} style={{ maxWidth: '70%', maxHeight: '80%', objectFit: 'contain' }} />
                <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 12, letterSpacing: '0.15em' }}>◎ 0{i + 2} / {gear.category.toUpperCase()}</div>
              </div>
            )}
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>{gear.name}</div>
              <div style={{ fontSize: 11, marginTop: 3, opacity: 0.7 }}>{gear.brand}{gear.model_year ? ` · ${gear.model_year}` : ''}</div>
              {topSpecs.length > 0 && (
                <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: `repeat(${topSpecs.length}, 1fr)`, border: `2px solid ${BR.ink}` }}>
                  {topSpecs.map(([k, v], j) => (
                    <div key={j} style={{ padding: '5px 6px', borderRight: j < topSpecs.length - 1 ? `1.5px solid ${BR.ink}` : 'none' }}>
                      <div style={{ fontSize: 10, letterSpacing: '0.1em' }}>{k}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, marginTop: 1 }}>{String(v)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Wishlist */}
      <div style={{ margin: 16, padding: '12px 14px', background: BR.hot, color: 'white' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', marginBottom: 6 }}>WISHLIST · NEXT</div>
        {WISHLIST.map((item, i) => (
          <div key={i} style={{ fontSize: 16, fontWeight: 900, marginTop: 4 }}>{item}</div>
        ))}
      </div>
    </div>
  )
}

function GearsPage() {
  const gears = Route.useLoaderData()
  const isMobile = useIsMobile()
  const hero = gears[0]
  const accessories = gears.slice(1, 4)

  if (isMobile) {
    return (
      <main style={{ background: BR.bg, color: BR.ink, fontFamily: BR.font, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MobileGears gears={gears} />
      </main>
    )
  }

  return (
    <main style={{ background: BR.bg, color: BR.ink, fontFamily: BR.font, flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '18px 28px 14px', borderBottom: `3px solid ${BR.ink}`,
        display: 'flex', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.2em' }}>━━ GEARS / THE RIDE SYSTEM ━━━━━━━━━━━━━━━━━━</div>
          <div style={{ fontSize: 'clamp(44px, 5.5vw, 72px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 8 }}>
            WHAT I RIDE.
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', border: `3px solid ${BR.ink}` }}>
          {(() => {
            const years = gears.map(g => g.model_year).filter(Boolean) as number[]
            const since = years.length ? String(Math.min(...years)) : '—'
            const cats = [...new Set(gears.map(g => g.category))].length
            return [
              [String(gears.length), 'ITEMS'],
              [String(cats), 'CATEGORIES'],
              [since, 'SINCE'],
            ].map(([v, k], i, a) => (
              <div key={i} style={{ padding: '12px 18px', borderRight: i < a.length - 1 ? `3px solid ${BR.ink}` : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</div>
                <div style={{ fontSize: 10, marginTop: 4, letterSpacing: '0.12em' }}>{k}</div>
              </div>
            ))
          })()}
        </div>
      </div>

      {hero && <HeroGear gear={hero} />}

      {accessories.length > 0 && (
        <div style={{
          flex: 1, display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(accessories.length, 3)}, 1fr)`,
          borderBottom: `3px solid ${BR.ink}`,
        }}>
          {accessories.map((g, i) => (
            <AccessoryCard key={g.id} gear={g} index={i} />
          ))}
        </div>
      )}

      {/* Wishlist */}
      <div style={{ padding: '12px 20px', background: BR.hot, color: 'white', display: 'flex', alignItems: 'center', gap: 20, borderBottom: `3px solid ${BR.ink}`, flexShrink: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.15em', flexShrink: 0 }}>WISHLIST · NEXT</div>
        {WISHLIST.map((item, i) => (
          <div key={i} style={{ fontSize: 16, fontWeight: 900 }}>{item}</div>
        ))}
      </div>
    </main>
  )
}
