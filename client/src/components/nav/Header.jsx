import { NavLink } from 'react-router-dom'
import { LogOut, NavBar } from '../../exp_components'
import { useRole } from '../auth/useRole'

export default function Header() {
  const { role } = useRole()
  const homeLink =
    role === 'hod' ? '/department' : role === 'admin' ? '/admin' : '/home'

  return (
    <header className='w-full grid md:grid-cols-[10%_60%_10%] grid-cols-2 items-center md:justify-evenly justify-items-center fixed top-2 z-30'>
      <NavLink className='glassy center round px-2' to={homeLink}>
        <img src='/GreenO_Logo.png' alt='App Logo' className='w-14' />
        <p className='font-medium hidden md:block'>GreenO</p>
      </NavLink>
      <NavBar role={role} />
      <LogOut />
    </header>
  )
}
