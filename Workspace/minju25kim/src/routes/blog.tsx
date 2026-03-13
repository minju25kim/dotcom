import { createFileRoute, Link } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'

export type BlogPostSummary = {
  id: number
  title: string
  slug: string
  created_at: string | null
}

export type BlogPost = BlogPostSummary & {
  content: string | null
  updated_at: string | null
}

async function fetchPosts(): Promise<BlogPostSummary[]> {
  const { data, error } = await supabase
    .from('blog')
    .select('id, title, slug, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const Route = createFileRoute('/blog')({
  loader: fetchPosts,
  staleTime: 60_000,
  component: BlogPage,
})

function BlogPage() {
  const posts = Route.useLoaderData()

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Blog</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
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
