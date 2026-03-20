import { createFileRoute } from '@tanstack/react-router'
import { useRef, useEffect, useState } from 'react'
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
  const isMobile = useIsMobile()
  const isEven = index % 2 === 0
  const imageUrl = resolveImageUrl(gear.image_url)

  return (
    <section
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'),
        alignItems: isMobile ? 'stretch' : 'center',
        minHeight: isMobile ? 'auto' : '100vh',
        padding: isMobile ? '2rem 1.25rem' : '2rem',
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
      <div style={{
        flex: isMobile ? 'none' : '0 0 55%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: isMobile ? '260px' : '500px',
      }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={gear.name}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        )}
      </div>

      {/* Info panel */}
      <div style={{ flex: 1, textAlign: 'left', padding: isMobile ? '0' : '1rem' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'var(--code-bg)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            marginBottom: '1.25rem',
          }}
        >
          {gear.category}
        </span>

        <h2
          style={{
            margin: '0 0 4px',
            color: 'var(--text-h)',
            fontSize: isMobile ? '1.5rem' : '2rem',
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
          }}
        >
          {gear.name}
        </h2>
        <p style={{ color: 'var(--text)', fontWeight: 600, margin: '0 0 1rem', fontSize: '0.9rem' }}>
          {gear.brand}
          {gear.model_year ? ` · ${gear.model_year}` : ''}
        </p>
      </div>
    </section>
  )
}

function GearsPage() {
  const gears = Route.useLoaderData()

  return (
    <main>
      <header className="page-header">
        <h1 style={{ margin: 0 }}>Gears</h1>
      </header>

      {gears.map((gear, index) => (
        <GearSection key={gear.id} gear={gear} index={index} />
      ))}
    </main>
  )
}
