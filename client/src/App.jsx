import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
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
  Report,
  Splash,
  Profile,
  Layout,
  About,
  Activity
} from './exp_components'
import { AuthProvider } from './components/auth/signin/AuthContext'


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          className='custom_toastify'
          autoClose={3000}
          newestOnTop={true}
          hideProgressBar
          theme='dark'
        />
        <Suspense fallback={<Splash />}>
          <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/' element={<Navigate to='/signin' replace />} />
            <Route path='/signup' element={<StudentSignUp />} />
            <Route path='/admin-signup' element={<AdminSignUp />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
              <Route path='/home' element={<About />} />
              <Route path='/activities' element={<Activity />} />
              <Route path='/upload_snap' element={<UploadSnaps />} />
              <Route path='/resources' element={<Resource />} />
              <Route path='/profile' element={<Profile />} />

              <Route path='/admin' element={<AdminHome />} />
              <Route path='/progress' element={<OverallProgress />} />

              <Route path='/department' element={<DepartmentHome />} />
              <Route path='/department-progress' element={<DepartmentProgress />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}
