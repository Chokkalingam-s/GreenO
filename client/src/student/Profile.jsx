import { useEffect, useState } from 'react'
import axios from 'axios'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { toast } from 'react-toastify'

export default function Profile() {
  const [studentDetails, setStudentDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploadedCount, setUploadedCount] = useState(null)
  const totalImages = 8
  const [modal, setModal] = useState(false)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [progressPercentage1, setProgressPercentage1] = useState(0)

  useEffect(() => {
    setProgressPercentage((uploadedCount / totalImages) * 100)
    setProgressPercentage1(progressPercentage / 12.5)
  }, [progressPercentage, uploadedCount])
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchUploadedImagesCount = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/get-uploaded-images-count',
          {
            headers: { Authorization: `Bearer ${token}` }
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
          'http://localhost:3000/student-get-user-details',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setStudentDetails(response.data)
        setLoading(false)
      } catch (err) {
        toast.error(err.message)
        setLoading(false)
      }
    }

    fetchUploadedImagesCount()
    fetchStudentDetails()
  }, [])
  const icons = {
    person: {
      viewBox: '0 0 448 512',
      path: 'M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z'
    },
    email: {
      viewBox: '0 0 512 512',
      path: 'M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z'
    },
    phone: {
      viewBox: '0 0 512 512',
      path: 'M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z'
    },
    aad_card: {
      viewBox: '0 0 576 512',
      path: 'M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z'
    },
    school: {
      viewBox: '0 0 576 512',
      path: 'M288 0L400 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-79.3 0 89.6 64L512 160c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64l-176 0 0-112c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 112L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l101.7 0L256 95.5 256 32c0-17.7 14.3-32 32-32zm48 240a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM80 224c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0zm368 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM80 352c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0zm384 0c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0z'
    },
    domain: {
      viewBox: '0 0 448 512',
      path: 'M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z'
    },
    badge: {
      viewBox: '0 0 384 512',
      path: 'M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zm96 320l64 0c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16L96 416c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM144 64l96 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z'
    },
    calendar: {
      viewBox: '0 0 640 512',
      path: 'M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5l0-24.6c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z'
    }
  }

  function handleClick() {
    if (progressPercentage < 100) {
      toast.error(
        'Progress Incomplete! Please upload all 8 images to generate the certificate.'
      )
      return
    }
    if (progressPercentage <= 100) {
      toast.success('You can download the certificate...')
      setModal(!modal)
    }
  }

  const handleGenerateCertificate = async () => {
    toast.info('certificate download is in progress...')
    const certificateElement = document.querySelector('#certificate')
    if (!certificateElement) return

    certificateElement.classList.remove('hidden')
    certificateElement.classList.add('absolute', 'top-0', 'left-0', 'z-[-1]')

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210)
      pdf.save(`${studentDetails.name}-Certificate.pdf`)
    } catch (error) {
      console.error('Error generating certificate:', error)
    } finally {
      certificateElement.classList.add('hidden')
      toast.success('Download Complete...')
      setModal(!modal)
    }
  }

  const DetailItem = ({ label, value, icon }) => {
    const { viewBox, path } = icons[icon]
    return (
      <li className='flex items-center gap-2'>
        <svg viewBox={viewBox}>
          <path d={path}></path>
        </svg>
        <div>
          <p className='text-sm uppercase'>{label}</p>
          <p className='font-medium'>{value}</p>
        </div>
      </li>
    )
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='center flex-col relative top-16 md:top-0 mb-36 md:mb-0'>
          <h3 className='pl-6 w-full text-2xl md:col-span-2 md:text-center mb-2'>
            {studentDetails.name}&apos;s Profile
          </h3>

          <div className='w-full md:max-w-[65vw] grid grid-cols-1 md:grid-cols-[40%_60%] md:gap-x-4'>
            <div className='order-2 md:order-none '>
              <div className='center flex-col gap-y-4 profile_tab'>
                <div>
                  <h4 className='bdr'>Personal Details</h4>
                  <ul className='space-y-2'>
                    <DetailItem
                      label='Name'
                      value={studentDetails.name}
                      icon='person'
                    />
                    <DetailItem
                      label='Email'
                      value={studentDetails.email}
                      icon='email'
                    />
                    <DetailItem
                      label='Mobile Number'
                      value={studentDetails.mobileNumber}
                      icon='phone'
                    />
                    <DetailItem
                      label='Aadhar Number'
                      value={studentDetails.aadharNumber}
                      icon='aad_card'
                    />
                  </ul>
                </div>
                <div>
                  <h4 className='bdr'>Educational Details</h4>
                  <ul className='space-y-4'>
                    <DetailItem
                      label='College Name'
                      value={studentDetails.collegeName}
                      icon='school'
                    />
                    <DetailItem
                      label='Department'
                      value={studentDetails.department}
                      icon='domain'
                    />
                    <DetailItem
                      label='College Register Number'
                      value={studentDetails.collegeRegisterNumber}
                      icon='badge'
                    />
                    <DetailItem
                      label='Year of Graduation'
                      value={studentDetails.yearOfGraduation}
                      icon='calendar'
                    />
                  </ul>
                </div>
              </div>
            </div>

            <span className='grid gap-y-6 grid-cols-2 grid-rows-[auto_1fr_1fr] gap-x-4 h-full w-11/12 md:w-full mx-auto md:gap-y-4'>
              <div className='glassy round out h-52'>
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
                      fontSize: '1.6rem',
                      fontWeight: 'bold'
                    },
                    [`& .MuiGauge-bar`]: { fill: '#4caf50' },
                    [`& .${gaugeClasses.valueArc}`]: { fill: '#aad8b0' },
                    [`& .MuiGauge-background`]: { fill: '#e0e0e0' }
                  }}
                  text={() => `${progressPercentage1} / ${totalImages}`}
                />
                <p className='text-lg absolute bottom-1.5 w-full text-center'>
                  My Progress
                </p>
              </div>

              <div className='center flex-col glassy round out h-52'>
                <img
                  src='/Certificate.png'
                  alt='certificate icon'
                  className='w-11/12 round md:w-8/12'
                />
                <button
                  onClick={handleClick}
                  className={`${
                    progressPercentage < 100 ? 'disabled' : ''
                  } w-11/12`}>
                  Certificate
                </button>
              </div>

              <div className='p-2 glassy round out col-span-2 row-span-2'>
                <h2>Settings</h2>
              </div>
            </span>
          </div>
        </div>
      )}

      {modal && (
        <div className='glassy h-full inset-0 md:w-10/12 md:top-1/2 md:-translate-y-1/2 mx-auto py-2 z-20 fixed'>
          <div
            id='certificate'
            className='md:w-[297mm] md:h-[210mm] relative top-1/2 md:top-0 -translate-y-1/2 md:-translate-y-0 center'>
            <img
              src='/Certificate.png'
              alt='Certificate Background'
              className='w-full h-full'
            />
            <div className='absolute text-black text-center'>
              {studentDetails ? (
                <span className='cert'>
                  <h2>{studentDetails.name}</h2>
                  <p>
                    From Department of
                    <strong> {studentDetails.department}</strong>,
                    <strong> {studentDetails.collegeName}</strong>
                  </p>
                  <p>
                    Successfully Grown a Tree in academic period
                    <br />
                    <strong>
                      {studentDetails.yearOfGraduation - 4} -
                      {studentDetails.yearOfGraduation}
                    </strong>
                  </p>
                </span>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className='absolute grid grid-cols-2 gap-x-10 w-10/12 left-1/2 -translate-x-1/2 bottom-1/4 md:bottom-20 md:w-fit md:grid-cols-1 glassy md:px-2 round out'>
            <button onClick={handleGenerateCertificate}>Download PDF</button>
            <button onClick={() => setModal(!modal)} className='cancel'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
