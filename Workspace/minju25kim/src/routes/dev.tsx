import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dev')({
  component: DevPage,
})

function DevPage() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Dev</h1>
    </main>
  )
}
