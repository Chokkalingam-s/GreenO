import {useState, useEffect} from 'react'
import {BarChart} from '@mui/x-charts/BarChart'
import {CountUi} from '../exp_components'
import axios from 'axios'

const chartSetting = {
  height: 400,
  grid: {
    verticalLines: true,
    horizontalLines: true
  },
  tooltip: {
    enabled: true
  }
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
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/college-overall-student-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
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
        const userEmail = localStorage.getItem('userEmail')
        const response = await axios.get(
          `${backendUrl}/college-admin-data`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {email: userEmail}
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
    <div className='main flex-col space-y-4'>
      <CountUi
        data={[studentCount, saplingCount]}
        head='Dashboard'
        title={['Students Onboarded', 'Trees Planted']}
      />
      <div className='w-full glassy_inline mx-auto'>
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
            {dataKey: 'Students', label: 'Students', color: '#4CAF50'},
            {dataKey: 'Trees', label: 'Trees', color: '#FFC107'}
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
    </div>
  )
}
