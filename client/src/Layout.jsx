import { Outlet } from 'react-router-dom'
import { Header, NavBar } from './exp_components'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout() {
  return (
    <>
      <Header />
      <main className='container center flex-col relative z-20'>
        <Outlet />
      </main>
      <NavBar type={1} />
    </>
  )
}
