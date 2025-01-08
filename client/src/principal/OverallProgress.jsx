import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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
        const updatedData = response.data.map((item) => ({
          ...item,
          progress: ((item.uploadCount / item.studentCount) * 100).toFixed(2),
        }));

        setProgressData(updatedData);
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Error fetching data: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const exportToPDF = () => {
    const table = tableRef.current
    if (!table) return
    table.parentElement.classList.remove('hidden')
    html2canvas(table, { backgroundColor: '#fff', scale: 2 })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('portrait', 'mm', 'a4')

        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(18)
        pdf.setTextColor(0, 0, 0)
        pdf.text(
          'R.M.K. ENGINEERING COLLEGE',
          pdf.internal.pageSize.getWidth() / 2,
          20,
          { align: 'center' }
        )

        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(12)
        pdf.text(
          '(An Autonomous Institution)',
          pdf.internal.pageSize.getWidth() / 2,
          28,
          { align: 'center' }
        )
        pdf.text(
          'R.S.M NAGAR, KAVARAIPETTAI - 601 206',
          pdf.internal.pageSize.getWidth() / 2,
          36,
          { align: 'center' }
        )

        pdf.addImage(imgData, 'PNG', 10, 45, 190, 0)
        pdf.save('One student one plant - Overall Progress.pdf')
      })
      .finally(() => {
        table.parentElement.classList.add('hidden')
      })
  }

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

  const renderSortIcon = field =>
    sortField === field &&
    (sortDirection === 'asc' ? (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
        <path d='M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z' />
      </svg>
    ) : (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
        <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
      </svg>
    ))

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
    <div className='c_main'>
      <div className='main-content'>
        <div className='flex justify-between items-center'>
          <h2 className='text-3xl font-medium'>Overall Progress</h2>
          <button onClick={exportToPDF}>Export as PDF</button>
        </div>
        {error && <p className='error-message'>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className='details_table'>
              <table>
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Department Name</th>
                    <th onClick={() => toggleSortDirection('studentCount')}>
                      <div>
                        <span>Total Students</span>
                        {renderSortIcon('studentCount')}
                      </div>
                    </th>
                    <th onClick={() => toggleSortDirection('uploadCount')}>
                      <div>
                        <span>No. of Plants in Process</span>
                        {renderSortIcon('uploadCount')}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('firstYear')}>
                      <div>
                        <span>1st Year</span>
                        {renderSortIcon('firstYear')}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('secondYear')}>
                      <div>
                        <span>2nd Year</span>
                        {renderSortIcon('secondYear')}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('thirdYear')}>
                      <div>
                        <span>3rd Year</span>
                        {renderSortIcon('thirdYear')}
                      </div>
                    </th>
                    <th onClick={() => toggleYearSort('fourthYear')}>
                      <div>
                        <span>4th Year</span>
                        {renderSortIcon('fourthYear')}
                      </div>
                    </th>
                    <th onClick={() => toggleSortDirection('progress')}>
                      <div>
                        <span>Progress</span>
                        {renderSortIcon('progress')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.map((data, index) => (
                    <tr key={data.department}>
                      <td>{index + 1}</td>
                      <td>{data.department}</td>
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
                      <td>{data.department}</td>
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
