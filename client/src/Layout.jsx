import { StudentHeader, StudentNavBar } from './exp_components'

export default function Layout({ children }) {
  return (
    <>
      <StudentHeader />
      <main className='container center flex-col mb-16 md:mb-0'>
        {children}
      </main>
      <StudentNavBar />
    </>
  )
}
