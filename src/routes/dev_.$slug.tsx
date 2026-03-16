import { createFileRoute, notFound } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { DevPost } from './dev'

async function fetchPost(slug: string): Promise<DevPost> {
  const { data, error } = await supabase
    .from('dev')
    .select('id, title, slug, markdown, created_at, updated_at')
    .eq('slug', slug)
    .single()

  if (error || !data) throw notFound()
  return data
}

export const Route = createFileRoute('/dev_/$slug')({
  loader: ({ params }) => fetchPost(params.slug),
  staleTime: 60_000,
  component: DevPostPage,
  notFoundComponent: () => <p>Post not found.</p>,
})

function DevPostPage() {
  const post = Route.useLoaderData()

  return (
    <main style={{ padding: '1rem', maxWidth: '720px' }}>
      <h1>{post.title}</h1>
      {post.created_at && (
        <p style={{ fontSize: '0.85rem', color: '#888' }}>
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      )}
      <MarkdownRenderer content={post.markdown ?? ''} />
    </main>
  )
}
