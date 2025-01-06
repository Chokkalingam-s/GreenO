import { NavLink } from 'react-router-dom'
import { useRole } from '../auth/useRole'

const studentNavItems = [
  {
    path: '/activities',
    viewBox: '0 0 512 512',
    icon: 'M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z',
    label: 'Activity'
  },
  {
    path: '/upload_snap',
    viewBox: '0 0 640 512',
    icon: 'M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z',
    label: 'Upload'
  },
  {
    path: '/home',
    viewBox: '0 0 576 512',
    icon: 'M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z',
    label: 'Home'
  },
  {
    path: '/resources',
    viewBox: '0 0 384 512',
    icon: 'M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z',
    label: 'Resources'
  },
  {
    path: '/profile',
    viewBox: '0 0 448 512',
    icon: 'M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z',
    label: 'Profile'
  }
]

const principalNavItems = [
  {
    path: '/admin',
    icon: '/at-solid.svg',
    label: 'Dashboard'
  },
  {
    path: '/progress',
    icon: '/at-solid.svg',
    label: 'Progress'
  }
]

const hodNavItems = [
  {
    path: '/department',
    icon: '/at-solid.svg',
    label: 'Department'
  },
  {
    path: '/department-progress',
    icon: '/at-solid.svg',
    label: 'Progress'
  },
  {
    path: '/report',
    icon: '/at-solid.svg',
    label: 'Report'
  }
]

export default function NavBar({ type = 0 }) {
  const { role } = useRole()
  const navItems =
    role === 'student' || role === 'hod'
      ? hodNavItems
      : role === 'principal'
      ? principalNavItems
      : studentNavItems

  return (
    <nav
      className={`glassy round items-center justify-evenly font-medium gap-x-4 p-3 ${
        type === 0 ? 'hidden md:flex' : 'md:hidden flex fixed bottom-0 w-full'
      } z-20`}>
      {navItems.map(({ path, viewBox, icon, label }) => (
        <NavLink key={path} to={path}>
          {viewBox && icon ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox={viewBox}
              className={`icon`}>
              <path d={icon}></path>
            </svg>
          ) : null}
          <p>{label}</p>
        </NavLink>
      ))}
    </nav>
  )
}
