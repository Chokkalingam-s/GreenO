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

  return (
    <div className='relative'>
      <button className='w-full' onClick={() => setShowFilters(!showFilters)}>
        Filter Options
      </button>
      {showFilters && (
        <div
          ref={filterRef}
          className='round glassy sh c absolute top-12 left-0 z-50 w-64 flex-col gap-y-2 p-2'>
          {showSemesterFilter && (
            <select onChange={e => handleFilterChange('semester', e.target.value)} defaultValue=''>
              <option value=''>Filter by Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>
                  {sem} Semester
                </option>
              ))}
            </select>
          )}
          {showYearFilter && (
            <select onChange={e => handleFilterChange('year', e.target.value)} defaultValue=''>
              <option value=''>Filter by Year</option>
              {[1, 2, 3, 4].map(year => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  )
}
