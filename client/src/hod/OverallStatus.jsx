import {useEffect, useState} from 'react'
import axios from 'axios'
import {PieChart} from '@mui/x-charts/PieChart'
import {toast} from 'react-toastify'
import {abbreviateDepartmentName} from '../functions/abbreviations'
// import {chart_color} from '../components/ChartColor_settings'

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

  const chart_color = {
    '& .MuiPieArc-root': {
      stroke: '#fff'
    }
  }

  return (
    <div className='main c flex-col space-y-6 gap-x-4'>
      <h2 className='head'>Overall Department Contribution</h2>

      {loading ? (
        <p className='text-xl'>Loading...</p>
      ) : departmentData.length > 0 ? (
        <div className='grid grid-cols-2 place-items-center'>
          <div>
            <h3 className='text-xl font-medium'>Department-wise Sapling Count</h3>
            <div className='c h-96 w-96'>
              <PieChart
                series={[
                  {
                    data: formattedChartData,
                    innerRadius: 6,
                    outerRadius: 140,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    highlightScope: {faded: 'global', highlighted: 'item'}
                  }
                ]}
                sx={chart_color}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: {vertical: 'bottom', horizontal: 'middle'}
                  }
                }}
              />
            </div>
          </div>

          <div className='w-full flex-col'>
            <div className='sh glassy_inline round p-2'>
              <h3 className='head'>Top 3 Departments</h3>
              <div className='overflow-x-auto'>
                <table className='details_table w-full'>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Department</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topDepartments.map((dept, index) => (
                      <tr key={dept.department}>
                        <td>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</td>
                        <td>{abbreviateDepartmentName(dept.department)}</td>
                        <td>{dept.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {userDepartmentRank && (
              <p className='mt-4 text-center text-lg'>
                Your department is currently ranked: <strong>{userDepartmentRank}</strong>
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className='text-xl text-red-600'>No data available for departments.</p>
      )}
    </div>
  )
}
