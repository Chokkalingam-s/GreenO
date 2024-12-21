import { useState } from 'react'
import StudentHeader from '../components/sidebar/StudentHeader'
import SHome from './SHome'
import './Student.css'

const StudentHome = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <StudentHeader OpenSidebar={OpenSidebar} />
      <SHome />
    </div>
  )
}

export default StudentHome
