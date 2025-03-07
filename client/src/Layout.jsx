import {Outlet, useNavigate} from 'react-router-dom'
import {NavBar} from './exp_components'
import 'react-toastify/dist/ReactToastify.css'
import {useAuth} from './components/auth/signin/AuthContext'

export default function Layout() {
  const navigate = useNavigate(),
    {role} = useAuth()

  return (
    <>
      <NavBar />
      <main className='c relative z-20 flex min-h-screen flex-col py-16'>
        <Outlet />
      </main>
      {role === 'student' && (
        <div className='fixed right-4 bottom-14 z-50 w-full md:bottom-6'>
          <button onClick={() => navigate('/contact')} className='float-end'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='icon'>
              <path d='M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z' />
            </svg>
            Contact Us
          </button>
        </div>
      )}
    </>
  )
}
