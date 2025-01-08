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

        const processedData = data.map(dept => ({
          ...dept,
          percentage: ((dept.uploadCount / dept.studentCount) * 100).toFixed(2)
        }))

        const sortedDepartments = processedData.sort((a, b) => {
          if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage
          }
          return b.studentCount - a.studentCount
        })
        const topDepartments = [
          { department: 'Marketing', percentage: 95 },
          { department: 'Engineering', percentage: 93 },
          { department: 'Finance', percentage: 91 },
          { department: 'Human Resources', percentage: 89 },
          { department: 'Sales', percentage: 87 },
          { department: 'Legal', percentage: 85 },
          { department: 'Customer Support', percentage: 83 },
          { department: 'IT', percentage: 81 },
          { department: 'Operations', percentage: 79 },
          { department: 'R&D', percentage: 77 },
          { department: 'Quality Assurance', percentage: 75 },
          { department: 'Product Management', percentage: 74 },
          { department: 'Business Development', percentage: 72 },
          { department: 'Public Relations', percentage: 71 },
          { department: 'Data Analytics', percentage: 70 },
          { department: 'Procurement', percentage: 68 },
          { department: 'Training', percentage: 67 },
          { department: 'Administration', percentage: 66 },
          { department: 'Security', percentage: 65 },
          { department: 'Strategy', percentage: 64 },
          { department: 'Corporate Affairs', percentage: 63 },
          { department: 'Communications', percentage: 62 },
          { department: 'Facilities', percentage: 61 },
          { department: 'Legal Compliance', percentage: 60 },
          { department: 'Research', percentage: 59 }
        ]
        setDepartmentData(topDepartments)
        setTopDepartments(topDepartments.slice(0, 3))

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
      <div className='grid grid-cols-2 items-center justify-center space-x-4 w-10/12'>
        <h2 className='head col-span-2 text-center mb-4'>
          Overall Department Contribution
        </h2>
        {loading ? (
          <p className='text-xl'>Loading...</p>
        ) : (
          <>
            {departmentData.length > 0 ? (
              <div>
                <h3 className='text-xl text-center col-span-2'>
                  Department-wise Sapling Count
                </h3>
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
              <p className='text-red-600 text-xl'>
                No data available for departments.
              </p>
            )}
            <span>
              <div className='center flex-col details_table space-y-4 my-4'>
                <h3 className='text-xl'>Top 3 Departments</h3>
                <table>
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
                        <td>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </td>
                        <td>{shortenDepartmentName(dept.department)}</td>
                        <td>{dept.percentage}%</td>
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
            </span>
          </>
        )}
      </div>
    </div>
  )
}
