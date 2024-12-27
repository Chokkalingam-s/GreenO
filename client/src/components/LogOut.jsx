import { useNavigate } from 'react-router-dom'
export default function Logout({ hide }) {
  const navigate = useNavigate()
  function handleClick() {
    localStorage.removeItem('token')
    navigate('/signin')
  }
  return (
    <button
      onClick={handleClick}
      className={`hidden ${hide ? 'logout' : 'center'}`}>
      <img
        src='/arrow-right-to-bracket-solid.svg'
        alt='Logout Icon'
        className='icon'
      />
      <p>Logout</p>
    </button>
  )
}
