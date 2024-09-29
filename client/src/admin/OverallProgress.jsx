import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/sidebar/AdminHeader';
import AdminSideBar from '../components/sidebar/AdminSideBar';
import './OverallProgress.css';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OverallProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching overall progress data...");
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const response = await axios.get('http://localhost:3000/api/overall-progress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Progress Data:", response.data);

        const sortedData = response.data.sort((a, b) => a.department.localeCompare(b.department));
        setProgressData(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => setOpenSidebarToggle((prev) => !prev);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });

    const sortedData = [...progressData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setProgressData(sortedData);
  };

  const exportPDF = () => {
    const input = document.getElementById('progress-table');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text('R.M.K. ENGINEERING COLLEGE', pdf.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text('(An Autonomous Institution)', pdf.internal.pageSize.getWidth() / 2, 28, { align: 'center' });
      pdf.text('R.S.M NAGAR, KAVARAIPETTAI - 601 206', pdf.internal.pageSize.getWidth() / 2, 36, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 10, 45, 190, 0);
      pdf.save('One student one plant - Overall Progress.pdf');
    });
  };

  return (
    <div className='grid-container'>
      <AdminHeader OpenSidebar={toggleSidebar} />
      <AdminSideBar openSidebarToggle={openSidebarToggle} OpenSidebar={toggleSidebar} />
      <div className='main-content'>
        <div className='header'>
          <h2>Overall Progress</h2>
          <button className='export-button' onClick={exportPDF}>
            Export as PDF
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div id='progress-table'>
            <table className='responsive-table'>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Department Name</th>
                  <th onClick={() => handleSort('studentCount')} className='sortable-column'>
                    Total Students
                    {sortConfig.key === 'studentCount' && (
                      sortConfig.direction === 'asc' ? <FaSortUp className='sort-icon' /> : <FaSortDown className='sort-icon' />
                    )}
                  </th>
                  <th onClick={() => handleSort('uploadCount')} className='sortable-column'>
                    No. of Plants in Process
                    {sortConfig.key === 'uploadCount' && (
                      sortConfig.direction === 'asc' ? <FaSortUp className='sort-icon' /> : <FaSortDown className='sort-icon' />
                    )}
                  </th>
                  <th>1st Year</th>
                  <th>2nd Year</th>
                  <th>3rd Year</th>
                  <th>4th Year</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((data, index) => (
                  <tr key={data.department}>
                    <td>{index + 1}</td>
                    <td>{data.department}</td>
                    <td>{data.studentCount}</td>
                    <td>{data.uploadCount}</td>
                    <td>{data.yearCounts.firstYear}</td>
                    <td>{data.yearCounts.secondYear}</td>
                    <td>{data.yearCounts.thirdYear}</td>
                    <td>{data.yearCounts.fourthYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverallProgress;
