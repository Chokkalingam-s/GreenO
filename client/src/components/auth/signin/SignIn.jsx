import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useAuth} from './AuthContext'
import {toast} from 'react-toastify'
import {FloatingLabelInput} from '../../FloatingLabelInput'

export default function SignIn() {
  const navigate = useNavigate()
  const {setIsAuthenticated, setRole} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [showNewPasswordSetup, setShowNewPasswordSetup] = useState(false)
  const [passwordToggle, setPasswordToggle] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(`${backendUrl}/student-signin`, {
        email,
        password
      })
      const {token, userRole} = response.data
      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('role', userRole)
        setIsAuthenticated(true)
        setRole(userRole)
        navigate(
          userRole === 'admin'
            ? '/admin'
            : userRole === 'hod'
              ? '/department'
              : userRole === 'superAdmin'
                ? '/dashboard'
                : '/home'
        )
        toast.success('Login successful!')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    toast.success('OTP is being sent...')
    try {
      const response = await axios.post(`${backendUrl}/send-otp-process`, {
        email
      })
      if (response.status === 200) {
        setShowOtpPopup(true)
        setResetEmail(email)
        toast.success('OTP sent to email!')
      } else {
        toast.error(response.data || 'Failed to send OTP')
      }
    } catch (e) {
      toast.error(`Error sending OTP. Please try again. ${e}`)
    }
  }

  const handleVerifyOtp = async () => {
    if (!resetEmail || !otp) {
      toast.error('Email and OTP are required')
      return
    }
    try {
      const response = await axios.post(`${backendUrl}/verify-otp-process`, {
        email: resetEmail,
        otp
      })
      if (response.data.success) {
        setShowNewPasswordSetup(true)
        setShowOtpPopup(false)
        toast.success('OTP verified! Set your new password.')
      } else {
        toast.error('Invalid OTP')
      }
    } catch (error) {
      console.error(error.response?.data?.message)
      toast.error('OTP verification failed')
    }
  }

  const handleResetPassword = async () => {
    if (!resetEmail || !otp || !newPassword) {
      toast.error('Email, OTP, and new password are required')
      return
    }
    try {
      const response = await axios.post(`${backendUrl}/reset-password`, {
        email: resetEmail,
        otp,
        newPassword
      })
      if (response.status === 200) {
        toast.success('Password reset successfully!')
        setShowNewPasswordSetup(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed')
    }
  }

  const handlePasswordToggle = e => {
    setPasswordToggle(prevState => {
      const newPasswordToggle = !prevState
      const src = e.target.src
      const newSrc = newPasswordToggle
        ? src.replace('regular', 'slash-regular')
        : src.replace('slash-regular', 'regular')
      e.target.src = newSrc
      return newPasswordToggle
    })
  }

  return (
    <div className='center full relative z-10'>
      <div className='glassy center round mx-4 aspect-square w-full p-2 md:w-1/4'>
        {!showOtpPopup && !showNewPasswordSetup && (
          <form className='center w-full flex-col gap-y-4' onSubmit={handleLogin}>
            <h2 className='head'>Welcome Back!</h2>
            <div className='w-full'>
              <FloatingLabelInput
                type='email'
                placeholder='Email'
                value={email}
                setValue={setEmail}
              />
              <div>
                <span className='relative'>
                  <FloatingLabelInput
                    placeholder='Password'
                    value={password}
                    setValue={setPassword}
                    type={passwordToggle ? 'text' : 'password'}
                  />
                  <img
                    src='/eye-regular.svg'
                    alt='Toggle visibility'
                    onClick={handlePasswordToggle}
                    className='icon absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer'
                  />
                </span>
                <p
                  className='text-primary cursor-pointer text-end text-sm font-medium tracking-wider'
                  onClick={handleForgotPassword}>
                  Forgot Password?
                </p>
              </div>
            </div>

            <span className='flex items-center justify-center'>
              <button type='submit'>Sign in</button>
            </span>

            <div className='mx-auto flex w-11/12 items-center justify-center gap-x-2'>
              <div className='line'></div>
              <p
                className='text-primary text-sm font-bold'
                style={{textShadow: '0px 2px 2px rgba(0,0,0,0.4)'}}>
                OR
              </p>
              <div className='line'></div>
            </div>

            <p className='mt-2 text-center'>
              New to GreenO
              <strong
                className='inline cursor-pointer pl-2 underline'
                onClick={() => navigate('/signup')}>
                Join Now
              </strong>
            </p>
          </form>
        )}

        {showOtpPopup && (
          <div className='center w-full flex-col gap-y-20'>
            <h3 className='head'>Verification</h3>
            <div className='w-full'>
              <FloatingLabelInput
                type='text'
                id='otp'
                placeholder='Enter OTP'
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />
            </div>
            <span className='center space-x-2'>
              <button onClick={handleVerifyOtp}>Verify OTP</button>
              <button className='cancel' onClick={() => setShowOtpPopup(false)}>
                Cancel
              </button>
            </span>
          </div>
        )}

        {showNewPasswordSetup && (
          <div className='w-11/12'>
            <h3 className='head'>Set New Password</h3>
            <input
              type='password'
              placeholder='Enter New Password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <span className='center space-x-2'>
              <button onClick={handleResetPassword}>Reset</button>
              <button className='cancel' onClick={() => showNewPasswordSetup(false)}>
                Cancel
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
