import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Layout } from '../exp_components'

export default function UploadSnaps() {
  const [email] = useState('')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [captcha, setCaptcha] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [isUploadEnabled, setIsUploadEnabled] = useState(false)
  const [location, setLocation] = useState({ latitude: '', longitude: '' })

  const generateCaptcha = () => {
    const chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
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
              longitude: position.coords.longitude,
            })
          },
          error => {
            toast.error('Location access denied.')
            console.log(error)
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
          'http://localhost:3000/api/uploaded-snaps',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setUploadedImage(response.data)
      } catch (error) {
        console.error('Error fetching uploaded snap:', error)
      }
    }

    fetchUploadedSnap()
  }, [])

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.')
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
        'http://localhost:3000/api/upload-snap',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast.success('File uploaded successfully!')
      setUploadedImage(response.data.filePath)
      generateCaptcha()
      setFile(null)
      setMessage('')

      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      if (error.response.status === 403) {
        toast.error(
          'You can upload a new image only after 4 months from your last upload.'
        )
      } else {
        console.error('Upload error:', error)
        toast.error('Error uploading file. Please try again.')
      }
    }
  }

  return (
    <Layout>
      <ToastContainer />
      <div className='main p-4 flex-col'>
        <h2 className='head'>Upload Image</h2>
        <div className='gap-x-4 hidden'>
          <p>
            <strong>Latitude:</strong>
            {Math.round(location.latitude) || 'Fetching...'}
          </p>
          <p>
            <strong>Longitude:</strong>
            {Math.round(location.longitude) || 'Fetching...'}
          </p>
        </div>
        <div className='flex'>
          <p className='font-bold tracking-tighter'>{captcha}</p>
          <input
            type='text'
            placeholder='Enter captcha'
            value={captchaInput}
            onChange={handleCaptchaInput}
          />
          <button
            className={`verify-check ${isCaptchaValid ? 'valid' : 'invalid'}`}
            onClick={handleVerifyCaptcha}>
            Verify
          </button>
        </div>

        <div className='p-4 glassy round flex'>
          <span className='relative'>
            <button
              type='button'
              className='px-6 py-3 font-semibold round cursor-pointer transition duration-300'>
              Choose File
            </button>
            <input
              type='file'
              onChange={handleFileChange}
              className='opacity-0 absolute'
            />
          </span>

          {file && (
            <p className='file-name mt-2 text-sm text-gray-700'>{file.name}</p>
          )}

          <button
            onClick={handleUpload}
            disabled={!isUploadEnabled}
            className={`mt-4 px-6 py-3 rounded-md font-semibold text-white transition duration-300 focus:outline-none ${
              isUploadEnabled
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}>
            Upload
          </button>
        </div>

        {message && <p className='message'>{message}</p>}

        <div className='uploaded-images'>
          {uploadedImage ? (
            <div className='uploaded-image'>
              <p className='prev'>Previously uploaded Image</p>
              <img
                src={`http://localhost:3000/uploads/${uploadedImage.filename}`}
                alt='Uploaded snap'
                className='uploaded-image-img'
              />
            </div>
          ) : (
            <p>No image uploaded yet.</p>
          )}
        </div>
      </div>
    </Layout>
  )
}
