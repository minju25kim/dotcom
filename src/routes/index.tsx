import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { useIsMobile } from '../hooks/useIsMobile'

const BR = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  soft: 'var(--br-soft)',
  font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
  email: 'minju25kim@gmail.com',
}

type HomeData = {
  posts:            { id: string; type: string; title: string; slug: string; created_at: string | null }[]
  monthlyPostCount: number
  monthlyRideKm:    number
  monthlyRideCount: number
  monthlyRunKm:     number
}

async function fetchHomeData(): Promise<HomeData> {
  const now        = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const monthEnd   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  const [postsRes, monthPostRes, monthRes] = await Promise.all([
    supabase
      .from('content')
      .select('id, type, title, slug, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(7),
    supabase
      .from('content')
      .select('id', { count: 'exact', head: true })
      .eq('published', true)
      .gte('created_at', monthStart)
      .lte('created_at', monthEnd),
    supabase
      .from('strava_activities')
      .select('distance, sport_type')
      .gte('start_date', monthStart)
      .lte('start_date', monthEnd),
  ])

  const activities = monthRes.data ?? []
  const rides = activities.filter(a => a.sport_type?.toLowerCase().includes('ride'))
  const runs  = activities.filter(a => a.sport_type?.toLowerCase().includes('run'))

  return {
    posts:            postsRes.data ?? [],
    monthlyPostCount: monthPostRes.count ?? 0,
    monthlyRideKm:    rides.reduce((s, a) => s + a.distance, 0) / 1000,
    monthlyRideCount: rides.length,
    monthlyRunKm:     runs.reduce((s, a) => s + a.distance, 0) / 1000,
  }
}

export const Route = createFileRoute('/')({
  loader: fetchHomeData,
  staleTime: 60_000,
  component: HomePage,
})

// ── shared data ────────────────────────────────────────────────
const SOCIALS: [string, string][] = [
  ['GITHUB',    'https://github.com/minju25kim'],
  ['INSTAGRAM', 'https://instagram.com/minju25kim'],
  ['YOUTUBE',   'https://youtube.com/@minju25kim'],
  ['STRAVA',    'https://strava.com/athletes/minju25kim'],
]

const PROJECTS = [
  { n: '01', name: 'BIKELOG',    shortDesc: 'Smarter ride journal. TS · Mapbox.',         longDesc: 'A smarter ride journal. GPX, mapbox, strava webhooks.', stack: 'TYPESCRIPT', status: 'IN PROGRESS' },
  { n: '02', name: 'CUTTER.AI', shortDesc: 'Video editing via transcript. Py.',           longDesc: 'Edit video at the speed of thought. Whisper + ffmpeg.',  stack: 'PYTHON',     status: 'PROTOTYPE'  },
]

function formatDate(iso: string) {
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getFullYear()).slice(2)}`
}

// ── Desktop layout ─────────────────────────────────────────────
function DesktopHome({ posts, monthlyPostCount, monthlyRideKm, monthlyRideCount, monthlyRunKm }: HomeData) {
  const kmDisplay  = monthlyRideKm > 0 ? monthlyRideKm.toFixed(1) : '—'
  const runDisplay = monthlyRunKm  > 0 ? monthlyRunKm.toFixed(1)  : '—'
  const marqueeText = `SHIPPING / BIKELOG · CUTTER.AI / RIDING / ${kmDisplay} KM THIS MONTH · ${monthlyRideCount} RIDES / HIRING? MINJU25KIM@GMAIL.COM /`

  const stats: [string, string, string | null][] = [
    [String(monthlyPostCount || '—'), 'POSTS / MO', null],
    [kmDisplay,                       'RIDE / MO',  'var(--br-hot)'],
    [runDisplay,                      'RUN / MO',   null],
  ]

  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
      {/* ── LEFT ── */}
      <div style={{
        borderRight: `3px solid ${BR.ink}`, padding: 28,
        display: 'flex', flexDirection: 'column', gap: 18,
        overflow: 'hidden', minWidth: 0,
      }}>
        <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>
          ━━━ WHO / 01 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>

        <div style={{ fontSize: 92, lineHeight: 0.9, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', margin: '4px 0' }}>
          I BUILD<br />
          <span style={{ background: BR.ink, color: BR.bg, padding: '0 8px', marginLeft: -8 }}>THINGS</span><br />
          THAT <span style={{ color: BR.hot }}>MOVE</span>.
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 520 }}>
          Software engineer in Seoul. I ride 600+ km a month and ship code for
          the other 22 hours. Currently building <b>bikelog</b> (a smarter Strava)
          and <b>cutter.ai</b> (video editing at the speed of thought).
        </div>

        <div style={{ display: 'flex', border: `3px solid ${BR.ink}` }}>
          <a href="/projects" style={{ padding: '12px 16px', background: BR.ink, color: BR.bg, fontWeight: 700, fontSize: 13 }}>
            → SEE THE WORK
          </a>
          <a href={`mailto:${BR.email}`} style={{ padding: '12px 16px', borderLeft: `3px solid ${BR.ink}`, fontSize: 13, color: BR.ink }}>
            {BR.email} ↗
          </a>
        </div>

        <div style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 6 }}>
          ━━━ PROOF / 02 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: `3px solid ${BR.ink}` }}>
          {stats.map(([big, small, bg], i) => (
            <div key={i} style={{
              padding: '16px 14px',
              borderRight: i < 2 ? `3px solid ${BR.ink}` : 'none',
              background: bg ?? 'transparent',
              color: bg ? 'white' : BR.ink,
            }}>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{big}</div>
              <div style={{ fontSize: 10, marginTop: 6, letterSpacing: '0.1em' }}>{small}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 4 }}>
          ━━━ FIND / 03 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SOCIALS.map(([k, url]) => (
            <a key={k} href={url} target="_blank" rel="noopener noreferrer" style={{ border: `2px solid ${BR.ink}`, padding: '6px 10px', fontSize: 12, color: BR.ink }}>
              <b>{k}</b> &nbsp; @minju25kim &nbsp;↗
            </a>
          ))}
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Marquee */}
        <div style={{ background: BR.ink, color: BR.bg, padding: '8px 0', borderBottom: `3px solid ${BR.ink}`, fontSize: 13, fontWeight: 700, overflow: 'hidden', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <div style={{ display: 'inline-block', animation: 'marq 30s linear infinite' }}>
            {marqueeText}&nbsp;&nbsp;&nbsp;{marqueeText}&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        {/* Projects */}
        <div style={{ padding: '20px 28px', borderBottom: `3px solid ${BR.ink}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 11, letterSpacing: '0.15em' }}>
            <span>▼ PROJECTS (2)</span>
          </div>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '38px 1fr 110px 110px', gap: 14, alignItems: 'baseline', padding: '14px 0', borderTop: `1px solid ${BR.ink}` }}>
              <div style={{ fontSize: 24, fontWeight: 900 }}>{p.n}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em' }}>{p.name}</div>
                <div style={{ fontSize: 12, marginTop: 4, opacity: 0.6 }}>{p.longDesc}</div>
              </div>
              <div style={{ fontSize: 11 }}>{p.stack}</div>
              <div style={{ fontSize: 11, background: BR.ink, color: BR.bg, padding: '4px 8px', textAlign: 'center', justifySelf: 'end' }}>{p.status}</div>
            </div>
          ))}
        </div>

        {/* Content ledger */}
        <div style={{ padding: '20px 28px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 11, letterSpacing: '0.15em' }}>
            <span>▼ CONTENT / LEDGER</span><span>TAIL -F</span>
          </div>
          {posts.length === 0 ? (
            <div style={{ fontSize: 12, opacity: 0.4 }}>No posts yet.</div>
          ) : (
            <div style={{ fontSize: 12, overflow: 'hidden' }}>
              {posts.map((post, i) => {
                const isPy = post.type?.toUpperCase().includes('PY')
                return (
                  <a key={post.id} href={`/content/${post.slug}`} style={{
                    display: 'grid', gridTemplateColumns: '78px 44px 1fr 20px',
                    gap: 12, padding: '6px 0', borderBottom: `1px dashed ${BR.ink}`,
                    alignItems: 'center',
                    background: i === 0 ? BR.hot : 'transparent',
                  }}>
                    <span style={{ fontSize: 11, color: i === 0 ? 'white' : BR.ink }}>
                      {post.created_at ? formatDate(post.created_at) : '—'}
                    </span>
                    <span style={{ background: i === 0 ? 'white' : (isPy ? BR.hot : BR.ink), color: i === 0 ? BR.hot : BR.bg, textAlign: 'center', padding: '1px 0', fontSize: 10 }}>
                      {(post.type ?? 'DEV').toUpperCase().slice(0, 4)}
                    </span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: i === 0 ? 900 : 400, color: i === 0 ? 'white' : BR.ink }}>
                      {i === 0 && '★ '}{post.title}
                    </span>
                    <span style={{ color: i === 0 ? 'white' : BR.ink }}>↗</span>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Mobile layout (matches M2Landing) ─────────────────────────
function MobileHome({ posts: _posts, monthlyPostCount, monthlyRideKm, monthlyRideCount: _monthlyRideCount, monthlyRunKm }: HomeData) {
  const kmDisplay  = monthlyRideKm > 0 ? Math.round(monthlyRideKm).toString() : '—'
  const runDisplay = monthlyRunKm  > 0 ? Math.round(monthlyRunKm).toString()  : '—'
  const marqueeText = `SHIPPING / BIKELOG · CUTTER.AI / ${kmDisplay} KM · HIRING? MINJU25KIM@GMAIL.COM /`

  return (
    <div style={{ flex: 1, overflow: 'auto', fontFamily: BR.font, background: BR.bg, color: BR.ink }}>
      {/* WHO */}
      <div style={{ padding: '20px 16px 16px' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em' }}>━ WHO / 01 ━━━━━━━━━━━</div>
        <div style={{ fontSize: 46, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', marginTop: 8 }}>
          I BUILD<br />
          <span style={{ background: BR.ink, color: BR.bg, padding: '0 4px', marginLeft: -4 }}>THINGS</span><br />
          THAT <span style={{ color: BR.hot }}>MOVE</span>.
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.55, marginTop: 12 }}>
          Software engineer in Seoul. Ride 600+ km a month, ship code for the other 22 hours.
          Currently on <b>bikelog</b> + <b>cutter.ai</b>.
        </div>
        <div style={{ display: 'flex', border: `2.5px solid ${BR.ink}`, marginTop: 14 }}>
          <a href="/projects" style={{ padding: '10px 12px', background: BR.ink, color: BR.bg, fontWeight: 700, fontSize: 12, flex: 1, textAlign: 'center' }}>
            → THE WORK
          </a>
          <a href={`mailto:${BR.email}`} style={{ padding: '10px 12px', borderLeft: `2.5px solid ${BR.ink}`, fontSize: 12, flex: 1, textAlign: 'center', color: BR.ink }}>
            email ↗
          </a>
        </div>
      </div>

      {/* PROOF */}
      <div style={{ padding: '10px 16px 4px', fontSize: 10, letterSpacing: '0.18em' }}>━ PROOF / 02 ━━━━━━━━━</div>
      <div style={{ margin: '8px 16px', border: `2.5px solid ${BR.ink}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {([
          [String(monthlyPostCount || '—'), 'POSTS/MO', null],
          [kmDisplay,                       'RIDE/MO',  'var(--br-hot)'],
          [runDisplay,                      'RUN/MO',   null],
        ] as [string, string, string | null][]).map(([big, small, bg], i) => (
          <div key={i} style={{
            padding: '12px 8px',
            borderRight: i < 2 ? `2.5px solid ${BR.ink}` : 'none',
            background: bg ?? 'transparent',
            color: bg ? 'white' : BR.ink,
          }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{big}</div>
            <div style={{ fontSize: 9, marginTop: 4, letterSpacing: '0.08em' }}>{small}</div>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div style={{ background: BR.ink, color: BR.bg, padding: '8px 0', borderTop: `2.5px solid ${BR.ink}`, borderBottom: `2.5px solid ${BR.ink}`, fontSize: 12, fontWeight: 700, overflow: 'hidden', whiteSpace: 'nowrap', margin: '8px 0 0' }}>
        <div style={{ display: 'inline-block', animation: 'marq 20s linear infinite' }}>
          {marqueeText}&nbsp;&nbsp;&nbsp;{marqueeText}&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* NOW — projects */}
      <div style={{ padding: '14px 16px 4px', fontSize: 10, letterSpacing: '0.18em' }}>━ NOW / 03 ━━━━━━━━━━━</div>
      {PROJECTS.map((p, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr auto', gap: 8, padding: '10px 16px', borderTop: `1px solid ${BR.ink}`, alignItems: 'baseline' }}>
          <div style={{ fontSize: 18, fontWeight: 900 }}>{p.n}</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.02em' }}>{p.name}</div>
            <div style={{ fontSize: 11, marginTop: 2 }}>{p.shortDesc}</div>
          </div>
          <span style={{ fontSize: 14 }}>↗</span>
        </div>
      ))}

      {/* FIND — socials */}
      <div style={{ padding: '14px 16px 4px', fontSize: 10, letterSpacing: '0.18em' }}>━ FIND / 04 ━━━━━━━━━━</div>
      <div style={{ padding: '4px 16px 20px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {SOCIALS.map(([k, url]) => (
          <a key={k} href={url} target="_blank" rel="noopener noreferrer" style={{ border: `2px solid ${BR.ink}`, padding: '5px 8px', fontSize: 10, color: BR.ink }}>
            <b>{k}</b> @minju25kim ↗
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Route component ────────────────────────────────────────────
function HomePage() {
  const data     = Route.useLoaderData()
  const isMobile = useIsMobile()

  return (
    <main style={{ background: BR.bg, color: BR.ink, fontFamily: BR.font, flex: 1, display: 'flex', flexDirection: 'column' }}>
      {isMobile
        ? <MobileHome {...data} />
        : <DesktopHome {...data} />
      }
    </main>
  )
}
