import {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function UploadSnaps() {
  const [email] = useState('')
  const [file, setFile] = useState(null)
  const [captcha, setCaptcha] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [isUploadEnabled, setIsUploadEnabled] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  })
  const [locationDenied, setLocationDenied] = useState(false)
  const [closeModal, setCloseModel] = useState(true)
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopq@rstuvwxyz'
    let captcha = ''
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)]
    }
    setCaptcha(captcha)
    setCaptchaInput('')
    setIsCaptchaValid(false)
    setIsUploadEnabled(false)
  }

  const handleFileChange = e => {
    setFile(e.target.files[0])
    validateUpload(e.target.files[0], isCaptchaValid)
  }

  const handleCaptchaInput = e => setCaptchaInput(e.target.value)

  const validateUpload = (selectedFile, captchaIsValid) => {
    if (selectedFile && captchaIsValid) setIsUploadEnabled(true)
    else setIsUploadEnabled(false)
  }

  const handleVerifyCaptcha = () => {
    if (captchaInput === captcha) {
      toast.success('Captcha verified successfully!')
      setIsCaptchaValid(true)
      validateUpload(file, true)
    } else {
      toast.error('Captcha is incorrect. Please try again.')
      setIsCaptchaValid(false)
    }
  }

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        toast.error('Geolocation is not supported by this browser.')
        return
      }

      try {
        const permission = await navigator.permissions.query({name: 'geolocation'})

        if (permission.state === 'granted') {
          navigator.geolocation.getCurrentPosition(position => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
            setLocationDenied(false)
          })
        } else if (permission.state === 'prompt') {
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
        } else if (permission.state === 'denied') {
          toast.error('Location access is blocked. Please enable it in browser settings.')
          setLocationDenied(true)
        }
      } catch (err) {
        toast.error(`Error checking location permissions. ${err}`)
      }
    }

    fetchLocation()
    generateCaptcha()
  }, [])

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload.')
      return
    }
    if (!isCaptchaValid) {
      toast.error('Captcha is incorrect. Please try again.')
      return
    }

    const formData = new FormData()
    formData.append('email', email)
    formData.append('file', file)
    formData.append('latitude', location.latitude)
    formData.append('longitude', location.longitude)

    const token = localStorage.getItem('token')
    try {
      await axios.post(`${backendUrl}/student-upload-snap-page`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      toast.success('File uploaded successfully!')
      generateCaptcha()
      setFile(null)
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('You can upload a new image only after 4 months from your last upload.')
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message)
      } else {
        console.error('Upload error:', error)
        toast.error('Error uploading file. Please try again.')
      }
    }
  }

  return (
    <div className='glassy round sh m-4 aspect-square px-4 py-2'>
      <span>
        {closeModal && (
          <>
            <h1 className='mb-4 text-center text-2xl font-bold'>Guidelines</h1>

            <div className='space-y-6 px-6 py-3'>
              <h3 className='text-lg font-semibold'>Uploading Plant Photo Guidelines</h3>

              <div>
                <h3 className='text-lg font-semibold text-green-600'>✅ Do&apos;s</h3>
                <ul className='list-disc space-y-1 pl-6'>
                  <li>Capture the full plant</li>
                  <li>Use natural daylight</li>
                  <li>Try to keep a consistent angle for better comparison.</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-red-500'>❌ Don&apos;ts</h3>
                <ul className='list-disc space-y-1 pl-6'>
                  <li>Avoid blurry images</li>
                  <li>No filters or edits</li>
                  <li>Stick to either portrait or landscape mode</li>
                </ul>
              </div>
            </div>
            {locationDenied && (
              <div className='border-secondary sh mt-6 rounded-lg border-2 p-4 text-center'>
                📍 <strong>Kindly allow location access</strong> to ensure accurate verification.
              </div>
            )}
            <div className='mt-4 flex items-center justify-end'>
              <button
                onClick={() => setCloseModel(false)}
                disabled={locationDenied}>
                Got It
              </button>
            </div>
          </>
        )}
        {!closeModal && (
          <>
            <h2 className='head'>Upload Image</h2>
            <div>
              {!isCaptchaValid && (
                <div className='flex flex-col'>
                  <span className='my-2 grid grid-cols-1'>
                    <span className='center'>
                      Captcha:
                      <input
                        type='text'
                        name='captcha'
                        value={captcha}
                        disabled
                        className='text-2xl font-bold opacity-100'
                      />
                    </span>
                    <span className='center gap-x-2'>
                      <input
                        type='text'
                        placeholder='Enter captcha'
                        value={captchaInput}
                        onChange={handleCaptchaInput}
                      />
                      <button onClick={handleVerifyCaptcha}>Verify</button>
                    </span>
                  </span>
                </div>
              )}
              {isCaptchaValid && (
                <>
                  <div className='border-secondary glassy center round mt-4 h-64 border-4 border-dashed p-2'>
                    <label
                      htmlFor='file-input'
                      className='bg-secondary round hover:bg-tertiary cursor-pointer px-6 py-3 text-lg font-semibold text-white transition duration-300'>
                      Choose File
                    </label>
                    <input
                      id='file-input'
                      type='file'
                      onChange={handleFileChange}
                      className='hidden'
                    />
                    {file && <p className='ml-4 text-sm text-gray-600'>{file.name}</p>}
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={!isUploadEnabled}
                    className={`${isUploadEnabled ? 'text-white' : 'text-gray-200'}`}>
                    Upload
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </span>
    </div>
  )
}
