import { useState } from 'react'

export default function SearchComponent({ data, onFilter }) {
  const [query, setQuery] = useState('')

  const handleSearch = e => {
    const searchQuery = e.target.value
    setQuery(searchQuery)

    if (searchQuery.trim() === '') {
      onFilter(data)
      return
    }

    const lowerCaseQuery = searchQuery.toLowerCase()
    const filteredData = data.filter(
      student =>
        student.name.toLowerCase().includes(lowerCaseQuery) ||
        student.registerNumber.toLowerCase().includes(lowerCaseQuery)
    )

    onFilter(filteredData)
  }

  return (
    <input
      type='text'
      placeholder='Search by Name or Register Number'
      value={query}
      onChange={handleSearch}
      className='search-input'
    />
  )
}
