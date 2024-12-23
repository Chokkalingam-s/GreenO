import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/')
  }
  return <button onClick={handleLogout}>Logout</button>
}

export default function StudentHeader() {
  return (
    <header className='md:min-w-[60vw] rounded-full flex items-center justify-between px-4 glassy fixed top-2 left-1/2 -translate-x-1/2 shadow-lg z-10'>
      <img src='/treegrow.png' alt='App Logo' className='w-10' />
      <div className='center'>
        <img src='/heart-regular.svg' alt='' className='icon' />
        <img src='/file-image-regular.svg' alt='' className='icon' />
        <img src='/user-regular.svg' alt='' className='icon' />
        <LogoutButton />
      </div>
    </header>
  )
}
