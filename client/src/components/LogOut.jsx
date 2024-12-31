import { useNavigate } from 'react-router-dom'
export default function Logout({ header = true }) {
  const navigate = useNavigate()
  function handleClick() {
    localStorage.removeItem('token')
    navigate('/signin')
  }
  return (
    <button
      onClick={handleClick}
      className={`${header ? 'hidden' : 'center'} md:flex logout`}>
      <img
        src='/arrow-right-to-bracket-solid.svg'
        alt='Logout Icon'
        className='icon'
      />
      <p>Logout</p>
    </button>
  )
}
