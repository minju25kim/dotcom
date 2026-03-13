import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Projects</h1>
      <p>Your projects will appear here.</p>
    </main>
  )
}
