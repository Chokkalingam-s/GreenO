import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import './Profile.css';

const Profile = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [uploadedCount, setUploadedCount] = useState(null); // Initially null to handle loading state
  const totalImages = 8;
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const fetchUploadedImagesCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-uploaded-images-count', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
  
        console.log(response.data); 
        const count = Number(response.data.uploadedImagesCount);
        setUploadedCount(!isNaN(count) ? count : 0);
      } catch (error) {
        console.error('Error fetching uploaded images count:', error);
        setUploadedCount(0); // Set to 0 in case of error
      }
    };
  
    fetchUploadedImagesCount();

    const fetchStudentDetails = async () => {
      try {
  
        const response = await axios.get('http://localhost:3000/api/get-user-detailss', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setStudentDetails(response.data[0]); 
        setLoading(false); 
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  const progressPercentage = (uploadedCount / totalImages) * 100;

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

      <div className="details-card">
        <h4>Personal Details</h4>
        <ul>
          <li><strong>Name:</strong> {studentDetails.name}</li>
          <li><strong>Email:</strong> {studentDetails.email}</li>
          <li><strong>Mobile Number:</strong> {studentDetails.mobileNumber}</li>
          <li><strong>Aadhar Number:</strong> {studentDetails.aadharNumber}</li>
        </ul>
      </div>

      <div className="details-card">
        <h4>Educational Details</h4>
        <ul>
          <li><strong>College Name:</strong> {studentDetails.collegeName}</li>
          <li><strong>Department:</strong> {studentDetails.department}</li>
          <li><strong>College Register Number:</strong> {studentDetails.collegeRegisterNumber}</li>
          <li><strong>Year of Graduation:</strong> {studentDetails.yearOfGraduation}</li>
        </ul>
      </div>

    </div>
  )}
</div>

          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col">
                <div className='card profileCard2'>
                <Gauge
                    value={progressPercentage}
                    min={0}
                    max={100}
                    startAngle={-120}
                    endAngle={120}
                    thickness={10}
                    sx={{
                      [`& .MuiGauge-valueLabel`]: {
                        fontSize: 50,
                        fontWeight: 'bold',
                        transform: 'translate(0px, 0px)',
                      },
                    }}
                    text={({ value }) => `${uploadedCount} / ${totalImages}`}
                  />
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
  );
};

export default Profile;
