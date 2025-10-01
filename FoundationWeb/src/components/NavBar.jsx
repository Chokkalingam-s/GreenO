import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

const navLinks = [
  {path: '/', label: 'Home'},
  {path: '/OSOT', label: 'GreenO'},
  {
    label: 'Get Involved',
    dropdown: [
      {
        label: 'Individuals',
        path: '/getInvolved/individual'
      },
      {label: 'Students', path: '/getInvolved/student'},
      {label: 'Colleges', path: '/getInvolved/college'},
      {
        label: 'Corporate CSR & NGOs',
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
    <nav className='fixed top-0 z-50 w-full bg-green-600/20 px-4 py-2 shadow-md backdrop-blur-sm md:px-10'>
      <div className='flex items-center justify-between'>
        <h2 className='grad_txt text-xl font-bold italic'>
          <Link
            to='/'
            className='hover:text-secondary transition'>
            CG Foundation
          </Link>
        </h2>

        {/* Hamburger (mobile only) */}
        <button
          className='nav text-2xl md:hidden'
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '' : '☰'}
        </button>

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
              }>
              <Link
                to={path || '#'}
                className={`hover:text-tertiary transition ${
                  isActive(path, dropdown)
                    ? 'grad_txt font-bold'
                    : ''
                }`}>
                {label}
              </Link>

              {dropdown && openDropdown === label && (
                <div className='absolute top-full left-0 w-48 rounded-xl p-2 z-10 bg-gradient-to-br from-green-100 via-neutral-200 to-green-100'>
                  {dropdown.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block rounded px-4 py-2 text-sm hover:bg-green-100 ${
                        pathname === item.path
                          ? 'font-semibold text-green-600'
                          : ''
                      }`}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className='fixed top-0 right-0 z-50 h-screen w-64 space-y-2 overflow-y-auto rounded-l-xl bg-gradient-to-br from-green-100 via-neutral-200 to-green-100 p-4 md:hidden'>
          <button
            className='nav mb-4 text-2xl'
            onClick={() => setIsOpen(false)}>
            ✕
          </button>

          {navLinks.map(({path, label, dropdown}) => (
            <div key={label}>
              {dropdown ? (
                <button
                  className={`nav flex w-full items-center justify-between rounded-lg p-2 ${
                    isActive(path, dropdown)
                      ? 'grad_txt font-bold'
                      : ''
                  }`}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === label ? null : label
                    )
                  }>
                  {label}
                  <span>
                    {openDropdown === label ? '−' : '+'}
                  </span>
                </button>
              ) : (
                <Link
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`nav block w-full rounded-lg p-2 ${
                    isActive(path)
                      ? 'grad_txt font-bold'
                      : ''
                  }`}>
                  {label}
                </Link>
              )}

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
                      }`}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}
