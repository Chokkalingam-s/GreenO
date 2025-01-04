import { LogOut, NavBar } from '../../exp_components'

export default function Header() {
  return (
    <header className='w-full grid md:grid-cols-[10%_60%_10%] grid-cols-2 items-center md:justify-evenly justify-items-center fixed top-2 z-30'>
      <span className='glassy center round px-2'>
        <img src='/GreenO_Logo.png' alt='App Logo' className='w-14' />
        <p className='font-medium hidden md:block'>GreenO</p>
      </span>
      <NavBar />
      <LogOut />
    </header>
  )
}
