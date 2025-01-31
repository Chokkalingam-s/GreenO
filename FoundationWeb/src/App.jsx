import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GreenO, Home, NavBar } from './exp_comp'

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/OneStudentOneTree' element={<GreenO />} />
      </Routes>
    </Router>
  )
}
