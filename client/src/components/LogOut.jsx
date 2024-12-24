import { useNavigate } from 'react-router-dom'
export default function Logout() {
  const navigate = useNavigate()
  function handleClick() {
    localStorage.removeItem('token')
    navigate('/signin')
  }
  return (
    <button onClick={handleClick}>
      <img src='/user-regular.svg' alt='Logout Icon' className='icon' />
      <p>Logout</p>
    </button>
  )
}
