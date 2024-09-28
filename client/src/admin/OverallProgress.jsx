import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/sidebar/AdminHeader';
import AdminSideBar from '../components/sidebar/AdminSideBar';
import './OverallProgress.css'; 

const OverallProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching overall progress data...");
        const response = await axios.get('http://localhost:3000/api/overall-progress');
        
        console.log("Progress Data:", response.data);
        
        setProgressData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => setOpenSidebarToggle(prev => !prev);

  return (
    <div className='grid-container'>
      <AdminHeader OpenSidebar={toggleSidebar} />
      <AdminSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={toggleSidebar} />
      <div className='main-content'>
        <h2>Overall Progress</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Department Name</th>
                <th>Total Students</th>
                <th>No. of Plants in Process</th>
                <th>1st Year</th>
                <th>2nd Year</th>
                <th>3rd Year</th>
                <th>4th Year</th>
              </tr>
            </thead>
            <tbody>
              {progressData.map((data, index) => (
                <tr key={data.department}>
                  <td>{index + 1}</td>
                  <td>{data.department}</td>
                  <td>{data.studentCount}</td>
                  <td>{data.uploadCount}</td>
                  <td>{data.yearCounts.firstYear}</td>
                  <td>{data.yearCounts.secondYear}</td>
                  <td>{data.yearCounts.thirdYear}</td>
                  <td>{data.yearCounts.fourthYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OverallProgress;
