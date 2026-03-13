import { createFileRoute, notFound } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import type { BlogPost } from './blog'

async function fetchPost(slug: string): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog')
    .select('id, title, slug, content, created_at, updated_at')
    .eq('slug', slug)
    .single()

  if (error || !data) throw notFound()
  return data
}

export const Route = createFileRoute('/blog_/$slug')({
  loader: ({ params }) => fetchPost(params.slug),
  staleTime: 60_000,
  component: BlogPostPage,
  notFoundComponent: () => <p>Post not found.</p>,
})

function BlogPostPage() {
  const post = Route.useLoaderData()

  return (
    <main style={{ padding: '1rem', maxWidth: '720px' }}>
      <h1>{post.title}</h1>
      {post.created_at && (
        <p style={{ fontSize: '0.85rem', color: '#888' }}>
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      )}
      <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{post.content}</div>
    </main>
  )
}
