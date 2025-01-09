import { NavBar } from '../exp_comp'
import HomePage from './pages/HomePage'

export default function Layout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <HomePage />
      </main>
    </>
  )
}
