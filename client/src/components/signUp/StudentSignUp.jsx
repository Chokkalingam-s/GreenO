import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

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
const years = Array.from({ length: 4 }, (_, i) => currentYear + i);

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

  const navigate = useNavigate(); 

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

    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/StudentHome');
      } else {
        alert('Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during sign-up.');
    }
  };

  return (
    <div className="container1">
      <div className="card signUpCard">
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

          <button type="submit" className="btn btn-primary btn-block mt-4">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignUp;
