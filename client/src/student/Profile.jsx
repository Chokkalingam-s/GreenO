import React from 'react'
import { useState } from 'react'
import StudentSideBar from '../components/sidebar/StudentSideBar'
import StudentHeader from '../components/sidebar/StudentHeader'
import './Profile.css'

const Profile = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  return (
    <div className='grid-container'>
      <StudentHeader OpenSidebar={OpenSidebar} />
      <StudentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <div className="row">
            <div className="col-md-6">
                <div className='card profileCard1'>
                    
                </div>

            </div>
            <div className="col-md-6">
                <div className="row">
                    <div className="col">
                    <div className='card profileCard2'>
                    </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                    <div className='card profileCard2'>
                    </div>

                    </div>
                </div>
            </div>
        </div>

      </main>
    </div>
  )
}

export default Profile
