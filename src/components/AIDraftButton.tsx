import { useState } from 'react'

const FONT = '"JetBrains Mono", ui-monospace, Menlo, monospace'
const S = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  soft: 'var(--br-soft)',
}

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
      const lines = transcript.split('\n')
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
          if (currentSection === 'summary') summary.push(trimmed)
          else if (currentSection === 'points') keyPoints.push(trimmed)
          else if (currentSection === 'code') codeSnippets.push(trimmed)
        }
      }

      let draft = '## Summary\n\n'
      draft += summary.length > 0 ? summary.slice(0, 3).join(' ') + '\n\n' : 'Add a brief summary.\n\n'
      draft += '## What I Learned\n\n'
      if (keyPoints.length > 0) keyPoints.slice(0, 5).forEach(p => { draft += `- ${p}\n` })
      else draft += '- Key insight 1\n- Key insight 2\n- Key insight 3\n'
      draft += '\n## Key Code\n\n'
      if (codeSnippets.length > 0) { draft += '```\n' + codeSnippets.slice(0, 10).join('\n') + '\n```\n' }
      else draft += '```\nAdd code examples here\n```\n'
      draft += '\n## Notes\n\nAdd any additional notes or references here.\n'

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
          padding: '4px 12px',
          background: 'transparent',
          color: S.hot,
          border: `2px solid ${S.hot}`,
          cursor: 'pointer',
          fontSize: 11,
          fontWeight: 700,
          fontFamily: FONT,
          letterSpacing: '0.08em',
        }}
      >
        AI DRAFT
      </button>

      {showModal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{ background: S.bg, border: `3px solid ${S.ink}`, padding: 28, maxWidth: 600, width: '90%', maxHeight: '80vh', overflow: 'auto', fontFamily: FONT }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, color: S.ink }}>
              DRAFT FROM TRANSCRIPT
            </div>
            <p style={{ fontSize: 12, color: S.ink, opacity: 0.7, marginBottom: 16, marginTop: 0 }}>
              Paste a session transcript. Extracts key points, code, and structures into a post draft.
            </p>
            <textarea
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              placeholder="Paste transcript here..."
              style={{
                width: '100%', minHeight: 280, padding: 12,
                fontFamily: FONT, fontSize: 12,
                border: `2px solid ${S.ink}`,
                background: S.soft, color: S.ink,
                boxSizing: 'border-box', marginBottom: 16, outline: 'none',
                resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ padding: '8px 20px', background: 'transparent', color: S.ink, border: `2px solid ${S.ink}`, cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: FONT }}
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={generateDraft}
                disabled={loading || !transcript.trim()}
                style={{
                  padding: '8px 20px', background: S.ink, color: S.bg,
                  border: `2px solid ${S.ink}`, cursor: loading || !transcript.trim() ? 'not-allowed' : 'pointer',
                  fontSize: 11, fontWeight: 700, fontFamily: FONT,
                  opacity: loading || !transcript.trim() ? 0.5 : 1,
                }}
              >
                {loading ? 'GENERATING...' : 'GENERATE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
