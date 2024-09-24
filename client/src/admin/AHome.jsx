import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';

function AHome() {
  const [studentCount, setStudentCount] = useState(0);
  const [saplingCount, setSaplingCount] = useState(0);
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/student-count');
        console.log('Student count response:', response.data); 
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
        });const fetchedData = response.data.map(item => ({
          name: item.department,
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
