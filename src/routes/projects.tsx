import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

const BR = {
  bg:  'var(--br-bg)',
  ink: 'var(--br-ink)',
  hot: 'var(--br-hot)',
  font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
}

const PROJECTS = [
  {
    n: '01',
    name: 'BIKELOG',
    status: 'IN PROGRESS',
    year: '2026',
    desc: 'A smarter ride journal for cyclists. Pull your Strava rides, overlay them on Mapbox, add notes, remember every climb.',
    stack: ['TYPESCRIPT', 'NEXT', 'MAPBOX', 'STRAVA API'],
    why: 'Every ride tells a story. Strava forgets. bikelog remembers.',
    bg: BR.hot,
  },
  {
    n: '02',
    name: 'CUTTER.AI',
    status: 'PROTOTYPE',
    year: '2026',
    desc: 'Edit video at the speed of thought. Whisper transcribes; you rewrite the transcript; ffmpeg re-cuts the video.',
    stack: ['PYTHON', 'WHISPER', 'FFMPEG'],
    why: 'Text is the fastest editor UI ever invented. Apply it to video.',
    bg: null,
  },
  {
    n: '03',
    name: 'MINJU25KIM.DEV',
    status: 'LIVE',
    year: '2025',
    desc: 'This site. Static, fast, brutally honest. Hosted on Cloudflare Pages.',
    stack: ['REACT', 'VITE', 'SUPABASE', 'CF PAGES'],
    why: "A developer site should be a developer's resume.",
    bg: null,
  },
]

function ProjectsPage() {
  return (
    <main style={{
      background: BR.bg,
      color: BR.ink,
      fontFamily: BR.font,
      flex: 1,
    }}>
      {/* Page header */}
      <div style={{ padding: '22px 28px 18px', borderBottom: `3px solid ${BR.ink}` }}>
        <div style={{ fontSize: 11, letterSpacing: '0.2em' }}>━━ PROJECTS / A TO Z ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div style={{
          fontSize: 'clamp(48px, 6vw, 96px)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          marginTop: 8,
        }}>
          THE WORK.
        </div>
        <div style={{ marginTop: 10, fontSize: 13, maxWidth: 620 }}>
          Three things I'm shipping or have shipped. Some finished. Some not. All honest.
        </div>
      </div>

      {/* Projects table */}
      {PROJECTS.map((p, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '80px 1.3fr 1fr 120px',
          borderBottom: `3px solid ${BR.ink}`,
          background: p.bg ?? 'transparent',
          color: p.bg ? 'white' : BR.ink,
        }} className="project-row">
          <div style={{
            padding: '24px 20px',
            borderRight: `3px solid ${BR.ink}`,
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1,
          }}>
            {p.n}
          </div>
          <div style={{ padding: '24px 20px', borderRight: `3px solid ${BR.ink}` }}>
            <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
              {p.name}
            </div>
            <div style={{ fontSize: 13, marginTop: 10, lineHeight: 1.5, maxWidth: 460 }}>
              {p.desc}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              {p.stack.map((s, j) => (
                <span key={j} style={{
                  border: `2px solid ${p.bg ? 'white' : BR.ink}`,
                  padding: '3px 8px',
                  fontSize: 10,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div style={{ padding: '24px 20px', borderRight: `3px solid ${BR.ink}` }}>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', marginBottom: 6 }}>WHY IT MATTERS</div>
            <div style={{ fontSize: 12, lineHeight: 1.6 }}>{p.why}</div>
          </div>
          <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.15em' }}>{p.year}</div>
              <div style={{
                fontSize: 11,
                marginTop: 8,
                background: p.bg ? 'white' : BR.ink,
                color: p.bg ? BR.hot : BR.bg,
                padding: '3px 8px',
                textAlign: 'center',
                fontWeight: 700,
              }}>
                {p.status}
              </div>
            </div>
            <a style={{ fontSize: 13, fontWeight: 700, marginTop: 20 }}>→ OPEN</a>
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
          }
          .project-row > div {
            border-right: none !important;
            border-bottom: 1px solid #0a0a0a;
          }
        }
      `}</style>
    </main>
  )
}
