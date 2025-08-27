import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/NavBar'
import Individual from './components/pages/Individual'
import Home from './components/pages/HomePage'
import GreenO from './components/pages/GreenO'
import About from './components/About'
import ContactUs from './components/pages/Contact'
import Corp from './components/pages/Corp'
import College from './components/pages/College'
import Student from './components/pages/Student'

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/OSOT'
          element={<GreenO />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/contact'
          element={<ContactUs />}
        />
        <Route
          path='/getInvolved/individual'
          element={<Individual />}
        />
        <Route
          path='/getInvolved/college'
          element={<College />}
        />
        <Route
          path='/getInvolved/student'
          element={<Student />}
        />
        <Route
          path='/getInvolved/corporation_csr'
          element={<Corp />}
        />
      </Routes>
    </Router>
  )
}
