import { NavLink } from 'react-router-dom'

const userNavItems = [
  { path: '/about', icon: '/at-solid.svg', label: 'About' },
  { path: '/activities', icon: '/heart-regular.svg', label: 'Activity' },
  { path: '/upload_snap', icon: '/cloud-arrow-up-solid.svg', label: 'Upload' },
  { path: '/resources', icon: '/file-regular.svg', label: 'Resources' },
  { path: '/profile', icon: '/user-regular.svg', label: 'Profile' },
]

const adminNavItems = [
  {
    path: '/admin',
    icon: '/at-solid.svg',
    label: 'Dashboard',
  },
  {
    path: '/progress',
    icon: '/at-solid.svg',
    label: 'Progress',
  },
]

export default function NavBar({ role = 0 }) {
  const navItems = role === 1 ? adminNavItems : userNavItems

  return (
    <nav className='glassy round flex items-center justify-evenly font-medium gap-x-4 p-3'>
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
    </nav>
  )
}
