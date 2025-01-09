import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className='bg-blue-500 py-4 rounded'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white font-bold text-xl'>CG Foundation</div>
        <ul className='flex space-x-6 text-white'>
          <li>
            <Link to='/' className='hover:text-gray-300 cursor-pointer'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/greenO' className='hover:text-gray-300 cursor-pointer'>
              GreenO
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
