import {useState, useEffect} from 'react'

export default function SplashScreen() {
  const [loadingText, setLoadingText] = useState('GreenO')
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev => (prev === 'GreenO!' ? 'Please wait' : 'GreenO...'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className='relative z-20 flex h-screen flex-col items-center justify-center'>
      <img
        src='/GreenO_Logo.png'
        alt='Splash'
        className='glassy mb-5 aspect-square w-44 rounded-full object-cover p-4 shadow-lg'
      />
      <p className='head text-center text-white'>{loadingText}</p>
    </div>
  )
}
