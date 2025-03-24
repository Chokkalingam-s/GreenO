export default function CloseButton({onClick}) {
  return (
    <button className='btn cancel btn_r absolute top-1 right-1 p-1' onClick={onClick}>
      <img src='/xmark-solid.svg' alt='Close' className='h-6 w-6' />
    </button>
  )
}
