import { useNavigate } from 'react-router-dom'
export default function Logout() {
  const navigate = useNavigate()
  function handleClick() {
    localStorage.removeItem('token')
    navigate('/signin')
  }
  return (
    <button onClick={handleClick} className='logout'>
      <img
        src='/arrow-right-to-bracket-solid.svg'
        alt='Logout Icon'
        className='icon'
      />
      <p>Logout</p>
    </button>
  )
}
