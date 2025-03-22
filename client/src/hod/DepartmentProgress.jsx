import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import SearchComponent from '../components/SearchComponent'
import {toggleSortDirection} from '../functions/sort'
import {renderSortIcon} from '../functions/renderIcon'
import {exportToPDF} from '../functions/export'
import {Pagination} from '../exp_components'

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
  const backendUrl = import.meta.env.VITE_BACKEND_URL

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
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1)
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/departmentwise-progress-data`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setData(response.data)
      } catch (error) {
        console.error('Error fetching department progress:', error)
      }
    }

    fetchData()
  }, [backendUrl, token])

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
    <div className='progress_table'>
      <div className='grid w-full grid-cols-1 items-center justify-center gap-x-2 md:grid-cols-[22%_35%_15%_15%_10%]'>
        <h2 className='head'>Progress</h2>
        <SearchComponent data={data} onFilter={setFilteredData} />
        <select onChange={e => handleYearFilter(Number(e.target.value))} value={yearFilter}>
          <option value={0}>All Years</option>
          <option value={1}>1st Year</option>
          <option value={2}>2nd Year</option>
          <option value={3}>3rd Year</option>
          <option value={4}>4th Year</option>
        </select>
        <select onChange={e => handleItemPerPage(Number(e.target.value))} value={itemPerPage}>
          <option value={25}>No of items per page</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>

        <button onClick={() => exportToPDF(tableRef.current)}>PDF Export</button>
      </div>
      <div className='progress'>
        <span className='details_table'>
          <table className='table-fixed'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Current Year</th>
                <th
                  onClick={() =>
                    toggleSortDirection('uploadCount', setSortDirection, setSortField, sortData)
                  }
                  className='c gap-x-2'>
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
