import { useState, useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import axios from 'axios'

const chartSetting = {
  height: 400,
  grid: {
    verticalLines: true,
    horizontalLines: true,
  },
  tooltip: true,
}

const abbreviateDepartmentName = department => {
  return department
    .split(' ')
    .map(word => {
      if (word.toLowerCase() === 'and') return ''
      if (word.startsWith('(') && word.endsWith(')')) return word
      return word.charAt(0).toUpperCase()
    })
    .filter(Boolean)
    .join('')
}

export default function AHome() {
  const [studentCount, setStudentCount] = useState(10)
  const [saplingCount, setSaplingCount] = useState(10)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/student-count'
        )
        setStudentCount(response.data.studentCount)
        setSaplingCount(response.data.saplingCount)
      } catch (error) {
        console.error(
          'Error fetching student count:',
          error.response?.data || error.message
        )
      }
    }

    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token')
        const userEmail = localStorage.getItem('userEmail')
        const response = await axios.get(
          'http://localhost:3000/api/admin-data',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { email: userEmail },
          }
        )

        const fetchedData = response.data.map(item => ({
          department: abbreviateDepartmentName(item.department),
          Trees: item.uploadCount,
          Students: item.studentCount,
        }))

        setData(fetchedData)
      } catch (error) {
        console.error(
          'Error fetching admin data:',
          error.response?.data || error.message
        )
      }
    }
    fetchStudentCount()
    fetchAdminData()
  }, [])

  return (
    <main className='w-10/12 main_lg flex-col'>
      <h3 className='head text-center'>Dashboard</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-x-4'>
        <div className='admin_detail'>
          <img src='/user-group-solid.svg' alt='Students Icon' />
          <h3>Students Onboarded</h3>
          <h1 className='text-3xl font-bold'>{studentCount}</h1>
        </div>
        <div className='admin_detail'>
          <img src='/seedling-solid.svg' alt='Trees Icon' />
          <h3>Trees Planted</h3>
          <h1 className='text-3xl font-bold'>{saplingCount}</h1>
        </div>
      </div>

      <div className='charts-container mt-8 w-1/2'>
        <BarChart
          dataset={data}
          borderRadius={20}
          xAxis={[
            { scaleType: 'band', dataKey: 'department', label: 'Department' },
          ]}
          series={[
            { dataKey: 'Students', label: 'Students', color: '#4CAF50' },
            { dataKey: 'Trees', label: 'Trees', color: '#FFC107' },
          ]}
          {...chartSetting}
        />
      </div>
    </main>
  )
}
