import { Navigate } from 'react-router-dom'
import { useAuth } from './signin/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to='/signin' />
  return children
}
