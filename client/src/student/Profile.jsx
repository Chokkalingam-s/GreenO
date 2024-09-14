import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import './Profile.css';

const Profile = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null); // State to store student details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetch student details on component mount
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await axios.get('http://localhost:3000/api/get-user-detailss', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        setStudentDetails(response.data[0]); // Set student details
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  return (
    <div className='grid-container'>
      <StudentHeader OpenSidebar={OpenSidebar} />
      <StudentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <div className="row">
          <div className="col-md-6">
            <div className='card profileCard1'>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className='student-details'>
                  <h3>Student Profile</h3>
                  <ul>
                    <li><strong>Name:</strong> {studentDetails.name}</li>
                    <li><strong>Email:</strong> {studentDetails.email}</li>
                    <li><strong>Mobile Number:</strong> {studentDetails.mobileNumber}</li>
                    <li><strong>College Name:</strong> {studentDetails.collegeName}</li>
                    <li><strong>Department:</strong> {studentDetails.department}</li>
                    <li><strong>College Register Number:</strong> {studentDetails.collegeRegisterNumber}</li>
                    <li><strong>Year of Graduation:</strong> {studentDetails.yearOfGraduation}</li>
                    <li><strong>Aadhar Number:</strong> {studentDetails.aadharNumber}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col">
                <div className='card profileCard2'>
                  {/* Additional content or components can go here */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className='card profileCard2'>
                  {/* Additional content or components can go here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
