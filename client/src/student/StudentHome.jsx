import React from 'react'
import { useState } from 'react'
import StudentSideBar from '../components/sidebar/StudentSideBar'
import StudentHeader from '../components/sidebar/StudentHeader'
import SHome from './SHome'

import './Student.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentHome = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <StudentHeader OpenSidebar={OpenSidebar} />
      <StudentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <SHome />
    </div>
  )
}

export default StudentHome
