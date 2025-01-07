import { useEffect, useState } from 'react'
import axios from 'axios'
import { Chart } from 'react-google-charts'

export default function OverallStatus() {
  const [departmentData, setDepartmentData] = useState([])
  const [topDepartments, setTopDepartments] = useState([])
  const [userDepartmentRank, setUserDepartmentRank] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDepartmentData()
  }, [])

  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/new-department-data',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )

      if (response.status === 200 && Array.isArray(response.data)) {
        const data = response.data
        setDepartmentData(data)

        const sortedDepartments = [...data].sort(
          (a, b) => b.uploadCount - a.uploadCount
        )
        setTopDepartments(sortedDepartments.slice(0, 3))

        const userResponse = await axios.get(
          'http://localhost:3000/api/new-user-details',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        const userDepartment = userResponse.data.department
        const userRank =
          sortedDepartments.findIndex(
            dept => dept.department === userDepartment
          ) + 1
        setUserDepartmentRank(userRank)
      } else {
        console.error('Data format is incorrect:', response.data)
      }
    } catch (error) {
      console.error(
        'Error fetching department data:',
        error.response ? error.response.data : error.message
      )
    } finally {
      setLoading(false)
    }
  }

  const shortenDepartmentName = name => {
    return name
      .split(' ')
      .filter(
        word => word.toLowerCase() !== 'and' && word.toLowerCase() !== 'of'
      )
      .map(word => (word.startsWith('(') ? word : word[0].toUpperCase()))
      .join('')
  }

  const pieChartData = [
    ['Department', 'Upload Count'],
    ...departmentData.map(dept => [
      shortenDepartmentName(dept.department),
      dept.uploadCount
    ])
  ]

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40'
  ]

  const pieChartOptions = {
    pieHole: 0.4,
    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.02,
    backgroundColor: { fill: 'transparent' },
    opacity: 0,
    legend: {
      position: 'bottom',
      alignment: 'center',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 14
      }
    },
    colors: colors.slice(0, departmentData.length)
  }

  return (
    <div className='c_main'>
      <div className='report-content'>
        <h2 className='head'>Department Contribution Overview</h2>
        {loading ? (
          <p className='loading-text'>Loading...</p>
        ) : (
          <>
            {departmentData.length > 0 ? (
              <div className='pie-chart-section'>
                <h3 className='text-xl'>Department-wise Upload Count</h3>
                <div className=''>
                  <Chart
                    chartType='PieChart'
                    data={pieChartData}
                    options={pieChartOptions}
                    width='100%'
                    height='400px'
                  />
                </div>
              </div>
            ) : (
              <p className='no-data-text'>No data available for departments.</p>
            )}

            <div className='center glassy round flex-col details_table space-y-4 my-4'>
              <h3 className='text-xl'>Top 3 Departments</h3>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Department</th>
                    <th>Upload Count</th>
                  </tr>
                </thead>
                <tbody>
                  {topDepartments.map((dept, index) => (
                    <tr key={dept.department}>
                      <td>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</td>
                      <td>{shortenDepartmentName(dept.department)}</td>
                      <td>{dept.uploadCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userDepartmentRank && (
              <p className='center space-x-2'>
                <span>Your department is currently ranked:</span>
                <strong>{userDepartmentRank}</strong>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
