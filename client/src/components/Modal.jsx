export default function Modal({src, onClose}) {
  return (
    <>
      {src && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/40'>
          <div className='glassy round fixed top-1/2 left-1/2 flex aspect-video w-11/12 -translate-x-1/2 -translate-y-1/2 flex-col items-center md:w-1/2'>
            <div className='aspect-square w-8/12'>
              <img src={src} className='h-full w-full object-contain' />
            </div>
            <button onClick={onClose} className='cancel absolute right-2 bottom-0'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
