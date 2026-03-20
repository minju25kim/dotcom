import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'

type StravaStats = {
  year: number
  run_distance: number
  run_time: number
  run_count: number
  ride_distance: number
  ride_time: number
  ride_count: number
}

type StravaActivity = {
  id: number
  name: string
  sport_type: string
  distance: number
  moving_time: number
  elevation_gain: number
  start_date: string
}

type LoaderData = {
  stats: StravaStats | null
  activities: StravaActivity[]
}

async function fetchStravaData(): Promise<LoaderData> {
  const year = new Date().getFullYear()

  const [statsRes, activitiesRes] = await Promise.all([
    supabase.from('strava_stats').select('*').eq('year', year).single(),
    supabase
      .from('strava_activities')
      .select('*')
      .order('start_date', { ascending: false })
      .limit(10),
  ])

  return {
    stats: statsRes.data,
    activities: activitiesRes.data ?? [],
  }
}

export const Route = createFileRoute('/strava')({
  loader: fetchStravaData,
  staleTime: 60_000,
  component: StravaPage,
})

function formatDistance(meters: number) {
  return (meters / 1000).toFixed(1) + ' km'
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

const SPORT_EMOJI: Record<string, { emoji: string; label: string }> = {
  Run:         { emoji: '🏃', label: 'Run' },
  VirtualRun:  { emoji: '🏃', label: 'Virtual Run' },
  Ride:        { emoji: '🚴', label: 'Ride' },
  VirtualRide: { emoji: '🚴', label: 'Virtual Ride' },
  Walk:        { emoji: '🚶', label: 'Walk' },
  Hike:        { emoji: '🥾', label: 'Hike' },
}

function SportBadge({ type }: { type: string }) {
  const config = SPORT_EMOJI[type] ?? { emoji: '⚡', label: type }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      padding: '3px 10px 3px 6px',
      borderRadius: '100px',
      fontSize: '0.72rem',
      fontWeight: 700,
      fontFamily: 'var(--mono)',
      letterSpacing: '0.04em',
      background: 'var(--code-bg)',
      color: 'var(--text)',
      border: '1px solid var(--border)',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: '0.9rem' }}>{config.emoji}</span>
      {config.label}
    </span>
  )
}

function StravaPage() {
  const { stats, activities } = Route.useLoaderData()
  const year = new Date().getFullYear()

  return (
    <main>
      <header className="page-header">
        <h1 style={{ margin: 0 }}>Strava</h1>
      </header>

      <section style={{ padding: '3rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text)',
          opacity: 0.5,
          marginBottom: '1.5rem',
        }}>
          {year} Totals
        </p>

        {!stats ? (
          <p style={{ color: 'var(--text)' }}>No data yet.</p>
        ) : (
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-card__label">🏃 Running</div>
              <div className="stat-card__value">{formatDistance(stats.run_distance)}</div>
              <div className="stat-card__meta">{formatTime(stats.run_time)} · {stats.run_count} runs</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__label">🚴 Cycling</div>
              <div className="stat-card__value">{formatDistance(stats.ride_distance)}</div>
              <div className="stat-card__meta">{formatTime(stats.ride_time)} · {stats.ride_count} rides</div>
            </div>
          </div>
        )}
      </section>

      <section style={{ padding: '3rem 2rem' }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text)',
          opacity: 0.5,
          marginBottom: '1.5rem',
        }}>
          Recent Activities
        </p>

        {activities.length === 0 ? (
          <p style={{ color: 'var(--text)' }}>No activities yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {activities.map((a) => (
              <li key={a.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'start',
                gap: '1rem',
                padding: '1rem 0',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontWeight: 500, color: 'var(--text-h)' }}>
                    {a.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <SportBadge type={a.sport_type} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text)' }}>
                      {formatDistance(a.distance)} · {formatTime(a.moving_time)} · ↑{a.elevation_gain.toFixed(0)}m
                    </span>
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text)', opacity: 0.5, whiteSpace: 'nowrap' }}>
                  {new Date(a.start_date).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
