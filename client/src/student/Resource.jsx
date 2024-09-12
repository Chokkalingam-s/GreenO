import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import './MyActivities.css';

function Resource() {
const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <StudentHeader OpenSidebar={OpenSidebar} />
      <StudentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

    
    <div className='my-activities-container'>
      
      <div className='my-activities-content'>
        
        <div className='my-activities-body'>
          <h2>Resources</h2>
          
        </div>
      </div>
    </div>
    </div>
  );
}

export default Resource;
