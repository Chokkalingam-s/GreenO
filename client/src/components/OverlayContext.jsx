import {createContext, useContext, useState} from 'react'

const OverlayContext = createContext()

export function OverlayProvider({children}) {
  const [isOpen, setIsOpen] = useState(false)

  const showOverlay = () => setIsOpen(true)
  const hideOverlay = () => setIsOpen(false)

  return (
    <OverlayContext.Provider value={{isOpen, showOverlay, hideOverlay}}>
      {children}
      {isOpen && (
        <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-md' onClick={hideOverlay} />
      )}
    </OverlayContext.Provider>
  )
}

export function useOverlay() {
  return useContext(OverlayContext)
}
