import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';

function AHome() {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get('/api/student-count');
        console.log('Student count response:', response.data); 
        setStudentCount(response.data.count);
      } catch (error) {
        console.error('Error fetching student count:', error.response?.data || error.message);
      }
    };
  
    fetchStudentCount();
  }, []);
  

  const data = [
    { name: 'ADS', Trees: 2400, Students: 4000, amt: 2400 },
    { name: 'MECH', Trees: 1398, Students: 3000, amt: 2210 },
    { name: 'IT', Trees: 3800, Students: 4000, amt: 2290 },
    { name: 'CSE', Trees: 2780, Students: 3908, amt: 2000 },
    { name: 'ECE', Trees: 1890, Students: 4800, amt: 2181 },
    { name: 'EEE', Trees: 2390, Students: 3800, amt: 2500 },
    { name: 'CIVIL', Trees: 3490, Students: 4300, amt: 2100 },
  ];

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
          <h1>2700</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Students" fill="#8884d8" />
            <Bar dataKey="Trees" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Students" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Trees" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AHome;
