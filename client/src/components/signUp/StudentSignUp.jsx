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

    const hashedPassword = bcrypt.hashSync(formData.password, 10);

  
    const postData = {
      role: formData.role,
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
      mobileNumber: formData.role === 'student' ? formData.mobileNumber : null,
      state: formData.state,
      district: formData.district,
      collegeName: formData.collegeName,
      department: formData.role === 'student' ? formData.department : null,
      collegeRegisterNumber: formData.role === 'student' ? formData.collegeRegisterNumber : null,
      yearOfGraduation: formData.role === 'student' ? formData.yearOfGraduation : null,
      aadharNumber: formData.role === 'student' ? formData.aadharNumber : null,
      principalName: formData.role === 'admin' ? formData.principalName : null,
      pocNumber: formData.role === 'admin' ? formData.pocNumber : null,
    };

    try {
      const response = await axios.post('http://localhost:3000/signup', postData);
      console.log('Sign up successful:', response.data);
     } catch (error) {
      console.error('Error signing up:', error);
      }
  };

  return (
    <div className="">
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

        {formData.role === 'student' && (
          <>
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
          </>
        )}

        {formData.role === 'admin' && (
          <>
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
          </>
        )}

        <button type="submit" className="btn btn-primary btn-block mt-4">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignUp;
