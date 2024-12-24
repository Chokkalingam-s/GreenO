import { StudentHeader, StudentNavBar } from './exp_components'

export default function Layout({ children }) {
  return (
    <>
      <StudentHeader />
      <main className='container center flex-col mb-16 relative top-14'>
        {children}
      </main>
      <StudentNavBar />
    </>
  )
}
