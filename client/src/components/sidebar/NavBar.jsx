import { NavLink } from 'react-router-dom'
import { LogOut } from '../../exp_components'

const userNavItems = [
  { path: '/home', icon: '/at-solid.svg', label: 'About' },
  { path: '/activities', icon: '/heart-regular.svg', label: 'Activity' },
  { path: '/upload_snap', icon: '/cloud-arrow-up-solid.svg', label: 'Upload' },
  { path: '/resources', icon: '/file-regular.svg', label: 'Resources' },
  { path: '/profile', icon: '/user-regular.svg', label: 'Profile' },
]

const adminNavItems = [
  {
    path: '/admin',
    label: 'Dashboard',
  },
  {
    path: '/progress',
    label: 'Progress',
  },
  {
    path: '/Admin/Activities',
    label: 'Activities',
  },
  {
    path: '/Admin/Reports',
    label: 'Reports',
  },
  {
    path: '/Admin/Settings',
    label: 'Settings',
  },
]

export default function NavBar({ role = 0 }) {
  const navItems = role === 1 ? adminNavItems : userNavItems
  console.log(role)

  return (
    <nav className='w-full px-4 py-2 glassy fixed bottom-0 left-1/2 right-0 -translate-x-1/2 round z-10 flex items-center justify-between md:max-w-[60vw] md:bottom-0 md:top-2 h-fit font-medium'>
      <img
        src='/treegrow.png'
        alt='App Logo'
        className='w-10 hidden md:block'
      />
      {role === 0
        ? navItems.map(({ path, icon, label }) => (
            <NavLink key={path} to={path}>
              <img src={icon} alt={`${label} Icon`} className='icon' />
              <p>{label}</p>
            </NavLink>
          ))
        : navItems.map(({ path, icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => (isActive ? 'active' : '')}>
              {icon}
              {label}
            </NavLink>
          ))}
      <LogOut />
    </nav>
  )
}
