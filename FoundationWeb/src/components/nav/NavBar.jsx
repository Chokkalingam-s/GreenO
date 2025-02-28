import {Link, useLocation} from 'react-router-dom'
import {useState} from 'react'

export default function NavBar() {
  const {pathname} = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const navLinks = [
    {path: '/', label: 'Home'},
    {path: '/OneStudentOneTree', label: 'GreenO'},
    {path: '/about', label: 'About'},
    {path: '/contact', label: 'Contact'}
  ]

  return (
    <nav className='bg-secondary/40 fixed top-0 z-50 flex h-16 w-full items-center justify-between px-6 py-4 shadow-md backdrop-blur-lg md:px-10'>
      <h2 className='text-xl font-bold'>
        <Link to='/' className='hover:text-secondary transition'>
          CG Foundation
        </Link>
      </h2>
      <div className='md:hidden'>
        <button onClick={() => setIsOpen(!isOpen)} className='bg-none'>
          <img
            src={isOpen ? '/xmark-solid.svg' : '/bars-solid.svg'}
            alt='menu icon'
            className='aspect-square w-6'
          />
        </button>
      </div>
      <div
        className={`bg-secondary/40 center absolute top-16 right-0 h-screen w-8/12 flex-col space-y-4 p-6 shadow-xl backdrop-blur-lg transition-transform md:relative md:top-0 md:h-auto md:w-auto md:flex-row md:space-y-0 md:space-x-6 md:bg-none md:p-0 md:shadow-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}>
        {navLinks.map(({path, label}) => (
          <span
            key={path}
            className={`${pathname === path ? 'text-tertiary text-lg font-bold' : 'text-base'}`}>
            <Link
              to={path}
              onClick={() => setIsOpen(false)}
              className='hover:text-tertiary transition'>
              {label}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  )
}
