import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
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
        <Link to="/blog" activeProps={{ style: { fontWeight: 'bold' } }}>
          Blog
        </Link>
      </nav>
      <hr />
      <Outlet />
    </>
  ),
})
