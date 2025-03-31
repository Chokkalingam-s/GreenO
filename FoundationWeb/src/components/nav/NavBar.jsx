import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

const navLinks = [
  {path: '/', label: 'Home'},
  {path: '/OneStudentOneTree', label: 'GreenO'},
  {path: '/about', label: 'About'},
  {path: '/contact', label: 'Contact'}
]

export default function Navbar() {
  const {pathname} = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Navbar */}
      <nav className='bg-secondary/30 fixed top-0 z-50 flex h-16 w-full items-center justify-between px-6 py-4 shadow-md backdrop-blur-md md:px-10'>
        <h2 className='text-xl font-bold'>
          <Link to='/' className='hover:text-secondary transition'>
            CG Foundation
          </Link>
        </h2>

        {/* Desktop Nav */}
        <div className='hidden space-x-6 md:flex'>
          {navLinks.map(({path, label}) => (
            <Link
              key={path}
              to={path}
              className={`hover:text-tertiary transition ${
                pathname === path ? 'text-tertiary font-bold' : ''
              }`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Menu Button for Mobile */}
        <button onClick={() => setIsOpen(true)} className='md:hidden'>
          <img src='/bars-solid.svg' alt='menu icon' className='aspect-square w-6' />
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-0 z-50 flex ${isOpen ? 'block' : 'hidden'} transition-transform`}>
        {/* Sidebar */}
        <div className='bg-secondary/40 relative z-50 h-full w-64 p-6 shadow-xl backdrop-blur-md'>
          <button onClick={() => setIsOpen(false)} className='absolute top-4 right-4'>
            <img src='/xmark-solid.svg' alt='close menu' className='w-6' />
          </button>

          <nav className='mt-10 space-y-4'>
            {navLinks.map(({path, label}) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`hover:text-tertiary block text-lg transition ${
                  pathname === path ? 'text-tertiary font-bold' : ''
                }`}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
