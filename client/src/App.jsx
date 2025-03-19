import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {Suspense} from 'react'
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
  Home,
  Activity,
  OverallStatus,
  SplashWithDelay,
  ContactUs,
  SuperDashBoard,
  SuperProgress,
  InComplete,
  Statistics,
  AdminProfile,
  HodProfile,
  SupAdProfile
} from './exp_components'
import {ToastContainer} from 'react-toastify'
import {useAuth} from './components/auth/signin/AuthContext'
import {OverlayProvider} from './components/OverlayContext'

const ProtectedRouteWrapper = ({children, isAuthenticated, role, allowedRoles}) => (
  <ProtectedRoute isAuthenticated={isAuthenticated}>
    {allowedRoles === role ? children : <Navigate to='/' replace />}
  </ProtectedRoute>
)

export default function App() {
  const {isAuthenticated, role} = useAuth()

  return (
    <Router>
      <ToastContainer
        className='custom_toastify'
        autoClose={4000}
        newestOnTop={true}
        hideProgressBar
        theme='dark'
        bodyClassName='toastBody'
      />
      <SplashWithDelay>
        <OverlayProvider>
          <Suspense fallback={<Splash />}>
            <Routes>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/' element={<Navigate to='/signin' replace />} />
              <Route path='/signup' element={<StudentSignUp />} />
              <Route path='/admin-signup' element={<AdminSignUp />} />

              {/* Profile Redirection Based on Role */}
              {/* Profile Route with Layout */}
              <Route
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout />
                  </ProtectedRoute>
                }>
                <Route
                  path='/profile'
                  element={
                    role === 'student' ? (
                      <Profile />
                    ) : role === 'admin' ? (
                      <AdminProfile />
                    ) : role === 'hod' ? (
                      <HodProfile />
                    ) : role === 'superAdmin' ? (
                      <SupAdProfile />
                    ) : (
                      <Navigate to='/' replace />
                    )
                  }
                />
              </Route>

              {/* Student Routes */}
              <Route
                element={
                  <ProtectedRouteWrapper
                    isAuthenticated={isAuthenticated}
                    role={role}
                    allowedRoles='student'>
                    <Layout />
                  </ProtectedRouteWrapper>
                }>
                <Route path='/home' element={<Home />} />
                <Route path='/activities' element={<Activity />} />
                <Route path='/upload' element={<UploadSnaps />} />
                <Route path='/guide' element={<Resource />} />
                <Route path='/student-profile' element={<Profile />} />
                <Route path='/contact' element={<ContactUs />} />
              </Route>

              {/* Admin Routes */}
              <Route
                element={
                  <ProtectedRouteWrapper
                    isAuthenticated={isAuthenticated}
                    role={role}
                    allowedRoles='admin'>
                    <Layout />
                  </ProtectedRouteWrapper>
                }>
                <Route path='/admin' element={<AdminHome />} />
                <Route path='/progress' element={<OverallProgress />} />
                <Route path='/inComplete' element={<InComplete />} />
                <Route path='/admin-profile' element={<AdminProfile />} />
              </Route>

              {/* HOD Routes */}
              <Route
                element={
                  <ProtectedRouteWrapper
                    isAuthenticated={isAuthenticated}
                    role={role}
                    allowedRoles='hod'>
                    <Layout />
                  </ProtectedRouteWrapper>
                }>
                <Route path='/department' element={<DepartmentHome />} />
                <Route path='/department-progress' element={<DepartmentProgress />} />
                <Route path='/report' element={<OverallStatus />} />
                <Route path='/hod-profile' element={<DepartmentHome />} />
              </Route>

              {/* Super Admin Routes */}
              <Route
                element={
                  <ProtectedRouteWrapper
                    isAuthenticated={isAuthenticated}
                    role={role}
                    allowedRoles='superAdmin'>
                    <Layout />
                  </ProtectedRouteWrapper>
                }>
                <Route path='/dashboard' element={<SuperDashBoard />} />
                <Route path='/overall-progress' element={<SuperProgress />} />
                <Route path='/statistics' element={<Statistics />} />
                <Route path='/superadmin-profile' element={<SuperDashBoard />} />
              </Route>
            </Routes>
          </Suspense>
        </OverlayProvider>
      </SplashWithDelay>
    </Router>
  )
}
