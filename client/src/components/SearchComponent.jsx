import {useEffect, useState} from 'react'

export default function SearchComponent({data, onFilter}) {
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (data.length > 0) onFilter(data)
  }, [data, onFilter])

  const handleSearch = e => {
    const searchQuery = e.target.value
    setQuery(searchQuery)

    if (searchQuery.trim() === '') {
      onFilter(data)
      return
    }

    const lowerCaseQuery = searchQuery.toLowerCase()
    const filteredData = data.filter(student =>
      [
        'name',
        'regNo',
        'department',
        'currentSemester',
        'currentYear',
        'uploadCount',
        'collegeName',
        'district',
        'state'
      ].some(key => student[key]?.toString().toLowerCase().includes(lowerCaseQuery))
    )
    onFilter(filteredData)
  }

  return (
    <span className='search-list relative'>
      <input
        type='text'
        placeholder='Search by Name or Reg. no.'
        value={query}
        onChange={handleSearch}
        className='placeholder:text-accent pl-10'
      />
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
        <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
      </svg>
    </span>
  )
}
