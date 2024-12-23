import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [loadingText, setLoadingText] = useState('Loading')
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev =>
        prev === 'Loading...' ? 'Please wait' : 'Loading...'
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <img src='/home.jpg' alt='Splash' className='w-40 h-40 mb-5' />
      <p className='text-lg text-primary'>{loadingText}</p>
    </div>
  )
}
