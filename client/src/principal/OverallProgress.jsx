import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {exportToPDF} from '../functions/export'
import {renderSortIcon} from '../functions/renderIcon'
import SearchComponent from '../components/SearchComponent'
import SplashScreen from '../components/Splashscreen'
import Pagination from '../components/Pagination'

export default function OverallProgress() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const tableRef = useRef(null)
  const [sortField, setSortField] = useState('uploadCount')
  const [sortDirection, setSortDirection] = useState('desc')
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(25)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const totalPages = Math.ceil(filteredData.length / itemPerPage)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        console.log('Fetching overall progress data...')
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Authentication token is missing.')
        const response = await axios.get(`${backendUrl}/college-overall-progress`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const updatedData = response.data.map(item => ({
          ...item,
          progress: ((item.uploadCount / item.studentCount) * 100).toFixed(2)
        }))
        setData(updatedData)
        setFilteredData(updatedData)
      } catch (err) {
        toast.error('Error fetching data: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [backendUrl])

  const toggleSortDirection = field => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setSortField(field)
    const sorted = [...data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] - b[field]
      }
      return b[field] - a[field]
    })
    setData(sorted)
  }

  const toggleYearSort = year => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setSortField(year)
    const sorted = [...data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.yearCounts[year] - b.yearCounts[year]
      }
      return b.yearCounts[year] - a.yearCounts[year]
    })
    setData(sorted)
  }
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredData])
  const handleItemPerPage = pages => {
    setItemPerPage(pages)
  }

  const handlePageChange = direction => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  )

  return (
    <div className='progress_table'>
      <div className='md:grid-cols-[38%_30%_16%_15%]'>
        <h2 className='head pl-4'>Progress</h2>
        <SearchComponent data={data} onFilter={setFilteredData} />
        <select onChange={e => handleItemPerPage(Number(e.target.value))} value={itemPerPage}>
          <option value={25}>Items per page</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>

        <button onClick={() => exportToPDF(tableRef.current)}>PDF Export</button>
      </div>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <div className='progress'>
            <span className='details_table'>
              <table>
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th className='text-left'>Department Name</th>
                    <th onClick={() => toggleSortDirection('studentCount')}>
                      <div>
                        <p>Total Students</p>
                        {renderSortIcon('studentCount', sortField, sortDirection)}
                      </div>
                    </th>
                    <th onClick={() => toggleSortDirection('uploadCount')}>
                      <div>
                        <p>No. of Plants in Process</p>
                        {renderSortIcon('uploadCount', sortField, sortDirection)}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('firstYear')}>
                      <div>
                        <p>1st Year</p>
                        {renderSortIcon('firstYear', sortField, sortDirection)}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('secondYear')}>
                      <div>
                        <p>2nd Year</p>
                        {renderSortIcon('secondYear', sortField, sortDirection)}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('thirdYear')}>
                      <div>
                        <p>3rd Year</p>
                        {renderSortIcon('thirdYear', sortField, sortDirection)}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('fourthYear')}>
                      <div>
                        <p>4th Year</p>
                        {renderSortIcon('fourthYear', sortField, sortDirection)}
                      </div>
                    </th>
                    <th onClick={() => toggleSortDirection('progress')}>
                      <div>
                        <p>Progress</p>
                        {renderSortIcon('progress', sortField, sortDirection)}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((data, index) => (
                    <tr key={data.department}>
                      <td>{index + 1}</td>
                      <td className='pl-2 text-left'>{data.department}</td>
                      <td>{data.studentCount}</td>
                      <td>{data.uploadCount}</td>
                      <td>{data.yearCounts.firstYear}</td>
                      <td>{data.yearCounts.secondYear}</td>
                      <td>{data.yearCounts.thirdYear}</td>
                      <td>{data.yearCounts.fourthYear}</td>
                      <td>{data.progress}%</td>
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
                  <th>Sno</th>
                  <th>Department Name</th>
                  <th>Total Students</th>
                  <th>No. of Plants in Process</th>
                  <th>1st Year</th>
                  <th>2nd Year</th>
                  <th>3rd Year</th>
                  <th>4th Year</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <tr key={data.department}>
                    <td>{index + 1}</td>
                    <td className='pl-2 text-left'>{data.department}</td>
                    <td>{data.studentCount}</td>
                    <td>{data.uploadCount}</td>
                    <td>{data.yearCounts.firstYear}</td>
                    <td>{data.yearCounts.secondYear}</td>
                    <td>{data.yearCounts.thirdYear}</td>
                    <td>{data.yearCounts.fourthYear}</td>
                    <td>{data.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </span>
        </>
      )}
    </div>
  )
}
