import { useState } from 'react'
import DepartmentHeader from '../components/nav/DepartmentHeader'
import DepartmentSideBar from '../components/nav/DepartmentSideBar'
import DHome from './DHome'

import './DHome.css'

const DepartmentHome = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <DepartmentHeader OpenSidebar={OpenSidebar} />
      <DepartmentSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <DHome />
    </div>
  )
}

export default DepartmentHome
