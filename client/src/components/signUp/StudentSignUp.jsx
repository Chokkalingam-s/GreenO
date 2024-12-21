import { useState } from 'react'
import axios from 'axios'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const departments = [
  'Artificial Intelligence and Data Science',
  'Civil Engineering',
  'Computer Science and Business Systems',
  'Computer Science and Design',
  'Computer Science and Engineering',
  'Electrical and Electronics Engineering',
  'Electronics and Communication Engineering',
  'Electronics and Communication (Advanced Communication Technology)',
  'Electronics Engineering (VLSI Design and Technology)',
  'Electronics and Instrumentation Engineering',
  'Information Technology',
  'Mechanical Engineering',
  'Science and Humanities',
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 4 }, (_, i) => currentYear + i)

const StudentSignUp = () => {
  const [formData, setFormData] = useState({
    role: 'student',
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    state: '',
    district: '',
    collegeName: 'R.M.K. Engineering College',
    department: '',
    collegeRegisterNumber: '',
    yearOfGraduation: '',
    aadharNumber: '',
    principalName: '',
    pocNumber: '',
  })

  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits.'
    }

    if (formData.aadharNumber.length !== 12) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits.'
    }

    if (!formData.email.endsWith('@rmkec.ac.in')) {
      newErrors.email = 'Email must end with "@rmkec.ac.in".'
    }

    if (formData.collegeRegisterNumber.length !== 12) {
      newErrors.collegeRegisterNumber =
        'College register number must be exactly 12 digits.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(
        'http://localhost:3000/signup',
        formData
      )
      const { token } = response.data

      if (token) {
        await axios.post('http://localhost:3000/send-otp', {
          email: formData.email,
        })
        setOtpSent(true)
        toast.success('OTP has been sent to your email.')
      } else {
        toast.error('Sign up failed. Please try again.')
      }
    } catch (error) {
      console.error('Error signing up:', error)
      toast.error('An error occurred during sign-up.')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', {
        email: formData.email,
        otp,
      })
      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        toast.success('OTP verified successfully!')
        navigate('/signin')
      } else {
        toast.error('Invalid OTP. Please try again.')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      toast.error('An error occurred while verifying OTP.')
    }
  }

  return (
    <div className='container1'>
      <ToastContainer />
      <div className='card signUpCard'>
        <h2 className='text-center'>Student SignUp</h2>
        {!otpSent ? (
          <form onSubmit={handleSubmit} className='mt-4'>
            <div className='form-group mb-3'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group mb-3'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <small className='text-danger'>{errors.email}</small>
              )}
            </div>

            <div className='form-group mb-3'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group mb-3'>
              <div className='row'>
                <div className='col-6'>
                  <label htmlFor='state'>State</label>
                  <input
                    type='text'
                    className='form-control'
                    id='state'
                    name='state'
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-6'>
                  <label htmlFor='district'>District</label>
                  <input
                    type='text'
                    className='form-control'
                    id='district'
                    name='district'
                    value={formData.district}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className='form-group mb-3'>
              <label htmlFor='collegeName'>College Name</label>
              <select
                id='collegeName'
                name='collegeName'
                className='form-control'
                value={formData.collegeName}
                onChange={handleChange}
                required
                disabled>
                <option value='R.M.K. Engineering College'>
                  R.M.K. Engineering College
                </option>
              </select>
            </div>

            {formData.role === 'student' && (
              <>
                <div className='form-group mb-3'>
                  <label htmlFor='mobileNumber'>Mobile Number</label>
                  <input
                    type='text'
                    className='form-control'
                    id='mobileNumber'
                    name='mobileNumber'
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    maxLength='10'
                    required
                  />
                  {errors.mobileNumber && (
                    <small className='text-danger'>{errors.mobileNumber}</small>
                  )}
                </div>

                <div className='form-group mb-3'>
                  <label htmlFor='department'>Department</label>
                  <select
                    id='department'
                    name='department'
                    className='form-control'
                    value={formData.department}
                    onChange={handleChange}
                    required>
                    <option value=''>Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group mb-3'>
                  <label htmlFor='collegeRegisterNumber'>
                    College Register Number
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='collegeRegisterNumber'
                    name='collegeRegisterNumber'
                    value={formData.collegeRegisterNumber}
                    onChange={handleChange}
                    maxLength='12'
                    required
                  />
                  {errors.collegeRegisterNumber && (
                    <small className='text-danger'>
                      {errors.collegeRegisterNumber}
                    </small>
                  )}
                </div>

                <div className='form-group mb-3'>
                  <label htmlFor='yearOfGraduation'>Year of Graduation</label>
                  <select
                    id='yearOfGraduation'
                    name='yearOfGraduation'
                    className='form-control'
                    value={formData.yearOfGraduation}
                    onChange={handleChange}
                    required>
                    <option value=''>Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='form-group mb-3'>
                  <label htmlFor='aadharNumber'>Aadhar Number</label>
                  <input
                    type='text'
                    className='form-control'
                    id='aadharNumber'
                    name='aadharNumber'
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    maxLength='12'
                    required
                  />
                  {errors.aadharNumber && (
                    <small className='text-danger'>{errors.aadharNumber}</small>
                  )}
                </div>
              </>
            )}

            <button
              type='submit'
              className='btn btn-primary btn-block mt-4'
              disabled={loading}>
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={verifyOtp} className='mt-4'>
            <div className='form-group mb-3'>
              <label htmlFor='otp'>Enter OTP sent to your email</label>
              <input
                type='text'
                className='form-control otp-input'
                id='otp'
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength='6' // Restrict input length to 6
                required
              />
            </div>
            <button type='submit' className='btn btn-primary btn-block mt-4'>
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default StudentSignUp
