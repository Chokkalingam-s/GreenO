import { Outlet } from 'react-router-dom'
import { Header, NavBar } from './exp_components'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout() {
  return (
    <>
      <Header />
      <main className='container center flex-col mb-16 md:mb-0'>
        <Outlet />
      </main>
      <NavBar type={1} />
    </>
  )
}
