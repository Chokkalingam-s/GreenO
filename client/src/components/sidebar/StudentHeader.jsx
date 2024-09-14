import React from 'react';
import { BsFillBellFill, BsCameraFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';


function StudentHeader({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsCameraFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default StudentHeader;
