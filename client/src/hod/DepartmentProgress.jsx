import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaSortUp, FaSortDown } from 'react-icons/fa'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import DepartmentHeader from '../components/sidebar/DepartmentHeader'
import DepartmentSideBar from '../components/sidebar/DepartmentSideBar'
import './DepartmentProgress.css'

const DepartmentProgress = () => {
  const [data, setData] = useState([])
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [sortDirection, setSortDirection] = useState('desc')
  const token = localStorage.getItem('token')
  const [departmentName, setDepartmentName] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/department-progress',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setData(response.data)
        if (response.data.length > 0) {
          setDepartmentName(response.data[0].department)
        }
      } catch (error) {
        console.error('Error fetching department progress:', error)
      }
    }

    fetchData()
  }, [token])

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.uploadCount - b.uploadCount
    }
    return b.uploadCount - a.uploadCount
  })

  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }

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

  if (!data.length) {
    return <p>Loading...</p>
  }

  return (
    <div className='grid-container'>
      <DepartmentHeader OpenSidebar={OpenSidebar} />
      <DepartmentSideBar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className='department-progress'>
        <h2>Department Progress</h2>
        <div className='export-btn'>
          <button onClick={exportToPDF} className='btn btn-primary'>
            Export to PDF
          </button>
        </div>
        <table
          id='department-table'
          className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Register Number</th>
              <th>Current Year</th>
              <th onClick={toggleSortDirection} style={{ cursor: 'pointer' }}>
                Upload Count{' '}
                {sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.registerNumber}</td>
                <td>{student.currentYear - 1}</td>
                <td>{student.uploadCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DepartmentProgress
