import { Link } from 'react-router-dom'

export default function StudentNavBar() {
  return (
    <nav className='md:hidden w-full md:min-w-[60vw] rounded-xl flex items-center justify-between px-4 glassy fixed bottom-2 left-1/2 -translate-x-1/2 shadow-lg z-10'>
      <Link to='/StudentHome'>
        <img src='/house-solid.svg' alt='Home Icon' className='icon' />
        <p>Home</p>
      </Link>
      <Link to='/Student/my-activities'>
        <img
          src='/heart-regular.svg'
          alt='My Activities Icon'
          className='icon'
        />
        <p>Activity</p>
      </Link>
      <Link to='/Student/upload-snaps'>
        <img
          src='/cloud-arrow-up-solid.svg'
          alt='Upload Snaps Icon'
          className='icon'
        />
        <p>Upload</p>
      </Link>
      <Link to='/Student/Resources'>
        <img
          src='/file-image-regular.svg'
          alt='Resources Icon'
          className='icon'
        />
        <p>Resources</p>
      </Link>
      <Link to='/Student/Profile'>
        <img src='/user-regular.svg' alt='Profile Icon' className='icon' />
        <p>Profile</p>
      </Link>
    </nav>
  )
}
