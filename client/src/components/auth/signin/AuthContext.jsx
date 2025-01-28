import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState('')

  const decodeJWT = token => {
    if (!token) return null
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const decodedToken = decodeJWT(token)
      if (decodedToken) {
        setIsAuthenticated(true)
        setRole(decodedToken.role)
      }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}
