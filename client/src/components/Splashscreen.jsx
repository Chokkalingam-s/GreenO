import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [loadingText, setLoadingText] = useState('GreenO')
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev =>
        prev === 'GreenO!' ? 'Please wait' : 'GreenO...'
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className='flex flex-col items-center justify-center h-screen relative z-20'>
      <img
        src='/GreenO_Logo.png'
        alt='Splash'
        className='w-44 aspect-square mb-5 glassy p-4 rounded-full shadow-lg object-cover'
      />
      <p className='head text-white'>{loadingText}</p>
    </div>
  )
}
