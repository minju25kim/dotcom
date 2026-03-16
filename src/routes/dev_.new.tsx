import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { EditorForm } from '../components/EditorForm'

export const Route = createFileRoute('/dev_/new')({
  beforeLoad: ({ context }) => {
    if (!context.session) throw redirect({ to: '/admin' })
  },
  component: NewPostPage,
})

function NewPostPage() {
  const navigate = useNavigate()

  const handleSubmit = async ({ title, slug, published, markdown }: {
    title: string
    slug: string
    published: boolean
    markdown: string
  }) => {
    const { error } = await supabase.from('dev').insert({
      title,
      slug,
      published,
      markdown,
      author_id: (await supabase.auth.getUser()).data.user?.id,
    })

    if (error) throw new Error(error.message)
    navigate({ to: '/dev' })
  }

  return (
    <div>
      <h1 style={{ padding: '2rem 2rem 0' }}>New Post</h1>
      <EditorForm onSubmit={handleSubmit} submitLabel="Publish" />
    </div>
  )
}
