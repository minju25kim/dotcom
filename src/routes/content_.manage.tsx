import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_GITHUB_USERNAME = 'minju25kim'

type AdminPost = {
  id: string
  type: string
  title: string
  slug: string
  published: boolean
  created_at: string | null
  updated_at: string | null
}

async function fetchAllPosts(): Promise<AdminPost[]> {
  const { data, error } = await supabase
    .from('content')
    .select('id, type, title, slug, published, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const Route = createFileRoute('/content_/manage')({
  beforeLoad: ({ context }) => {
    const username = context.session?.user?.user_metadata?.user_name
    if (username !== ADMIN_GITHUB_USERNAME) throw redirect({ to: '/content' })
  },
  loader: fetchAllPosts,
  component: ManagePage,
})

const BR = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(2)
  return `${dd}/${mm}/${yy}`
}

function ManagePage() {
  const initial = Route.useLoaderData()
  const [posts, setPosts] = useState(initial)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const published = posts.filter(p => p.published)
  const drafts = posts.filter(p => !p.published)

  async function handleDelete(id: string) {
    setDeleting(true)
    const { error } = await supabase.from('content').delete().eq('id', id)
    setDeleting(false)
    if (!error) {
      setPosts(prev => prev.filter(p => p.id !== id))
      setConfirmId(null)
    }
  }

  return (
    <main style={{ background: BR.bg, color: BR.ink, fontFamily: BR.font, flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '22px 28px 18px', borderBottom: `3px solid ${BR.ink}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 6 }}>
              ━━ CONTENT / MANAGE ━━━━━━━━━━━━━━━━━━
            </div>
            <div style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, textTransform: 'uppercase' }}>
              ALL POSTS
            </div>
          </div>
          <a
            href="/content/new"
            style={{
              padding: '10px 24px',
              background: BR.ink,
              color: BR.bg,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              flexShrink: 0,
              alignSelf: 'flex-end',
            }}
          >
            + NEW POST
          </a>
        </div>

        {/* Stats row */}
        <div style={{ marginTop: 14, display: 'flex', gap: 24, fontSize: 12 }}>
          <span><strong>{posts.length}</strong> TOTAL</span>
          <span style={{ color: 'var(--br-hot)' }}><strong>{published.length}</strong> LIVE</span>
          <span style={{ opacity: 0.5 }}><strong>{drafts.length}</strong> DRAFT</span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '90px 50px 1fr 60px 80px 130px',
        gap: 12,
        padding: '8px 28px',
        borderBottom: `3px solid ${BR.ink}`,
        fontSize: 10,
        letterSpacing: '0.15em',
        opacity: 0.5,
      }} className="manage-row-header">
        <span>DATE</span>
        <span>TYPE</span>
        <span>TITLE</span>
        <span>STATUS</span>
        <span>UPDATED</span>
        <span>ACTIONS</span>
      </div>

      {/* Post rows */}
      {posts.length === 0 ? (
        <div style={{ padding: 28, fontSize: 13, opacity: 0.5 }}>No posts yet.</div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '90px 50px 1fr 60px 80px 130px',
              gap: 12,
              padding: '12px 28px',
              alignItems: 'center',
              borderBottom: `1px solid ${BR.ink}`,
              fontSize: 13,
              background: post.published ? 'transparent' : `color-mix(in srgb, ${BR.ink} 4%, ${BR.bg})`,
            }}
            className="manage-row"
          >
            {/* Date */}
            <span style={{ fontSize: 11, opacity: 0.6 }}>
              {post.created_at ? formatDate(post.created_at) : '—'}
            </span>

            {/* Type badge */}
            <span style={{
              background: BR.ink,
              color: BR.bg,
              padding: '2px 4px',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.05em',
              display: 'inline-block',
              textAlign: 'center',
            }}>
              {(post.type ?? 'DEV').toUpperCase().slice(0, 4)}
            </span>

            {/* Title */}
            <span style={{ fontWeight: post.published ? 400 : 700, opacity: post.published ? 1 : 0.6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {post.title}
            </span>

            {/* Status badge */}
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '2px 6px',
              background: post.published ? BR.hot : 'transparent',
              color: post.published ? 'white' : BR.ink,
              border: post.published ? 'none' : `2px solid ${BR.ink}`,
              display: 'inline-block',
              opacity: post.published ? 1 : 0.5,
            }}>
              {post.published ? 'LIVE' : 'DRAFT'}
            </span>

            {/* Updated */}
            <span style={{ fontSize: 11, opacity: 0.5 }}>
              {post.updated_at ? formatDate(post.updated_at) : '—'}
            </span>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Link
                to="/content/$slug"
                params={{ slug: post.slug }}
                style={{ fontSize: 11, color: BR.ink, opacity: 0.7, textDecoration: 'none' }}
                title="Preview"
              >
                ↗
              </Link>
              <a
                href={`/content/edit/${post.slug}`}
                style={{ fontSize: 11, fontWeight: 700, color: BR.hot, textDecoration: 'none' }}
                title="Edit"
              >
                EDIT
              </a>
              {confirmId === post.id ? (
                <>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting}
                    style={{
                      fontSize: 10, fontWeight: 900, letterSpacing: '0.05em',
                      background: BR.ink, color: BR.bg,
                      border: 'none', padding: '2px 6px', cursor: deleting ? 'default' : 'pointer',
                      fontFamily: BR.font, opacity: deleting ? 0.5 : 1,
                    }}
                  >
                    {deleting ? '…' : 'SURE?'}
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    disabled={deleting}
                    style={{
                      fontSize: 10, fontWeight: 700,
                      background: 'transparent', color: BR.ink,
                      border: `1px solid ${BR.ink}`, padding: '2px 5px', cursor: 'pointer',
                      fontFamily: BR.font, opacity: 0.5,
                    }}
                  >
                    NO
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setConfirmId(post.id)}
                  style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                    background: 'transparent', color: BR.ink,
                    border: `1px solid ${BR.ink}`, padding: '2px 5px', cursor: 'pointer',
                    fontFamily: BR.font, opacity: 0.4,
                  }}
                >
                  DEL
                </button>
              )}
            </div>
          </div>
        ))
      )}

      <style>{`
        @media (max-width: 1279px) {
          .manage-row-header { display: none !important; }
          .manage-row {
            grid-template-columns: 50px 1fr 50px 60px !important;
            gap: 8px !important;
          }
          .manage-row > span:nth-child(1) { display: none; }
          .manage-row > span:nth-child(5) { display: none; }
        }
      `}</style>
    </main>
  )
}
