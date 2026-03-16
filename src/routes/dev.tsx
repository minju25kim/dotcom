import { createFileRoute, Link } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'

export type DevPostSummary = {
  id: number
  title: string
  slug: string
  created_at: string | null
}

export type DevPost = DevPostSummary & {
  markdown: string | null
  updated_at: string | null
}

async function fetchPosts(): Promise<DevPostSummary[]> {
  const { data, error } = await supabase
    .from('dev')
    .select('id, title, slug, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const Route = createFileRoute('/dev')({
  loader: fetchPosts,
  staleTime: 60_000,
  component: DevPage,
})

function DevPage() {
  const posts = Route.useLoaderData()

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Dev</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to="/dev/$slug" params={{ slug: post.slug }}>
              <strong>{post.title}</strong>
            </Link>
            {post.created_at && (
              <div style={{ fontSize: '0.85rem', color: '#888' }}>
                {new Date(post.created_at).toLocaleDateString()}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
