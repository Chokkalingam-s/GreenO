import { lazy } from 'react'
const SignIn = lazy(() => import('./components/signIn/SignIn'))
const StudentSignUp = lazy(() => import('./components/signUp/StudentSignUp'))
const AdminSignUp = lazy(() => import('./components/signUp/AdminSignUp'))
const StudentHome = lazy(() => import('./student/StudentHome'))
const AdminHome = lazy(() => import('./admin/AdminHome'))
const MyActivities = lazy(() => import('./student/MyActivities'))
const UploadSnaps = lazy(() => import('./student/UploadSnaps'))
const Resource = lazy(() => import('./student/Resource'))
const Profile = lazy(() => import('./student/Profile'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const OverallProgress = lazy(() => import('./admin/OverallProgress'))
const DepartmentHome = lazy(() => import('./department/DepartmentHome'))
const DepartmentProgress = lazy(() => import('./department/DepartmentProgress'))
const Report = lazy(() => import('./department/Report'))
const StudentHeader = lazy(() => import('./components/sidebar/StudentHeader'))
const StudentNavBar = lazy(() => import('./components/sidebar/studentNavBar'))
const SHome = lazy(() => import('./student/SHome'))

export {
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
  StudentHeader,
  StudentNavBar,
  SHome,
}
