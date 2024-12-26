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
} from './exp_components'
import VProfile from './student/v2Profile'

const ProtectedRouteWrapper = ({ children, isAuthenticated }) => (
  <ProtectedRoute isAuthenticated={isAuthenticated}>{children}</ProtectedRoute>
)

const studentRoutes = [
  { path: '/StudentHome', component: <StudentHome /> },
  { path: '/Student/my-activities', component: <MyActivities /> },
  { path: '/Student/upload-snaps', component: <UploadSnaps /> },
  { path: '/Student/Resources', component: <Resource /> },
  { path: '/Student/Profile', component: <VProfile /> },
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
      <Suspense fallback={<Splash />}>
        <Routes>
          <Route
            path='/signin'
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path='/signup' element={<StudentSignUp />} />
          <Route path='/admin_signup' element={<AdminSignUp />} />
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
