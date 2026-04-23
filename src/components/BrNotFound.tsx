const BR = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
}

interface BrNotFoundProps {
  label?: string   // e.g. "POST", "GEAR", "PAGE"
  backTo?: string
  backLabel?: string
}

export function BrNotFound({ label = 'PAGE', backTo = '/', backLabel = 'BACK HOME' }: BrNotFoundProps) {
  return (
    <main style={{
      flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 28px 64px', fontFamily: BR.font, color: BR.ink, background: BR.bg,
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', opacity: 0.5, marginBottom: 16 }}>
        ERROR / 404
      </div>
      <div style={{
        fontSize: 'clamp(56px, 10vw, 140px)', fontWeight: 900,
        letterSpacing: '-0.05em', lineHeight: 0.9, textTransform: 'uppercase',
        marginBottom: 24,
      }}>
        {label}<br />
        <span style={{ background: BR.hot, color: 'white', padding: '0 8px', marginLeft: -8 }}>
          NOT FOUND
        </span>
      </div>
      <div style={{ fontSize: 14, opacity: 0.6, marginBottom: 32 }}>
        This {label.toLowerCase()} doesn't exist or was removed.
      </div>
      <div>
        <a
          href={backTo}
          style={{
            display: 'inline-block', padding: '10px 24px',
            background: BR.ink, color: BR.bg,
            fontFamily: BR.font, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.1em',
          }}
        >
          ← {backLabel}
        </a>
      </div>
    </main>
  )
}
