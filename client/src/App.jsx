import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { useState, useEffect, Suspense } from 'react'
import {
  SignIn,
  StudentSignUp,
  AdminSignUp,
  AdminHome,
  UploadSnaps,
  Resource,
  ProtectedRoute,
  OverallProgress,
  DepartmentHome,
  DepartmentProgress,
  Splash,
  Profile,
  Layout,
  About,
  Activity,
  OverallStatus,
  SplashWithDelay,
  ContactUs
} from './exp_components'
import { ToastContainer } from 'react-toastify'

const ProtectedRouteWrapper = ({ children, isAuthenticated, role, allowedRoles }) => (
  <ProtectedRoute isAuthenticated={isAuthenticated}>
    {allowedRoles.includes(role) ? children : <Navigate to="/" replace />}
  </ProtectedRoute>
)

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null)
  const [role, setRole] = useState(localStorage.getItem('role') || 'student') 

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('token') !== null)
      setRole(localStorage.getItem('role') || 'student')
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <Router>
      <ToastContainer
        className='custom_toastify'
        autoClose={3000}
        newestOnTop={true}
        hideProgressBar
        theme='dark'
      />
      <SplashWithDelay>
        <Suspense fallback={<Splash />}>
          <Routes>
            <Route
              path='/signin'
              element={<SignIn setIsAuthenticated={setIsAuthenticated} setRole={setRole} />}
            />
            <Route path='/' element={<Navigate to='/signin' replace />} />
            <Route path='/signup' element={<StudentSignUp />} />
            <Route path='/admin-signup' element={<AdminSignUp />} />

            <Route
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated} role={role} allowedRoles={['student']}>
                  <Layout />
                </ProtectedRouteWrapper>
              }>
              <Route path='/home' element={<About />} />
              <Route path='/activities' element={<Activity />} />
              <Route path='/upload_snap' element={<UploadSnaps />} />
              <Route path='/resources' element={<Resource />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/contact_us' element={<ContactUs />} />
            </Route>

            <Route
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated} role={role} allowedRoles={['admin']}>
                  <Layout />
                </ProtectedRouteWrapper>
              }>
              <Route path='/admin' element={<AdminHome />} />
              <Route path='/progress' element={<OverallProgress />} />
            </Route>

            <Route
              element={
                <ProtectedRouteWrapper isAuthenticated={isAuthenticated} role={role} allowedRoles={['hod']}>
                  <Layout />
                </ProtectedRouteWrapper>
              }>
              <Route path='/department' element={<DepartmentHome />} />
              <Route path='/department-progress' element={<DepartmentProgress />} />
              <Route path='/report' element={<OverallStatus />} />
            </Route>
          </Routes>
        </Suspense>
      </SplashWithDelay>
    </Router>
  )
}
