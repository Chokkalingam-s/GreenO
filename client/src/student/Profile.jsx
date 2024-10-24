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

  const handleGenerateCertificate = async () => {
    const certificateElement = document.getElementById('certificate');
  
    if (!certificateElement) {
      console.error('Certificate element not found!');
      return;
    }
    certificateElement.style.visibility = 'visible';
  certificateElement.style.position = 'absolute';
  certificateElement.style.top = '0';
  certificateElement.style.left = '0';
  certificateElement.style.zIndex = '-1';
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Use html2canvas to capture the certificate
      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Improve quality by scaling
        useCORS: true, // Allow cross-origin images
      });
  
      // Convert canvas to an image and create a PDF or trigger download
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save(`${studentDetails.name}-Certificate.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }finally {
      // Re-hide the certificate after generation
      certificateElement.style.visibility = 'hidden';
      certificateElement.style.position = 'absolute';
      certificateElement.style.top = '-9999px';
    }
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
                      // backgroundColor: '#fff',
                      top: '-9999px', // Place out of the viewport to hide it
          visibility: 'hidden',
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
                        top: '50%',
                        left: '45%',
                        width: '110%',
                        transform: 'translate(-50%, -50%)', 
                        textAlign: 'center',
                        fontSize: '35px',
                        fontWeight: 'bold',
                        lineHeight: '1.5',
                        marginTop: '10px',
                        padding: '10px',
                        fontFamily: 'Arima, Medium 500 !important',
                        lineHeight: '1',
                        letterSpacing: '0.1em',
                        color: '#000',
                      }}
                    >
{studentDetails ? (
  <>
    <h2 style={{ marginBottom: '8px' , fontSize : '40px' }}> {studentDetails.name} </h2>
    <p >
    Student of Department of <strong>{studentDetails.department}</strong>,
    </p> 
    <p >
    from <strong>{studentDetails.collegeName}</strong> 
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
