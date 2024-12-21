import { Navigate } from 'react-router-dom'
import { useAuth } from '../components/signIn/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  return children
}

export default ProtectedRoute
