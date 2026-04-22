import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useIsMobile } from '../hooks/useIsMobile'
import { AIDraftButton } from './AIDraftButton'

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

type TabMode = 'write' | 'preview'

export function EditorForm({ initialValues = {}, onSubmit, submitLabel = 'Save' }: EditorFormProps) {
  const [title, setTitle] = useState(initialValues.title ?? '')
  const [slug, setSlug] = useState(initialValues.slug ?? '')
  const [published, setPublished] = useState(initialValues.published ?? false)
  const [markdown, setMarkdown] = useState(initialValues.markdown ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<TabMode>('write')
  const isMobile = useIsMobile()

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
  }

  const handleSlugChange = (newSlug: string) => {
    setSlug(newSlug)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setSubmitting(true)
    setError(null)

    try {
      await onSubmit({
        title,
        slug,
        published,
        markdown,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const markdownComponents = {
    h1: ({ children }: any) => <h1 style={{ fontSize: '1.6rem', marginTop: '1.5em', marginBottom: '0.5em', color: 'var(--text-h)' }}>{children}</h1>,
    h2: ({ children }: any) => <h2 style={{ fontSize: '1.25rem', marginTop: '1.5em', marginBottom: '0.5em', color: 'var(--text-h)' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ fontSize: '1rem', marginTop: '1.25em', marginBottom: '0.5em', color: 'var(--text-h)' }}>{children}</h3>,
    p: ({ children }: any) => <p style={{ margin: '1em 0', color: 'var(--text)', lineHeight: '1.8' }}>{children}</p>,
    code: ({ children, node }: any) => {
      const isInline = node?.tagName !== 'pre'
      return isInline ? (
        <code
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.85em',
            background: 'var(--code-bg)',
            padding: '2px 6px',
            borderRadius: '4px',
            color: 'var(--text-h)',
          }}
        >
          {children}
        </code>
      ) : (
        <code
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.875rem',
            lineHeight: '1.6',
          }}
        >
          {children}
        </code>
      )
    },
    pre: ({ children }: any) => (
      <pre
        style={{
          background: 'var(--code-bg)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '1.25rem',
          overflowX: 'auto',
          margin: '1em 0',
        }}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        style={{
          borderLeft: '3px solid var(--accent)',
          paddingLeft: '1.25rem',
          margin: '1em 0',
          color: 'var(--text)',
          fontStyle: 'italic',
        }}
      >
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => (
      <ul style={{ paddingLeft: '1.5rem', margin: '1em 0', color: 'var(--text)' }}>{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol style={{ paddingLeft: '1.5rem', margin: '1em 0', color: 'var(--text)' }}>{children}</ol>
    ),
    li: ({ children }: any) => <li style={{ margin: '0.35em 0' }}>{children}</li>,
    a: ({ children, href }: any) => (
      <a href={href} style={{ color: 'var(--accent)', textDecoration: 'underline' } as any}>
        {children}
      </a>
    ),
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={e => handleSlugChange(e.target.value)}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label>Content</label>
          <AIDraftButton onInsertDraft={setMarkdown} />
        </div>
        <div style={{ marginTop: '0.25rem' }}>
          {/* Tab toggle for mobile, hidden on desktop */}
          {isMobile && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.5rem',
                background: 'var(--code-bg)',
                borderTop: '1px solid var(--border)',
                borderLeft: '1px solid var(--border)',
                borderRight: '1px solid var(--border)',
                borderRadius: '6px 6px 0 0',
              }}
            >
              <button
                type="button"
                onClick={() => setMode('write')}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  background: mode === 'write' ? 'var(--bg)' : 'transparent',
                  color: 'var(--text)',
                  border: mode === 'write' ? '1px solid var(--border)' : 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: mode === 'write' ? 'bold' : 'normal',
                  fontSize: '0.875rem',
                }}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setMode('preview')}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  background: mode === 'preview' ? 'var(--bg)' : 'transparent',
                  color: 'var(--text)',
                  border: mode === 'preview' ? '1px solid var(--border)' : 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: mode === 'preview' ? 'bold' : 'normal',
                  fontSize: '0.875rem',
                }}
              >
                Preview
              </button>
            </div>
          )}

          {/* Editor pane */}
          {(!isMobile || mode === 'write') && (
            <textarea
              value={markdown}
              onChange={e => setMarkdown(e.target.value)}
              placeholder="Enter your markdown content here..."
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: isMobile ? (mode === 'write' ? '0 0 6px 6px' : '0') : '0',
                borderTop: isMobile ? 'none' : '1px solid var(--border)',
                minHeight: isMobile ? '400px' : '500px',
                resize: 'vertical',
                background: 'var(--bg)',
                color: 'var(--text)',
                width: isMobile ? '100%' : '50%',
                boxSizing: 'border-box',
                float: isMobile ? undefined : 'left',
              } as any}
            />
          )}

          {/* Preview pane */}
          {(!isMobile || mode === 'preview') && (
            <div
              style={{
                border: '1px solid var(--border)',
                borderRadius: isMobile ? (mode === 'preview' ? '0 0 6px 6px' : '0') : '0',
                borderLeft: isMobile ? '1px solid var(--border)' : 'none',
                borderTop: isMobile ? 'none' : '1px solid var(--border)',
                minHeight: isMobile ? '400px' : '500px',
                padding: '1rem',
                background: 'var(--bg)',
                width: isMobile ? '100%' : '50%',
                boxSizing: 'border-box',
                float: isMobile ? undefined : 'right',
                overflow: 'auto',
              } as any}
            >
              <div className="prose" style={{ padding: '0' }}>
                <ReactMarkdown components={markdownComponents}>
                  {markdown || '*Nothing to preview yet...*'}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Clear floats on mobile */}
          {!isMobile && <div style={{ clear: 'both' }} />}
        </div>
      </div>

      {error && <p style={{ color: 'var(--accent)' }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
