import {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function UploadSnaps() {
  const [email] = useState('')
  const [file, setFile] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [captcha, setCaptcha] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [isUploadEnabled, setIsUploadEnabled] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  })
  const [closeModal, setCloseModel] = useState(true)

  const generateCaptcha = () => {
    const chars =
      '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopq@rstuvwxyz'
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
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          },
          () => {
            toast.error('Location access denied')
          }
        )
      } else {
        toast.error('Geolocation is not supported by this browser.')
      }
    }

    fetchLocation()
    generateCaptcha()

    const fetchUploadedSnap = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(
          `${backendUrl}/student-uploaded-snaps`,
          {
            headers: {Authorization: `Bearer ${token}`}
          }
        )
        setUploadedImage(response.data)
      } catch (error) {
        setUploadedImage(null)
        console.error('Error fetching uploaded snap:', error)
      }
    }

    fetchUploadedSnap()
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
      const response = await axios.post(
        `${backendUrl}/student-upload-snap-page`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success('File uploaded successfully!')
      setUploadedImage(response.data.filePath)
      generateCaptcha()
      setFile(null)
    } catch (error) {
      if (error.response.status === 403) {
        toast.error(
          'You can upload a new image only after 4 months from your last upload.'
        )
      } else if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        console.error('Upload error:', error)
        toast.error('Error uploading file. Please try again.')
      }
    }
  }

  return (
    <div className='main relative top-2 p-4 m-4'>
      <span>
        {closeModal && (
          <>
            <h1 className='head'>Do&apos;s and Don&apos;ts</h1>
            <div className='grid md:grid-cols-2 grid-cols-1 justify-evenly gap-4 p-4'>
              <h3 className='font-semibold text-lg md:col-span-2'>
                While Uploading the Plant Photo
              </h3>
              <span>
                <h3 className='font-semibold text-lg'>Do&apos;s</h3>
                <ul className='list-disc'>
                  <li>Include the Full Plant</li>
                  <li>Proper Lighting - Day Light</li>
                  <li>Keep the Same Angle</li>
                </ul>
              </span>
              <span>
                <h3 className='font-semibold text-lg'>Don&apos;ts</h3>
                <ul className='list-disc'>
                  <li>Upload of Blurry Images</li>
                  <li>No Filters or Editing</li>
                  <li>Avoid Different Orientations</li>
                </ul>
              </span>
            </div>
            <button
              onClick={() => setCloseModel(false)}
              className='float-end'>
              Got It
            </button>
          </>
        )}
        {!closeModal && (
          <>
            <h2 className='head'>Upload Image</h2>
            <div>
              {!isCaptchaValid && (
                <div className='flex flex-col'>
                  <span className='grid md:grid-cols-2 grid-cols-1 gap-x-2 my-4'>
                    <input
                      type='text'
                      name='captcha'
                      value={captcha}
                      readOnly
                      className='font-bold'
                    />
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
                  <span className='flex items-center gap-x-6'>
                    {location.latitude && (
                      <div className='center gap-6'>
                        <p>
                          <b>Latitude:</b> {location.latitude}
                        </p>
                        <p>
                          <b>Longitude:</b> {location.longitude}
                        </p>
                      </div>
                    )}
                  </span>
                </div>
              )}
              {isCaptchaValid && (
                <>
                  <div className='p-2 border-4 border-dashed border-secondary h-64 glassy center round mt-4'>
                    <label
                      htmlFor='file-input'
                      className='cursor-pointer py-3 px-6 font-semibold text-lg bg-secondary text-white round transition duration-300 hover:bg-tertiary'>
                      Choose File
                    </label>
                    <input
                      id='file-input'
                      type='file'
                      onChange={handleFileChange}
                      className='hidden'
                    />
                    {file && (
                      <p className='text-gray-600 ml-4 text-sm'>
                        {file.name}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={!isUploadEnabled}
                    className={`${
                      isUploadEnabled ? 'text-white' : 'text-gray-200'
                    }`}>
                    Upload
                  </button>
                </>
              )}
              <div>
                <p className='text-xl font-semibold w-full mb-2 col-span-4 text-center'>
                  Previously Uploaded Image
                </p>
                {uploadedImage == null && (
                  <p className='text-center'>No image uploaded yet.</p>
                )}
                <img
                  src={`${
                    uploadedImage
                      ? `${backendUrl}/uploads/` +
                        uploadedImage.filename
                      : 'https://placehold.co/600x400'
                  }`}
                  alt='Uploaded snap'
                  className={`w-1/2 mx-auto aspect-video object-contain ${
                    uploadedImage ? '' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          </>
        )}
      </span>
    </div>
  )
}
