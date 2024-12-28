import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AdminSignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    role: 'admin',
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    state: '',
    district: '',
    collegeName: '',
    principalName: '',
    pocNumber: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:3000/signup',
        formData
      )
      const { token } = response.data

      if (token) {
        localStorage.setItem('token', token)
        navigate('/AdminHome')
      } else {
        alert('Sign up failed. Please try again.')
      }
    } catch (error) {
      console.error('Error signing up:', error)
      alert('An error occurred during sign-up.')
    }
  }

  return (
    <div className='container center'>
      <div className='main'>
        <img src='/treegrow.png' alt='Tree Grow' className='w-1/2' />
        <form onSubmit={handleSubmit} className='w-1/2 pl-4' required>
          <h2 className='head'>Admin Sign Up</h2>
          <input
            type='text'
            className='form-control'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Faculty Name'
          />
          <input
            type='email'
            className='form-control'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
          />
          <input
            type='password'
            className='form-control'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
          <input
            type='text'
            className='form-control'
            name='mobileNumber'
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder='Mobile Number'
          />
          <input
            type='text'
            className='form-control'
            name='state'
            value={formData.state}
            onChange={handleChange}
            placeholder='State'
          />
          <input
            type='text'
            className='form-control'
            name='district'
            value={formData.district}
            onChange={handleChange}
            placeholder='District'
          />
          <input
            type='text'
            className='form-control'
            name='collegeName'
            value={formData.collegeName}
            onChange={handleChange}
            placeholder='College Name'
          />
          <input
            type='text'
            className='form-control'
            name='principalName'
            value={formData.principalName}
            onChange={handleChange}
            placeholder='Principal Name'
          />
          <input
            type='text'
            className='form-control'
            name='pocNumber'
            value={formData.pocNumber}
            onChange={handleChange}
            placeholder='POC Number'
          />
          <span className='flex items-center justify-end gap-x-4'>
            <button type='submit' className='center'>
              <p>Finish</p>
              {/* <img
                      src='/arrow-right-to-bracket-solid.svg'
                      alt='sign in icon'
                      className='w-6'
                    /> */}
            </button>
            <button className='cancel' onClick={() => navigate('/signin')}>
              Cancel
            </button>
          </span>
        </form>
      </div>
    </div>
  )
}
