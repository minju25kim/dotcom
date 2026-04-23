import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'

export interface RouterContext {
  session: Session | null
}

// All BR values are CSS custom properties — resolved by browser at paint time.
// Switching data-theme on <html> changes both colors instantly site-wide.
const BR = {
  bg:   'var(--br-bg)',
  ink:  'var(--br-ink)',
  hot:  'var(--br-hot)',
  soft: 'var(--br-soft)',
  font: '"JetBrains Mono", ui-monospace, Menlo, monospace',
  email: 'minju25kim@gmail.com',
}

const NAV_ITEMS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Gears',    to: '/gears'    },
  { label: 'Strava',   to: '/strava'   },
  { label: 'Content',  to: '/content'  },
] as const

function BrNav({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav style={{
        borderBottom: `3px solid ${BR.ink}`,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        fontSize: 13,
        background: BR.bg,
        fontFamily: BR.font,
        flexShrink: 0,
        padding: '14px 28px',
      }} className="br-nav">
        <Link to="/" style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em', color: BR.ink }} onClick={() => setMenuOpen(false)}>
          [mk]
        </Link>
        <div style={{ flex: 1, fontSize: 12, opacity: 0.6 }} className="nav-location">
          MINJU KIM / SOFTWARE ENGINEER / SEOUL, KR
        </div>
        {/* Mobile-only spacer */}
        <div className="nav-spacer" style={{ flex: 1 }} />
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{
                style: { padding: '4px 10px', fontSize: 13, background: BR.ink, color: BR.bg, textDecoration: 'none', fontFamily: BR.font },
              }}
              inactiveProps={{
                style: { padding: '4px 10px', fontSize: 13, textDecoration: 'underline', textUnderlineOffset: '3px', color: BR.ink, fontFamily: BR.font },
              }}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={onToggle}
            title={dark ? 'Switch to light' : 'Switch to dark'}
            style={{
              border: `2px solid ${BR.ink}`, background: 'transparent', color: BR.ink,
              padding: '3px 8px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              fontFamily: BR.font, flexShrink: 0, letterSpacing: '0.05em',
            }}
          >
            {dark ? '◑ LIGHT' : '◐ DARK'}
          </button>
        </div>
        {/* Mobile hamburger — hidden on desktop via CSS */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            border: `2px solid ${BR.ink}`, background: 'transparent', color: BR.ink,
            padding: '3px 8px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            fontFamily: BR.font, letterSpacing: '0.05em', display: 'none',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <a
          href={`mailto:${BR.email}`}
          style={{ padding: '4px 10px', background: BR.hot, color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0 }}
        >
          ● AVAILABLE
        </a>
      </nav>

      {/* Mobile nav panel */}
      {menuOpen && (
        <div className="mobile-nav-panel" style={{
          background: BR.bg,
          borderBottom: `3px solid ${BR.ink}`,
          fontFamily: BR.font,
          display: 'none',
        }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              activeProps={{ style: { display: 'block', padding: '14px 20px', background: BR.ink, color: BR.bg, fontWeight: 900, fontSize: 15, borderBottom: `1px solid ${BR.ink}` } }}
              inactiveProps={{ style: { display: 'block', padding: '14px 20px', color: BR.ink, fontWeight: 700, fontSize: 15, borderBottom: `1px solid ${BR.ink}` } }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => { onToggle(); setMenuOpen(false) }}
              style={{
                border: `2px solid ${BR.ink}`, background: 'transparent', color: BR.ink,
                padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                fontFamily: BR.font, letterSpacing: '0.05em',
              }}
            >
              {dark ? '◑ LIGHT MODE' : '◐ DARK MODE'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function BrFooter() {
  return (
    <footer className="br-footer" style={{
      borderTop: `3px solid ${BR.ink}`,
      padding: '18px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      fontSize: 12,
      background: BR.ink,
      color: BR.bg,
      fontFamily: BR.font,
      flexShrink: 0,
    }}>
      <div style={{ fontWeight: 900 }}>[mk]</div>
      <div className="br-footer-copy">© 2026 MINJU KIM</div>
      <div style={{ flex: 1 }} />
      <div className="br-footer-email" style={{ opacity: 0.7 }}>{BR.email}</div>
      <div className="br-footer-socials" style={{ display: 'flex', gap: 14, opacity: 0.8 }}>
        {[
          ['GH',     'https://github.com/minju25kim'],
          ['IG',     'https://instagram.com/minju25kim'],
          ['YT',     'https://youtube.com/@minju25kim'],
          ['STRAVA', 'https://strava.com/athletes/minju25kim'],
        ].map(([label, url]) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer"
            style={{ color: BR.bg }}>
            ↗ {label}
          </a>
        ))}
      </div>
    </footer>
  )
}

function RootLayout() {
  const [dark, setDark] = useState(() =>
    typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh', background: BR.bg }}>
      <style>{`
        @media (max-width: 1023px) {
          .nav-location { display: none !important; }
          .nav-links { display: none !important; }
          .br-nav { padding: 10px 16px !important; gap: 8px !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-nav-panel { display: block !important; }
          .br-footer { flex-wrap: wrap !important; padding: 12px 16px !important; gap: 8px !important; }
          .br-footer-email { display: none !important; }
          .br-footer-copy { font-size: 11px !important; }
          .br-footer-socials { gap: 10px !important; font-size: 11px !important; }
        }
        @media (min-width: 1024px) {
          .nav-spacer { display: none !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
      <BrNav dark={dark} onToggle={() => setDark(d => !d)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </div>
      <BrFooter />
    </div>
  )
}

function NotFoundPage() {
  return (
    <main style={{
      flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 28px 64px', fontFamily: BR.font, color: BR.ink, background: BR.bg,
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', opacity: 0.5, marginBottom: 16 }}>
        ERROR / 404
      </div>
      <div style={{
        fontSize: 'clamp(72px, 12vw, 160px)', fontWeight: 900,
        letterSpacing: '-0.05em', lineHeight: 0.9, textTransform: 'uppercase',
        marginBottom: 24,
      }}>
        NOT<br />
        <span style={{ background: BR.hot, color: 'white', padding: '0 8px', marginLeft: -8 }}>FOUND</span>
      </div>
      <div style={{ fontSize: 14, opacity: 0.6, marginBottom: 32 }}>
        This page doesn't exist or was moved.
      </div>
      <div>
        <a
          href="/"
          style={{
            display: 'inline-block', padding: '10px 24px',
            background: BR.ink, color: BR.bg,
            fontFamily: BR.font, fontSize: 12, fontWeight: 700,
            letterSpacing: '0.1em',
          }}
        >
          ← BACK HOME
        </a>
      </div>
    </main>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})
