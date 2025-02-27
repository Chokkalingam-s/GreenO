import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {departments, states} from './data'
import {toast} from 'react-toastify'
import {FloatingLabelInput} from '../../FloatingLabelInput'
import {FloatingLabelSelect} from '../../FloatingLabelSelect'

const currentYear = new Date().getFullYear()
const years = Array.from({length: 4}, (_, i) => currentYear + i)

export default function StudentSignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [collegeRegisterNumber, setCollegeRegisterNumber] = useState('')
  const [aadharNumber, setAadharNumber] = useState('')
  const [principalName, setPrincipalName] = useState('')
  const [pocNumber, setPocNumber] = useState('')
  const [secEmail, setSecEmail] = useState('')
  const [dob, setDob] = useState('')

  const [formData, setFormData] = useState({
    role: 'student',
    state: '',
    district: '',
    department: '',
    yearOfGraduation: ''
  })

  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const statesRef = useRef([])
  const districtsRef = useRef([])
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    states.forEach(({state, districts}) => {
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
    const {name, value} = e.target
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
      newErrors.collegeRegisterNumber = 'College register number must be exactly 12 digits.'

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
      const response = await axios.post(`${backendUrl}/student-signup`, formData)
      const {token} = response.data

      if (token) {
        await axios.post(`${backendUrl}/send-otp-process`, {
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
      const response = await axios.post(`${backendUrl}/verify-otp-process`, {
        email: formData.email,
        otp
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

  const handleSelectChange = (key, value) => {
    setFormData(f => ({...f, [key]: value}))
  }

  return (
    <div className='center relative z-20 container px-4'>
      <div className='c_main'>
        <img src='/treegrow.png' alt='Tree Grow' className='hidden w-1/2 md:block' />
        {!otpSent ? (
          <form onSubmit={handleSubmit} className='px-4 md:w-1/2'>
            <h2 className='head my-2 text-center md:my-0'>Student Sign Up</h2>
            <FloatingLabelInput
              type='text'
              id='name'
              value={name}
              setValue={setName}
              placeholder='Name'
            />
            <FloatingLabelInput
              type='email'
              id='email'
              name='email'
              value={email}
              setValue={setEmail}
              placeholder='Email (Primary)'
              required
            />
            {errors.email && <small className='error'>{errors.email}</small>}
            <FloatingLabelInput
              type='password'
              id='password'
              name='password'
              value={password}
              setValue={setPassword}
              placeholder='Password'
              required
            />
            <span className='center w-full gap-x-2'>
              <FloatingLabelSelect
                id='state'
                value={formData.state}
                setValue={value => handleSelectChange('state', value)}>
                {statesRef.current.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </FloatingLabelSelect>

              <FloatingLabelSelect
                id='district'
                value={formData.district}
                setValue={value => handleSelectChange('district', value)}>
                {districtsRef.current[statesRef.current.indexOf(formData.state)]?.map(
                  (district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  )
                )}
              </FloatingLabelSelect>
            </span>
            <FloatingLabelInput
              type='number'
              id='mobileNumber'
              name='mobileNumber'
              value={mobileNumber}
              setValue={setMobileNumber}
              maxLength='10'
              placeholder='Mobile Number'
              required
            />
            {errors.mobileNumber && <small className='error'>{errors.mobileNumber}</small>}
            <FloatingLabelInput
              type='email'
              id='secEmail'
              name='secEmail'
              value={secEmail}
              setValue={setSecEmail}
              placeholder='Secondary Email'
            />
            {errors.secEmail && <small className='error'>{errors.secEmail}</small>}
            <FloatingLabelInput
              type='text'
              id='collegeName'
              name='collegeName'
              value={collegeName}
              setValue={setCollegeName}
              placeholder='College Name'
              required
            />
            <span className='center gap-x-2'>
              <FloatingLabelSelect
                id='department'
                value={formData.department}
                setValue={value => handleSelectChange('department', value)}>
                <option value=''>Department ?</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </FloatingLabelSelect>

              <FloatingLabelSelect
                id='yearOfGraduation'
                value={formData.yearOfGraduation}
                setValue={value => handleSelectChange('yearOfGraduation', value)}>
                <option value=''>Graduation Year</option>
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </FloatingLabelSelect>
            </span>
            <FloatingLabelInput
              type='text'
              id='collegeRegisterNumber'
              name='collegeRegisterNumber'
              value={collegeRegisterNumber}
              setValue={setCollegeRegisterNumber}
              maxLength='12'
              placeholder='College Register Number'
              required
            />
            {errors.collegeRegisterNumber && (
              <small className='error'>{errors.collegeRegisterNumber}</small>
            )}

            <FloatingLabelInput
              type='date'
              id='dob'
              name='dob'
              value={dob}
              setValue={setDob}
              required
            />
            {errors.dob && <small className='error'>{errors.dob}</small>}

            <FloatingLabelInput
              type='text'
              id='aadharNumber'
              name='aadharNumber'
              value={aadharNumber}
              setValue={setAadharNumber}
              maxLength='12'
              placeholder='Aadhar Number'
              required
            />
            {errors.aadharNumber && <small className='error'>{errors.aadharNumber}</small>}

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
            <FloatingLabelInput
              type='text'
              id='otp'
              value={otp}
              setValue={setOtp}
              maxLength='6'
              placeholder='Aadhar Number'
            />
            <button type='submit' className='float-end'>
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
