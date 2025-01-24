import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Pagination, SearchComponent, Splashscreen} from '../exp_components'
import {toast} from 'react-toastify'
import {exportToPDF} from '../functions/export'
import {renderSortIcon} from '../functions/renderIcon'
import {usePagination} from '../hooks/usePagination'

export default function InComplete() {
  const [students, setStudents] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [sortField, setSortField] = useState('uploadCount')
  const [sortDirection, setSortDirection] = useState('desc')
  const [loading, setLoading] = useState(true)
  const tableRef = useRef(null)

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange
  } = usePagination(filteredData)

  useEffect(() => {
    const fetchIncompleteStudents = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/incomplete',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        const studentData = response.data
        setStudents(studentData)
        setFilteredData(studentData)
      } catch (err) {
        toast.error(`Failed to fetch incomplete students. ${err}`)
      } finally {
        setLoading(false)
      }
    }

    fetchIncompleteStudents()
  }, [])

  const sortData = field => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] > b[field] ? 1 : -1
      }
      return a[field] < b[field] ? 1 : -1
    })
    setFilteredData(sorted)
  }

  const toggleSortDirection = field => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)
    setSortField(field)
    sortData(field)
  }

  if (loading) return <Splashscreen />

  return (
    <div className='progress_table'>
      <div className='w-full grid grid-cols-1 md:grid-cols-[22%_25%_15%_12%_12%_10%] items-center justify-end gap-x-2'>
        <h2 className='head'>Incomplete Uploads</h2>
        <SearchComponent data={students} onFilter={setFilteredData} />
        <select
          onChange={e => {
            const semester = e.target.value
            setFilteredData(
              students.filter(
                student =>
                  !semester || student.currentSemester === Number(semester)
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
              students.filter(
                student => !year || student.currentYear === Number(year)
              )
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
          <option value={10}>Items per page</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <button onClick={() => exportToPDF(tableRef.current)}>
          Export to PDF
        </button>
      </div>
      <div className='progress'>
        <span className='details_table'>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Register Number</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Current Semester</th>
                <th>Current Year</th>
                <th
                  onClick={() => toggleSortDirection('uploadCount')}
                  className='center'>
                  Upload Count
                  {renderSortIcon('uploadCount', sortField, sortDirection)}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((student, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className='text-left'>{student.regNo}</td>
                  <td className='text-left'>{student.name}</td>
                  <td className='text-left'>{student.department}</td>
                  <td>{student.currentSemester}</td>
                  <td>{student.currentYear}</td>
                  <td>{student.uploadCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </span>
      </div>
      <div className='w-full mt-2'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <span className='tableRef'>
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Register Number</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Current Semester</th>
              <th>Current Year</th>
              <th>Upload Count</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((student, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className='text-left'>{student.regNo}</td>
                <td className='text-left'>{student.name}</td>
                <td className='text-left'>{student.department}</td>
                <td>{student.currentSemester}</td>
                <td>{student.currentYear}</td>
                <td>{student.uploadCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </span>
    </div>
  )
}
