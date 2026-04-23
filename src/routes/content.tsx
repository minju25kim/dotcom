import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

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

const BR = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  soft: 'var(--br-soft)',
  font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(2)
  return `${dd}/${mm}/${yy}`
}

function CategoryBadge({ cat, inverted = false }: { cat: string; inverted?: boolean }) {
  const isPy = cat === 'PY3' || cat.toLowerCase().includes('py')
  return (
    <span style={{
      background: inverted ? 'white' : (isPy ? BR.hot : BR.ink),
      color: inverted ? (isPy ? BR.hot : '#0a0a0a') : BR.bg,
      textAlign: 'center',
      padding: '2px 4px',
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '0.05em',
      display: 'inline-block',
      minWidth: 36,
    }}>
      {cat.toUpperCase().slice(0, 4)}
    </span>
  )
}

function ContentPage() {
  const initial = Route.useLoaderData()
  const { isAdmin } = useAuth()
  const [posts, setPosts] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initial.length === PAGE_SIZE)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  async function loadMore() {
    setLoading(true)
    const next = await fetchPage(posts.length)
    setPosts(prev => [...prev, ...next])
    setHasMore(next.length === PAGE_SIZE)
    setLoading(false)
  }

  // Build filter counts from loaded posts
  const typeCounts = posts.reduce<Record<string, number>>((acc, p) => {
    const t = p.type?.toUpperCase() ?? 'DEV'
    acc[t] = (acc[t] ?? 0) + 1
    return acc
  }, {})

  const filterTags = [
    ['ALL', null, posts.length],
    ...Object.entries(typeCounts).map(([k, n]) => [k, k, n] as [string, string, number]),
  ] as [string, string | null, number][]

  const visible = activeFilter
    ? posts.filter(p => (p.type?.toUpperCase() ?? 'DEV') === activeFilter)
    : posts

  const firstId = visible[0]?.id

  return (
    <main style={{
      background: BR.bg,
      color: BR.ink,
      fontFamily: BR.font,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Page header */}
      <div style={{ padding: '22px 28px 18px', borderBottom: `3px solid ${BR.ink}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em' }}>
            ━━ CONTENT / {posts.length} POSTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </div>
          {isAdmin && (
            <a
              href="/content/manage"
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: BR.hot, border: `2px solid ${BR.hot}`, padding: '2px 8px', textDecoration: 'none', flexShrink: 0 }}
            >
              MANAGE
            </a>
          )}
        </div>
        <div style={{
          fontSize: 'clamp(48px, 6vw, 96px)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          marginTop: 8,
        }}>
          NOTES.
        </div>
        <div style={{ marginTop: 10, fontSize: 13, maxWidth: 620 }}>
          Dev notes, tips, snippets. Mostly leetcode, mostly python and typescript, sometimes life.
        </div>
      </div>

      {/* Filter row */}
      <div style={{
        padding: '14px 28px',
        borderBottom: `3px solid ${BR.ink}`,
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, letterSpacing: '0.15em', marginRight: 4 }}>FILTER:</span>
        {filterTags.map(([label, value, count], i) => (
          <button
            key={i}
            onClick={() => setActiveFilter(value)}
            style={{
              border: `2px solid ${BR.ink}`,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700,
              background: activeFilter === value ? BR.ink : 'transparent',
              color: activeFilter === value ? BR.bg : BR.ink,
              cursor: 'pointer',
              fontFamily: BR.font,
            }}
          >
            {label} · {count}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11 }}>SORT: NEWEST FIRST ↓</span>
      </div>

      {/* Posts table */}
      {visible.length === 0 ? (
        <div style={{ padding: 28, fontSize: 13, opacity: 0.5 }}>No posts yet.</div>
      ) : (
        visible.map((post) => {
          const isPinned = post.id === firstId
          return (
            <Link
              key={post.id}
              to="/content/$slug"
              params={{ slug: post.slug }}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 60px 1fr 40px',
                gap: 16,
                padding: '14px 28px',
                alignItems: 'center',
                borderBottom: `1px solid ${BR.ink}`,
                background: isPinned ? BR.hot : 'transparent',
                color: isPinned ? 'white' : BR.ink,
                fontSize: 13,
                textDecoration: 'none',
              }}
              className="content-row"
            >
              <span style={{ fontSize: 11 }}>
                {post.created_at ? formatDate(post.created_at) : '—'}
              </span>
              <CategoryBadge cat={post.type ?? 'DEV'} inverted={isPinned} />
              <span style={{ fontWeight: isPinned ? 900 : 400 }}>
                {isPinned && '★ '}{post.title}
              </span>
              <span style={{ textAlign: 'right' }}>↗</span>
            </Link>
          )
        })
      )}

      {/* Load more */}
      {hasMore && (
        <div style={{ padding: 28, borderTop: `3px solid ${BR.ink}`, textAlign: 'center' }}>
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              border: `2px solid ${BR.ink}`,
              padding: '8px 24px',
              fontSize: 11,
              fontWeight: 700,
              background: 'transparent',
              color: BR.ink,
              cursor: loading ? 'default' : 'pointer',
              fontFamily: BR.font,
              opacity: loading ? 0.5 : 1,
              letterSpacing: '0.1em',
            }}
          >
            {loading ? 'LOADING...' : 'LOAD MORE ↓'}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 1279px) {
          .content-row {
            grid-template-columns: 60px 1fr 18px !important;
            gap: 8px !important;
          }
          .content-row > span:first-child { display: none; }
        }
      `}</style>
    </main>
  )
}
