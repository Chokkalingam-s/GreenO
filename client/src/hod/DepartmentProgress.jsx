import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import SearchComponent from '../components/SearchComponent'
import {toggleSortDirection} from '../functions/sort'
import {renderSortIcon} from '../functions/renderIcon'
import {exportToPDF} from '../functions/export'

export default function DepartmentProgress() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [sortField, setSortField] = useState('uploadCount')
  const [sortDirection, setSortDirection] = useState('desc')
  const token = localStorage.getItem('token')
  const [currentPage, setCurrentPage] = useState(1)
  const [yearFilter, setYearFilter] = useState(0)
  const [itemPerPage, setItemPerPage] = useState(25)
  const tableRef = useRef(null)

  const totalPages = Math.ceil(filteredData.length / itemPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  )

  const handleYearFilter = year => {
    setYearFilter(year)
    setCurrentPage(1)
    if (year === 0) setFilteredData(data)
    else setFilteredData(data.filter(item => item.currentYear === year))
  }

  const handleItemPerPage = pages => {
    setItemPerPage(pages)
  }

  const handlePageChange = direction => {
    if (direction === 'next' && currentPage < totalPages)
      setCurrentPage(currentPage + 1)
    if (direction === 'prev' && currentPage > 1)
      setCurrentPage(currentPage - 1)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/departmentwise-progress-data',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setData(response.data)
      } catch (error) {
        console.error('Error fetching department progress:', error)
      }
    }

    fetchData()
  }, [token])

  const sortData = field => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] > b[field] ? 1 : -1
      }
      return a[field] < b[field] ? 1 : -1
    })
    setFilteredData(sorted)
  }

  return (
    <div className='c_main flex-col max-h-[90vh] mt-8'>
      <div className='w-full grid grid-cols-1 md:grid-cols-[38%_15%_25%_18%] items-center justify-end gap-x-2 float-end'>
        <SearchComponent data={data} onFilter={setFilteredData} />
        <select
          onChange={e => handleYearFilter(Number(e.target.value))}
          value={yearFilter}>
          <option value={0}>All Years</option>
          <option value={1}>1st Year</option>
          <option value={2}>2nd Year</option>
          <option value={3}>3rd Year</option>
          <option value={4}>4th Year</option>
        </select>
        <select
          onChange={e => handleItemPerPage(Number(e.target.value))}
          value={itemPerPage}>
          <option value={25}>No of items per page</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>

        <button onClick={() => exportToPDF(tableRef.current)}>
          Export to PDF
        </button>
      </div>
      <div className='w-full overflow-y-auto round glassy max-h-[60vh]'>
        <span className='details_table'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Current Year</th>
                <th
                  onClick={() =>
                    toggleSortDirection(
                      'uploadCount',
                      setSortDirection,
                      setSortField,
                      sortData
                    )
                  }
                  className='center'>
                  Upload Count
                  {renderSortIcon('uploadCount', sortField, sortDirection)}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.registerNumber}</td>
                  <td>{student.currentYear}</td>
                  <td>{student.uploadCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </span>
        <div className='center space-x-4 float-end pr-2'>
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}>
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <span className='w-11/12 absolute -z-40 tableRef hidden opacity-0 text-center'>
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Register Number</th>
              <th>Current Year</th>
              <th>Upload Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.registerNumber}</td>
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
