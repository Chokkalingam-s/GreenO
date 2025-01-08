import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SearchComponent from './SearchComponent'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1)
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

  const toggleSortDirection = field => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setSortField(field)
    sortData(field)
  }

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

  // if (data.length == 0) return <p>Loading...</p>

  return (
    <div className='c_main flex-col max-h-[90vh] mt-8'>
      <div className='flex justify-between items-center w-11/12'>
        <h2 className='head'>Department Progress</h2>
        <button onClick={exportToPDF}>Export to PDF</button>
      </div>
      <div className='w-11/12 mx-auto overflow-y-auto h-full'>
        <span className='details_table'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Current Year</th>
                <th
                  onClick={() => toggleSortDirection('uploadCount')}
                  className='cursor-pointer center'>
                  Upload Count {renderSortIcon('uploadCount')}
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
      <div className='w-11/12 grid grid-cols-1 md:grid-cols-[34%_15%_15%_30%] items-center justify-center gap-x-2'>
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
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
        <div className='center space-x-4'>
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
