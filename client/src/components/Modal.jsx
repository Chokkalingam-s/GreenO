export default function Modal({ src, onClose }) {
  return (
    <>
      {src && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div className='glassy fixed round md:w-1/2 w-11/12 aspect-video top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col'>
            <div className='w-8/12 aspect-square'>
              <img src={src} className='w-full h-full object-contain' />
            </div>
            <button
              onClick={onClose}
              className='cancel absolute bottom-0 right-2'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
