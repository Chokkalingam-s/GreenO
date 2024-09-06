import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signIn/SignIn';
import StudentSignUp from './components/signUp/StudentSignUp';
import AdminSignUp from './components/signUp/AdminSignUp';
import './App.css';
import StudentSidebar from './components/sidebar/StudentSideBar';
import StudentHome from './student/StudentHome';
import AdminHome from './admin/AdminHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> 
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/student-signup" element={<StudentSignUp />} /> 
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/Student" element={<StudentHome />} /> 
        <Route path="/AdminHome" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
