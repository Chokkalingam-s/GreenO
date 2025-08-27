import HomePage from './pages/HomePage'
import NavBar from './NavBar'
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
