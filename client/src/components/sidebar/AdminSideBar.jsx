import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';

function AdminSideBar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');


    navigate('/signin');
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
          <NavLink to="/AdminHome" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/admin-overallprogress" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsFillArchiveFill className='icon' /> Overall Progress
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/Admin/Activities" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsListCheck className='icon' /> Activities
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/Admin/Reports" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsMenuButtonWideFill className='icon' /> Reports
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/Admin/Settings" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsFillGearFill className='icon' /> Settings
          </NavLink>
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

export default AdminSideBar;
