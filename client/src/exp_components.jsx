import { lazy } from 'react'
const SignIn = lazy(() => import('./components/auth/signin/SignIn'))
const StudentSignUp = lazy(() => import('./components/auth/signup/SignUp'))
const AdminSignUp = lazy(() => import('./components/auth/signup/AdminSignUp'))
const About = lazy(() => import('./student/About'))
const AdminHome = lazy(() => import('./principal/AdminHome'))
const Activity = lazy(() => import('./student/Activity'))
const UploadSnaps = lazy(() => import('./student/UploadSnaps'))
const Resource = lazy(() => import('./student/Resource'))
const Profile = lazy(() => import('./student/Profile'))
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'))
const OverallProgress = lazy(() => import('./principal/OverallProgress'))
const DepartmentHome = lazy(() => import('./hod/DepartmentHome'))
const DepartmentProgress = lazy(() => import('./hod/DepartmentProgress'))
const StudentHeader = lazy(() => import('./components/nav/StudentHeader'))
const NavBar = lazy(() => import('./components/nav/NavBar'))
const Layout = lazy(() => import('./Layout'))
const Splash = lazy(() => import('./components/Splashscreen'))
const LogOut = lazy(() => import('./components/LogOut'))
const Header = lazy(() => import('./components/nav/Header'))
const Modal = lazy(() => import('./components/Modal'))
const OverallStatus = lazy(() => import('./hod/OverallStatus'))
const Splashscreen = lazy(() => import('./components/Splashscreen'))
const SplashWithDelay = lazy(() => import('./components/SplashWithDelay'))

export {
  SplashWithDelay,
  Splashscreen,
  OverallStatus,
  LogOut,
  Splash,
  Layout,
  SignIn,
  StudentSignUp,
  AdminSignUp,
  About,
  AdminHome,
  Activity,
  UploadSnaps,
  Resource,
  Profile,
  ProtectedRoute,
  OverallProgress,
  DepartmentHome,
  DepartmentProgress,
  StudentHeader,
  NavBar,
  Header,
  Modal
}
