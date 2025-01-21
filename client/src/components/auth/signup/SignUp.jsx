import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { departments, states } from './data'
import { toast } from 'react-toastify'

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 4 }, (_, i) => currentYear + i)

export default function StudentSignUp() {
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
    secEmail: '',
    dob: ''
  })
  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const statesRef = useRef([])
  const districtsRef = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    states.forEach(({ state, districts }) => {
      statesRef.current.push(state)
      districtsRef.current.push(districts)
    })
    setFormData(prevData => ({
      ...prevData,
      state: statesRef.current[0],
      district: districtsRef.current[0][0]
    }))
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.mobileNumber.length !== 10)
      newErrors.mobileNumber = 'Mobile number must be 10 digits.'

    if (formData.aadharNumber.length !== 12)
      newErrors.aadharNumber = 'Aadhar number must be 12 digits.'

    if (!formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid Primary email.'

    if (formData.collegeRegisterNumber.length !== 12)
      newErrors.collegeRegisterNumber =
        'College register number must be exactly 12 digits.'

    if (!formData.dob) newErrors.dob = 'Date of birth is required.'

    if (formData.secEmail && !/\S+@\S+\.\S+/.test(formData.secEmail))
      newErrors.secEmail = 'Please enter a valid secondary email.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      const response = await axios.post(
        'http://localhost:3000/student-signup',
        formData
      )
      const { token } = response.data

      if (token) {
        await axios.post('http://localhost:3000/send-otp-process', {
          email: formData.email
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
      const response = await axios.post(
        'http://localhost:3000/verify-otp-process',
        {
          email: formData.email,
          otp
        }
      )
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
    <div className='container center relative z-20'>
      <span className='main'>
        <img
          src='/treegrow.png'
          alt='Tree Grow'
          className='w-1/2 md:block hidden'
        />
        {!otpSent ? (
          <form onSubmit={handleSubmit} className='md:w-1/2 px-4'>
            <h2 className='head text-center my-2 md:my-0'>Student Sign Up</h2>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Name'
              required
            />
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email (Primary)'
              required
            />
            {errors.email && <small className='error'>{errors.email}</small>}
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              required
            />
            <span className='center gap-x-2'>
              <select
                type='text'
                id='state'
                name='state'
                value={formData.state}
                onChange={e => {
                  const selectedState = e.target.value
                  const stateIndex = statesRef.current.indexOf(selectedState)
                  setFormData({
                    ...formData,
                    state: selectedState,
                    district: districtsRef.current[stateIndex][0]
                  })
                }}
                required>
                {statesRef.current.map((state, index) => (
                  <option value={state} key={index}>
                    {state}
                  </option>
                ))}
              </select>
              <select
                type='text'
                id='district'
                name='district'
                value={formData.district}
                onChange={e => {
                  setFormData({
                    ...formData,
                    district: e.target.value
                  })
                }}
                required>
                {districtsRef.current[
                  statesRef.current.indexOf(formData.state)
                ]?.map((district, index) => (
                  <option value={district} key={index}>
                    {district}
                  </option>
                ))}
              </select>
            </span>
            <input
              type='number'
              id='mobileNumber'
              name='mobileNumber'
              value={formData.mobileNumber}
              onChange={handleChange}
              maxLength='10'
              placeholder='Mobile Number'
              required
            />
            {errors.mobileNumber && (
              <small className='error'>{errors.mobileNumber}</small>
            )}
            <input
              type='email'
              id='secEmail'
              name='secEmail'
              value={formData.secEmail}
              onChange={handleChange}
              placeholder='Secondary Email'
            />
            {errors.secEmail && (
              <small className='error'>{errors.secEmail}</small>
            )}
            <select
              id='collegeName'
              name='collegeName'
              value={formData.collegeName}
              onChange={handleChange}
              required
              disabled>
              <option value='R.M.K. Engineering College'>
                R.M.K. Engineering College
              </option>
            </select>
            <span className='center gap-x-2'>
              <select
                id='department'
                name='department'
                value={formData.department}
                onChange={handleChange}
                required>
                <option value=''>Department ?</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <select
                id='yearOfGraduation'
                name='yearOfGraduation'
                value={formData.yearOfGraduation}
                onChange={handleChange}
                required>
                <option value=''>Graduation Year</option>
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </span>
            <input
              type='text'
              id='collegeRegisterNumber'
              name='collegeRegisterNumber'
              value={formData.collegeRegisterNumber}
              onChange={handleChange}
              maxLength='12'
              placeholder='College Register Number'
              required
            />
            {errors.collegeRegisterNumber && (
              <small className='error'>{errors.collegeRegisterNumber}</small>
            )}
            <input
              type='date'
              id='dob'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <small className='error'>{errors.dob}</small>}
            <input
              type='text'
              id='aadharNumber'
              name='aadharNumber'
              value={formData.aadharNumber}
              onChange={handleChange}
              maxLength='12'
              placeholder='Aadhar Number'
              required
            />
            {errors.aadharNumber && (
              <small className='error'>{errors.aadharNumber}</small>
            )}
            <span className='flex items-center justify-end gap-x-4'>
              <button type='submit' className='center' disabled={loading}>
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    <p>Finish</p>
                  </>
                )}
              </button>
              <button className='cancel' onClick={() => navigate('/signin')}>
                Cancel
              </button>
            </span>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <label htmlFor='otp'>Enter OTP sent to your email</label>
            <input
              type='text'
              id='otp'
              value={otp}
              onChange={e => setOtp(e.target.value)}
              maxLength='6'
              required
            />
            <button type='submit' className='float-end'>
              Verify
            </button>
          </form>
        )}
      </span>
    </div>
  )
}
