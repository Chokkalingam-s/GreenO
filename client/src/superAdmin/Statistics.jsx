import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {CountUi} from '../exp_components'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {Pie, Bar} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Statistics() {
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/superadmin-progress'
        )
        setData(response.data)
        setFilteredData(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Failed to fetch progress data.')
        setError(error)
      }
    }

    fetchData()
  }, [])

  if (error) return <div>Error loading data...</div>
  if (!filteredData || filteredData.length === 0) {
    return <div>Loading...</div>
  }

  const generateRandomColors = count => {
    return Array.from(
      {length: count},
      () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
    )
  }

  const chartData = {
    labels: filteredData.map(item => item.state),
    datasets: [
      {
        label: 'Sapling Count',
        data: filteredData.map(item => item.saplingCount),
        backgroundColor: generateRandomColors(filteredData.length)
      }
    ]
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  }

  const barChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sapling Count'
        }
      },
      y: {
        title: {
          display: true,
          text: 'State'
        }
      }
    }
  }

  return (
    <div className='c_main flex-col'>
      <CountUi
        head='Statistics Overview'
        data={[
          new Set(filteredData.map(item => item.state)).size,
          filteredData.reduce((sum, item) => sum + item.saplingCount, 0)
        ]}
        title={['Total States', 'Total Saplings']}
        type={1}
      />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='text-white overflow-y-auto'>
          <Pie data={chartData} options={pieChartOptions} />
        </div>
        <div className='text-white'>
          <Bar data={chartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  )
}
