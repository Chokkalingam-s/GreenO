import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import './Report.css';
import DepartmentHeader from '../components/sidebar/DepartmentHeader';
import DepartmentSideBar from '../components/sidebar/DepartmentSideBar';

ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [topDepartments, setTopDepartments] = useState([]);
  const [userDepartmentRank, setUserDepartmentRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    fetchDepartmentData();
  }, []);

  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/new-department-data', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        const data = response.data;
        setDepartmentData(data);

        const sortedDepartments = [...data].sort((a, b) => b.uploadCount - a.uploadCount);
        setTopDepartments(sortedDepartments.slice(0, 3));

        const userResponse = await axios.get('http://localhost:3000/api/new-user-details', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        const userDepartment = userResponse.data.department;
        const userRank = sortedDepartments.findIndex((dept) => dept.department === userDepartment) + 1;
        setUserDepartmentRank(userRank);
      } else {
        console.error('Data format is incorrect:', response.data);
      }
    } catch (error) {
      console.error('Error fetching department data:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const pieData = {
    labels: departmentData.map((dept) => dept.department),
    datasets: [
      {
        data: departmentData.map((dept) => dept.uploadCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid-container">
      <DepartmentHeader OpenSidebar={OpenSidebar} />
      <DepartmentSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

      <div className="report-content">
        <h2 className="report-title">What You Should Know</h2>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <>
            {departmentData.length > 0 ? (
              <div className="pie-chart-section">
                <h3 className="section-title">Department-wise Upload Count</h3>
                <div className="pie-chart-container">
                  <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />
                </div>
              </div>
            ) : (
              <p className="no-data-text">No data available for departments.</p>
            )}

            <div className="top-departments-section">
              <h3 className="section-title">Top 3 Departments</h3>
              <table className="top-departments-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Department</th>
                    <th>Upload Count</th>
                  </tr>
                </thead>
                <tbody>
                  {topDepartments.map((dept, index) => (
                    <tr key={dept.department}>
                      <td>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</td>
                      <td>{dept.department}</td>
                      <td>{dept.uploadCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userDepartmentRank && (
              <div className="user-department-rank">
                <p className="rank-info">
                  Your department is currently ranked: <strong>{userDepartmentRank}</strong>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Report;
