import { createFileRoute, redirect, notFound, useNavigate } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { EditorForm } from '../components/EditorForm'
import type { ContentPost } from './content'

const ADMIN_GITHUB_USERNAME = 'minju25kim'

export const Route = createFileRoute('/content_/edit/$slug')({
  beforeLoad: ({ context }) => {
    const username = context.session?.user?.user_metadata?.user_name
    if (username !== ADMIN_GITHUB_USERNAME) throw redirect({ to: '/admin' })
  },
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from('content')
      .select('id, type, title, slug, published, markdown, created_at, updated_at')
      .eq('slug', params.slug)
      .single()

    if (error || !data) throw notFound()
    return data as ContentPost & { type: string; published: boolean }
  },
  component: EditPostPage,
  notFoundComponent: () => <p>Post not found.</p>,
})

function EditPostPage() {
  const post = Route.useLoaderData()
  const navigate = useNavigate()

  const handleSubmit = async ({ type, title, slug, published, markdown }: {
    type: string
    title: string
    slug: string
    published: boolean
    markdown: string
  }) => {
    const { error } = await supabase
      .from('content')
      .update({ type, title, slug, published, markdown, updated_at: new Date().toISOString() })
      .eq('id', post.id)

    if (error) throw new Error(error.message)
    navigate({ to: '/content/$slug', params: { slug } })
  }

  return (
    <main style={{ background: 'var(--br-bg)', color: 'var(--br-ink)', flex: 1 }}>
      <div style={{ padding: '28px 28px 18px', borderBottom: '3px solid var(--br-ink)' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.15em', fontFamily: '"JetBrains Mono", monospace' }}>
          ━━ CONTENT / EDIT — {post.slug}
        </div>
      </div>
      <EditorForm
        initialValues={{ type: post.type, title: post.title ?? '', slug: post.slug ?? '', published: post.published, markdown: post.markdown ?? '' }}
        currentId={post.id}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
    </main>
  )
}
