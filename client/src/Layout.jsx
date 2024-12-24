import { StudentHeader, StudentNavBar } from './exp_components'

export default function Layout({ children }) {
  return (
    <>
      <StudentHeader />
      <main className='container center flex-col'>{children}</main>
      <StudentNavBar />
    </>
  )
}
