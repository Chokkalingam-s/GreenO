import { useState, useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import axios from 'axios'

const chartSetting = {
  height: 400,
  grid: {
    verticalLines: true,
    horizontalLines: true
  },
  tooltip: true
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
              Authorization: `Bearer ${token}`
            },
            params: { email: userEmail }
          }
        )

        const fetchedData = response.data.map(item => ({
          department: abbreviateDepartmentName(item.department),
          Trees: item.uploadCount,
          Students: item.studentCount
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
        <div className='_detail'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
            <path d='M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z' />
          </svg>
          <h3>Students Onboarded</h3>
          <h1>{studentCount}</h1>
        </div>
        <div className='_detail'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z' />
          </svg>
          <h3>Trees Planted</h3>
          <h1>{saplingCount}</h1>
        </div>
      </div>

      <div className='mt-8 w-1/2 glassy round mx-auto'>
        <BarChart
          dataset={data}
          borderRadius={20}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'department',
              label: 'Department'
            }
          ]}
          series={[
            { dataKey: 'Students', label: 'Students', color: '#4CAF50' },
            { dataKey: 'Trees', label: 'Trees', color: '#FFC107' }
          ]}
          {...chartSetting}
          sx={{
            '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
              strokeWidth: '0.4',
              fill: '#fff'
            }
          }}
        />
      </div>
    </main>
  )
}
