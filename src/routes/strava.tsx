import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { useIsMobile } from '../hooks/useIsMobile'

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

const MONTH_NAMES = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

type LoaderData = {
  activities: StravaActivity[]
  monthlyRideKm: number
  monthlyRideCount: number
  monthlyElevation: number
  monthlyTime: number
  monthLabel: string
  weeklyBars: number[]
  yearRideKm: number
  yearRunKm: number
  yearRideCount: number
  yearRunCount: number
}

async function fetchStravaData(): Promise<LoaderData> {
  const now   = new Date()
  const year  = now.getFullYear()
  const month = now.getMonth()
  const monthStart   = new Date(year, month, 1).toISOString()
  const monthEnd     = new Date(year, month + 1, 0, 23, 59, 59).toISOString()
  const weeksAgoIso  = new Date(Date.now() - 15 * 7 * 24 * 3600 * 1000).toISOString()

  const [statsRes, recentRes, monthRes, historyRes] = await Promise.all([
    // strava_stats: pre-aggregated from full Strava API history — most complete for yearly totals
    supabase.from('strava_stats').select('*').eq('year', year).single(),
    supabase.from('strava_activities').select('*').order('start_date', { ascending: false }).limit(10),
    supabase.from('strava_activities')
      .select('distance, elevation_gain, moving_time, sport_type')
      .gte('start_date', monthStart).lte('start_date', monthEnd),
    supabase.from('strava_activities')
      .select('distance, start_date, sport_type')
      .gte('start_date', weeksAgoIso)
      .order('start_date', { ascending: true }),
  ])

  // Monthly aggregates (from activities — always fresh)
  const monthRides = (monthRes.data ?? []).filter(a => a.sport_type?.toLowerCase().includes('ride'))
  const monthlyRideKm    = monthRides.reduce((s, a) => s + a.distance, 0) / 1000
  const monthlyElevation = monthRides.reduce((s, a) => s + a.elevation_gain, 0)
  const monthlyTime      = monthRides.reduce((s, a) => s + a.moving_time, 0)
  const monthlyRideCount = monthRides.length

  // 15-week sparkline (from activities)
  const weeklyKm = new Array<number>(15).fill(0)
  const refTime  = new Date(weeksAgoIso).getTime()
  for (const a of historyRes.data ?? []) {
    if (!a.sport_type?.toLowerCase().includes('ride')) continue
    const weekIdx = Math.floor((new Date(a.start_date).getTime() - refTime) / (7 * 24 * 3600 * 1000))
    if (weekIdx >= 0 && weekIdx < 15) weeklyKm[weekIdx] += a.distance / 1000
  }
  const maxKm = Math.max(...weeklyKm, 1)
  const weeklyBars = weeklyKm.map(km => Math.round((km / maxKm) * 100))

  // Yearly totals from strava_stats (full API history, more complete than activities table)
  const stats: StravaStats | null = statsRes.data
  const yearRideKm    = stats ? stats.ride_distance / 1000 : 0
  const yearRunKm     = stats ? stats.run_distance  / 1000 : 0
  const yearRideCount = stats ? stats.ride_count           : 0
  const yearRunCount  = stats ? stats.run_count            : 0

  return {
    activities:       recentRes.data ?? [],
    monthlyRideKm,
    monthlyRideCount,
    monthlyElevation,
    monthlyTime,
    monthLabel: `${MONTH_NAMES[month]} '${String(year).slice(2)}`,
    weeklyBars,
    yearRideKm,
    yearRunKm,
    yearRideCount,
    yearRunCount,
  }
}

export const Route = createFileRoute('/strava')({
  loader: fetchStravaData,
  staleTime: 60_000,
  component: StravaPage,
})

const BR = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  soft: 'var(--br-soft)',
  font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
}

function formatKm(meters: number) {
  return (meters / 1000).toFixed(1)
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}`
}

function Sparkline({ bars, height }: { bars: number[]; height: number }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: 2,
      height, borderBottom: `2px solid ${BR.ink}`, paddingBottom: 1,
    }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${Math.max(h, 2)}%`, background: h > 70 ? BR.hot : BR.ink }} />
      ))}
    </div>
  )
}

function MobileStrava({ activities, monthlyRideKm, monthlyRideCount, monthlyElevation, monthlyTime, monthLabel, weeklyBars, yearRideKm, yearRunKm, yearRideCount, yearRunCount }: LoaderData) {
  const year = new Date().getFullYear()
  const kmDisplay  = monthlyRideKm > 0 ? monthlyRideKm.toFixed(1) : '—'

  return (
    <div style={{ flex: 1, overflow: 'auto', fontFamily: BR.font, background: BR.bg, color: BR.ink }}>
      {/* Hero */}
      <div style={{ padding: '18px 16px 14px', borderBottom: `2.5px solid ${BR.ink}` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em' }}>━ STRAVA / {monthLabel} ━━━━</div>
        <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          {kmDisplay}<span style={{ fontSize: 18, fontWeight: 700 }}>KM</span>
        </div>
        <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>
          {monthlyRideCount} rides · ↑{monthlyElevation.toFixed(0)}m · {formatTime(monthlyTime)}
        </div>
      </div>

      {/* Sparkline */}
      <div style={{ padding: 16, borderBottom: `2.5px solid ${BR.ink}` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.15em', marginBottom: 10 }}>▼ 15-WEEK RHYTHM</div>
        <Sparkline bars={weeklyBars} height={70} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, marginTop: 4, opacity: 0.6 }}>
          <span>15 WEEKS AGO</span><span>NOW</span>
        </div>
      </div>

      {/* Year totals */}
      <div style={{ borderBottom: `2.5px solid ${BR.ink}`, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {[
          ['RUN',  yearRunKm.toFixed(1),  `${yearRunCount} runs`],
          ['RIDE', yearRideKm.toFixed(1), `${yearRideCount} rides`],
        ].map(([k, v, s], i) => (
          <div key={i} style={{ padding: 14, borderRight: i === 0 ? `2.5px solid ${BR.ink}` : 'none' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>{k}</div>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 4 }}>{v}</div>
            <div style={{ fontSize: 10, marginTop: 2, opacity: 0.6 }}>{s}</div>
          </div>
        ))}
      </div>

      {/* Recent activities */}
      <div style={{ padding: '10px 16px', fontSize: 10, letterSpacing: '0.15em', borderBottom: `2px solid ${BR.ink}` }}>▼ RECENT</div>
      {activities.slice(0, 8).map((a, i) => (
        <div key={a.id} style={{
          padding: '10px 16px', borderBottom: `1px dashed ${BR.ink}`,
          display: 'grid', gridTemplateColumns: '44px 1fr auto auto',
          gap: 8, fontSize: 11, alignItems: 'center',
          background: i % 2 === 0 ? 'transparent' : BR.soft,
        }}>
          <span>{formatDate(a.start_date)}</span>
          <span style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</span>
          <span>{formatKm(a.distance)}km</span>
          <span style={{ color: BR.hot, fontWeight: 700 }}>↑{a.elevation_gain.toFixed(0)}m</span>
        </div>
      ))}

      {/* Goal */}
      {(() => {
        const pct = Math.min(100, Math.round((yearRideKm / 8000) * 100))
        return (
          <div style={{ margin: 16, padding: 14, background: BR.ink, color: BR.bg }}>
            <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>GOAL · {year}</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>8,000 KM BY DEC.</div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', marginTop: 10, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: BR.hot }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10 }}>
              <span>{yearRideKm.toFixed(1)} km</span><span>{pct}%</span>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

function DesktopStrava({ activities, monthlyRideKm, monthlyRideCount, monthlyElevation, monthlyTime, monthLabel, weeklyBars, yearRideKm, yearRunKm, yearRideCount, yearRunCount }: LoaderData) {
  const year = new Date().getFullYear()

  return (
    <>
      {/* Hero header */}
      <div style={{ padding: '22px 28px 18px', borderBottom: `3px solid ${BR.ink}` }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em' }}>
          ━━ STRAVA / {monthLabel} ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div style={{
          fontSize: 96, fontWeight: 900, letterSpacing: '-0.05em',
          lineHeight: 0.95, textTransform: 'uppercase', marginTop: 8,
          display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap',
        }}>
          {monthlyRideKm > 0 ? monthlyRideKm.toFixed(1) : '—'}
          <span style={{ fontSize: 28, fontWeight: 700 }}>KM</span>
        </div>
        <div style={{ fontSize: 13, marginTop: 6 }}>
          {monthlyRideCount} rides · ↑{monthlyElevation.toFixed(0)}m · {formatTime(monthlyTime)} in the saddle
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
        {/* Left: activity ledger */}
        <div style={{ borderRight: `3px solid ${BR.ink}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '12px 28px', borderBottom: `3px solid ${BR.ink}`,
            fontSize: 11, letterSpacing: '0.15em',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>▼ RECENT ACTIVITIES</span>
            <span>{activities.length} ACTIVITIES</span>
          </div>
          {activities.length === 0 ? (
            <div style={{ padding: '28px', fontSize: 13, opacity: 0.5 }}>No activities yet.</div>
          ) : (
            activities.map((a, i) => (
              <div key={a.id} style={{
                display: 'grid',
                gridTemplateColumns: '52px 1fr 76px 58px 52px',
                gap: 10, padding: '14px 28px',
                borderBottom: `1px dashed ${BR.ink}`,
                alignItems: 'center', fontSize: 13,
                background: i % 2 === 0 ? 'transparent' : BR.soft,
              }}>
                <span style={{ fontSize: 11 }}>{formatDate(a.start_date)}</span>
                <span style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {a.name}
                </span>
                <span>{formatKm(a.distance)} km</span>
                <span>{formatTime(a.moving_time)}</span>
                <span style={{ color: BR.hot, fontWeight: 700 }}>↑{a.elevation_gain.toFixed(0)}m</span>
              </div>
            ))
          )}
        </div>

        {/* Right: sparkline + year totals + goal */}
        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>▼ 15-WEEK RHYTHM</div>
            <div style={{ marginTop: 14 }}>
              <Sparkline bars={weeklyBars} height={120} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginTop: 4 }}>
              <span>15 WEEKS AGO</span><span>NOW</span>
            </div>
          </div>

          <div style={{ border: `3px solid ${BR.ink}`, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              ['RUN',  yearRunKm.toFixed(1),  `${yearRunCount} runs`],
              ['RIDE', yearRideKm.toFixed(1), `${yearRideCount} rides`],
            ].map(([k, v, s], i) => (
              <div key={i} style={{ padding: '18px 20px', borderRight: i === 0 ? `3px solid ${BR.ink}` : 'none' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>{k}</div>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginTop: 6 }}>{v}</div>
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.6 }}>{s}</div>
              </div>
            ))}
          </div>

          <div style={{ background: BR.ink, color: BR.bg, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>GOAL · {year}</div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 4 }}>8,000 KM BY DEC.</div>
            {(() => {
              const pct = Math.min(100, Math.round((yearRideKm / 8000) * 100))
              return (
                <>
                  <div style={{ height: 10, background: 'rgba(255,255,255,0.15)', marginTop: 12, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: BR.hot }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11 }}>
                    <span>{yearRideKm.toFixed(1)} km</span><span>{pct}%</span>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </>
  )
}

function StravaPage() {
  const data = Route.useLoaderData()
  const isMobile = useIsMobile()

  return (
    <main style={{
      background: BR.bg, color: BR.ink, fontFamily: BR.font,
      flex: 1, display: 'flex', flexDirection: 'column',
    }}>
      {isMobile ? <MobileStrava {...data} /> : <DesktopStrava {...data} />}
    </main>
  )
}
