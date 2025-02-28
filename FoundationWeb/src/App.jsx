import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { About, Contact, GreenO, Home, NavBar } from './exp_comp'

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/OneStudentOneTree' element={<GreenO />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  )
}
