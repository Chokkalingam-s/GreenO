import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {Suspense} from 'react'
import l from './Lazy'
import {ToastContainer} from 'react-toastify'
import {useAuth} from './components/auth/signin/AuthContext'
import {OverlayProvider} from './components/OverlayContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
const SplashWithDelay = l('./components/SplashWithDelay')
const SignIn = l('./components/auth/signin/SignIn')
const StudentSignUp = l('./components/auth/signup/SignUp')
const AdminSignUp = l('./components/auth/signup/AdminSignUp')
const Layout = l('./Layout')
const Profile = l('./hod/HodProfile')
const SplashScreen = l('./components/Splashscreen')
const AdminProfile = l('./principal/AdminProfile')
const HodProfile = l('./hod/HodProfile')
const SuperAdminProfile = l('./superAdmin/SupAdProfile')
const ContactUs = l('./student/ContactUs')
const StudentHome = l('./student/Home')
const Activity = l('./student/Activity')
const UploadSnaps = l('./student/UploadSnaps')
const Resource = l('./student/Resource')
const AdminHome = l('./principal/AdminHome')
const OverallProgress = l('./principal/OverallProgress')
const InComplete = l('./principal/InComplete')
const DepartmentHome = l('./hod/DepartmentHome')
const DepartmentProgress = l('./hod/DepartmentProgress')
const OverallStatus = l('./hod/OverallStatus')
const SuperDashboard = l('./superAdmin/superDashBoard')
const SuperProgress = l('./superAdmin/superProgress')
const Statistics = l('./superAdmin/Statistics')

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
          <Suspense fallback={<SplashScreen />}>
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
                      <SuperAdminProfile />
                    ) : (
                      <Navigate to='/' replace />
                    )
                  }
                />
                <Route path='/contact' element={<ContactUs />} />
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
                <Route path='/home' element={<StudentHome />} />
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
                <Route path='/dashboard' element={<SuperDashboard />} />
                <Route path='/overall-progress' element={<SuperProgress />} />
                <Route path='/statistics' element={<Statistics />} />
              </Route>
            </Routes>
          </Suspense>
        </OverlayProvider>
      </SplashWithDelay>
    </Router>
  )
}
