import {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {CountUi, Splashscreen} from '../exp_components'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// } from 'chart.js'
// import {Pie} from 'react-chartjs-2'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   Pie,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// )

export default function Statistics() {
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [error, setError] = useState(null)
  const pieChartRef = useRef(null)
  const barChartRef = useRef(null)

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

  if (error) return <Splashscreen />
  if (!filteredData || filteredData.length === 0) {
    return <Splashscreen />
  }

  const generateRandomColors = count => {
    return Array.from(
      {length: count},
      () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
    )
  }

  return (
    <div className='c_main flex-col'>
      <CountUi
        head='Statistics Overview'
        data={[
          new Set(filteredData.map(item => item.state)).size,
          filteredData.reduce((sum, item) => sum + item.saplingCount, 0)
        ]}
        title={ ['Total States', 'Total Saplings'] }
        type={1}
      />
    </div>
  )
}
{
  /* <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='text-white'>
          <canvas ref={pieChartRef} width='100%' height='500px'></canvas>
        </div>
        <div>
          <canvas ref={barChartRef} width='100%' height='500px'></canvas>
        </div>
      </div> */
}
