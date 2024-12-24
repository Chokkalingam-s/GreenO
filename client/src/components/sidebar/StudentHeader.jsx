import { LogOut } from '../../exp_components'

export default function StudentHeader() {
  return (
    <header className='w-full md:min-w-[60vw] rounded-xl flex items-center justify-between px-4 glassy md:fixed top-2 left-1/2 md:-translate-x-1/2 shadow-lg z-10 md:hidden'>
      <img src='/treegrow.png' alt='App Logo' className='w-10' />
      <div className='center'>
        <LogOut />
      </div>
    </header>
  )
}
