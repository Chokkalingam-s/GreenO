import { useEffect, useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import SearchComponent from './SearchComponent'

export default function DepartmentProgress() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [sortField, setSortField] = useState('uploadCount')
  const [sortDirection, setSortDirection] = useState('desc')
  const token = localStorage.getItem('token')
  const [currentPage, setCurrentPage] = useState(1)
  const [yearFilter, setYearFilter] = useState(0)
  const [itemPerPage, setItemPerPage] = useState(25)

  const totalPages = Math.ceil(filteredData.length / itemPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  )

  const handleYearFilter = year => {
    setYearFilter(year)
    setCurrentPage(1)
    if (year === 0) setFilteredData(data)
    else setFilteredData(data.filter(item => item.currentYear === year))
  }

  const handleItemPerPage = pages => {
    setItemPerPage(pages)
  }

  const handlePageChange = direction => {
    if (direction === 'next' && currentPage < totalPages)
      setCurrentPage(currentPage + 1)
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/department-progress',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        // setData(response.data)
        setData([
          {
            name: 'Student 1',
            registerNumber: 'REG1001',
            currentYear: 3,
            uploadCount: 19
          },
          {
            name: 'Student 2',
            registerNumber: 'REG1002',
            currentYear: 2,
            uploadCount: 0
          },
          {
            name: 'Student 3',
            registerNumber: 'REG1003',
            currentYear: 3,
            uploadCount: 5
          },
          {
            name: 'Student 4',
            registerNumber: 'REG1004',
            currentYear: 2,
            uploadCount: 2
          },
          {
            name: 'Student 5',
            registerNumber: 'REG1005',
            currentYear: 3,
            uploadCount: 9
          },
          {
            name: 'Student 6',
            registerNumber: 'REG1006',
            currentYear: 2,
            uploadCount: 18
          },
          {
            name: 'Student 7',
            registerNumber: 'REG1007',
            currentYear: 3,
            uploadCount: 2
          },
          {
            name: 'Student 8',
            registerNumber: 'REG1008',
            currentYear: 4,
            uploadCount: 18
          },
          {
            name: 'Student 9',
            registerNumber: 'REG1009',
            currentYear: 3,
            uploadCount: 8
          },
          {
            name: 'Student 10',
            registerNumber: 'REG1010',
            currentYear: 1,
            uploadCount: 17
          },
          {
            name: 'Student 11',
            registerNumber: 'REG1011',
            currentYear: 1,
            uploadCount: 19
          },
          {
            name: 'Student 12',
            registerNumber: 'REG1012',
            currentYear: 1,
            uploadCount: 11
          },
          {
            name: 'Student 13',
            registerNumber: 'REG1013',
            currentYear: 3,
            uploadCount: 1
          },
          {
            name: 'Student 14',
            registerNumber: 'REG1014',
            currentYear: 1,
            uploadCount: 10
          },
          {
            name: 'Student 15',
            registerNumber: 'REG1015',
            currentYear: 4,
            uploadCount: 14
          },
          {
            name: 'Student 16',
            registerNumber: 'REG1016',
            currentYear: 1,
            uploadCount: 17
          },
          {
            name: 'Student 17',
            registerNumber: 'REG1017',
            currentYear: 3,
            uploadCount: 11
          },
          {
            name: 'Student 18',
            registerNumber: 'REG1018',
            currentYear: 4,
            uploadCount: 15
          },
          {
            name: 'Student 19',
            registerNumber: 'REG1019',
            currentYear: 3,
            uploadCount: 9
          },
          {
            name: 'Student 20',
            registerNumber: 'REG1020',
            currentYear: 2,
            uploadCount: 19
          },
          {
            name: 'Student 21',
            registerNumber: 'REG1021',
            currentYear: 2,
            uploadCount: 10
          },
          {
            name: 'Student 22',
            registerNumber: 'REG1022',
            currentYear: 3,
            uploadCount: 17
          },
          {
            name: 'Student 23',
            registerNumber: 'REG1023',
            currentYear: 4,
            uploadCount: 11
          },
          {
            name: 'Student 24',
            registerNumber: 'REG1024',
            currentYear: 3,
            uploadCount: 11
          },
          {
            name: 'Student 25',
            registerNumber: 'REG1025',
            currentYear: 1,
            uploadCount: 17
          },
          {
            name: 'Student 26',
            registerNumber: 'REG1026',
            currentYear: 1,
            uploadCount: 14
          },
          {
            name: 'Student 27',
            registerNumber: 'REG1027',
            currentYear: 3,
            uploadCount: 15
          },
          {
            name: 'Student 28',
            registerNumber: 'REG1028',
            currentYear: 4,
            uploadCount: 17
          },
          {
            name: 'Student 29',
            registerNumber: 'REG1029',
            currentYear: 2,
            uploadCount: 0
          },
          {
            name: 'Student 30',
            registerNumber: 'REG1030',
            currentYear: 4,
            uploadCount: 3
          },
          {
            name: 'Student 31',
            registerNumber: 'REG1031',
            currentYear: 3,
            uploadCount: 3
          },
          {
            name: 'Student 32',
            registerNumber: 'REG1032',
            currentYear: 1,
            uploadCount: 11
          },
          {
            name: 'Student 33',
            registerNumber: 'REG1033',
            currentYear: 1,
            uploadCount: 3
          },
          {
            name: 'Student 34',
            registerNumber: 'REG1034',
            currentYear: 4,
            uploadCount: 16
          },
          {
            name: 'Student 35',
            registerNumber: 'REG1035',
            currentYear: 2,
            uploadCount: 0
          },
          {
            name: 'Student 36',
            registerNumber: 'REG1036',
            currentYear: 2,
            uploadCount: 1
          },
          {
            name: 'Student 37',
            registerNumber: 'REG1037',
            currentYear: 3,
            uploadCount: 6
          },
          {
            name: 'Student 38',
            registerNumber: 'REG1038',
            currentYear: 1,
            uploadCount: 19
          },
          {
            name: 'Student 39',
            registerNumber: 'REG1039',
            currentYear: 3,
            uploadCount: 7
          },
          {
            name: 'Student 40',
            registerNumber: 'REG1040',
            currentYear: 2,
            uploadCount: 9
          },
          {
            name: 'Student 41',
            registerNumber: 'REG1041',
            currentYear: 2,
            uploadCount: 4
          },
          {
            name: 'Student 42',
            registerNumber: 'REG1042',
            currentYear: 4,
            uploadCount: 6
          },
          {
            name: 'Student 43',
            registerNumber: 'REG1043',
            currentYear: 1,
            uploadCount: 4
          },
          {
            name: 'Student 44',
            registerNumber: 'REG1044',
            currentYear: 4,
            uploadCount: 9
          },
          {
            name: 'Student 45',
            registerNumber: 'REG1045',
            currentYear: 3,
            uploadCount: 3
          },
          {
            name: 'Student 46',
            registerNumber: 'REG1046',
            currentYear: 4,
            uploadCount: 15
          },
          {
            name: 'Student 47',
            registerNumber: 'REG1047',
            currentYear: 2,
            uploadCount: 5
          },
          {
            name: 'Student 48',
            registerNumber: 'REG1048',
            currentYear: 2,
            uploadCount: 3
          },
          {
            name: 'Student 49',
            registerNumber: 'REG1049',
            currentYear: 2,
            uploadCount: 17
          },
          {
            name: 'Student 50',
            registerNumber: 'REG1050',
            currentYear: 1,
            uploadCount: 2
          },
          {
            name: 'Student 51',
            registerNumber: 'REG1051',
            currentYear: 3,
            uploadCount: 14
          },
          {
            name: 'Student 52',
            registerNumber: 'REG1052',
            currentYear: 1,
            uploadCount: 3
          },
          {
            name: 'Student 53',
            registerNumber: 'REG1053',
            currentYear: 4,
            uploadCount: 1
          },
          {
            name: 'Student 54',
            registerNumber: 'REG1054',
            currentYear: 4,
            uploadCount: 1
          },
          {
            name: 'Student 55',
            registerNumber: 'REG1055',
            currentYear: 3,
            uploadCount: 17
          },
          {
            name: 'Student 56',
            registerNumber: 'REG1056',
            currentYear: 1,
            uploadCount: 15
          },
          {
            name: 'Student 57',
            registerNumber: 'REG1057',
            currentYear: 4,
            uploadCount: 10
          },
          {
            name: 'Student 58',
            registerNumber: 'REG1058',
            currentYear: 3,
            uploadCount: 4
          },
          {
            name: 'Student 59',
            registerNumber: 'REG1059',
            currentYear: 1,
            uploadCount: 6
          },
          {
            name: 'Student 60',
            registerNumber: 'REG1060',
            currentYear: 2,
            uploadCount: 13
          },
          {
            name: 'Student 61',
            registerNumber: 'REG1061',
            currentYear: 3,
            uploadCount: 2
          },
          {
            name: 'Student 62',
            registerNumber: 'REG1062',
            currentYear: 1,
            uploadCount: 1
          },
          {
            name: 'Student 63',
            registerNumber: 'REG1063',
            currentYear: 2,
            uploadCount: 17
          },
          {
            name: 'Student 64',
            registerNumber: 'REG1064',
            currentYear: 3,
            uploadCount: 19
          },
          {
            name: 'Student 65',
            registerNumber: 'REG1065',
            currentYear: 4,
            uploadCount: 3
          },
          {
            name: 'Student 66',
            registerNumber: 'REG1066',
            currentYear: 1,
            uploadCount: 0
          },
          {
            name: 'Student 67',
            registerNumber: 'REG1067',
            currentYear: 1,
            uploadCount: 15
          },
          {
            name: 'Student 68',
            registerNumber: 'REG1068',
            currentYear: 4,
            uploadCount: 13
          },
          {
            name: 'Student 69',
            registerNumber: 'REG1069',
            currentYear: 1,
            uploadCount: 3
          },
          {
            name: 'Student 70',
            registerNumber: 'REG1070',
            currentYear: 2,
            uploadCount: 3
          },
          {
            name: 'Student 71',
            registerNumber: 'REG1071',
            currentYear: 3,
            uploadCount: 6
          },
          {
            name: 'Student 72',
            registerNumber: 'REG1072',
            currentYear: 2,
            uploadCount: 13
          },
          {
            name: 'Student 73',
            registerNumber: 'REG1073',
            currentYear: 4,
            uploadCount: 11
          },
          {
            name: 'Student 74',
            registerNumber: 'REG1074',
            currentYear: 3,
            uploadCount: 18
          },
          {
            name: 'Student 75',
            registerNumber: 'REG1075',
            currentYear: 2,
            uploadCount: 13
          },
          {
            name: 'Student 76',
            registerNumber: 'REG1076',
            currentYear: 2,
            uploadCount: 12
          },
          {
            name: 'Student 77',
            registerNumber: 'REG1077',
            currentYear: 4,
            uploadCount: 7
          },
          {
            name: 'Student 78',
            registerNumber: 'REG1078',
            currentYear: 3,
            uploadCount: 0
          },
          {
            name: 'Student 79',
            registerNumber: 'REG1079',
            currentYear: 3,
            uploadCount: 4
          },
          {
            name: 'Student 80',
            registerNumber: 'REG1080',
            currentYear: 4,
            uploadCount: 8
          },
          {
            name: 'Student 81',
            registerNumber: 'REG1081',
            currentYear: 1,
            uploadCount: 12
          },
          {
            name: 'Student 82',
            registerNumber: 'REG1082',
            currentYear: 3,
            uploadCount: 9
          },
          {
            name: 'Student 83',
            registerNumber: 'REG1083',
            currentYear: 3,
            uploadCount: 0
          },
          {
            name: 'Student 84',
            registerNumber: 'REG1084',
            currentYear: 1,
            uploadCount: 3
          },
          {
            name: 'Student 85',
            registerNumber: 'REG1085',
            currentYear: 4,
            uploadCount: 2
          },
          {
            name: 'Student 86',
            registerNumber: 'REG1086',
            currentYear: 1,
            uploadCount: 12
          },
          {
            name: 'Student 87',
            registerNumber: 'REG1087',
            currentYear: 3,
            uploadCount: 1
          },
          {
            name: 'Student 88',
            registerNumber: 'REG1088',
            currentYear: 4,
            uploadCount: 5
          },
          {
            name: 'Student 89',
            registerNumber: 'REG1089',
            currentYear: 2,
            uploadCount: 17
          },
          {
            name: 'Student 90',
            registerNumber: 'REG1090',
            currentYear: 1,
            uploadCount: 7
          },
          {
            name: 'Student 91',
            registerNumber: 'REG1091',
            currentYear: 4,
            uploadCount: 7
          },
          {
            name: 'Student 92',
            registerNumber: 'REG1092',
            currentYear: 4,
            uploadCount: 5
          },
          {
            name: 'Student 93',
            registerNumber: 'REG1093',
            currentYear: 4,
            uploadCount: 0
          },
          {
            name: 'Student 94',
            registerNumber: 'REG1094',
            currentYear: 1,
            uploadCount: 10
          },
          {
            name: 'Student 95',
            registerNumber: 'REG1095',
            currentYear: 3,
            uploadCount: 19
          },
          {
            name: 'Student 96',
            registerNumber: 'REG1096',
            currentYear: 2,
            uploadCount: 0
          },
          {
            name: 'Student 97',
            registerNumber: 'REG1097',
            currentYear: 1,
            uploadCount: 3
          },
          {
            name: 'Student 98',
            registerNumber: 'REG1098',
            currentYear: 3,
            uploadCount: 5
          },
          {
            name: 'Student 99',
            registerNumber: 'REG1099',
            currentYear: 1,
            uploadCount: 11
          },
          {
            name: 'Student 100',
            registerNumber: 'REG1100',
            currentYear: 1,
            uploadCount: 12
          }
        ])
      } catch (error) {
        console.error('Error fetching department progress:', error)
      }
    }

    fetchData()
  }, [token])

  const sortData = field => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] > b[field] ? 1 : -1
      }
      return a[field] < b[field] ? 1 : -1
    })
    setFilteredData(sorted)
  }

  const toggleSortDirection = field => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    setSortField(field)
    sortData(field)
  }

  const renderSortIcon = field =>
    sortField === field &&
    (sortDirection === 'asc' ? (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
        <path d='M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z' />
      </svg>
    ) : (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
        <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
      </svg>
    ))

  const exportToPDF = () => {
    const input = document.getElementById('department-table')
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('portrait', 'mm', 'a4')

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(18)
      pdf.setTextColor(0, 0, 0)
      pdf.text(
        'R.M.K. ENGINEERING COLLEGE',
        pdf.internal.pageSize.getWidth() / 2,
        20,
        { align: 'center' }
      )

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(12)
      pdf.text(
        '(An Autonomous Institution)',
        pdf.internal.pageSize.getWidth() / 2,
        28,
        { align: 'center' }
      )
      pdf.text(
        'R.S.M NAGAR, KAVARAIPETTAI - 601 206',
        pdf.internal.pageSize.getWidth() / 2,
        36,
        { align: 'center' }
      )

      pdf.addImage(imgData, 'PNG', 10, 45, 190, 0)
      pdf.save('One student one plant - Overall Progress.pdf')
    })
  }

  // if (data.length == 0) return <p>Loading...</p>

  return (
    <div className='c_main flex-col max-h-[90vh] mt-8'>
      <div className='flex justify-between items-center w-11/12'>
        <h2 className='head'>Department Progress</h2>
        <button onClick={exportToPDF}>Export to PDF</button>
      </div>
      <div className='w-11/12 grid grid-cols-1 md:grid-cols-[34%_15%_15%_30%] items-center justify-center gap-x-2'>
        <SearchComponent data={data} onFilter={setFilteredData} />
        <select
          onChange={e => handleYearFilter(Number(e.target.value))}
          value={yearFilter}>
          <option value={0}>All Years</option>
          <option value={1}>1st Year</option>
          <option value={2}>2nd Year</option>
          <option value={3}>3rd Year</option>
          <option value={4}>4th Year</option>
        </select>
        <select
          onChange={e => handleItemPerPage(Number(e.target.value))}
          value={itemPerPage}>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
        <div className='center space-x-4'>
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
      <div className='w-11/12 mx-auto overflow-y-scroll h-full round'>
        <span className='details_table'>
          <table id='department-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Current Year</th>
                <th
                  onClick={() => toggleSortDirection('uploadCount')}
                  className='cursor-pointer center'>
                  Upload Count {renderSortIcon('uploadCount')}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((student, index) => (
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
    </div>
  )
}
