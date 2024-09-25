import React, { useState, useEffect } from 'react';
import { BsFillGrid3X3GapFill, BsPeopleFill, } from 'react-icons/bs';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import axios from 'axios';

const chartSetting = {

  width: 1000,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};


function AHome() {
  const [studentCount, setStudentCount] = useState(0);
  const [saplingCount, setSaplingCount] = useState(0);
  
  const [data, setData] = useState([]);

  
  

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/student-count');
        setStudentCount(response.data.studentCount);
        setSaplingCount(response.data.saplingCount);
      } catch (error) {
        console.error('Error fetching student count:', error.response?.data || error.message);
      }
    };
    
    fetchStudentCount();
    

    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you're storing JWT tokens in local storage
  const userEmail = localStorage.getItem('userEmail');
        const response = await axios.get('http://localhost:3000/api/admin-data', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
          params: { email: userEmail }, // Send email as query parameter or body if needed
        });
         const fetchedData = response.data.map(item => ({
          department: item.department,
          Trees: item.uploadCount,    // Represents 'uploadCount' as 'Trees'
          Students: item.studentCount, // Represents 'studentCount' as 'Students'
        }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching admin data:', error.response?.data || error.message);
      }
    };
    

    fetchAdminData();
  }, []);
  

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card adminCard">
          <div className="card-inner">
            <h3>Student's OnBoarded</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{studentCount}</h1> 
        </div>
        <div className="card adminCard">
          <div className="card-inner">
            <h3>Tree's Planted</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{saplingCount}</h1>
        </div>
      </div>

      

      <div className="charts">


<BarChart
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'department' }]}
      series={[
        { dataKey: 'Students', label: 'Students' },
        { dataKey: 'Trees', label: 'Trees' },
      ]}
      {...chartSetting}
    />

      </div>

      
    </main>
  );
}

export default AHome;
