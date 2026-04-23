import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { EditorForm } from '../components/EditorForm'

const ADMIN_GITHUB_USERNAME = 'minju25kim'

export const Route = createFileRoute('/content_/new')({
  beforeLoad: ({ context }) => {
    const username = context.session?.user?.user_metadata?.user_name
    if (username !== ADMIN_GITHUB_USERNAME) throw redirect({ to: '/admin' })
  },
  component: NewPostPage,
})

function NewPostPage() {
  const navigate = useNavigate()

  const handleSubmit = async ({ type, title, slug, published, markdown }: {
    type: string
    title: string
    slug: string
    published: boolean
    markdown: string
  }) => {
    const { error } = await supabase.from('content').insert({
      type,
      title,
      slug,
      published,
      markdown,
      author_id: (await supabase.auth.getUser()).data.user?.id,
    })

    if (error) throw new Error(error.message)
    navigate({ to: '/content' })
  }

  return (
    <main style={{ background: 'var(--br-bg)', color: 'var(--br-ink)', flex: 1 }}>
      <div style={{ padding: '28px 28px 0', borderBottom: '3px solid var(--br-ink)', paddingBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.15em', fontFamily: '"JetBrains Mono", monospace' }}>
          ━━ CONTENT / NEW POST
        </div>
      </div>
      <EditorForm onSubmit={handleSubmit} submitLabel="Publish" />
    </main>
  )
}
