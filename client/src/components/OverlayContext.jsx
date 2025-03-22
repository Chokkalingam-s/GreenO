import {createContext, useContext, useState, useEffect} from 'react'
import CloseButton from './CloseButton'

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
        <div className='c fixed inset-0 z-50 bg-black/50 backdrop-blur-md' onClick={hideOverlay}>
          <div
            className='glassy round sh c relative aspect-auto max-h-[90vh] w-full flex-col p-2 md:w-1/2'
            onClick={e => e.stopPropagation()}>
            {content}
            <CloseButton onClick={hideOverlay} />
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  )
}

export function useOverlay() {
  return useContext(OverlayContext)
}
