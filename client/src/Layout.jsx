import { Outlet } from 'react-router-dom'
import { Header, NavBar } from './exp_components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout() {
  console.log('Layout re-rendered')
  return (
    <>
      <Header />
      <main className='container center flex-col mb-16 md:mb-0'>
        <ToastContainer
          className='custom_toastify'
          autoClose={3000}
          newestOnTop={true}
          hideProgressBar
          closeButton={false}
          theme='dark'
        />
        <Outlet />
      </main>
      <NavBar type={1} />
    </>
  )
}
