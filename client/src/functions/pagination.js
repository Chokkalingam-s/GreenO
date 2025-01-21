const totalPages = Math.ceil(filteredData.length / itemPerPage)

export const handleItemPerPage = (pages, setItemPerPage) => {
  setItemPerPage(pages)
}

export const handlePageChange = (direction, currentPage, setCurrentPage) => {
  if (direction === 'next' && currentPage < totalPages)
    setCurrentPage(currentPage + 1)
  if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1)
}
