import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../context/AuthContext'

function AdminPage() {
  const { isAdmin, user, signIn, signOut } = useAuth()

  return (
    <div style={{ padding: '2rem' }}>
      {isAdmin ? (
        <>
          <p>Signed in as {user?.user_metadata?.user_name}</p>
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <button onClick={signIn}>Sign in with GitHub</button>
      )}
    </div>
  )
}

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})
