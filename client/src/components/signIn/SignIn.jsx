import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignIn.css';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const SignIn = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showNewPasswordSetup, setShowNewPasswordSetup] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password, role });
      const { token, userRole } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setRole(userRole || role);
        navigate(userRole === 'admin' ? '/AdminHome' : userRole === 'hod' ? '/HoDHome' : '/StudentHome');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/send-otp', { email });
      if (response.data && response.data.includes("OTP sent to email")) {
        setShowOtpPopup(true);
        setResetEmail(email);
      } else {
        setError(response.data || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!resetEmail || !otp) {
      setError('Email and OTP are required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', { email: resetEmail, otp });
      if (response.data.success) {
        setShowNewPasswordSetup(true);
        setShowOtpPopup(false);
      } else {
        setError('Invalid OTP');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail || !otp || !newPassword) {
      setError('Email, OTP, and new password are required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/reset-password', { email: resetEmail, otp, newPassword });
      if (response.status === 200) {
        setSuccess('Password reset successfully.');
        setTimeout(() => setShowNewPasswordSetup(false), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Password reset failed');
    }
  };

  const handleStudentSignUp = () => {
    alert('Student Sign Up logic goes here.');
  };

  const handleAdminSignUp = () => {
    alert('Admin Sign Up logic goes here.');
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="role-checkboxes">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="hod"
                  checked={role === 'hod'}
                  onChange={() => setRole('hod')}
                />
                HoD
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="principal"
                  checked={role === 'principal'}
                  onChange={() => setRole('principal')}
                />
                Principal
              </label>
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <button type="button" className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>

          <form className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="role-buttons">
              <button type="button" className="btn role-btn student-btn" onClick={handleStudentSignUp}>
                Student
              </button>
              <button type="button" className="btn role-btn admin-btn" onClick={handleAdminSignUp}>
                Admin
              </button>
            </div>
          </form>
        </div>
      </div>

      {showOtpPopup && (
        <div className="otp-popup">
          <h3>Enter OTP</h3>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          <button onClick={() => setShowOtpPopup(false)}>Cancel</button>
        </div>
      )}

      {showNewPasswordSetup && (
        <div className="new-password-popup">
          <h3>Set New Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
    </div>
  );
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default SignIn;
