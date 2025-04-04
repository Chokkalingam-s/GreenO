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
  const [closeModal, setCloseModal] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent))
    if (!navigator.geolocation) return toast.error('Geolocation is not supported.')

    navigator.permissions.query({name: 'geolocation'}).then(permission => {
      if (permission.state !== 'denied') {
        navigator.geolocation.getCurrentPosition(
          pos => setLocation({latitude: pos.coords.latitude, longitude: pos.coords.longitude}),
          () => {
            toast.error('Location access denied')
            setLocationDenied(true)
          }
        )
      } else {
        toast.error('Location access is blocked.')
        setLocationDenied(true)
      }
    })
  }, [])
  if (!isMobile) toast.error('Use a phone to upload...')

  const handleCapture = e => {
    const capturedFile = e.target.files[0]
    if (capturedFile) {
      setFile(capturedFile)
      setIsUploadEnabled(isCaptchaValid)
      navigator.geolocation.getCurrentPosition(
        pos => setLocation({latitude: pos.coords.latitude, longitude: pos.coords.longitude}),
        () => {
          toast.error('Location access denied')
          setLocationDenied(true)
        }
      )
    }
  }

  const handleUpload = async () => {
    if (!file) return toast.error('Select a file.')
    if (!isCaptchaValid) return toast.error('Captcha incorrect.')

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
      toast.success('File uploaded!')
      setFile(null)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed.')
    }
  }

  return (
    <div className='glassy round sh m-4 min-h-72 w-11/12 p-2 md:w-1/3'>
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
                <li>Keep a consistent angle.</li>
              </ul>
            </div>
            <div>
              <h3 className='text-secondary font-semibold'>❌ Don&apos;ts</h3>
              <ul className='list-disc space-y-1 pl-4 md:pl-6'>
                <li>Avoid blurry images</li>
                <li>No filters or edits</li>
                <li>Stick to either portrait or landscape mode</li>
              </ul>
            </div>
          </div>
          {locationDenied && (
            <div className='border-secondary sh round mt-6 border-2 py-4 text-center'>
              📍<strong>Allow location access</strong> for verification.
            </div>
          )}
          <div className='mt-4 flex items-center justify-end'>
            <button onClick={() => setCloseModal(false)} disabled={false}>
              Got It
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className='head'>Upload Image</h2>
          {!isMobile ? (
            <div className='c mt-10 flex-col gap-y-10'>
              <p className='text-center text-lg'>Use a phone to upload.</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 384 512'
                className='fill-secondary sh w-24 animate-bounce'>
                <path d='M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64L80 64l0 320 224 0 0-320z' />
              </svg>
            </div>
          ) : (
            <>
              {!isCaptchaValid && <Captcha onVerify={setIsCaptchaValid} />}
              {isCaptchaValid && (
                <>
                  <div className='c'>
                    <input
                      type='file'
                      accept='image/*'
                      capture='environment'
                      id='camera-input'
                      className='hidden'
                      onClick={e => (e.target.value = null)}
                      onChange={handleCapture}
                    />
                    <div
                      className='border-secondary bg-secondary/20 round c mx-auto aspect-square w-1/2 cursor-pointer flex-col border-2 border-dashed p-2'
                      onClick={() => document.getElementById('camera-input')?.click()}>
                      <span>Take a Picture</span>
                    </div>
                    {file && (
                      <div className='c mr-6 flex-col'>
                        <img
                          src={URL.createObjectURL(file)}
                          alt='Preview'
                          className='mx-auto h-32 w-32 object-contain'
                        />
                        <p className='mb-2 text-center text-sm md:text-base'>{file.name}</p>
                      </div>
                    )}
                  </div>
                  <span className='c mt-2'>
                    <button
                      onClick={handleUpload}
                      disabled={!isUploadEnabled}
                      className={isUploadEnabled ? 'text-accent' : 'text-gray-200'}>
                      Upload
                    </button>
                  </span>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
