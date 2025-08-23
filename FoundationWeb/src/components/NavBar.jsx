import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

const navLinks = [
  {path: '/', label: 'Home'},
  {path: '/OSOT', label: 'GreenO'},
  {
    label: 'Get Involved',
    dropdown: [
      {
        label: 'Individual',
        path: '/getInvolved/individual'
      },
      {label: 'Student', path: '/getInvolved/student'},
      {label: 'College', path: '/getInvolved/college'},
      {
        label: 'Corporation CSR',
        path: '/getInvolved/corporation_csr'
      }
    ]
  },
  {path: '/contact', label: 'Contact Us'}
]

export default function Navbar() {
  const {pathname} = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  // helper: check if current path matches parent or its dropdown children
  const isActive = (path, dropdown) => {
    if (path && pathname === path) return true
    if (dropdown) {
      return dropdown.some(item =>
        pathname.startsWith(item.path)
      )
    }
    return false
  }

  return (
    <nav className='fixed top-0 z-50 flex w-full items-center justify-between bg-green-600/20 px-4 py-2 shadow-md backdrop-blur-sm md:px-10'>
      <h2 className='grad_txt text-xl font-bold italic'>
        <Link
          to='/'
          className='hover:text-secondary transition'
        >
          CG Foundation
        </Link>
      </h2>

      {/* Desktop Nav */}
      <div className='hidden space-x-6 md:flex'>
        {navLinks.map(({path, label, dropdown}) => (
          <div
            key={label}
            className='relative'
            onMouseEnter={() =>
              dropdown && setOpenDropdown(label)
            }
            onMouseLeave={() =>
              dropdown && setOpenDropdown(null)
            }
          >
            <Link
              to={path || '#'}
              className={`hover:text-tertiary transition ${
                isActive(path, dropdown)
                  ? 'grad_txt font-bold'
                  : ''
              }`}
            >
              {label}
            </Link>

            {dropdown && openDropdown === label && (
              <div className='absolute top-full left-0 w-48 rounded-xl bg-green-200 p-2 shadow-lg'>
                {dropdown.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block rounded px-4 py-2 text-sm hover:bg-green-100 ${
                      pathname === item.path
                        ? 'font-semibold text-green-600'
                        : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Sidebar nav ... */}
      <nav className='mt-10 flex space-y-4 md:hidden'>
        {navLinks.map(({path, label, dropdown}) => (
          <div key={label}>
            <button
              className={`flex w-full items-center justify-between text-lg ${
                isActive(path, dropdown)
                  ? 'grad_txt font-bold'
                  : ''
              }`}
              onClick={() =>
                dropdown
                  ? setOpenDropdown(
                      openDropdown === label ? null : label
                    )
                  : setIsOpen(false)
              }
            >
              {dropdown ? (
                label
              ) : (
                <Link to={path}>{label}</Link>
              )}
              {dropdown && (
                <span>
                  {openDropdown === label ? '−' : '+'}
                </span>
              )}
            </button>

            {dropdown && openDropdown === label && (
              <div className='mt-2 ml-4 space-y-2'>
                {dropdown.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-sm hover:text-green-600 ${
                      pathname === item.path
                        ? 'font-semibold text-green-600'
                        : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </nav>
  )
}
