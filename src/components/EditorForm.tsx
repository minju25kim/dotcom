import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useIsMobile } from '../hooks/useIsMobile'
import { AIDraftButton } from './AIDraftButton'
import { supabase } from '../lib/supabase'

const FONT = '"JetBrains Mono", ui-monospace, Menlo, monospace'

const S = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  soft: 'var(--br-soft)',
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

interface EditorFormValues {
  type: string
  title: string
  slug: string
  published: boolean
  markdown: string
}

interface EditorFormProps {
  initialValues?: Partial<EditorFormValues>
  currentId?: string
  onSubmit: (values: EditorFormValues) => Promise<void>
  submitLabel?: string
}

type TabMode = 'write' | 'preview'

export function EditorForm({ initialValues = {}, currentId, onSubmit, submitLabel = 'Save' }: EditorFormProps) {
  const [type,      setType]      = useState(initialValues.type      ?? 'dev')
  const [title,     setTitle]     = useState(initialValues.title     ?? '')
  const [slug,      setSlug]      = useState(initialValues.slug      ?? '')
  const [published, setPublished] = useState(initialValues.published ?? false)
  const [markdown,  setMarkdown]  = useState(initialValues.markdown  ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState<string | null>(null)
  const [slugError,  setSlugError]  = useState<string | null>(null)
  const [slugManual, setSlugManual] = useState(!!initialValues.slug)
  const [mode, setMode] = useState<TabMode>('write')
  const isMobile = useIsMobile()

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!slugManual) setSlug(toSlug(val))
  }

  const handleSlugChange = (val: string) => {
    const sanitized = val
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
    setSlug(sanitized)
    setSlugManual(true)
    setSlugError(null)
  }

  const checkSlugUnique = async (): Promise<boolean> => {
    let query = supabase
      .from('content')
      .select('id')
      .eq('slug', slug)
    if (currentId) query = query.neq('id', currentId)
    const { data } = await query
    if (data && data.length > 0) {
      setSlugError(`Slug "${slug}" already exists`)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !slug.trim()) return

    setSubmitting(true)
    setError(null)
    setSlugError(null)

    const unique = await checkSlugUnique()
    if (!unique) { setSubmitting(false); return }

    try {
      await onSubmit({ type, title, slug, published, markdown })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 13,
    padding: '8px 10px',
    border: `2px solid ${S.ink}`,
    background: S.bg,
    color: S.ink,
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: S.ink,
    fontFamily: FONT,
    marginBottom: 4,
    display: 'block',
  }

  const markdownComponents = {
    h1: ({ children }: any) => <h1 style={{ fontSize: '1.6rem', marginTop: '1.5em', marginBottom: '0.5em', color: S.ink }}>{children}</h1>,
    h2: ({ children }: any) => <h2 style={{ fontSize: '1.25rem', marginTop: '1.5em', marginBottom: '0.5em', color: S.ink }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ fontSize: '1rem', marginTop: '1.25em', marginBottom: '0.5em', color: S.ink }}>{children}</h3>,
    p:  ({ children }: any) => <p style={{ margin: '1em 0', color: S.ink, lineHeight: '1.8' }}>{children}</p>,
    code: ({ children, node }: any) => {
      const isInline = node?.tagName !== 'pre'
      return isInline ? (
        <code style={{ fontFamily: FONT, fontSize: '0.85em', background: S.soft, border: `1px solid ${S.ink}`, padding: '2px 6px', color: S.ink }}>{children}</code>
      ) : (
        <code style={{ fontFamily: FONT, fontSize: '0.875rem', lineHeight: '1.6' }}>{children}</code>
      )
    },
    pre: ({ children }: any) => (
      <pre style={{ background: S.ink, border: `3px solid ${S.ink}`, padding: '1.25rem', overflowX: 'auto', margin: '1em 0' }}>{children}</pre>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: `4px solid ${S.hot}`, paddingLeft: '1.25rem', margin: '1em 0', color: S.ink, opacity: 0.75, fontStyle: 'italic' }}>{children}</blockquote>
    ),
    ul: ({ children }: any) => <ul style={{ paddingLeft: '1.5rem', margin: '1em 0', color: S.ink }}>{children}</ul>,
    ol: ({ children }: any) => <ol style={{ paddingLeft: '1.5rem', margin: '1em 0', color: S.ink }}>{children}</ol>,
    li: ({ children }: any) => <li style={{ margin: '0.35em 0' }}>{children}</li>,
    a:  ({ children, href }: any) => <a href={href} style={{ color: S.hot, textDecoration: 'underline' }}>{children}</a>,
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 28, fontFamily: FONT }}>

      {/* Type + Published row */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Type</label>
          <div style={{ display: 'flex', border: `2px solid ${S.ink}` }}>
            {(['dev', 'blog'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                style={{
                  padding: '6px 16px', fontSize: 11, fontWeight: 700,
                  fontFamily: FONT, letterSpacing: '0.08em', cursor: 'pointer',
                  background: type === t ? S.ink : S.bg,
                  color: type === t ? S.bg : S.ink,
                  border: 'none',
                  borderRight: t === 'dev' ? `2px solid ${S.ink}` : 'none',
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 2 }}>
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: S.hot, cursor: 'pointer' }}
          />
          <label htmlFor="published" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>Published</label>
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" style={labelStyle}>Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          required
          style={inputStyle}
          placeholder="Post title"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" style={labelStyle}>
          Slug {!slugManual && <span style={{ opacity: 0.5, fontWeight: 400 }}>(auto)</span>}
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={e => handleSlugChange(e.target.value)}
          required
          style={{ ...inputStyle, borderColor: slugError ? S.hot : S.ink }}
          placeholder="url-slug"
        />
        {slugError && (
          <div style={{ fontSize: 11, color: S.hot, marginTop: 4, fontFamily: FONT }}>{slugError}</div>
        )}
      </div>

      {/* Markdown editor */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={labelStyle}>Content</label>
          <AIDraftButton onInsertDraft={setMarkdown} />
        </div>

        {/* Mobile tab toggle */}
        {isMobile && (
          <div style={{ display: 'flex', border: `2px solid ${S.ink}`, marginBottom: -2 }}>
            {(['write', 'preview'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: '6px 0', fontSize: 11, fontWeight: 700,
                  fontFamily: FONT, letterSpacing: '0.08em', cursor: 'pointer',
                  background: mode === m ? S.ink : S.bg,
                  color: mode === m ? S.bg : S.ink,
                  border: 'none',
                  borderRight: m === 'write' ? `2px solid ${S.ink}` : 'none',
                }}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <div>
          {/* Write pane */}
          {(!isMobile || mode === 'write') && (
            <textarea
              value={markdown}
              onChange={e => setMarkdown(e.target.value)}
              placeholder="Write markdown here..."
              style={{
                fontFamily: FONT, fontSize: 13, lineHeight: '1.6',
                padding: '12px', border: `2px solid ${S.ink}`,
                background: S.bg, color: S.ink,
                minHeight: isMobile ? 400 : 500,
                resize: 'vertical',
                width: isMobile ? '100%' : '50%',
                boxSizing: 'border-box',
                float: isMobile ? undefined : 'left',
                outline: 'none',
              } as React.CSSProperties}
            />
          )}

          {/* Preview pane */}
          {(!isMobile || mode === 'preview') && (
            <div style={{
              border: `2px solid ${S.ink}`,
              borderLeft: isMobile ? `2px solid ${S.ink}` : 'none',
              minHeight: isMobile ? 400 : 500,
              padding: '12px 16px',
              background: S.bg,
              width: isMobile ? '100%' : '50%',
              boxSizing: 'border-box',
              float: isMobile ? undefined : 'right',
              overflow: 'auto',
            } as React.CSSProperties}>
              <div className="prose" style={{ padding: 0 }}>
                <ReactMarkdown components={markdownComponents}>
                  {markdown || '*Nothing to preview yet...*'}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {!isMobile && <div style={{ clear: 'both' }} />}
        </div>
      </div>

      {error && (
        <div style={{ fontSize: 12, color: S.hot, padding: '8px 12px', border: `2px solid ${S.hot}`, fontFamily: FONT }}>
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '10px 28px', fontSize: 12, fontWeight: 700,
            fontFamily: FONT, letterSpacing: '0.1em',
            background: submitting ? S.soft : S.ink,
            color: S.bg, border: `2px solid ${S.ink}`,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'SAVING...' : submitLabel.toUpperCase()}
        </button>
      </div>
    </form>
  )
}
