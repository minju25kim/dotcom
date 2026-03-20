import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const routes = [
  { to: '/projects', label: 'Projects', description: 'A collection of things I have built.' },
  { to: '/gears', label: 'Gears', description: 'The tools and gear I use day to day.' },
  { to: '/strava', label: 'Strava', description: 'My running and cycling activities.' },
  { to: '/content', label: 'Content', description: 'Development notes, tips, and snippets.' },
] as const

const socials = [
  { label: 'GitHub', url: 'https://github.com/minju25kim' },
  { label: 'Instagram', url: 'https://instagram.com/minju25kim' },
  { label: 'YouTube', url: 'https://youtube.com/@minju25kim' },
  { label: 'Strava', url: 'https://strava.com/athletes/minju25kim' },
]

function HomePage() {
  return (
    <main>
      <header className="page-header">
        <h1 style={{ margin: '0 0 2rem' }}>@minju25kim</h1>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {socials.map(({ label, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'var(--text)',
                textDecoration: 'none',
                padding: '0.4rem 0.875rem',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                transition: 'border-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent-border)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text)'
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      <div className="route-grid">
        {routes.map(({ to, label, description }) => (
          <Link key={to} to={to} className="route-card" style={{ borderRadius: 0, border: 'none' }}>
            <div className="route-card__label">{label}</div>
            <div className="route-card__desc">{description}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
