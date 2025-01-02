import { ToastContainer } from 'react-toastify'

export default function Toast() {
  return (
    <ToastContainer
      className='custom_toastify'
      autoClose={3000}
      newestOnTop={true}
      hideProgressBar
      closeButton={false}
      theme='dark'
    />
  )
}
