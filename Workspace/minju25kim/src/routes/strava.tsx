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

function StravaPage() {
  const { stats, activities } = Route.useLoaderData()
  const year = new Date().getFullYear()

  return (
    <main style={{ padding: '1rem', maxWidth: '600px' }}>
      <h1>Strava</h1>

      <h2>{year} Totals</h2>
      {!stats ? (
        <p>No data yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h3>🏃 Running</h3>
            <div>{formatDistance(stats.run_distance)}</div>
            <div>{formatTime(stats.run_time)}</div>
            <div>{stats.run_count} runs</div>
          </div>
          <div>
            <h3>🚴 Cycling</h3>
            <div>{formatDistance(stats.ride_distance)}</div>
            <div>{formatTime(stats.ride_time)}</div>
            <div>{stats.ride_count} rides</div>
          </div>
        </div>
      )}

      <h2>Recent Activities</h2>
      {activities.length === 0 ? (
        <p>No activities yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activities.map((a) => (
            <li key={a.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>
              <strong>{a.name}</strong>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>
                {a.sport_type} · {formatDistance(a.distance)} · {formatTime(a.moving_time)} · ↑{a.elevation_gain.toFixed(0)}m
              </div>
              <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
                {new Date(a.start_date).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
