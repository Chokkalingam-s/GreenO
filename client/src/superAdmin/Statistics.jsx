import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {CountUi, Splash} from '../exp_components'
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
import {useRef} from 'react'

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
  const barChartRef = useRef(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (barChartRef.current) {
      const canvas = barChartRef.current.canvas
      console.log(canvas)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/superadmin-progress'
        )
        setData(response.data.slice(0, 10))
      } catch (error) {
        toast.error(`Failed to fetch progress data. ${error}`)
      }
    }
    fetchData()
  }, [])

  if (!data || data.length === 0) return <Splash />

  const generateRandomColors = count => {
    const colors = new Set()
    while (colors.size < count) {
      colors.add(
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')}`
      )
    }
    return Array.from(colors)
  }

  const chartData = {
    labels: data.map(item => item.state),
    datasets: [
      {
        label: 'Sapling Count',
        data: data.map(item => item.saplingCount),
        backgroundColor: generateRandomColors(data.length)
      }
    ]
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        titleFont: {size: 20},
        bodyFont: {size: 18}
      }
    }
  }

  const barChartOptions = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow flexible width and height
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sapling Count',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        }
      },
      y: {
        title: {
          display: true,
          text: 'State',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 10
      }
    }
  }

  return (
    <div className='c_main flex-col'>
      <CountUi
        head='Statistics Overview'
        data={[
          new Set(data.map(item => item.state)).size,
          data.reduce((sum, item) => sum + item.saplingCount, 0)
        ]}
        title={['Total States', 'Total Saplings']}
        type={1}
      />
      <div className='w-full grid grid-cols-1 md:grid-cols-[50%_50%] gap-y-6 p-6 items-center'>
        <h2 className='text-2xl col-span-2'>
          State-wise Sapling Distribution
        </h2>
        <div className='mx-auto w-9/12'>
          <Pie data={chartData} options={pieChartOptions} />
        </div>
        <div className='mx-auto' style={{width: '100%', height: '500px'}}>
          <Bar data={chartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  )
}
