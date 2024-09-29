import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './DHome.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DHome = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/department-student-data', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStudentData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching data');
      }
    };

    fetchDepartmentData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!studentData) {
    return <div className="loading">Loading...</div>;
  }

  const chartData = {
    labels: Object.keys(studentData.yearCounts),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(studentData.yearCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: 'rgba(153, 102, 255, 0.8)',
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold',
          },
          color: '#343a40', 
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        bodyColor: '#ffffff',
        borderColor: '#ddd',
        borderWidth: 1,
        cornerRadius: 5,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#495057',
          font: {
            size: 13,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          lineWidth: 1,
        },
        ticks: {
          color: '#495057',
          font: {
            size: 13,
          },
        },
      },
    },
  };

  return (
    <div className="dhome-container">
      <h1>Department Overview</h1>
      <div className="card-container">
        <div className="card">
          <h2>Total Students</h2>
          <p>{studentData.totalStudents}</p>
        </div>
        <div className="card">
          <h2>Total Saplings Posted</h2>
          <p>{studentData.totalSaplings}</p>
        </div>
      </div>
    
      <h2>Year Distribution</h2>
      <div className="chart-title">Year-wise Student Distribution</div>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DHome;
