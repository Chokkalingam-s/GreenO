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
  Profile,
  ProtectedRoute,
  OverallProgress,
  DepartmentHome,
  DepartmentProgress,
  Report,
} from './exp_components'

const ProtectedRouteWrapper = ({ children, isAuthenticated }) => (
  <ProtectedRoute isAuthenticated={isAuthenticated}>{children}</ProtectedRoute>
)

const studentRoutes = [
  { path: '/StudentHome', component: <StudentHome /> },
  { path: '/Student/my-activities', component: <MyActivities /> },
  { path: '/Student/upload-snaps', component: <UploadSnaps /> },
  { path: '/Student/Resources', component: <Resource /> },
  { path: '/Student/Profile', component: <Profile /> },
]

const adminRoutes = [
  { path: '/AdminHome', component: <AdminHome /> },
  { path: '/admin-overallprogress', component: <OverallProgress /> },
]

const departmentRoutes = [
  { path: '/HodHome', component: <DepartmentHome /> },
  { path: '/Hod/department-progress', component: <DepartmentProgress /> },
  { path: '/Hod/report', component: <Report /> },
]

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authToken') !== null
  )

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('authToken') !== null)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path='/'
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path='/signin'
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path='/student-signup' element={<StudentSignUp />} />
          <Route path='/admin-signup' element={<AdminSignUp />} />

          {studentRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  {route.component}
                </ProtectedRouteWrapper>
              }
            />
          ))}

          {adminRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  {route.component}
                </ProtectedRouteWrapper>
              }
            />
          ))}

          {departmentRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated}>
                  {route.component}
                </ProtectedRouteWrapper>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </Router>
  )
}
