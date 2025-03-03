import {useEffect, useCallback} from 'react'

export default function Modal({src, onClose}) {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {src && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm'
          onClick={onClose}>
          <div
            className='round glassy relative w-11/12 max-w-3xl p-4 shadow-lg md:w-1/2'
            onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className='cancel btn_r absolute -top-3 -right-3'>
              <img src='/xmark-solid.svg' alt='Close' className='h-5 w-5' />
            </button>

            <div className='flex items-center justify-center'>
              <img
                src={src}
                alt='Modal Content'
                className='round max-h-[75vh] w-full object-contain'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
