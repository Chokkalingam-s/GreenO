import { useState } from 'react'
import AdminHeader from '../components/sidebar/AdminHeader'
import AdminSideBar from '../components/sidebar/AdminSideBar'
import AHome from './AHome'

import './Admin.css'

const AdminHome = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <AdminHeader OpenSidebar={OpenSidebar} />
      <AdminSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <AHome />
    </div>
  )
}

export default AdminHome
