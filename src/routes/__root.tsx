import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import type { Session } from '@supabase/supabase-js'

export interface RouterContext {
  session: Session | null
}

function RootLayout() {
  return (
    <>
      <nav className="site-nav">
        <Link to="/" className="site-nav__brand">
          minju25kim
        </Link>
        <div className="site-nav__links">
          <Link to="/projects" activeProps={{ style: { color: 'var(--accent)' } }}>
            Projects
          </Link>
          <Link to="/gears" activeProps={{ style: { color: 'var(--accent)' } }}>
            Gears
          </Link>
          <Link to="/strava" activeProps={{ style: { color: 'var(--accent)' } }}>
            Strava
          </Link>
          <Link to="/content" activeProps={{ style: { color: 'var(--accent)' } }}>
            Content
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
