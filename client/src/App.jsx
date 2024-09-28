import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignIn from './components/signIn/SignIn';
import StudentSignUp from './components/signUp/StudentSignUp';
import AdminSignUp from './components/signUp/AdminSignUp';
import StudentHome from './student/StudentHome';
import AdminHome from './admin/AdminHome';
import MyActivities from './student/MyActivities';
import UploadSnaps from './student/UploadSnaps';
import Resource from './student/Resource';
import Profile from './student/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import OverallProgress from './admin/OverallProgress';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authToken") !== null
  );

  useEffect(() => {

    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("authToken") !== null);
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route
          path="/StudentHome"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <StudentHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminHome"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student/my-activities"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyActivities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student/upload-snaps"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UploadSnaps />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student/Resources"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Resource />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student/Profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-overallprogress"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OverallProgress />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
