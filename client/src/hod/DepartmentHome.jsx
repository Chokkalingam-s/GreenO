import { useEffect, useState } from 'react'
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
import { Bar } from 'react-chartjs-2'
import { toast } from 'react-toastify'
import SplashScreen from '../exp_components/Splashscreen'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DepartmentHome() {
  const [studentData, setStudentData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/departmentwise-student-data',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        setStudentData(response.data)
        console.log(response.data);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : 'Error fetching data'
        )
      }
    }

    fetchDepartmentData()
    
  }, [])

  if (error) toast.error(error)
    if (!studentData || !studentData.yearCounts) {
      return <SplashScreen />;
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
    studentData && (
      <div className='main flex-col space-y-4 pb-10'>
        <h1 className='text-3xl font-medium'>Department Overview</h1>
        <div className='space-x-4 center'>
          <div className='_detail'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'>
              <path d='M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z' />
            </svg>
            <h3>Total Students</h3>
            <h1>{studentData.totalStudents}</h1>
          </div>
          <div className='_detail'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
              <path d='M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z' />
            </svg>
            <h3>Total Saplings Posted</h3>
            <h1>{studentData.totalSaplings}</h1>
          </div>
        </div>

        <div className='max-h-80 w-full flex-col pb-6'>
          <h2 className='text-lg'>Year-wise Student Distribution</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    )
  )
}
