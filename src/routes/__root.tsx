import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import type { Session } from '@supabase/supabase-js'

export interface RouterContext {
  session: Session | null
}

function RootLayout() {
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
        <Link to="/" activeProps={{ style: { fontWeight: 'bold' } }}>
          Home
        </Link>
        <Link to="/projects" activeProps={{ style: { fontWeight: 'bold' } }}>
          Projects
        </Link>
        <Link to="/gears" activeProps={{ style: { fontWeight: 'bold' } }}>
          Gears
        </Link>
        <Link to="/strava" activeProps={{ style: { fontWeight: 'bold' } }}>
          Strava
        </Link>
        <Link to="/dev" activeProps={{ style: { fontWeight: 'bold' } }}>
          Dev
        </Link>
      </nav>
      <hr />
      <Outlet />
    </>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
