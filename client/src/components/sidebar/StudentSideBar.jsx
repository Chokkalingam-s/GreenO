import React from 'react';

import {
  BsHouseDoorFill, BsPersonFill, BsCameraFill, BsBookFill,
  BsFillFileEarmarkTextFill, BsBoxArrowRight, BsList
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

function StudentSideBar({ openSidebarToggle, OpenSidebar }) {
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
          <NavLink to="/home" activeClassName="active">
            <BsHouseDoorFill className="icon" /> Home
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/profile" activeClassName="active">
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
          <NavLink to="/resources" activeClassName="active">
            <BsBookFill className="icon" /> Resources
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/logout" activeClassName="active">
            <BsBoxArrowRight className="icon" /> Logout
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default StudentSideBar;
