import React from 'react';
import {
  BsHouseDoorFill, BsPersonFill, BsCameraFill, BsBookFill,
  BsFillFileEarmarkTextFill, BsBoxArrowRight, BsList
} from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';

function StudentSideBar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    
    localStorage.removeItem('token'); 
    
    
    navigate('/signin'); 
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive slide-in" : "slide-out"}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsList className="icon_header" /> Student Panel
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to="/StudentHome" activeClassName="active">
            <BsHouseDoorFill className="icon" /> Home
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/Student/Profile" activeClassName="active">
            <BsPersonFill className="icon" /> Profile
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/student/my-activities" activeClassName="active">
            <BsFillFileEarmarkTextFill className="icon" /> My Activities
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/student/upload-snaps" activeClassName="active">
            <BsCameraFill className="icon" /> Upload Snaps
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/Student/Resources" activeClassName="active">
            <BsBookFill className="icon" /> Resources
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <span onClick={handleLogout} className="sidebar-list-item-link">
            <BsBoxArrowRight className="icon" /> Logout
          </span>
        </li>
      </ul>
    </aside>
  );
}

export default StudentSideBar;
