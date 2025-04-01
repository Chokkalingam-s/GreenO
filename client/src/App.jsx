import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {Suspense} from 'react'
import {ToastContainer} from 'react-toastify'
import {useAuth} from './components/auth/signin/AuthContext'
import {OverlayProvider} from './components/OverlayContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import SplashWithDelay from './components/SplashWithDelay'
import SignIn from './components/auth/signin/SignIn'
import StudentSignUp from './components/auth/signup/SignUp'
import AdminSignUp from './components/auth/signup/AdminSignUp'
import Layout from './Layout'
import Profile from './hod/HodProfile'
import SplashScreen from './components/Splashscreen'
import AdminProfile from './principal/AdminProfile'
import HodProfile from './hod/HodProfile'
import SuperAdminProfile from './superAdmin/SupAdProfile'
import ContactUs from './student/ContactUs'
import StudentHome from './student/Home'
import Activity from './student/Activity'
import UploadSnaps from './student/UploadSnaps'
import Resource from './student/Resource'
import AdminHome from './principal/AdminHome'
import OverallProgress from './principal/OverallProgress'
import InComplete from './principal/InComplete'
import DepartmentHome from './hod/DepartmentHome'
import DepartmentProgress from './hod/DepartmentProgress'
import OverallStatus from './hod/OverallStatus'
import SuperDashboard from './superAdmin/superDashBoard'
import SuperProgress from './superAdmin/superProgress'
import Statistics from './superAdmin/Statistics'

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
