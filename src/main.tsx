import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { AuthProvider, useAuth } from './context/AuthContext'
import type { RouterContext } from './routes/__root'
import './index.css'

const router = createRouter({
  routeTree,
  context: { session: null } satisfies RouterContext,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const { session, loading } = useAuth()
  if (loading) return null
  return <RouterProvider router={router} context={{ session }} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
