import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import StudentSideBar from '../components/sidebar/StudentSideBar';
import StudentHeader from '../components/sidebar/StudentHeader';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Profile.css';
import certificateImage from './Certificate.png'; 

const Profile = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [uploadedCount, setUploadedCount] = useState(null); 
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

        const count = Number(response.data.uploadedImagesCount);
        setUploadedCount(!isNaN(count) ? count : 0);
      } catch (error) {
        console.error('Error fetching uploaded images count:', error);
        setUploadedCount(0); 
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

  const handleGenerateCertificate = () => {
    const certificateElement = document.getElementById('certificate');

    html2canvas(certificateElement, { scale: 2,useCORS: true,  }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const pdfWidth = 297;
      const pdfHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${studentDetails.name}-Certificate.pdf`);
    });
  };

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
                  <p className='PorgressTitle'>My Progress</p>
                  <div className='gauge-container'> 
                    <Gauge
                      value={progressPercentage}
                      min={0}
                      max={100}
                      startAngle={-120}
                      endAngle={120}
                      thickness={15}  
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: '30px',  // Increase text size
                          fontWeight: 'bold',
                          color: '#e0e0e0',  // Text color
                        },
                        [`& .MuiGauge-bar`]: {
                          fill: '#4caf50',  // Gauge color
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: '#52b202',
                        },
                        [`& .MuiGauge-background`]: {
                          fill: '#e0e0e0',  // Background color
                        }
                      }}
                      text={({ value }) => `${uploadedCount} / ${totalImages}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card profileCard2 certificateGeneration"  style={{ overflow: 'hidden' }}>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleGenerateCertificate}
                  >
                    Generate Certificate
                  </button>

                  {/* Certificate Template */}
                  <div
                    id="certificate"
                    style={{
                      width: '297mm',
                      height: '210mm',
                      position: 'relative',
                      margin: '0 auto', // Center horizontally
                      overflow: 'hidden', // Ensure contents do not go outside
                      backgroundColor: '#fff',
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={certificateImage} // Update this path with your actual image path
                      alt="Certificate Bg"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',    
                        objectFit: 'cover',
                        zIndex: 1,
                        borderRadius: 'inherit',
                      }}
                    />
                    {/* Student Details Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        zIndex: 2,
                        top: '54%',
                        left: '40%',
                        width: '110%',
                        transform: 'translate(-50%, -50%)', 
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        lineHeight: '1.5',
                        marginTop: '10px',
                        padding: '10px',
                        fontFamily: 'Arima, Medium 500 !important',
                        fontSize: '16px',
                        lineHeight: '0.4',
                        letterSpacing: '0.3em',
                        color: '#000',
                      }}
                    >
{studentDetails ? (
  <>
    <h2 style={{ marginBottom: '10px' }}> {studentDetails.name} </h2>
    <p >
      from <strong>{studentDetails.collegeName}</strong> </p>
    <p >
      of the <strong>{studentDetails.department}</strong> Department has 
    </p>
    <p >
      Successfully Grown a Tree in academic period of <strong>{studentDetails.yearOfGraduation -4} - {studentDetails.yearOfGraduation}</strong>
    </p>
  </>
) : (
  <p>Loading...</p>
)}
                    </div>
                  </div>
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
