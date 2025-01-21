import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {exportToPDF} from '../functions/export'
import {renderSortIcon} from '../functions/renderIcon'

export default function OverallProgress() {
  const [progressData, setProgressData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const tableRef = useRef(null)
  const [sortField, setSortField] = useState('uploadCount')
  const [sortDirection, setSortDirection] = useState('desc')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        console.log('Fetching overall progress data...')
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Authentication token is missing.')

        const response = await axios.get(
          'http://localhost:3000/college-overall-progress',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        const updatedData = response.data.map(item => ({
          ...item,
          progress: ((item.uploadCount / item.studentCount) * 100).toFixed(
            2
          )
        }))

        setProgressData(updatedData)
      } catch (err) {
        toast.error('Error fetching data: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleSortDirection = field => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setSortField(field)
    const sorted = [...progressData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] - b[field]
      }
      return b[field] - a[field]
    })
    setProgressData(sorted)
  }

  const toggleYearSort = year => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setSortField(year)
    const sorted = [...progressData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.yearCounts[year] - b.yearCounts[year]
      }
      return b.yearCounts[year] - a.yearCounts[year]
    })
    setProgressData(sorted)
  }

  return (
    <div className='c_main relative top-6 w-full'>
      <div className='main-content'>
        <div className='flex justify-between items-center'>
          <h2 className='text-3xl font-medium'>Overall Progress</h2>
          <button onClick={() => exportToPDF(tableRef.current)}>
            Export as PDF
          </button>
        </div>
        {error && <p className='error-message'>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className='details_table max-h-[80vh] overflow-y-auto'>
              <table>
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Department Name</th>
                    <th
                      onClick={() => toggleSortDirection('studentCount')}>
                      <div>
                        <span>Total Students</span>
                        {renderSortIcon(
                          'studentCount',
                          sortField,
                          sortDirection
                        )}
                      </div>
                    </th>
                    <th onClick={() => toggleSortDirection('uploadCount')}>
                      <div>
                        <span>No. of Plants in Process</span>
                        {renderSortIcon(
                          'uploadCount',
                          sortField,
                          sortDirection
                        )}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('firstYear')}>
                      <div>
                        <span>1st Year</span>
                        {renderSortIcon(
                          'firstYear',
                          sortField,
                          sortDirection
                        )}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('secondYear')}>
                      <div>
                        <span>2nd Year</span>
                        {renderSortIcon(
                          'secondYear',
                          sortField,
                          sortDirection
                        )}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('thirdYear')}>
                      <div>
                        <span>3rd Year</span>
                        {renderSortIcon(
                          'thirdYear',
                          sortField,
                          sortDirection
                        )}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('fourthYear')}>
                      <div>
                        <span>4th Year</span>
                        {renderSortIcon(
                          'fourthYear',
                          sortField,
                          sortDirection
                        )}
                      </div>
                    </th>
                    <th onClick={() => toggleSortDirection('progress')}>
                      <div>
                        <span>Progress</span>
                        {renderSortIcon(
                          'progress',
                          sortField,
                          sortDirection
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.map((data, index) => (
                    <tr key={data.department}>
                      <td>{index + 1}</td>
                      <td className='text-left pl-2'>{data.department}</td>
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
            </div>
            <span className='w-11/12 absolute -z-40 tableRef hidden opacity-0 text-center'>
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
                  {progressData.map((data, index) => (
                    <tr key={data.department}>
                      <td>{index + 1}</td>
                      <td className='text-left pl-2'>{data.department}</td>
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
    </div>
  )
}
