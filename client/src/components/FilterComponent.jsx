import {useState, useRef, useEffect} from 'react'

export default function FilterComponent({
  students,
  setFilteredData,
  itemsPerPage,
  handleItemsPerPageChange
}) {
  const [showFilters, setShowFilters] = useState(false)
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

  return (
    <div className='relative'>
      <button className='w-full' onClick={() => setShowFilters(!showFilters)}>
        Filter Options
      </button>

      {showFilters && (
        <div
          ref={filterRef}
          className='round glassy sh c absolute top-12 left-0 z-50 w-64 flex-col gap-y-2 p-2'>
          <select
            onChange={e => {
              const semester = e.target.value
              setFilteredData(
                students.filter(student =>
                  console.log(!semester || student.currentSemester === Number(semester))
                )
              )
            }}
            defaultValue=''>
            <option value=''>Filter by Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem} value={sem}>
                {sem} Semester
              </option>
            ))}
          </select>
          <select
            onChange={e => {
              const year = e.target.value
              setFilteredData(
                students.filter(student => !year || student.currentYear === Number(year))
              )
            }}
            defaultValue=''>
            <option value=''>Filter by Year</option>
            {[1, 2, 3, 4].map(year => (
              <option key={year} value={year}>
                Year {year}
              </option>
            ))}
          </select>
          <select
            onChange={e => handleItemsPerPageChange(Number(e.target.value))}
            value={itemsPerPage}>
            <option value={25}>Items per page</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      )}
    </div>
  )
}
