import { LogOut, NavBar } from '../../exp_components'

export default function Header() {
  return (
    <header className='w-full grid grid-cols-[10%_60%_10%] items-center justify-evenly justify-items-center fixed top-2'>
      <span className='glassy center round px-2'>
        <img
          src='/5823008.webp'
          alt='App Logo'
          className='w-10 -translate-x-2'
        />
        <p className='font-medium -translate-x-2'>GreenO</p>
      </span>
      <NavBar />
      <LogOut />
    </header>
  )
}
