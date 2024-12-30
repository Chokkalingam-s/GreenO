import { useEffect, useState } from 'react'
import axios from 'axios'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Layout } from '../exp_components.jsx'

export default function Profile() {
  const [studentDetails, setStudentDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploadedCount, setUploadedCount] = useState(null)
  const totalImages = 8
  const [modal, SetModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchUploadedImagesCount = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/get-uploaded-images-count',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setUploadedCount(Number(response.data.uploadedImagesCount) || 0)
      } catch (err) {
        console.error(err)
        setUploadedCount(0)
      }
    }

    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/get-user-detailss',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setStudentDetails(response.data[0])
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchUploadedImagesCount()
    fetchStudentDetails()
  }, [])

  const progressPercentage = (uploadedCount / totalImages) * 100

  const handleGenerateCertificate = async () => {
    const certificateElement = document.querySelector('#certificate')
    if (!certificateElement) return

    certificateElement.classList.remove('hidden')
    certificateElement.classList.add('absolute', 'top-0', 'left-0', 'z-[-1]')

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
      certificateElement.classList.add('hidden')
      SetModal(!modal)
    }
  }

  return (
    <Layout>
      <div className='container center'>
        <div className='relative md:top-10 gap-4 grid grid-cols-2 md:max-w-[60vw]'>
          <div className='p-2 glassy round col-span-2'>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className='text-red-600'>Error: {error}</p>
            ) : (
              <div className='grid space-x-4'>
                <h3 className='text-2xl font-semibold mb-4 col-span-2'>
                  {studentDetails.name}&apos;s Profile
                </h3>
                <section className='details_table'>
                  <h4>Personal Details</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{studentDetails.name}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{studentDetails.email}</td>
                      </tr>
                      <tr>
                        <td>Mobile Number</td>
                        <td>{studentDetails.mobileNumber}</td>
                      </tr>
                      <tr>
                        <td>Aadhar Number</td>
                        <td>{studentDetails.aadharNumber}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section className='details_table'>
                  <h4>Educational Details</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>College Name</td>
                        <td>{studentDetails.collegeName}</td>
                      </tr>
                      <tr>
                        <td>Department</td>
                        <td>{studentDetails.department}</td>
                      </tr>
                      <tr>
                        <td>College Register Number</td>
                        <td>{studentDetails.collegeRegisterNumber}</td>
                      </tr>
                      <tr>
                        <td>Year of Graduation</td>
                        <td>{studentDetails.yearOfGraduation}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
            )}
          </div>
          <div className='glassy round h-64 relative p-6'>
            <Gauge
              value={progressPercentage}
              min={0}
              max={100}
              startAngle={-120}
              endAngle={120}
              thickness={4}
              cornerRadius='50%'
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: '#e0e0e0',
                },
                [`& .MuiGauge-bar`]: { fill: '#4caf50' },
                [`& .${gaugeClasses.valueArc}`]: { fill: '#52b202' },
                [`& .MuiGauge-background`]: { fill: '#e0e0e0' },
              }}
              text={() => `${progressPercentage} / ${totalImages}`}
            />
            <p className='text-xl absolute bottom-4 left-1/2 -translate-x-1/2'>
              My Progress
            </p>
          </div>
          <div className='center'>
            <button
              className='btn btn-primary mt-3'
              onClick={() => SetModal(true)}>
              Generate Certificate
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div className='absolute inset-0 glassy aspect-video w-11/12 top-1/2 -translate-y-1/2 mx-auto p-2 round z-20 center gap-x-2'>
          <div id='certificate' className='w-[297mm] h-[210mm] relative'>
            <img
              src='/Certificate.png'
              alt='Certificate Background'
              className='w-full h-full round'
            />
            <div className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black font-medium mt-4'>
              {studentDetails ? (
                <>
                  <h2 className='text-5xl mb-2'>{studentDetails.name}</h2>
                  <p className='text-xl'>
                    Student of Department of
                    <strong> {studentDetails.department}</strong>,
                  </p>
                  <p className='text-xl'>
                    from <strong>{studentDetails.collegeName}</strong>
                  </p>
                  <p className='text-xl'>
                    Successfully Grown a Tree in academic period of
                    <br />
                    <strong>
                      {studentDetails.yearOfGraduation - 4} -
                      {studentDetails.yearOfGraduation}
                    </strong>
                  </p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div>
            <button onClick={handleGenerateCertificate}>Download as PDF</button>
            <button onClick={() => SetModal(!modal)} className='cancel w-full'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
