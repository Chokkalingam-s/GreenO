import React from 'react'
import { useState } from 'react'
import StudentSideBar from '../components/sidebar/StudentSideBar'
import StudentHeader from '../components/sidebar/StudentHeader'
import Home from './Home'

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
      <Home />
    </div>
  )
}

export default StudentHome
