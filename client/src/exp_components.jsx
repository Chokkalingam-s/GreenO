import {lazy} from 'react'
const SignIn = lazy(() => import('./components/auth/signin/SignIn'))
const StudentSignUp = lazy(() => import('./components/auth/signup/SignUp'))
const AdminSignUp = lazy(() => import('./components/auth/signup/AdminSignUp'))
const Home = lazy(() => import('./student/Home'))
const AdminHome = lazy(() => import('./principal/AdminHome'))
const Activity = lazy(() => import('./student/Activity'))
const UploadSnaps = lazy(() => import('./student/UploadSnaps'))
const Resource = lazy(() => import('./student/Resource'))
const Profile = lazy(() => import('./student/Profile'))
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'))
const OverallProgress = lazy(() => import('./principal/OverallProgress'))
const DepartmentHome = lazy(() => import('./hod/DepartmentHome'))
const DepartmentProgress = lazy(() => import('./hod/DepartmentProgress'))
const NavBar = lazy(() => import('./components/nav/NavBar'))
const Layout = lazy(() => import('./Layout'))
const Splash = lazy(() => import('./components/Splashscreen'))
const LogOut = lazy(() => import('./components/LogOut'))
const Modal = lazy(() => import('./components/Modal'))
const OverallStatus = lazy(() => import('./hod/OverallStatus'))
const Splashscreen = lazy(() => import('./components/Splashscreen'))
const SplashWithDelay = lazy(() => import('./components/SplashWithDelay'))
const ContactUs = lazy(() => import('./student/ContactUs'))
const CountUi = lazy(() => import('./components/CountUI'))
const SuperDashBoard = lazy(() => import('./superAdmin/superDashBoard'))
const SuperProgress = lazy(() => import('./superAdmin/superProgress'))
const SearchComponent = lazy(() => import('./components/SearchComponent'))
const InComplete = lazy(() => import('./principal/InComplete'))
const Pagination = lazy(() => import('./components/Pagination'))
const Statistics = lazy(() => import('./superAdmin/Statistics'))
const FloatingLabelInput = lazy(() => import('./components/FloatingLabelInput'))
const AdminProfile = lazy(() => import('./principal/AdminProfile'))
const HodProfile = lazy(() => import('./hod/HodProfile'))
const SupAdProfile = lazy(()=> import('./superAdmin/SupAdProfile'))


export {
  HodProfile,
  SupAdProfile,
  FloatingLabelInput,
  Statistics,
  Pagination,
  SearchComponent,
  SuperDashBoard,
  SuperProgress,
  CountUi,
  ContactUs,
  SplashWithDelay,
  Splashscreen,
  OverallStatus,
  LogOut,
  Splash,
  Layout,
  SignIn,
  StudentSignUp,
  AdminSignUp,
  Home,
  AdminHome,
  Activity,
  UploadSnaps,
  Resource,
  Profile,
  AdminProfile,
  ProtectedRoute,
  OverallProgress,
  DepartmentHome,
  DepartmentProgress,
  NavBar,
  Modal,
  InComplete
}
