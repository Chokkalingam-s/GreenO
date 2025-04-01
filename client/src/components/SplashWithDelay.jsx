import {useState, useEffect} from 'react'
import SplashScreen from './Splashscreen'

export default function SplashWithDelay({children}) {
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShowChildren(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  return showChildren ? children : <SplashScreen />
}
