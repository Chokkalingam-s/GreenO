export default function Overlay({isOpen, onClick}) {
  return (
    isOpen && (
      <div
        className='fixed inset-0 z-50 bg-black/50 backdrop-blur-md transition-opacity'
        onClick={onClick}
      />
    )
  )
}
