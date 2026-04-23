import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { useAuth } from '../context/AuthContext'
import { BrNotFound } from '../components/BrNotFound'
import type { ContentPost } from './content'

const ADMIN_GITHUB_USERNAME = 'minju25kim'

async function fetchPost(slug: string, isAdmin: boolean): Promise<ContentPost> {
  let query = supabase
    .from('content')
    .select('id, type, title, slug, markdown, created_at, updated_at')
    .eq('slug', slug)

  if (!isAdmin) query = query.eq('published', true)

  const { data, error } = await query.single()

  if (error || !data) throw notFound()
  return data
}

export const Route = createFileRoute('/content_/$slug')({
  loader: ({ params, context }) => {
    const isAdmin = context.session?.user?.user_metadata?.user_name === ADMIN_GITHUB_USERNAME
    return fetchPost(params.slug, isAdmin)
  },
  staleTime: 60_000,
  component: ContentPostPage,
  notFoundComponent: () => <BrNotFound label="POST" backTo="/content" backLabel="ALL POSTS" />,
})

function ContentPostPage() {
  const post = Route.useLoaderData()
  const { isAdmin } = useAuth()

  const BR = {
    ink: 'var(--br-ink)',
    hot: 'var(--br-hot)',
    font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
  }

  return (
    <main style={{ maxWidth: 720, padding: '0 32px 64px', fontFamily: BR.font, color: BR.ink }}>
      <div style={{ paddingTop: 48, paddingBottom: 32, borderBottom: `3px solid ${BR.ink}`, marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Link
            to="/content"
            style={{ fontSize: 12, color: BR.ink, opacity: 0.6, display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            ← Content
          </Link>
          {isAdmin && (
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href="/content/manage"
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: BR.ink, border: `2px solid ${BR.ink}`, padding: '3px 10px', textDecoration: 'none' }}
              >
                ALL
              </a>
              <a
                href={`/content/edit/${post.slug}`}
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: BR.hot, border: `2px solid ${BR.hot}`, padding: '3px 10px', textDecoration: 'none' }}
              >
                EDIT
              </a>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ fontFamily: BR.font, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: BR.ink, opacity: 0.5 }}>{post.type}</span>
          {post.created_at && (
            <span style={{ fontSize: 12, color: BR.ink, opacity: 0.6 }}>
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          )}
        </div>
        <h1 style={{ margin: 0, color: BR.ink, fontFamily: BR.font, fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, textTransform: 'uppercase' }}>
          {post.title}
        </h1>
      </div>
      <MarkdownRenderer content={post.markdown ?? ''} />
    </main>
  )
}
