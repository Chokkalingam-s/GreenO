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
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [collegeRegisterNumber, setCollegeRegisterNumber] = useState('')
  const [aadharNumber, setAadharNumber] = useState('')
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

  const validateForm = () => {
    const newErrors = {}

    if (!mobileNumber || mobileNumber.length !== 10 || !/^[0-9]{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be exactly 10 digits.'
    }

    if (!aadharNumber || aadharNumber.length !== 12 || !/^[0-9]{12}$/.test(aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be exactly 12 digits.'
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid primary email.'
    }

    if (
      !collegeRegisterNumber ||
      collegeRegisterNumber.length !== 12 ||
      !/^[0-9]{12}$/.test(collegeRegisterNumber)
    ) {
      newErrors.collegeRegisterNumber = 'College register number must be exactly 12 digits.'
    }

    if (!dob) {
      newErrors.dob = 'Date of birth is required.'
    }

    if (secEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(secEmail)) {
      newErrors.secEmail = 'Please enter a valid secondary email.'
    }

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
  const validateStep = () => {
    if (step === 1) {
      return name.trim() && email.trim() && password.trim() && !errors.email
    }
    if (step === 2) {
      return (
        formData.state &&
        formData.district &&
        mobileNumber.trim() &&
        !errors.mobileNumber &&
        (!secEmail || !errors.secEmail)
      )
    }
    if (step === 3) {
      return (
        collegeName.trim() &&
        formData.department &&
        formData.yearOfGraduation &&
        collegeRegisterNumber.trim() &&
        !errors.collegeRegisterNumber &&
        dob &&
        !errors.dob &&
        aadharNumber.trim() &&
        !errors.aadharNumber
      )
    }
    return true
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1)
    } else {
      alert('Please fill all required fields correctly before proceeding.')
    }
  }
  const prevStep = () => {
    setStep(prev => prev - 1)
  }

  return (
    <div className='c relative z-20 h-screen'>
      <div className='glassy round md:c block w-11/12 py-2 md:w-1/2'>
        <img src='/treegrow.png' alt='Tree Grow' className='hidden w-1/2 md:block' />
        {!otpSent ? (
          <form onSubmit={handleSubmit} className='px-2 md:w-1/2'>
            <h2 className='head my-2 text-center md:my-0'>Student Sign Up</h2>

            {step === 1 && (
              <>
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
                  value={email}
                  setValue={setEmail}
                  placeholder='Email (Primary)'
                  required
                />
                {errors.email && <small className='error'>{errors.email}</small>}
                <FloatingLabelInput
                  type='password'
                  id='password'
                  value={password}
                  setValue={setPassword}
                  placeholder='Password'
                  required
                />
              </>
            )}

            {step === 2 && (
              <>
                <span className='center w-full gap-x-2'>
                  <FloatingLabelSelect
                    id='state'
                    value={formData.state}
                    setValue={value => handleSelectChange('state', value)}>
                    <option value=''>State</option>
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
                    <option value=''>District</option>
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
                  value={mobileNumber}
                  setValue={setMobileNumber}
                  placeholder='Mobile Number'
                  required
                />
                {errors.mobileNumber && <small className='error'>{errors.mobileNumber}</small>}
                <FloatingLabelInput
                  type='email'
                  id='secEmail'
                  value={secEmail}
                  setValue={setSecEmail}
                  placeholder='Secondary Email'
                />
                {errors.secEmail && <small className='error'>{errors.secEmail}</small>}
              </>
            )}

            {step === 3 && (
              <>
                <FloatingLabelInput
                  type='text'
                  id='collegeName'
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
                    <option value=''>Department</option>
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
                  value={collegeRegisterNumber}
                  setValue={setCollegeRegisterNumber}
                  placeholder='College Register Number'
                  required
                />
                {errors.collegeRegisterNumber && (
                  <small className='error'>{errors.collegeRegisterNumber}</small>
                )}
                <FloatingLabelInput type='date' id='dob' value={dob} setValue={setDob} required />
                {errors.dob && <small className='error'>{errors.dob}</small>}
                <FloatingLabelInput
                  type='text'
                  id='aadharNumber'
                  value={aadharNumber}
                  setValue={setAadharNumber}
                  placeholder='Aadhar Number'
                  required
                />
                {errors.aadharNumber && <small className='error'>{errors.aadharNumber}</small>}
              </>
            )}

            {/* Navigation Buttons with Dots in Between */}
            <div className='mt-4 flex items-center justify-between'>
              {step > 1 ? (
                <button type='button' onClick={prevStep}>
                  Back
                </button>
              ) : (
                <div />
              )}

              {/* Step Indicator Dots */}
              <div className='flex space-x-2'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${step === i + 1 ? 'bg-primary' : 'bg-secondary'}`}
                  />
                ))}
              </div>

              {step < 3 ? (
                <button type='button' onClick={nextStep}>
                  Next
                </button>
              ) : (
                <button type='submit' disabled={loading}>
                  {loading ? 'Loading...' : 'Finish'}
                </button>
              )}
            </div>
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
              placeholder='OTP'
            />
            <button type='submit'>Verify</button>
          </form>
        )}
      </div>
    </div>
  )
}
