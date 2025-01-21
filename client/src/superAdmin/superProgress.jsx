import { useState } from 'react'
import { SearchComponent } from '../exp_components'
import { useRef } from 'react'

const data = [
  {
    sno: 1,
    collegeName: 'Green Valley College',
    state: 'Karnataka',
    district: 'Bangalore',
    studentOnboard: 120,
    sapling: 300,
    progress: 80
  },
  {
    sno: 2,
    collegeName: 'Sunrise Institute',
    state: 'Tamil Nadu',
    district: 'Chennai',
    studentOnboard: 150,
    sapling: 400,
    progress: 75
  },
  {
    sno: 3,
    collegeName: 'Riverdale University',
    state: 'Kerala',
    district: 'Kochi',
    studentOnboard: 100,
    sapling: 200,
    progress: 65
  },
  {
    sno: 4,
    collegeName: 'Hilltop Academy',
    state: 'Himachal Pradesh',
    district: 'Shimla',
    studentOnboard: 80,
    sapling: 150,
    progress: 50
  },
  {
    sno: 5,
    collegeName: 'Oceanic College',
    state: 'Goa',
    district: 'Panaji',
    studentOnboard: 90,
    sapling: 170,
    progress: 60
  },
  {
    sno: 6,
    collegeName: 'Bright Future College',
    state: 'Maharashtra',
    district: 'Pune',
    studentOnboard: 110,
    sapling: 220,
    progress: 70
  },
  {
    sno: 7,
    collegeName: 'Evergreen University',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    studentOnboard: 200,
    sapling: 500,
    progress: 90
  },
  {
    sno: 8,
    collegeName: 'Harmony College',
    state: 'West Bengal',
    district: 'Kolkata',
    studentOnboard: 180,
    sapling: 450,
    progress: 85
  },
  {
    sno: 9,
    collegeName: 'Innovators Institute',
    state: 'Delhi',
    district: 'New Delhi',
    studentOnboard: 170,
    sapling: 400,
    progress: 88
  },
  {
    sno: 10,
    collegeName: 'Pioneer Academy',
    state: 'Rajasthan',
    district: 'Jaipur',
    studentOnboard: 130,
    sapling: 250,
    progress: 65
  },
  {
    sno: 11,
    collegeName: 'Future Minds College',
    state: 'Punjab',
    district: 'Amritsar',
    studentOnboard: 140,
    sapling: 280,
    progress: 72
  },
  {
    sno: 12,
    collegeName: 'Knowledge Hub University',
    state: 'Haryana',
    district: 'Gurgaon',
    studentOnboard: 190,
    sapling: 480,
    progress: 85
  },
  {
    sno: 13,
    collegeName: 'Skillset College',
    state: 'Gujarat',
    district: 'Ahmedabad',
    studentOnboard: 160,
    sapling: 300,
    progress: 78
  },
  {
    sno: 14,
    collegeName: 'Cultural Heritage Institute',
    state: 'Odisha',
    district: 'Bhubaneswar',
    studentOnboard: 120,
    sapling: 250,
    progress: 70
  },
  {
    sno: 15,
    collegeName: 'Wisdom Valley College',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    studentOnboard: 150,
    sapling: 350,
    progress: 80
  },
  {
    sno: 16,
    collegeName: 'Academic Heights University',
    state: 'Jharkhand',
    district: 'Ranchi',
    studentOnboard: 125,
    sapling: 240,
    progress: 68
  },
  {
    sno: 17,
    collegeName: 'Dream Builders Academy',
    state: 'Chhattisgarh',
    district: 'Raipur',
    studentOnboard: 135,
    sapling: 270,
    progress: 74
  },
  {
    sno: 18,
    collegeName: 'NextGen Institute',
    state: 'Assam',
    district: 'Guwahati',
    studentOnboard: 95,
    sapling: 200,
    progress: 62
  },
  {
    sno: 19,
    collegeName: 'Aspire Academy',
    state: 'Bihar',
    district: 'Patna',
    studentOnboard: 145,
    sapling: 310,
    progress: 76
  },
  {
    sno: 20,
    collegeName: 'Elite Scholars University',
    state: 'Uttarakhand',
    district: 'Dehradun',
    studentOnboard: 110,
    sapling: 220,
    progress: 67
  },
  {
    sno: 21,
    collegeName: 'Vibrant Campus College',
    state: 'Tripura',
    district: 'Agartala',
    studentOnboard: 80,
    sapling: 160,
    progress: 55
  },
  {
    sno: 22,
    collegeName: 'Knowledge Crest Institute',
    state: 'Manipur',
    district: 'Imphal',
    studentOnboard: 75,
    sapling: 140,
    progress: 50
  },
  {
    sno: 23,
    collegeName: 'Scholars Sanctuary',
    state: 'Sikkim',
    district: 'Gangtok',
    studentOnboard: 65,
    sapling: 120,
    progress: 45
  },
  {
    sno: 24,
    collegeName: 'Bright Scholars College',
    state: 'Meghalaya',
    district: 'Shillong',
    studentOnboard: 70,
    sapling: 150,
    progress: 48
  },
  {
    sno: 25,
    collegeName: 'Global Education Academy',
    state: 'Arunachal Pradesh',
    district: 'Itanagar',
    studentOnboard: 85,
    sapling: 180,
    progress: 58
  }
]

export default function SuperProgress() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(25)
  const tableRef = useRef(null)
  const [filteredData, setFilteredData] = useState(data)
  const totalPages = Math.ceil(filteredData.length / itemPerPage)

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  )

  const sortData = field => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] > b[field] ? 1 : -1
      }
      return a[field] < b[field] ? 1 : -1
    })
    setFilteredData(sorted)
  }

  return (
    <div className='c_main flex-col max-h-[90vh] mt-8'>
      <h2 className='head text-center'>Dashboard</h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-[38%_15%_25%_18%] items-center justify-end gap-x-2 float-end'>
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
      </div>
      <div className='w-full overflow-y-auto h-full'>
        <span className='details_table block max-h-[400px] overflow-y-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th>Sno</th>
                <th>College Name</th>
                <th>State</th>
                <th>District</th>
                <th>Student Onboard</th>
                <th>Sapling</th>
                <th>Progress %</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((college, index) => (
                <tr key={index}>
                  <td>{college.sno}</td>
                  <td>{college.collegeName}</td>
                  <td>{college.state}</td>
                  <td>{college.district}</td>
                  <td>{college.studentOnboard}</td>
                  <td>{college.sapling}</td>
                  <td>{college.progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </span>
        <div className='center space-x-4 float-end pr-2'>
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
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Register Number</th>
              <th>Current Year</th>
              <th>Upload Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.registerNumber}</td>
                <td>{student.currentYear}</td>
                <td>{student.uploadCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </span>
    </div>
  )
}
