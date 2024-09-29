import React, { useState } from 'react';
import DepartmentHeader from '../components/sidebar/DepartmentHeader';
import DepartmentSideBar from '../components/sidebar/DepartmentSideBar';
import DHome from './DHome';

import 'bootstrap/dist/css/bootstrap.min.css';
import './DHome.css';

const DepartmentHome = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <DepartmentHeader OpenSidebar={OpenSidebar} />
      <DepartmentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <DHome />
    </div>
  );
};

export default DepartmentHome;
