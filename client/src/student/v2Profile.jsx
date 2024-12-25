import { useEffect, useState } from 'react'
import axios from 'axios'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import certificateImage from '/Certificate.png'
import { Layout } from '../exp_components.jsx'

export default function Profile() {
  const [studentDetails, setStudentDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploadedCount, setUploadedCount] = useState(null)
  const totalImages = 8

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchUploadedImagesCount = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/get-uploaded-images-count',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const count = Number(response.data.uploadedImagesCount)
        setUploadedCount(!isNaN(count) ? count : 0)
      } catch (error) {
        console.error('Error fetching uploaded images count:', error)
        setUploadedCount(0)
      }
    }

    fetchUploadedImagesCount()

    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/get-user-detailss',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setStudentDetails(response.data[0])
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchStudentDetails()
  }, [])

  const progressPercentage = (uploadedCount / totalImages) * 100

  const handleGenerateCertificate = async () => {
    const certificateElement = document.getElementById('certificate')

    if (!certificateElement) {
      console.error('Certificate element not found!')
      return
    }
    certificateElement.style.visibility = 'visible'
    certificateElement.style.position = 'absolute'
    certificateElement.style.top = '0'
    certificateElement.style.left = '0'
    certificateElement.style.zIndex = '-1'

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210)
      pdf.save(`${studentDetails.name}-Certificate.pdf`)
    } catch (error) {
      console.error('Error generating certificate:', error)
    } finally {
      certificateElement.style.visibility = 'hidden'
      certificateElement.style.position = 'absolute'
      certificateElement.style.top = '-9999px'
    }
  }

  return (
    <Layout>
      <main className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Profile Card */}
          <div className='card p-4 bg-white shadow-lg rounded-lg'>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold'>Student Profile</h3>

                {/* Personal Details */}
                <div className='space-y-4'>
                  <h4 className='font-semibold text-lg'>Personal Details</h4>
                  <ul className='space-y-2'>
                    <li>
                      <strong>Name:</strong> {studentDetails.name}
                    </li>
                    <li>
                      <strong>Email:</strong> {studentDetails.email}
                    </li>
                    <li>
                      <strong>Mobile Number:</strong>{' '}
                      {studentDetails.mobileNumber}
                    </li>
                    <li>
                      <strong>Aadhar Number:</strong>{' '}
                      {studentDetails.aadharNumber}
                    </li>
                  </ul>
                </div>

                {/* Educational Details */}
                <div className='space-y-4'>
                  <h4 className='font-semibold text-lg'>Educational Details</h4>
                  <ul className='space-y-2'>
                    <li>
                      <strong>College Name:</strong>{' '}
                      {studentDetails.collegeName}
                    </li>
                    <li>
                      <strong>Department:</strong> {studentDetails.department}
                    </li>
                    <li>
                      <strong>College Register Number:</strong>{' '}
                      {studentDetails.collegeRegisterNumber}
                    </li>
                    <li>
                      <strong>Year of Graduation:</strong>{' '}
                      {studentDetails.yearOfGraduation}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Progress Card */}
          <div className='card p-4 bg-white shadow-lg rounded-lg'>
            <p className='text-lg font-semibold'>My Progress</p>
            <div className='flex justify-center mt-4'>
              <Gauge
                value={progressPercentage}
                min={0}
                max={100}
                startAngle={-120}
                endAngle={120}
                thickness={15}
                cornerRadius='50%'
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: '30px',
                    fontWeight: 'bold',
                    color: '#e0e0e0',
                  },
                  [`& .MuiGauge-bar`]: {
                    fill: '#4caf50',
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#52b202',
                  },
                  [`& .MuiGauge-background`]: {
                    fill: '#e0e0e0',
                  },
                }}
                text={({ value }) => `${value} / ${totalImages}`}
              />
            </div>
          </div>

          {/* Certificate Generation Card */}
          <div className='card p-4 bg-white shadow-lg rounded-lg overflow-hidden'>
            <button
              className='btn btn-primary mt-3'
              onClick={handleGenerateCertificate}>
              Generate Certificate
            </button>

            {/* Certificate Template */}
            <div
              id='certificate'
              className='w-[297mm] h-[210mm] relative mt-4 mx-auto'
              style={{ top: '-9999px', visibility: 'hidden' }}>
              <img
                src={certificateImage}
                alt='Certificate Background'
                className='absolute top-0 left-0 w-full h-full object-cover z-10 rounded-lg'
              />
              <div className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black text-4xl font-bold leading-none p-4'>
                {studentDetails ? (
                  <>
                    <h2 className='text-5xl mb-2'>{studentDetails.name}</h2>
                    <p className='text-xl'>
                      Student of Department of{' '}
                      <strong>{studentDetails.department}</strong>,
                    </p>
                    <p className='text-xl'>
                      from <strong>{studentDetails.collegeName}</strong>
                    </p>
                    <p className='text-xl'>
                      Successfully Grown a Tree in academic period of{' '}
                      <strong>
                        {studentDetails.yearOfGraduation - 4} -{' '}
                        {studentDetails.yearOfGraduation}
                      </strong>
                    </p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
