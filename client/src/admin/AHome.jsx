import React, { useState, useEffect } from 'react';
import { BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

const chartSetting = {
  height: 400,
  margin: { top: 20, right: 30, bottom: 50, left: 50 },
  grid: {
    verticalLines: true,
    horizontalLines: true,
  },
  tooltip: true,
};


const abbreviateDepartmentName = (department) => {
  return department
    .split(' ')
    .map(word => {
      if (word.toLowerCase() === 'and') return ''; 
      if (word.startsWith('(') && word.endsWith(')')) return word; 
      return word.charAt(0).toUpperCase(); 
    })
    .filter(Boolean) 
    .join('');
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

    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        const response = await axios.get('http://localhost:3000/api/admin-data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { email: userEmail },
        });

        const fetchedData = response.data.map(item => ({
          department: abbreviateDepartmentName(item.department), // Abbreviate department name
          Trees: item.uploadCount,
          Students: item.studentCount,
        }));

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching admin data:', error.response?.data || error.message);
      }
    };

    fetchStudentCount();
    fetchAdminData();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Dashboard Overview</h3>
      </div>

      <div className="main-cards">
        <div className="card adminCard">
          <div className="card-inner">
            <h3>Students Onboarded</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{studentCount}</h1>
        </div>
        <div className="card adminCard">
          <div className="card-inner">
            <h3>Trees Planted</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{saplingCount}</h1>
        </div>
      </div>

      <div className="charts-container">
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'department', label: 'Department' }]}
          series={[
            { dataKey: 'Students', label: 'Students', color: '#4CAF50' },
            { dataKey: 'Trees', label: 'Trees', color: '#FFC107' },
          ]}
          {...chartSetting}
        />
      </div>
    </main>
  );
}

export default AHome;
