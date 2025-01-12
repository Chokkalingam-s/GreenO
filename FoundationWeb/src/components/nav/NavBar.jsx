import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className='fixed top-0 glassy py-4 round flex items-center justify-between w-full px-10 z-50'>
      <h2 className='font-bold text-xl'>
        <Link to='/' className='hover:text-darkgreen-300 cursor-pointer'>
          CG Foundation
        </Link>
      </h2>
      <ul className='flex space-x-6 font-medium tracking-wider'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/greenO'>GreenO</Link>
        </li>
      </ul>
    </nav>
  )
}
