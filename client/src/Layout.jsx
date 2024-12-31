import { Outlet } from 'react-router-dom'
import { StudentHeader, NavBar } from './exp_components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout() {
  console.log('Layout re-rendered')
  return (
    <>
      <StudentHeader />
      <main className='container center flex-col mb-16 md:mb-0'>
        <ToastContainer />
        <Outlet />
      </main>
      <NavBar />
    </>
  )
}
