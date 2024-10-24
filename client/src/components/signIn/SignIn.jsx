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
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleStudentSignUp = () => {
    navigate("/student-signup");
  };

  const handleAdminSignUp = () => {
    navigate("/admin-signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login Request Data:', { email, password, role });
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
        role
      });

      const { token, userRole } = response.data; 
      if (token) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setRole(userRole || role); 

        if (userRole === 'admin') {
          navigate('/AdminHome'); 
        } else if (userRole === 'hod') {
          navigate('/HoDHome'); 
        } else if (userRole === 'principal') {
          navigate('/AdminHome'); 
        } else if (userRole === 'student') {
          navigate('/StudentHome'); 
        } else {
          console.error("Role not recognized:", userRole);
        }
      }
    } catch (error) {
      console.error('Error Details:', error.response); 
      setError(error.response?.data?.message || 'Login failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
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
            {error && <p className="error-message">{error}</p>}
          </form>


          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="role-buttons">
              <button
                type="button"
                className="btn role-btn student-btn"
                onClick={handleStudentSignUp}
              >
                Student
              </button>
              <button
                type="button"
                className="btn role-btn admin-btn"
                onClick={handleAdminSignUp}
              >
                Admin
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
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
