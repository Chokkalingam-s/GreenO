import { useEffect, useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import SearchComponent from './SearchComponent'

export default function DepartmentProgress() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [sortField, setSortField] = useState('uploadCount')
  const [sortDirection, setSortDirection] = useState('desc')
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/department-progress',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setData(response.data)
        setFilteredData(response.data)
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

  const exportToPDF = () => {
    const input = document.getElementById('department-table')
    html2canvas(input).then(canvas => {
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
  }

  if (!data.length) return <p>Loading...</p>

  return (
    <div className='main flex-col max-h-96'>
      <div className='department-progress'>
        <SearchComponent data={data} onFilter={setFilteredData} />
        <h2 className='head'>Department Progress</h2>
        <span className='details_table'>
          <table id='department-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th
                  onClick={() => toggleSortDirection('currentYear')}
                  className='cursor-pointer'>
                  Current Year {renderSortIcon('currentYear')}
                </th>
                <th
                  onClick={() => toggleSortDirection('uploadCount')}
                  className='cursor-pointer'>
                  Upload Count {renderSortIcon('uploadCount')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.registerNumber}</td>
                  <td>{student.currentYear - 1}</td>
                  <td>{student.uploadCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </span>
      </div>
      <button onClick={exportToPDF}>Export to PDF</button>
    </div>
  )
}
