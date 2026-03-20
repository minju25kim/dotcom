import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { ContentPost } from './content'

async function fetchPost(slug: string): Promise<ContentPost> {
  const { data, error } = await supabase
    .from('content')
    .select('id, type, title, slug, markdown, created_at, updated_at')
    .eq('slug', slug)
    .single()

  if (error || !data) throw notFound()
  return data
}

export const Route = createFileRoute('/content_/$slug')({
  loader: ({ params }) => fetchPost(params.slug),
  staleTime: 60_000,
  component: ContentPostPage,
  notFoundComponent: () => <p>Post not found.</p>,
})

function ContentPostPage() {
  const post = Route.useLoaderData()

  return (
    <main style={{ maxWidth: '720px', padding: '0 2rem 4rem' }}>
      <div style={{ padding: '3rem 0 2rem', borderBottom: '1px solid var(--border)', marginBottom: '2.5rem' }}>
        <Link
          to="/content"
          style={{ fontSize: '0.8rem', color: 'var(--text)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.5rem' }}
        >
          ← Content
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="content-type-badge" style={{ margin: 0 }}>{post.type}</span>
          {post.created_at && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text)' }}>
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          )}
        </div>
        <h1 style={{ margin: 0 }}>{post.title}</h1>
      </div>
      <MarkdownRenderer content={post.markdown ?? ''} />
    </main>
  )
}
