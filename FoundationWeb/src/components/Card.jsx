export default function Card({title, content, disabled, onClick, showBtn = true, fixed = true}) {
  return (
    <div
      className={`round glassy sh out relative border transition-shadow duration-150 hover:shadow-xl ${
        fixed ? 'h-44 p-6' : 'flex max-h-44 gap-x-4 p-4'
      } ${!showBtn && 'flex items-center gap-x-4'}`}>
      {title && <h3 className='mb-4 text-xl font-semibold'>{title}</h3>}
      {!showBtn && <img src='/svgviewer-output.svg' className='w-6' />}
      <p className='full'>{content}</p>
      {showBtn && (
        <button className='absolute right-4 bottom-0' disabled={disabled} onClick={onClick}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' className='icon'>
            <path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z' />
          </svg>
        </button>
      )}
    </div>
  )
}
