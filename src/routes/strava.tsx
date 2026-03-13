import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/strava')({
  component: StravaPage,
})

function StravaPage() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Strava</h1>
    </main>
  )
}
