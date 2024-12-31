import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect, Suspense } from 'react'
import {
  SignIn,
  StudentSignUp,
  AdminSignUp,
  StudentHome,
  AdminHome,
  MyActivities,
  UploadSnaps,
  Resource,
  ProtectedRoute,
  OverallProgress,
  DepartmentHome,
  DepartmentProgress,
  Report,
  Splash,
  Profile,
  Layout,
} from './exp_components'

const ProtectedRouteWrapper = ({ children, isAuthenticated }) => (
  <ProtectedRoute isAuthenticated={isAuthenticated}>{children}</ProtectedRoute>
)

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') !== null
  )

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('token') !== null)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <Router>
      <Suspense fallback={<Splash />}>
        <Routes>
          <Route
            path='/signin'
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path='/signup' element={<StudentSignUp />} />
          <Route path='/admin-signup' element={<AdminSignUp />} />

          <Route
            element={
              <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                <Layout />
              </ProtectedRouteWrapper>
            }>
            <Route path='/home' element={<StudentHome />} />
            <Route path='/activities' element={<MyActivities />} />
            <Route path='/upload_snap' element={<UploadSnaps />} />
            <Route path='/resources' element={<Resource />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/admin' element={<AdminHome />} />
            <Route path='/progress' element={<OverallProgress />} />

            <Route path='/department' element={<DepartmentHome />} />
            <Route
              path='/department-progress'
              element={<DepartmentProgress />}
            />
            <Route path='/report' element={<Report />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}
