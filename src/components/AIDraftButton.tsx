import { useState } from 'react'

interface AIDraftButtonProps {
  onInsertDraft: (draft: string) => void
}

export function AIDraftButton({ onInsertDraft }: AIDraftButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)

  const generateDraft = async () => {
    if (!transcript.trim()) return

    setLoading(true)
    try {
      // Extract key information from transcript
      const lines = transcript.split('\n')

      // Find summary/main points
      const summary: string[] = []
      const keyPoints: string[] = []
      const codeSnippets: string[] = []
      let currentSection = 'general'

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue

        if (trimmed.toLowerCase().includes('summary') || trimmed.toLowerCase().includes('overview')) {
          currentSection = 'summary'
        } else if (trimmed.toLowerCase().includes('code') || trimmed.toLowerCase().includes('example')) {
          currentSection = 'code'
        } else if (trimmed.toLowerCase().includes('learned') || trimmed.toLowerCase().includes('point')) {
          currentSection = 'points'
        } else if (trimmed.startsWith('```')) {
          currentSection = 'code'
        } else {
          if (currentSection === 'summary') {
            summary.push(trimmed)
          } else if (currentSection === 'points') {
            keyPoints.push(trimmed)
          } else if (currentSection === 'code') {
            codeSnippets.push(trimmed)
          }
        }
      }

      // Build markdown draft
      let draft = '## Summary\n\n'

      if (summary.length > 0) {
        draft += summary.slice(0, 3).join(' ') + '\n\n'
      } else {
        draft += 'Add a brief summary of what this post covers.\n\n'
      }

      draft += '## What I Learned\n\n'
      if (keyPoints.length > 0) {
        keyPoints.slice(0, 5).forEach(point => {
          draft += `- ${point}\n`
        })
      } else {
        draft += '- Key insight 1\n- Key insight 2\n- Key insight 3\n'
      }

      draft += '\n## Key Code\n\n'
      if (codeSnippets.length > 0) {
        draft += '```\n'
        draft += codeSnippets.slice(0, 10).join('\n')
        draft += '\n```\n'
      } else {
        draft += '```\nAdd code examples here\n```\n'
      }

      draft += '\n## Notes\n\n'
      draft += 'Add any additional notes or references here.\n'

      onInsertDraft(draft)
      setShowModal(false)
      setTranscript('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        style={{
          padding: '0.5rem 1rem',
          background: 'var(--accent-bg)',
          color: 'var(--accent)',
          border: '1px solid var(--accent-border)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        AI Draft from Transcript
      </button>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: 'var(--shadow)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, color: 'var(--text-h)' }}>Generate Draft from Transcript</h2>
            <p style={{ color: 'var(--text)', marginBottom: '1rem' }}>
              Paste a Claude session transcript below. The AI Draft helper will extract key points, code snippets, and structure them into a blog post.
            </p>

            <textarea
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              placeholder="Paste your Claude conversation transcript here..."
              style={{
                width: '100%',
                minHeight: '300px',
                padding: '1rem',
                fontFamily: 'var(--mono)',
                fontSize: '0.85rem',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                background: 'var(--code-bg)',
                color: 'var(--text)',
                boxSizing: 'border-box',
                marginBottom: '1rem',
              }}
            />

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={generateDraft}
                disabled={loading || !transcript.trim()}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'var(--accent-bg)',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: '4px',
                  cursor: loading || !transcript.trim() ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  opacity: loading || !transcript.trim() ? 0.6 : 1,
                }}
              >
                {loading ? 'Generating...' : 'Generate Draft'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
