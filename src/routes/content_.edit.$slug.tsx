import { createFileRoute, redirect, notFound, useNavigate } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { EditorForm } from '../components/EditorForm'
import type { ContentPost } from './content'

export const Route = createFileRoute('/content_/edit/$slug')({
  beforeLoad: ({ context }) => {
    if (!context.session) throw redirect({ to: '/admin' })
  },
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from('content')
      .select('id, title, slug, published, markdown, created_at, updated_at')
      .eq('slug', params.slug)
      .single()

    if (error || !data) throw notFound()
    return data as ContentPost & { published: boolean }
  },
  component: EditPostPage,
  notFoundComponent: () => <p>Post not found.</p>,
})

function EditPostPage() {
  const post = Route.useLoaderData()
  const navigate = useNavigate()

  const handleSubmit = async ({ title, slug, published, markdown }: {
    title: string
    slug: string
    published: boolean
    markdown: string
  }) => {
    const { error } = await supabase
      .from('content')
      .update({ title, slug, published, markdown, updated_at: new Date().toISOString() })
      .eq('id', post.id)

    if (error) throw new Error(error.message)
    navigate({ to: '/content/$slug', params: { slug } })
  }

  return (
    <div>
      <h1 style={{ padding: '2rem 2rem 0' }}>Edit Post</h1>
      <EditorForm
        initialValues={{ title: post.title, slug: post.slug, published: post.published, markdown: post.markdown ?? undefined }}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
    </div>
  )
}
