import { createFileRoute } from '@tanstack/react-router'
import { useRef, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

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

const CATEGORY_COLORS: Record<string, string> = {
  'Road Bike': '#aa3bff',
  Helmet: '#3b82f6',
  'Bike Computer': '#10b981',
  Pedals: '#f59e0b',
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function GearSection({ gear, index }: { gear: GearRow; index: number }) {
  const { ref, inView } = useInView()
  const isEven = index % 2 === 0
  const accentColor = CATEGORY_COLORS[gear.category] ?? '#aa3bff'
  const imageUrl = resolveImageUrl(gear.image_url)
  const specs = gear.specs as Record<string, string>

  return (
    <section
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        gap: '2rem',
        borderBottom: '1px solid var(--border)',
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'none'
          : `translateY(40px) translateX(${isEven ? '-20px' : '20px'})`,
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      {/* Image */}
      <div style={{ flex: '0 0 55%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px' }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={gear.name}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        )}
      </div>

      {/* Info panel */}
      <div style={{ flex: 1, textAlign: 'left', padding: '1rem' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: `${accentColor}20`,
            color: accentColor,
            border: `1px solid ${accentColor}50`,
            marginBottom: '1.25rem',
          }}
        >
          {gear.category}
        </span>

        <h2
          style={{
            margin: '0 0 4px',
            color: 'var(--text-h)',
            fontSize: '2rem',
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
          }}
        >
          {gear.name}
        </h2>
        <p style={{ color: accentColor, fontWeight: 600, margin: '0 0 1rem', fontSize: '0.9rem' }}>
          {gear.brand}
          {gear.model_year ? ` · ${gear.model_year}` : ''}
        </p>
        <p style={{ color: 'var(--text)', lineHeight: 1.7, margin: '0 0 2rem' }}>
          {gear.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {Object.entries(specs)
            .filter(([, v]) => typeof v === 'string' || typeof v === 'number')
            .map(([key, value]) => (
              <div
                key={key}
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: '10px',
                  background: 'var(--code-bg)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text)',
                    marginBottom: '4px',
                  }}
                >
                  {key.replace(/_/g, ' ')}
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-h)', fontSize: '0.9rem' }}>
                  {String(value)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

function GearsPage() {
  const gears = Route.useLoaderData()

  return (
    <main>
      <div
        style={{
          padding: '5rem 2rem 3rem',
          borderBottom: '1px solid var(--border)',
          textAlign: 'left',
        }}
      >
        <h1 style={{ margin: 0 }}>Gears</h1>
      </div>

      {gears.map((gear, index) => (
        <GearSection key={gear.id} gear={gear} index={index} />
      ))}
    </main>
  )
}
