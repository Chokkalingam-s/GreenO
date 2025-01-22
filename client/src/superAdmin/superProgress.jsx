import { useState, useEffect, useRef } from 'react'
import {SearchComponent} from '../exp_components'
import {exportToPDF} from '../functions/export'
import {toast} from 'react-toastify'
import CommonTable from './CommonTable'
import axios from 'axios';

export default function SuperProgress() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(25);
  const tableRef = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const totalPages = Math.ceil(filteredData.length / itemPerPage);
  const [download, setDownload] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/superadmin-progress');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch progress data.');
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);
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
    console.log(val)
    setDownload(val)
    toast.info(`Top ${val} download is in proccess!`)
    setTimeout(() => {
      exportToPDF(tableRef.current)
    }, 1000)
  }

  return (
    <div className='c_main flex-col max-h-[80vh] relative md:top-6'>
      <h2 className='head text-center'>Progress</h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-[40%_25%_20%] items-center justify-end gap-x-2 float-end'>
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
      <div className='w-full overflow-y-auto h-full'>
        <span className='details_table'>
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th className='text-left'>College Name</th>
                <th className='text-left'>State</th>
                <th className='text-left'>District</th>
                <th>Student Onboard</th>
                <th>Sapling</th>
                <th>Progress %</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {data.map((college, index) => (
                <tr key={index}>
                  <td>{college.sno}</td>
                  <td className='text-left'>{college.collegeName}</td>
                  <td className='text-left'>{college.state}</td>
                  <td className='text-left'>{college.district}</td>
                  <td>{college.studentsOnboard}</td>
                  <td>{college.saplingCount}</td>
                  <td>{college.progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </span>
        <div className='center space-x-4 float-end pr-2 absolute'>
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}>
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <span className='w-11/12 absolute -z-40 tableRef hidden opacity-0 text-center'>
        <span ref={tableRef}>
          <CommonTable data={data.slice(0, download)} />
        </span>
      </span>
    </div>
  )
}
