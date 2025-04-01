import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {exportToPDF} from '../functions/export'
import {renderSortIcon} from '../functions/renderIcon'
import {usePagination} from '../hooks/usePagination'
import FilterComponent from '../components/FilterComponent'
import PaginationSelector from '../components/PaginationSelector'
import SplashScreen from '../components/Splashscreen'
import SearchComponent from '../components/SearchComponent'
import Pagination from '../components/Pagination'

export default function InComplete() {
  const [students, setStudents] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [sortField, setSortField] = useState('uploadCount')
  const [sortDirection, setSortDirection] = useState('desc')
  const [loading, setLoading] = useState(true)
  const tableRef = useRef(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

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
        const response = await axios.get(`${backendUrl}/incomplete`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const studentData = response.data
        setStudents(studentData)
        // setFilteredData(studentData)
      } catch (err) {
        toast.error(`Failed to fetch incomplete students. ${err}`)
      } finally {
        setLoading(false)
      }
    }

    fetchIncompleteStudents()
  }, [backendUrl])

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

  if (loading) return <SplashScreen />

  return (
    <div className='progress_table'>
      <div className='md:grid-cols-[1fr_22%_14%_12%_14%]'>
        <h2 className='head'>Incomplete Uploads</h2>
        <SearchComponent data={students} onFilter={setFilteredData} />
        <PaginationSelector {...{itemsPerPage, handleItemsPerPageChange}} />
        <FilterComponent
          students={students}
          setFilteredData={setFilteredData}
          itemsPerPage={itemsPerPage}
        />
        <button onClick={() => exportToPDF(tableRef.current)}>PDF Export</button>
      </div>
      <div className='progress'>
        <span className='details_table'>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Register Number</th>
                <th>Student Name</th>
                <th className='text-left'>Department</th>
                <th>Current Semester</th>
                <th>Current Year</th>
                <th onClick={() => toggleSortDirection('uploadCount')} className='c'>
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
                  <td>{student.name}</td>
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
      <div className='mt-2 w-full'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <span className='tableRef hidden'>
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
            {students.map((student, index) => (
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
