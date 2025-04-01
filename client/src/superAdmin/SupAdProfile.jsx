import {useEffect, useState} from 'react'
import axios from 'axios'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {toast} from 'react-toastify'
import {LogOut} from '../exp_components'
import {Gauge, gaugeClasses} from '@mui/x-charts'
import {icons} from '../exported_data'

export default function SuperAdminProfile() {
  const [studentDetails, setStudentDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploadedCount, setUploadedCount] = useState(null)
  const totalImages = 8
  const [modal, setModal] = useState(false)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [progressPercentage1, setProgressPercentage1] = useState(0)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    setProgressPercentage((uploadedCount / totalImages) * 100)
    setProgressPercentage1(progressPercentage / 12.5)
  }, [progressPercentage, uploadedCount])
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchUploadedImagesCount = async () => {
      try {
        const response = await axios.get(`${backendUrl}/get-uploaded-images-count`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setUploadedCount(Number(response.data.uploadedImagesCount) || 0)
      } catch (err) {
        console.error(err)
        setUploadedCount(0)
      }
    }

    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student-get-user-details`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setStudentDetails(response.data)
        console.log('ran')
      } catch (err) {
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUploadedImagesCount()
    fetchStudentDetails()
  }, [backendUrl])

  function handleClick() {
    if (progressPercentage < 100) {
      toast.error('Progress Incomplete! Please upload all 8 images to generate the certificate.')
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

  const DetailItem = ({label, value, icon}) => {
    const {viewBox, path} = icons[icon]
    return (
      <li className='flex items-center gap-2'>
        <svg viewBox={viewBox} className='fill-secondary icon'>
          <path d={path}></path>
        </svg>
        <div>
          <p className='text-secondary text-sm font-bold uppercase'>{label}</p>
          <p className='font-medium'>{value}</p>
        </div>
      </li>
    )
  }

  function getDepartmentAbbreviation(department) {
    return department
      .split(/\s|-/)
      .map(word => word[0].toUpperCase())
      .join('')
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : studentDetails ? (
        <div className='mb-12 flex-col md:mb-0'>
          <h3 className='mb-4 pl-6 text-2xl font-bold tracking-wide md:col-span-2 md:text-center'>
            {studentDetails?.name}&apos;s Profile
          </h3>

          <div className='grid w-full grid-cols-1 md:max-w-[65vw] md:grid-cols-[40%_60%] md:gap-x-2'>
            <div className='order-2 md:order-none'>
              <div className='c profile_tab flex-col gap-y-2'>
                <div>
                  <h4 className='bdr ml-4'>Personal Information</h4>
                  <ul className='ml-4 space-y-2'>
                    <DetailItem label='Name' value={studentDetails.name} icon='person' />
                    <DetailItem label='Email' value={studentDetails.email} icon='email' />
                    <DetailItem
                      label='Phone Number'
                      value={studentDetails.mobileNumber}
                      icon='phone'
                    />
                    <DetailItem
                      label='Aadhar ID'
                      value={studentDetails.aadharNumber}
                      icon='aad_card'
                    />
                  </ul>
                </div>
                <div>
                  <h4 className='bdr ml-4'>Academic Information</h4>
                  <ul className='ml-4 space-y-2'>
                    <DetailItem label='College' value={studentDetails.collegeName} icon='school' />
                    <DetailItem
                      label='Department'
                      value={studentDetails.department}
                      icon='domain'
                    />
                    <DetailItem
                      label='Register Number'
                      value={studentDetails.collegeRegisterNumber}
                      icon='badge'
                    />
                    <DetailItem
                      label='Graduation Year'
                      value={studentDetails.yearOfGraduation}
                      icon='calendar'
                    />
                  </ul>
                </div>
              </div>
            </div>
            <span className='mx-auto grid h-full w-11/12 grid-cols-2 grid-rows-[auto_1fr_1fr] gap-2 md:w-full'>
              <div className='glassy round h-56'>
                <Gauge
                  value={progressPercentage}
                  min={0}
                  max={100}
                  startAngle={-120}
                  endAngle={120}
                  thickness={4}
                  cornerRadius='50%'
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {fontSize: '1.8rem', fontWeight: 'bold'},
                    [`& .${gaugeClasses.valueText} tspan`]: {fill: '#E3F6E5'},
                    [`& .MuiGauge-bar`]: {fill: '#E3F6E5'},
                    [`& .${gaugeClasses.valueArc}`]: {fill: '#E3F6E5'}
                  }}
                  text={() => `${progressPercentage1} / ${totalImages}`}
                />
                <p className='absolute bottom-1.5 w-full text-center text-lg'>My Progress</p>
              </div>

              <div className='c glassy round h-56 flex-col gap-y-2'>
                <img
                  src='/Certificate.png'
                  alt='certificate icon'
                  className='round w-10/12 md:w-9/12'
                />
                <button
                  onClick={handleClick}
                  disabled={progressPercentage < 100}
                  className='w-11/12'>
                  Certificate
                </button>
              </div>
              <div className='glassy round col-span-2 row-span-2 mb-2 flex h-72 flex-col justify-center px-2 pl-6 md:mb-0 md:h-auto'>
                <h3 className='text-2xl font-extrabold'>{studentDetails?.collegeName}</h3>
                <p className='text-accent/80 mt-2 text-sm tracking-wide'>Rankings</p>

                <div className='mt-4 flex w-full flex-col gap-4'>
                  {[
                    {
                      label: `${getDepartmentAbbreviation(studentDetails.department)} Rank`,
                      color: 'text-primary',
                      max: 10
                    },
                    {label: 'College Rank', color: 'text-accent', max: 50},
                    {
                      label: `${getDepartmentAbbreviation(studentDetails.department)} Dept Rank`,
                      color: 'text-secondary',
                      max: 20
                    },
                    {label: 'State Rank', color: 'text-accent', max: 100},
                    {label: 'Country Rank', color: 'text-secondary', max: 500}
                  ].map(({label, color, max}, i) => (
                    <div key={i} className='flex items-center justify-between text-lg md:w-3/5'>
                      <p>{label}</p>
                      <p className={`${color} font-bold`}>#{Math.floor(Math.random() * max) + 1}</p>
                    </div>
                  ))}
                </div>
                <div className='absolute right-2 bottom-2 hidden w-11/12 items-center justify-end md:flex'>
                  <LogOut />
                </div>
              </div>
            </span>
          </div>
          <div className='flex w-full items-center justify-start md:hidden'>
            <LogOut full={true} />
          </div>
        </div>
      ) : (
        <div className='c glassy round flex-col p-4 text-center'>
          <h2 className='text-2xl font-bold'>Profile Data Unavailable</h2>
          <p className='mt-2 text-lg'>Unable to retrieve your profile. Please try again.</p>
          <div className='mt-4'>
            <LogOut />
          </div>
        </div>
      )}

      {modal && (
        <div className='glassy fixed inset-0 z-20 mx-auto h-full py-2 md:top-1/2 md:w-10/12 md:-translate-y-1/2'>
          <div
            id='certificate'
            className='center relative top-1/2 -translate-y-1/2 md:top-0 md:h-[210mm] md:w-[297mm] md:-translate-y-0'>
            <img src='/Certificate.png' alt='Certificate Background' className='h-full w-full' />
            <div className='absolute text-center text-black'>
              {studentDetails ? (
                <span className='cert'>
                  <h2>{studentDetails.name}</h2>
                  <p>
                    From the <strong>{studentDetails.department}</strong> Department,
                    <strong> {studentDetails.collegeName}</strong>
                  </p>
                  <p>
                    Successfully Grown a Tree during the academic period
                    <br />
                    <strong>
                      {studentDetails.yearOfGraduation - 4} - {studentDetails.yearOfGraduation}
                    </strong>
                  </p>
                </span>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className='glassy round absolute bottom-1/4 left-1/2 grid w-10/12 -translate-x-1/2 grid-cols-2 gap-x-10 md:bottom-20 md:w-fit md:grid-cols-1 md:px-2'>
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
