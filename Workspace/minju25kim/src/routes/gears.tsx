import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gears')({
  component: GearsPage,
})

function GearsPage() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Gears</h1>
    </main>
  )
}
