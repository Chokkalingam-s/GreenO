import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {abbreviateDepartmentName} from '../functions/abbreviations'
import {BarChart} from '@mui/x-charts'
import {chart_color, colors} from '../components/ChartColor_settings'
import {chartSetting} from '../components/Chart_Settings'
export default function OverallStatus() {
  const [departmentData, setDepartmentData] = useState([])
  const [topDepartments, setTopDepartments] = useState([])
  const [userDepartmentRank, setUserDepartmentRank] = useState(null)
  const [loading, setLoading] = useState(true)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/new-department-data`, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        if (response.status === 200 && Array.isArray(response.data)) {
          const data = response.data
            .map(dept => ({
              ...dept,
              percentage: ((dept.uploadCount / dept.studentCount) * 100).toFixed(2)
            }))
            .sort((a, b) => b.percentage - a.percentage || b.studentCount - a.studentCount)

          setDepartmentData(data)
          setTopDepartments(data.slice(0, 3))

          const userResponse = await axios.get(`${backendUrl}/new-user-details`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })

          const userRank =
            data.findIndex(dept => dept.department === userResponse.data.department) + 1
          setUserDepartmentRank(userRank)
        } else {
          toast.error('Invalid data format')
        }
      } catch (error) {
        toast.error('Error fetching data:', error.response?.data || error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDepartmentData()
  }, [backendUrl])

  const chartData = departmentData.map(dept => ({
    id: dept.department,
    value: dept.uploadCount,
    label: abbreviateDepartmentName(dept.department)
  }))

  const generateColor = index => {
    const baseHues = [130, 90, 60]
    const hue = baseHues[index % baseHues.length]
    const lightness = 40 + (index % 3) * 15
    return `hsl(${hue}, 60%, ${lightness}%)`
  }

  const formattedChartData = chartData.map((item, index) => ({
    ...item,
    color: generateColor(index)
  }))
  const sortedChartData = [...formattedChartData].sort((a, b) => b.value - a.value)
  const top3Departments = sortedChartData.slice(0, 3).map(item => item.id)

  const labels = formattedChartData.map(item => item.label)
  const values = formattedChartData.map(item => item.value)

  const getBarColor = id => {
    const index = top3Departments.indexOf(id)
    if (index === 0) return '#FFD700'
    if (index === 1) return '#C0C0C0'
    if (index === 2) return '#CD7F32'
    return `${colors[0]}66`
  }

  const colorMap = {
    type: 'ordinal',
    values: labels,
    colors: formattedChartData.map(item => getBarColor(item.id))
  }

  return (
    <div className='glassy c round w-8/12 flex-col space-y-2 gap-x-4'>
      <h2 className='head w-11/12 text-left'>Overall Department Contribution</h2>

      {loading ? (
        <p className='text-xl'>Loading...</p>
      ) : departmentData.length > 0 ? (
        <div className='c w-11/12 flex-col place-items-center'>
          <div className='flex items-end gap-4'>
            {topDepartments
              .sort(a => (a.index === 1 ? -1 : a.index === 0 ? 0 : 1))
              .map((dept, i) => {
                const order = [1, 0, 2][i]
                return (
                  <div
                    key={dept.department}
                    className={`round glassy_inline sh relative flex w-36 flex-col items-center p-2 ${
                      order === 0 ? 'h-32' : order === 1 ? 'h-28' : 'h-24'
                    }`}>
                    <span className='text-3xl'>{['🥈', '🥇', '🥉'][i]}</span>
                    <p className='text-base'>
                      {abbreviateDepartmentName(topDepartments[order].department)}
                    </p>
                    <p className='text-sm text-gray-300'>{topDepartments[order].percentage}%</p>
                    <div
                      className='sh absolute bottom-0 h-2 w-full rounded-b-2xl'
                      style={{backgroundColor: `${['#C0C0C0', '#FFD700', '#CD7F32'][i]}`}}></div>
                  </div>
                )
              })}
          </div>

          <div>
            <h3 className='text-secondary mt-2 text-xl font-medium'>
              Department-wise Sapling Count
            </h3>
            <div className='h-[50vh] w-[60vw]'>
              <BarChart
                xAxis={[{scaleType: 'band', data: labels, colorMap}]}
                series={[{data: values}]}
                sx={chart_color}
                {...chartSetting}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className='text-xl text-red-600'>No data available for departments.</p>
      )}
    </div>
  )
}
