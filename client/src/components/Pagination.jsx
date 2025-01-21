export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  return (
    <div className='center space-x-4'>
      <button
        onClick={() => onPageChange('prev')}
        disabled={currentPage === 1}>
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange('next')}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}
