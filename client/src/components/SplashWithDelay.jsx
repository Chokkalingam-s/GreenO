import { useState, useEffect } from 'react'
import { Splashscreen } from '../exp_components'

export default function SplashWithDelay({ children }) {
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShowChildren(true), 2000)
    return () => clearTimeout(timeout)
  }, [])

  return showChildren ? children : <Splashscreen />
}
