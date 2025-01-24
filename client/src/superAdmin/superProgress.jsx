import {useState, useEffect, useRef} from 'react'
import {Pagination, SearchComponent} from '../exp_components'
import {exportToPDF} from '../functions/export'
import {toast} from 'react-toastify'
import CommonTable from './CommonTable'
import axios from 'axios'

export default function SuperProgress() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(25)
  const tableRef = useRef(null)
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const totalPages = Math.ceil(filteredData.length / itemPerPage)
  const [download, setDownload] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:3000/superadmin-progress'
        )
        setData(response.data)
        setFilteredData(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Failed to fetch progress data.')
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredData])
  const handleItemPerPage = pages => {
    setItemPerPage(pages)
  }

  const handlePageChange = direction => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  )

  function handleClick(val) {
    setDownload(val)
    toast.info(`Top ${val} download is in proccess!`)
    setTimeout(() => {
      exportToPDF(tableRef.current)
    }, 1000)
  }

  return (
    <div className='progress_table'>
      <div className='w-full grid grid-cols-1 md:grid-cols-[15%_35%_25%_20%] items-center justify-between'>
        <h2 className='head'>Progress</h2>
        <SearchComponent data={data} onFilter={setFilteredData} />
        <select
          onChange={e => handleItemPerPage(Number(e.target.value))}
          value={itemPerPage}>
          <option value={25}>No of items per page</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
        <select
          name='download'
          onClick={e => {
            if (e.target.value >= 10) handleClick(e.target.value)
          }}>
          <option value={0}>Download</option>
          <option value={10}>Top 10</option>
          <option value={50}>Top 50</option>
          <option value={100}>Top 100</option>
          <option value={500}>Top 500</option>
          <option value={data.length}>Entire</option>
        </select>
      </div>
      <div className='progress'>
        <span className='details_table'>
          <CommonTable data={paginatedData} />
        </span>
      </div>
      <div className='w-full mt-2'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <span className='tableRef hidden'>
        <CommonTable data={data.slice(0, download)} tableRef={tableRef} />
      </span>
    </div>
  )
}
