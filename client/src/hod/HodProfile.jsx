import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {icon as ic} from '../exported_data'
import CountUI from '../components/CountUI'
import Logout from '../components/LogOut'

export default function HodProfile() {
  const [studentDetails, setStudentDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const token = localStorage.getItem('token')

    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/student-get-user-details`, {
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

    fetchStudentDetails()
  }, [backendUrl])

  const DetailItem = ({label, value, icon}) => {
    const {viewBox, path} = ic[icon]
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

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : studentDetails ? (
        <div className='mb-12 w-7/12 flex-col md:mb-0'>
          <h3 className='mb-4 pl-6 text-2xl font-bold tracking-wide md:col-span-2 md:text-center'>
            {studentDetails?.name}&apos;s Profile
          </h3>

          <div className='grid w-full grid-cols-1 md:max-w-[65vw] md:grid-cols-2 md:gap-x-2'>
            {/* Student & Tree Information */}
            <div className='col-span-2 mb-4'>
              <CountUI
                title={['Student Strength', 'Certificates Earned', 'Trees Planted']}
                data={[
                  studentDetails.uploadCount,
                  studentDetails.uploadCount * 1.5,
                  studentDetails.uploadCount * 2
                ]}
                icons={[ic.group, ic.aad_card, ic.tree]}
                center={true}
              />
            </div>
            {/* Personal */}
            <div className='order-2 md:order-none'>
              <div className='c profile_tab flex-col gap-y-2'>
                <div>
                  <h4 className='bdr ml-4'>Personal Details</h4>
                  <ul className='ml-4 space-y-2'>
                    <DetailItem label='Name' value={studentDetails.name} icon='person' />
                    <DetailItem
                      label='Department'
                      value={studentDetails.department}
                      icon='domain'
                    />
                    <DetailItem label='College' value={studentDetails.collegeName} icon='school' />
                    <DetailItem
                      label='District & State'
                      value={`${studentDetails.district}, ${studentDetails.state}`}
                      icon='location_on'
                    />
                  </ul>
                </div>
              </div>
            </div>
            {/* Rankings */}
            <div className='glassy round mb-2 flex h-72 flex-col justify-center px-2 text-center md:mb-0 md:h-auto'>
              <h3 className='text-2xl font-extrabold'>{studentDetails?.collegeName}</h3>
              <p className='text-accent/80 mt-2 text-sm tracking-wide'>Rankings</p>

              <div className='c mt-4 flex-col gap-6'>
                {[
                  {label: 'Dept Rank in College', color: 'text-primary', max: 10},
                  {label: 'College Rank in State', color: 'text-accent', max: 50},
                  {label: 'College Rank in Country', color: 'text-secondary', max: 100}
                ].map(({label, color, max}, i) => (
                  <div key={i} className='flex w-full items-center justify-between text-lg'>
                    <p>{label}</p>
                    <p className={`${color} font-bold`}>#{Math.floor(Math.random() * max) + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='flex w-full items-center justify-start md:hidden'>
            <Logout full={true} />
          </div>
        </div>
      ) : (
        <div className='c glassy round flex-col p-4 text-center'>
          <h2 className='text-2xl font-bold'>Profile Data Unavailable</h2>
          <p className='mt-2 text-lg'>Unable to retrieve your profile. Please try again.</p>
          <div className='mt-4'>
            <Logout />
          </div>
        </div>
      )}
    </>
  )
}
