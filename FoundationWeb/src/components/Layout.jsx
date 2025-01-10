import { NavBar } from '../exp_comp'
import HomePage from './pages/HomePage'

export default function Layout() {
  return (
    <>
      <header className='text-white'>
        <NavBar />
      </header>
      <main className='relative top-14'>
        <HomePage />
      </main>
    </>
  )
}
