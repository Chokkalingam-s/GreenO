import {useState, useRef, useEffect} from 'react'

export default function FilterComponent({
  students = [],
  setFilteredData = () => {},
  showSemesterFilter = true,
  showYearFilter = true
}) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({semester: '', year: ''})
  const filterRef = useRef(null)

  const handleClickOutside = e => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setShowFilters(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const filtered = students.filter(
      student =>
        (!filters.semester || student.currentSemester === Number(filters.semester)) &&
        (!filters.year || student.currentYear === Number(filters.year))
    )
    setFilteredData(filtered)
  }, [filters, students, setFilteredData])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({...prev, [key]: value}))
  }

  const resetFilters = () => {
    setFilters({semester: '', year: ''})
  }

  return (
    <div className='relative'>
      <button className='w-full' onClick={() => setShowFilters(!showFilters)}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='icon'>
          <path d='M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z' />
        </svg>
        <span>Filter</span>
      </button>
      {showFilters && (
        <div
          ref={filterRef}
          className='round glassy sh c absolute top-12 left-0 z-50 w-64 flex-col gap-y-2 p-2'>
          {showSemesterFilter && (
            <select
              onChange={e => handleFilterChange('semester', e.target.value)}
              value={filters.semester}>
              <option value=''>Filter by Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>
                  {sem} Semester
                </option>
              ))}
            </select>
          )}
          {showYearFilter && (
            <select onChange={e => handleFilterChange('year', e.target.value)} value={filters.year}>
              <option value=''>Filter by Year</option>
              {[1, 2, 3, 4].map(year => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>
          )}
          <button className='btn cancel w-full' onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
