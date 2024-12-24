import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  function handleClick() {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <button onClick={handleClick}>
      <img src='/user-regular.svg' alt='Logout Icon' className='icon' />
      <p>Logout</p>
    </button>
  )
}

export default function StudentHeader() {
  return (
    <header className='w-full md:min-w-[60vw] rounded-xl flex items-center justify-between px-4 glassy md:fixed top-2 left-1/2 md:-translate-x-1/2 shadow-lg z-10'>
      <img src='/treegrow.png' alt='App Logo' className='w-10' />
      <div className='center'>
        <Logout />
      </div>
    </header>
  )
}
