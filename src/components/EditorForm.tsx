import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { useState } from 'react'
import type { Editor } from '@tiptap/react'

function Toolbar({ editor }: { editor: Editor }) {
  const btn = (label: string, action: () => void, active?: boolean) => (
    <button
      type="button"
      onClick={action}
      style={{
        padding: '0.25rem 0.5rem',
        fontWeight: active ? 'bold' : 'normal',
        background: active ? '#ddd' : 'transparent',
        border: '1px solid #ccc',
        borderRadius: '3px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', padding: '0.5rem', border: '1px solid #ccc', borderBottom: 'none' }}>
      {btn('B', () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
      {btn('I', () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
      {btn('S', () => editor.chain().focus().toggleStrike().run(), editor.isActive('strike'))}
      {btn('Code', () => editor.chain().focus().toggleCode().run(), editor.isActive('code'))}
      <span style={{ width: '1px', background: '#ccc', margin: '0 0.25rem' }} />
      {btn('H1', () => editor.chain().focus().toggleHeading({ level: 1 }).run(), editor.isActive('heading', { level: 1 }))}
      {btn('H2', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }))}
      {btn('H3', () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }))}
      <span style={{ width: '1px', background: '#ccc', margin: '0 0.25rem' }} />
      {btn('• List', () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'))}
      {btn('1. List', () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'))}
      {btn('Quote', () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'))}
      <span style={{ width: '1px', background: '#ccc', margin: '0 0.25rem' }} />
      {btn('Left', () => editor.chain().focus().setTextAlign('left').run(), editor.isActive({ textAlign: 'left' }))}
      {btn('Center', () => editor.chain().focus().setTextAlign('center').run(), editor.isActive({ textAlign: 'center' }))}
      {btn('Right', () => editor.chain().focus().setTextAlign('right').run(), editor.isActive({ textAlign: 'right' }))}
    </div>
  )
}

interface EditorFormValues {
  title: string
  slug: string
  published: boolean
  markdown: string
}

interface EditorFormProps {
  initialValues?: Partial<EditorFormValues>
  onSubmit: (values: EditorFormValues) => Promise<void>
  submitLabel?: string
}

export function EditorForm({ initialValues = {}, onSubmit, submitLabel = 'Save' }: EditorFormProps) {
  const [title, setTitle] = useState(initialValues.title ?? '')
  const [slug, setSlug] = useState(initialValues.slug ?? '')
  const [published, setPublished] = useState(initialValues.published ?? false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    onCreate({ editor }) {
      if (initialValues.markdown) {
        editor.commands.setContent(initialValues.markdown)
      }
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editor) return

    setSubmitting(true)
    setError(null)

    try {
      await onSubmit({
        title,
        slug,
        published,
        markdown: editor.getHTML(),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={e => setPublished(e.target.checked)}
        />
        <label htmlFor="published">Published</label>
      </div>

      <div>
        <label>Content</label>
        <div style={{ marginTop: '0.25rem' }}>
          {editor && <Toolbar editor={editor} />}
          <EditorContent
            editor={editor}
            style={{ border: '1px solid #ccc', minHeight: '300px', padding: '0.5rem' }}
          />
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
