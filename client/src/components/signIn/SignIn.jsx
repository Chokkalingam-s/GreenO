import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignIn.css';

const SignIn = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  
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

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
      
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div className="role-checkboxes">
              <label>
                <input type="checkbox" name="role" value="student" />
                Student
              </label>
              <label>
                <input type="checkbox" name="role" value="admin" />
                Admin
              </label>
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>

          <div className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <button className="btn solid" onClick={handleStudentSignUp}>
              Student Sign Up
            </button>
            <button className="btn solid" onClick={handleAdminSignUp}>
              Admin Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            {!isSignUpMode && (
              <button className="btn transparent" onClick={handleSignUpClick}>
                Sign up
              </button>
            )}
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            {isSignUpMode && (
              <button className="btn transparent" onClick={handleSignInClick}>
                Sign in
              </button>
            )}
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
