import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    role: 'admin',
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    state: '',
    district: '',
    collegeName: '',
    principalName: '',
    pocNumber: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:3000/signup', formData);
      console.log('Sign up successful:', response.data);
      
    } catch (error) {
      console.error('Error signing up:', error.response?.data?.message || error.message);
      
    }
  };

  return (
    <div className="">
      <h2 className="text-center">Admin Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="name">Faculty Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="district">District</label>
          <input
            type="text"
            className="form-control"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            className="form-control"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="principalName">Principal Name</label>
          <input
            type="text"
            className="form-control"
            id="principalName"
            name="principalName"
            value={formData.principalName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pocNumber">POC Number</label>
          <input
            type="text"
            className="form-control"
            id="pocNumber"
            name="pocNumber"
            value={formData.pocNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-4">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignUp;
