import {useEffect, useState} from 'react'
import axios from 'axios'
import {BarChart} from '@mui/x-charts/BarChart'
import {toast} from 'react-toastify'
import {CountUi, Splashscreen} from '../exp_components'
import {chart_color, colors} from '../components/ChartColor_settings'
import {chartSetting} from '../components/Chart_Settings'

export default function DepartmentHome() {
  const [studentData, setStudentData] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/departmentwise-student-data`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setStudentData(response.data)
      } catch (error) {
        toast.error(error.response ? error.response.data.message : 'Error fetching data')
      }
    }

    fetchDepartmentData()
  }, [backendUrl])

  if (!studentData || !studentData.yearCounts) return <Splashscreen />

  const chartData = Object.keys(studentData.yearCounts).map(year => ({
    year,
    students: studentData.yearCounts[year]
  }))

  return (
    <div className='main flex-col space-y-4'>
      <CountUi
        data={[studentData.totalStudents, studentData.totalSaplings]}
        head='Department Overview'
        title={['Total Students', 'Total Saplings Posted']}
      />
      <div className='glassy_inline round mx-auto w-full'>
        <h2 className='p-2 text-xl'>Year-wise Student Distribution</h2>
        <BarChart
          dataset={chartData}
          xAxis={[{scaleType: 'band', dataKey: 'year'}]}
          series={[{dataKey: 'students', label: 'Number of Students', color: colors[1]}]}
          sx={chart_color}
          {...chartSetting}
        />
      </div>
    </div>
  )
}
