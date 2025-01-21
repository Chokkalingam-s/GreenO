import {useState} from 'react'

export function usePagination(data, initialItemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = direction => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleItemsPerPageChange = newItemsPerPage => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange
  }
}
