import {useEffect, useState} from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import {toast} from 'react-toastify'
import {CountUi, Splashscreen} from '../exp_components'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function DepartmentHome() {
  const [studentData, setStudentData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        // const response = await axios.get(
        //   'http://localhost:3000/departmentwise-student-data',
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        //   }
        // )
        // setStudentData(response.data)
        setStudentData({
          totalSaplings: 3,
          totalStudents: 7,
          yearCounts: {
            '1st Year': 0,
            '2nd Year': 1,
            '3rd Year': 4,
            '4th Year': 1
          }
        })
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : 'Error fetching data'
        )
      }
    }

    fetchDepartmentData()
  }, [])

  if (error) toast.error(error)
  if (!studentData || !studentData.yearCounts) {
    return <Splashscreen />
  }

  const chartData = {
    labels: Object.keys(studentData.yearCounts),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(studentData.yearCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: 'rgba(153, 102, 255, 0.8)'
      }
    ]
  }

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold'
          },
          color: '#fff'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        bodyColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        cornerRadius: 5
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#fff',
          font: {
            size: 13
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          lineWidth: 1
        },
        ticks: {
          color: '#fff',
          font: {
            size: 13
          }
        }
      }
    }
  }

  return (
    <div className='main flex-col space-y-4'>
      <CountUi
        data={[studentData.totalStudents, studentData.totalSaplings]}
        head='Department Overview'
        title={['Total Students', 'Total Saplings Posted']}
      />
      <div className='max-h-80 w-full flex-col pb-6'>
        <h2 className='text-lg'>Year-wise Student Distribution</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
