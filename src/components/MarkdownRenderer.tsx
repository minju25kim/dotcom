import ReactMarkdown from 'react-markdown'

export function MarkdownRenderer({ content }: { content: string }) {
  const markdownComponents = {
    h1: ({ children }: any) => <h1 style={{ fontSize: '1.6rem', marginTop: '2em', marginBottom: '0.5em', color: 'var(--text-h)', fontWeight: 500, lineHeight: 1.3 }}>{children}</h1>,
    h2: ({ children }: any) => <h2 style={{ fontSize: '1.25rem', marginTop: '2em', marginBottom: '0.5em', color: 'var(--text-h)', fontWeight: 500, lineHeight: 1.3 }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ fontSize: '1rem', marginTop: '1.25em', marginBottom: '0.5em', color: 'var(--text-h)', fontWeight: 500, lineHeight: 1.3 }}>{children}</h3>,
    p: ({ children }: any) => <p style={{ margin: '1.25em 0', color: 'var(--text)', lineHeight: 1.8 }}>{children}</p>,
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
          margin: '1.25em 0',
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
          margin: '1.25em 0',
          color: 'var(--text)',
          fontStyle: 'italic',
        }}
      >
        {children}
      </blockquote>
    ),
    ul: ({ children }: any) => (
      <ul style={{ paddingLeft: '1.5rem', margin: '1.25em 0', color: 'var(--text)' }}>{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol style={{ paddingLeft: '1.5rem', margin: '1.25em 0', color: 'var(--text)' }}>{children}</ol>
    ),
    li: ({ children }: any) => <li style={{ margin: '0.35em 0' }}>{children}</li>,
    a: ({ children, href }: any) => (
      <a href={href} style={{ color: 'var(--accent)', textDecoration: 'underline' } as any}>
        {children}
      </a>
    ),
  }

  return (
    <div className="prose">
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  )
}
