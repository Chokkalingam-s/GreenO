import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

const departments = [
  'Artificial Intelligence and Data Science',
  'Civil Engineering',
  'Computer Science and Business Systems',
  'Computer Science and Design',
  'Computer Science and Engineering',
  'Electrical and Electronics Engineering',
  'Electronics and Communication Engineering',
  'Electronics and Communication (Advanced Communication Technology)',
  'Electronics Engineering (VLSI Design and Technology)',
  'Electronics and Instrumentation Engineering',
  'Information Technology',
  'Mechanical Engineering',
  'Science and Humanities',
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 4 }, (_, i) => currentYear+1 + i);

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

    if (formData.mobileNumber.length !== 10) {
      alert('Mobile number must be 10 digits.');
      return;
    }

    if (formData.aadharNumber.length !== 12) {
      alert('Aadhar number must be 12 digits.');
      return;
    }

    const currentYear = new Date().getFullYear();
    const graduationYear = parseInt(formData.yearOfGraduation, 10);
    if (graduationYear < currentYear || graduationYear > currentYear + 4) {
      alert('Year of Graduation must be between this year and the next 4 years.');
      return;
    }

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
    <div className="container1">
      <div className="card">
        <h2 className="text-center">Student SignUp</h2>
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
            <div className="row">
              <div className="col-6">
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
              <div className="col-6">
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
            </div>
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
                  maxLength="10"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
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
                <select
                  id="yearOfGraduation"
                  name="yearOfGraduation"
                  className="form-control"
                  value={formData.yearOfGraduation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
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
                  maxLength="12"
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
    </div>
  );
};

export default StudentSignUp;
