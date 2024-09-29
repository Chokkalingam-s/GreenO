import React from 'react';
import {
  BsGrid1X2Fill, BsFillArchiveFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsCart3
} from 'react-icons/bs';

function DepartmentSideBar({ openSidebarToggle, OpenSidebar }) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("Logout Clicked");
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
          <span className='sidebar-list-item-link'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link'>
            <BsFillArchiveFill className='icon' /> Department Progress
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link'>
            <BsListCheck className='icon' /> Activities
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link'>
            <BsMenuButtonWideFill className='icon' /> Reports
          </span>
        </li>
        <li className='sidebar-list-item'>
          <span className='sidebar-list-item-link'>
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
