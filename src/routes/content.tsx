import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export type ContentPostSummary = {
  id: string
  type: string
  title: string
  slug: string
  created_at: string | null
}

export type ContentPost = ContentPostSummary & {
  markdown: string | null
  updated_at: string | null
}

const PAGE_SIZE = 20

async function fetchInitial(): Promise<ContentPostSummary[]> {
  const { data, error } = await supabase
    .from('content')
    .select('id, type, title, slug, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(0, PAGE_SIZE - 1)

  if (error) throw error
  return data
}

async function fetchPage(offset: number): Promise<ContentPostSummary[]> {
  const { data, error } = await supabase
    .from('content')
    .select('id, type, title, slug, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1)

  if (error) throw error
  return data
}

export const Route = createFileRoute('/content')({
  loader: fetchInitial,
  staleTime: 60_000,
  component: ContentPage,
})

function ContentPage() {
  const initial = Route.useLoaderData()
  const [posts, setPosts] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initial.length === PAGE_SIZE)

  async function loadMore() {
    setLoading(true)
    const next = await fetchPage(posts.length)
    setPosts(prev => [...prev, ...next])
    setHasMore(next.length === PAGE_SIZE)
    setLoading(false)
  }

  return (
    <main>
      <header className="page-header">
        <h1 style={{ margin: 0 }}>Content</h1>
      </header>

      {posts.length === 0 && (
        <p style={{ padding: '2rem', color: 'var(--text)' }}>No posts yet.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
            <Link
              to="/content/$slug"
              params={{ slug: post.slug }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                padding: '1.25rem 2rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--code-bg)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span className="content-type-badge">{post.type}</span>
              <span style={{ color: 'var(--text-h)', fontWeight: 500, flex: 1 }}>
                {post.title}
              </span>
              {post.created_at && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text)', flexShrink: 0 }}>
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div style={{ padding: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: loading ? 'var(--text)' : 'var(--accent)',
              background: 'transparent',
              border: '1px solid',
              borderColor: loading ? 'var(--border)' : 'var(--accent-border)',
              borderRadius: '100px',
              padding: '0.5rem 1.5rem',
              cursor: loading ? 'default' : 'pointer',
              transition: 'all 0.15s ease',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </main>
  )
}
