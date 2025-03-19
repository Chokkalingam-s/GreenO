import {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Captcha} from './Captcha'

export default function UploadSnaps() {
  const [email] = useState('')
  const [file, setFile] = useState(null)
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [isUploadEnabled, setIsUploadEnabled] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [location, setLocation] = useState({latitude: '', longitude: ''})
  const [locationDenied, setLocationDenied] = useState(false)
  const [closeModal, setCloseModel] = useState(true)

  const handleFileChange = e => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      validateUpload(selectedFile, isCaptchaValid)
    }
  }

  const validateUpload = (selectedFile, captchaIsValid) => {
    setIsUploadEnabled(!!(selectedFile && captchaIsValid))
  }

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        toast.error('Geolocation is not supported by this browser.')
        return
      }

      try {
        navigator.permissions.query({name: 'geolocation'}).then(permission => {
          if (permission.state === 'granted' || permission.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(
              position => {
                setLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                })
                setLocationDenied(false)
              },
              () => {
                toast.error('Location access denied')
                setLocationDenied(true)
              }
            )
          } else {
            toast.error('Location access is blocked. Please enable it in browser settings.')
            setLocationDenied(true)
          }
        })
      } catch (err) {
        toast.error(`Error checking location permissions: ${err.message}`)
      }
    }

    fetchLocation()
  }, [])

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a file to upload.')
    if (!isCaptchaValid) return toast.error('Captcha is incorrect. Please try again.')

    const formData = new FormData()
    formData.append('email', email)
    formData.append('file', file)
    formData.append('latitude', location.latitude)
    formData.append('longitude', location.longitude)

    try {
      await axios.post(`${backendUrl}/student-upload-snap-page`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast.success('File uploaded successfully!')
      setFile(null)
    } catch (error) {
      if (error.response) {
        const {status, data} = error.response
        if (status === 403)
          toast.error('You can upload a new image only after 4 months from your last upload.')
        else if (status === 400) toast.error(data.message || 'Bad request.')
        else toast.error('Error uploading file. Please try again.')
      } else {
        toast.error('Network error. Please check your connection.')
      }
    }
  }

  return (
    <div className='glassy round sh m-4 aspect-square w-11/12 p-2 md:w-1/3'>
      <span>
        {closeModal ? (
          <div className='mt-6'>
            <h1 className='mb-4 text-center text-2xl font-bold md:text-3xl'>Guidelines</h1>
            <div className='space-y-6 p-2'>
              <h3 className='text-lg font-semibold md:text-xl'>Uploading Plant Photo Guidelines</h3>
              <div>
                <h3 className='text-secondary font-semibold'>✅ Do&apos;s</h3>
                <ul className='list-disc space-y-1 pl-4 md:pl-6'>
                  <li>Capture the full plant</li>
                  <li>Use natural daylight</li>
                  <li>Try to keep a consistent angle for better comparison.</li>
                </ul>
              </div>
              <div>
                <h3 className='text-xl font-semibold text-red-200'>❌ Don&apos;ts</h3>
                <ul className='list-disc space-y-1 pl-4 md:pl-6'>
                  <li>Avoid blurry images</li>
                  <li>No filters or edits</li>
                  <li>Stick to either portrait or landscape mode</li>
                </ul>
              </div>
            </div>
            {locationDenied && (
              <div className='border-secondary sh round mt-6 border-2 py-4 text-center'>
                📍<strong>Kindly allow location access</strong> to ensure accurate verification.
              </div>
            )}
            <div className='mt-4 flex items-center justify-end'>
              <button onClick={() => setCloseModel(false)} disabled={locationDenied}>
                Got It
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className='head text-lg md:text-xl'>Upload Image</h2>
            {!isCaptchaValid ? (
              <Captcha onVerify={setIsCaptchaValid} />
            ) : (
              <div>
                <div
                  className='border-secondary bg-secondary/20 round center my-4 cursor-pointer border-2 border-dashed p-2 md:p-4'
                  onClick={() => document.getElementById('file-input').click()}>
                  <span>Choose File</span>
                  <input
                    id='file-input'
                    type='file'
                    onChange={handleFileChange}
                    className='hidden'
                    accept='image/*'
                  />
                </div>
                {file && (
                  <div className='mt-2 ml-4'>
                    <img
                      src={URL.createObjectURL(file)}
                      alt='Preview'
                      className='mx-auto mt-2 h-32 w-32 rounded-md object-contain md:h-48 md:w-48'
                    />
                    <p className='my-4 text-center text-sm md:text-base'>{file.name}</p>
                  </div>
                )}
                <span className='flex items-center justify-end'>
                  <button
                    onClick={handleUpload}
                    disabled={!isUploadEnabled}
                    className={isUploadEnabled ? 'text-white' : 'text-gray-200'}>
                    Upload
                  </button>
                </span>
              </div>
            )}
          </>
        )}
      </span>
    </div>
  )
}
