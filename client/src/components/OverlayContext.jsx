import {createContext, useContext, useState, useEffect} from 'react'

const OverlayContext = createContext()

export function OverlayProvider({children}) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState(null)

  const showOverlay = (newContent = null) => {
    setIsOpen(true)
    setContent(newContent)
  }

  const hideOverlay = () => {
    setIsOpen(false)
    setContent(null)
  }

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') hideOverlay()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <OverlayContext.Provider value={{isOpen, showOverlay, hideOverlay, setContent}}>
      {children}
      {isOpen && (
        <div
          className='c fixed inset-0 z-50 bg-black/50 p-4 backdrop-blur-md'
          onClick={hideOverlay}>
          <div
            className='glassy round sh relative flex aspect-auto max-h-[90vh] w-full max-w-[90vw] flex-col items-center justify-center p-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4'
            onClick={e => e.stopPropagation()}>
            {content}
            <button className='btn cancel btn_r absolute top-2 right-2 p-1' onClick={hideOverlay}>
              <img src='/xmark-solid.svg' alt='Close' className='h-6 w-6' />
            </button>
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  )
}

export function useOverlay() {
  return useContext(OverlayContext)
}
