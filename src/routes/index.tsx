import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const routes = [
  { to: '/projects', label: 'Projects', description: 'A collection of things I have built.' },
  { to: '/gears', label: 'Gears', description: 'The tools and gear I use day to day.' },
  { to: '/strava', label: 'Strava', description: 'My running and cycling activities.' },
  { to: '/dev', label: 'Dev', description: 'Development notes, tips, and snippets.' },
  { to: '/blog', label: 'Blog', description: 'Thoughts and writings.' },
] as const

function HomePage() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Welcome</h1>
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
