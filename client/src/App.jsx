import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signIn/SignIn';
import StudentSignUp from './components/signUp/StudentSignUp';
import AdminSignUp from './components/signUp/AdminSignUp';
import StudentHome from './student/StudentHome';
import AdminHome from './admin/AdminHome';
import MyActivities from './student/MyActivities';
import UploadSnaps from './student/UploadSnaps';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/student/my-activities" element={<MyActivities />} />
        <Route path="/student/upload-snaps" element={<UploadSnaps />} />
      </Routes>
    </Router>
  );
}

export default App;
