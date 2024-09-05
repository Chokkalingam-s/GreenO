import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const StudentSignUp = () => {
  const [formData, setFormData] = useState({
    role: 'student',
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    state: '',
    district: '',
    collegeName: '',
    department: '',
    collegeRegisterNumber: '',
    yearOfGraduation: '',
    aadharNumber: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hash the password
    const hashedPassword = bcrypt.hashSync(formData.password, 10);

    // Prepare data for the backend
    const postData = {
      role: formData.role,
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
      mobileNumber: formData.mobileNumber,
      state: formData.state,
      district: formData.district,
      collegeName: formData.collegeName,
      department: formData.department,
      collegeRegisterNumber: formData.collegeRegisterNumber,
      yearOfGraduation: formData.yearOfGraduation,
      aadharNumber: formData.aadharNumber,
    };

    try {
      // Send data to the backend API
      const response = await axios.post('http://your-backend-api-url/signup', postData);
      console.log('Sign up successful:', response.data);
      // Redirect or show success message
    } catch (error) {
      console.error('Error signing up:', error);
      // Show error message
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Student Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="department">Department</label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="collegeRegisterNumber">College Register Number</label>
          <input
            type="text"
            className="form-control"
            id="collegeRegisterNumber"
            name="collegeRegisterNumber"
            value={formData.collegeRegisterNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearOfGraduation">Year of Graduation</label>
          <input
            type="text"
            className="form-control"
            id="yearOfGraduation"
            name="yearOfGraduation"
            value={formData.yearOfGraduation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="aadharNumber">Aadhar Number</label>
          <input
            type="text"
            className="form-control"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-4">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignUp;
