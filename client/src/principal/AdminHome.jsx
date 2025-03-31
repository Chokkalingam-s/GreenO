import {useState, useEffect} from 'react'
import {BarChart} from '@mui/x-charts/BarChart'
import {CountUi} from '../exp_components'
import axios from 'axios'
import {chart_color, colors} from '../components/ChartColor_settings'
import {abbreviateDepartmentName} from '../functions/abbreviations'
import {chartSetting} from '../components/Chart_Settings'
import {icon} from '../exported_data'

export default function AHome() {
  const [studentCount, setStudentCount] = useState(10)
  const [saplingCount, setSaplingCount] = useState(10)
  const [data, setData] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get(`${backendUrl}/college-overall-student-count`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setStudentCount(response.data.studentCount)
        setSaplingCount(response.data.saplingCount)
      } catch (error) {
        console.error('Error fetching student count:', error.response?.data || error.message)
      }
    }

    const fetchAdminData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail')
        const response = await axios.get(`${backendUrl}/college-admin-data`, {
          headers: {Authorization: `Bearer ${token}`},
          params: {email: userEmail}
        })

        const fetchedData = response.data.map(item => ({
          department: abbreviateDepartmentName(item.department),
          Trees: item.uploadCount,
          Students: item.studentCount
        }))

        setData(fetchedData)
      } catch (error) {
        console.error('Error fetching admin data:', error.response?.data || error.message)
      }
    }

    fetchStudentCount()
    fetchAdminData()
  }, [backendUrl])

  return (
    <div className='main flex-col space-y-4'>
      <CountUi
        data={[studentCount, saplingCount]}
        head='Dashboard'
        title={['Students Onboarded', 'Trees Planted']}
        icons={[icon.person, icon.sapling]}
      />
      <div className='glassy_inline round mx-auto w-full'>
        <BarChart
          dataset={data}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'department',
              label: 'Department'
            }
          ]}
          series={[
            {dataKey: 'Students', label: 'Students', color: colors[0]},
            {dataKey: 'Trees', label: 'Trees', color: colors[1]}
          ]}
          sx={chart_color}
          {...chartSetting}
        />
      </div>
    </div>
  )
}
