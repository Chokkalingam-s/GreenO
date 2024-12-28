import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from './AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Make sure you import the styles

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showOtpPopup, setShowOtpPopup] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [showNewPasswordSetup, setShowNewPasswordSetup] = useState(false)
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()
  const [passwordToggle, setPasswordToggle] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
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
            ? '/HodHome'
            : '/StudentHome'
        )
        toast.success('Login successful!')
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed'
      toast.error(errorMsg)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    if (email) toast.success('OTP is being sent...')
    try {
      const response = await axios.post('http://localhost:3000/send-otp', {
        email,
      })
      if (response.status == 200) {
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
      const response = await axios.post('http://localhost:3000/verify-otp', {
        email: resetEmail,
        otp,
      })
      if (response.data.success) {
        setShowNewPasswordSetup(true)
        setShowOtpPopup(false)
        toast.success('OTP verified! Set your new password.')
      } else {
        toast.error('Invalid OTP')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed')
    }
  }

  const handleResetPassword = async () => {
    if (!resetEmail || !otp || !newPassword) {
      toast.error('Email, OTP, and new password are required')
      return
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/reset-password',
        { email: resetEmail, otp, newPassword }
      )
      if (response.status === 200) {
        toast.success('Password reset successfully!')
        setTimeout(() => setShowNewPasswordSetup(false), 3000)
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
    <div className='container center relative z-10'>
      <div className='md:w-2/6 mx-4 aspect-square glassy center round'>
        {!showOtpPopup && !showNewPasswordSetup && (
          <form className='p-4' onSubmit={handleLogin}>
            <h2 className='head'>Welcome Back!</h2>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <span className='relative'>
              <input
                type={passwordToggle ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <img
                src='/eye-regular.svg'
                alt='Toggle visibility'
                onClick={handlePasswordToggle}
                className='cursor-pointer icon absolute right-0 top-1/2 -translate-y-1/2'
              />
            </span>
            <span className='flex items-center justify-between'>
              <p
                className='cursor-pointer text-tertiary font-medium tracking-wider'
                onClick={handleForgotPassword}>
                Forgot Password?
              </p>
              <button type='submit' className='gap-x-2'>
                <p>Sign in</p>
              </button>
            </span>

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
                className='flex gap-x-4'
                onClick={() => navigate('/signup')}>
                <p>New here ?</p>
              </button>
            </span>
          </form>
        )}

        {showOtpPopup && (
          <div className='w-10/12'>
            <h3 className='head'>Verification</h3>
            <input
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
            <span className='center space-x-2'>
              <button onClick={handleVerifyOtp}>Verify OTP</button>
              <button className='cancel' onClick={() => setShowOtpPopup(false)}>
                Cancel
              </button>
            </span>
          </div>
        )}

        {showNewPasswordSetup && (
          <div>
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
              <button
                className='cancel'
                onClick={() => showNewPasswordSetup(false)}>
                Cancel
              </button>
            </span>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}
