import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  BsGrid1X2Fill, BsFillArchiveFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsCart3
} from 'react-icons/bs';

function DepartmentSideBar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/signin'); 
    console.log("Logged out and token expired");
  };
  
  const handleDepartmentProgress = () => {
    navigate('/department-progress'); 
  };

  const handleReports = () => {
    navigate('/report'); 
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          GreenO
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link' onClick={() => navigate('/HodHome')}>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link' onClick={handleDepartmentProgress}> 
            <BsFillArchiveFill className='icon' /> Department Progress
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link' onClick={() => navigate('/Hod/activities')}>
            <BsListCheck className='icon' /> Activities
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link' onClick={handleReports}>
            <BsMenuButtonWideFill className='icon' /> Reports
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link' onClick={() => navigate('/Hod/settings')}>
            <BsFillGearFill className='icon' /> Settings
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span onClick={handleLogout} className='sidebar-list-item-link'>
            <BsCart3 className='icon' /> Logout
          </span>
        </li>
      </ul>
    </aside>
  );
}

export default DepartmentSideBar;
