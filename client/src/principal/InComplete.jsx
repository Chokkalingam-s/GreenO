import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {exportToPDF} from '../functions/export'
import {renderSortIcon} from '../functions/renderIcon'
import {usePagination} from '../hooks/usePagination'
import SplashScreen from '../components/Splashscreen'
import FilterComponent from '../components/FilterComponent'
import PaginationSelector from '../components/PaginationSelector'
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
      <div className='md:grid-cols-[1fr_1fr_14%_12%_14%]'>
        <h2 className='head'>Incomplete Uploads</h2>
        <SearchComponent data={students} onFilter={setFilteredData} />
        <PaginationSelector {...{itemsPerPage, handleItemsPerPageChange}} />
        <FilterComponent
          students={students}
          setFilteredData={setFilteredData}
          itemsPerPage={itemsPerPage}
        />
        <button onClick={() => exportToPDF(tableRef.current)}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M0 64C0 28.7 28.7 0 64 0h160v128c0 17.7 14.3 32 32 32h128v144H176c-35.3 0-64 28.7-64 64v144H64c-35.3 0-64-28.7-64-64zm384 64H256V0zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56h-16v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V368c0-8.8 7.2-16 16-16m32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-16v48zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-32c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16m32 128c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-16v96zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v48c0 8.8-7.2 16-16 16s-16-7.2-16-16z' />
          </svg>
          <span>PDF Export</span>
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
