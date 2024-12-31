import { Link } from 'react-router-dom'
import { LogOut } from '../../exp_components'

export default function NavBar() {
  return (
    <nav className='w-full px-4 py-2 glassy fixed bottom-0 left-1/2 right-0 -translate-x-1/2 round z-10 flex items-center justify-between md:max-w-[60vw] md:bottom-0 md:top-2 h-fit font-medium'>
      <img
        src='/treegrow.png'
        alt='App Logo'
        className='w-10 hidden md:block'
      />
      <Link to='/home'>
        <img src='/at-solid.svg' alt='Home Icon' className='icon' />
        <p>About</p>
      </Link>
      <Link to='/activities'>
        <img
          src='/heart-regular.svg'
          alt='My Activities Icon'
          className='icon'
        />
        <p>Activity</p>
      </Link>
      <Link to='/upload_snap'>
        <img
          src='/cloud-arrow-up-solid.svg'
          alt='Upload Snaps Icon'
          className='icon'
        />
        <p>Upload</p>
      </Link>
      <Link to='/resources'>
        <img src='/file-regular.svg' alt='Resources Icon' className='icon' />
        <p>Resources</p>
      </Link>
      <Link to='/profile'>
        <img src='/user-regular.svg' alt='Profile Icon' className='icon' />
        <p>Profile</p>
      </Link>
      <LogOut />
    </nav>
  )
}
