import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const routes = [
  { to: '/projects', label: 'Projects', description: 'A collection of things I have built.' },
  { to: '/gears', label: 'Gears', description: 'The tools and gear I use day to day.' },
  { to: '/strava', label: 'Strava', description: 'My running and cycling activities.' },
  { to: '/dev', label: 'Dev', description: 'Development notes, tips, and snippets.' },
] as const

const socials = [
  { label: 'GitHub', url: 'https://github.com/minju25kim' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/minju25kim' },
  { label: 'Instagram', url: 'https://instagram.com/minju25kim' },
  { label: 'YouTube', url: 'https://youtube.com/@minju25kim' },
  { label: 'Medium', url: 'https://medium.com/@minju25kim' },
  { label: 'Strava', url: 'https://strava.com/athletes/minju25kim' },
]

function HomePage() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>@minju25kim</h1>

      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
        {socials.map(({ label, url }) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
          </li>
        ))}
      </ul>

      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {routes.map(({ to, label, description }) => (
          <li key={to}>
            <Link to={to} style={{ fontWeight: 'bold' }}>{label}</Link>
            <span> — {description}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
