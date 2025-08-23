import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import {About, Contact, GreenO, Home} from './exp_comp'
import Navbar from './components/NavBar'
import Individual from './components/pages/Individual'
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
          element={<Contact />}
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
