import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from './AuthContext'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [showNewPasswordSetup, setShowNewPasswordSetup] = useState(false)
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      navigate('/StudentHome')
    }
  }, [setIsAuthenticated, navigate])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      })
      const { token, userRole } = response.data
      if (token) {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
        navigate(
          userRole === 'admin'
            ? '/AdminHome'
            : userRole === 'hod'
            ? '/HoDHome'
            : '/StudentHome'
        )
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
      setTimeout(() => setError(''), 6000)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }
    try {
      const response = await axios.post('http://localhost:3000/send-otp', {
        email,
      })
      if (response.data && response.data.includes('OTP sent to email')) {
        setShowOtpPopup(true)
        setResetEmail(email)
      } else {
        setError(response.data || 'Failed to send OTP')
      }
    } catch (e) {
      setError('Error sending OTP. Please try again.', e)
    }
  }

  const handleVerifyOtp = async () => {
    if (!resetEmail || !otp) {
      setError('Email and OTP are required')
      return
    }
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', {
        email: resetEmail,
        otp,
      })
      if (response.data.success) {
        setShowNewPasswordSetup(true)
        setShowOtpPopup(false)
      } else {
        setError('Invalid OTP')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed')
    }
  }

  const handleResetPassword = async () => {
    if (!resetEmail || !otp || !newPassword) {
      setError('Email, OTP, and new password are required')
      return
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/reset-password',
        { email: resetEmail, otp, newPassword }
      )
      if (response.status === 200) {
        setSuccess('Password reset successfully.')
        setTimeout(() => setShowNewPasswordSetup(false), 3000)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Password reset failed')
    }
  }
  return (
    <div className='container center'>
      <div className='main flex-col md:flex-row'>
        <img src='/treegrow.png' alt='Tree Grow' className='w-1/2' />
        <form className='md:w-1/2 px-4' onSubmit={handleLogin}>
          <h2 className='head'>Welcome Back!</h2>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span className='flex items-center justify-end'>
            <p
              className='cursor-pointer text-tertiary w-fit font-bold tracking-wide text-sm '
              onClick={handleForgotPassword}>
              Forgot Password?
            </p>
          </span>

          <span className='flex items-center justify-end'>
            <button type='submit' className='gap-x-2'>
              <p>Sign in</p>
              <img
                src='/arrow-right-to-bracket-solid.svg'
                alt='sign in icon'
                className='w-6'
              />
            </button>
          </span>

          <p className='text-red-500 text-sm'>{error}</p>
          <p className='text-tertiary text-sm'>{success}</p>

          <div className='flex items-center justify-center gap-x-2 w-11/12 mx-auto'>
            <div className='line'></div>
            <p
              className='text-sm font-bold text-primary'
              style={{ textShadow: '0px 2px 2px rgba(0,0,0,0.4)' }}>
              OR
            </p>
            <div className='line'></div>
          </div>

          <span className='center'>
            <button
              type='button'
              className='flex gap-x-4 group'
              onClick={() => navigate('/signup')}>
              <p className='group-hover:text-tertiary'>New here ?</p>
              <img
                src='/arrow-right-to-bracket-solid.svg'
                alt='sign in icon'
                className='w-6'
              />
            </button>
          </span>
        </form>

        {showOtpPopup && (
          <div className='otp-popup'>
            <h3>Enter OTP</h3>
            <input
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
            <button className='otp-btn' onClick={handleVerifyOtp}>
              ✅ Verify OTP
            </button>
            <button
              className='btn-secondary'
              onClick={() => setShowOtpPopup(false)}>
              ❌ Cancel
            </button>
          </div>
        )}

        {showNewPasswordSetup && (
          <div className='new-password-popup'>
            <h3>🔑 Set New Password</h3>
            <input
              type='password'
              placeholder='New Password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <button className='otp-btn' onClick={handleResetPassword}>
              ✅ Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
