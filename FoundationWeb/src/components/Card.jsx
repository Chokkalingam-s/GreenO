export default function Card({
  title,
  img,
  content,
  disabled,
  onClick,
  showBtn = true,
  fixed = true
}) {
  return (
    <div
      className={`relative rounded-xl border border-green-600/40 bg-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:shadow-xl p-4 ${
        fixed ? 'h-36' : 'flex max-h-44 gap-4 items-center'
      }`}>
      {img && (
        <img
          src={img}
          alt={title || 'icon'}
          className={`rounded-md ${fixed ? 'mb-3 w-16 h-16' : 'size-6'}`}
        />
      )}

      <div className='flex-1'>
        {title && (
          <h3 className='grad_txt mb-2 text-xl font-semibold'>
            {title}
          </h3>
        )}
        <p className='text-gray-700'>{content}</p>
      </div>

      {showBtn && (
        <button
          className='absolute right-2 bottom-0 p-2 rounded-full bg-green-500/80 hover:bg-green-600 disabled:opacity-50 transition'
          disabled={disabled}
          onClick={onClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            className='w-5 h-5 text-white'>
            <path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z' />
          </svg>
        </button>
      )}
    </div>
  )
}
