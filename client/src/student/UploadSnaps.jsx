import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function UploadSnaps() {
  const [email] = useState('')
  const [file, setFile] = useState(null)
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
          'http://localhost:3000/api/uploaded-snaps',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setUploadedImage(response.data)
        console.log('response', response)
      } catch (error) {
        console.error('Error fetching uploaded snap:', error)
      }
    }
    fetchUploadedSnap()
  }, [])

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }
    if (!isCaptchaValid) {
      toast.error('Captcha is incorrect. Please try again.');
      return;
    }
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', file);
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);
  
    const token = localStorage.getItem('token');
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
      );
      toast.success('File uploaded successfully!');
      setUploadedImage(response.data.filePath);
      generateCaptcha();
      setFile(null);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response.status === 403) {
        toast.error(
          'You can upload a new image only after 4 months from your last upload.'
        );
      } else if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        console.error('Upload error:', error);
        toast.error('Error uploading file. Please try again.');
      }
    }
  };
  

  return (
    <>
      <div className='main p-6 flex flex-col items-center glassy rounded-lg shadow-lg'>
        <h2 className='text-3xl font-semibold mb-6'>
          Upload Image
        </h2>
        {!isCaptchaValid && (
          <div className='captcha-section flex flex-col md:flex-row items-center gap-4 mb-6'>
            <input type='text' name='captcha' value={captcha} readOnly />
            <input
              type='text'
              placeholder='Enter captcha'
              value={captchaInput}
              onChange={handleCaptchaInput}
            />
            <button onClick={handleVerifyCaptcha}>Verify</button>
          </div>
        )}
        {isCaptchaValid && (
          <>
            <div className='p-2  md:w-1/2 border-4 border-dashed border-secondary h-64 glassy round center'>
              <label
                htmlFor='file-input'
                className='cursor-pointer py-3 px-6 font-semibold text-lg bg-tertiary text-white rounded-lg transition duration-300 hover:bg-green-600'>
                Choose File
              </label>
              <input
                id='file-input'
                type='file'
                onChange={handleFileChange}
                className='opacity-0 absolute inset-0'
              />
              {file && (
                <p className='text-gray-600 ml-4 text-sm'>{file.name}</p>
              )}
            </div>
            <button
              onClick={handleUpload}
              disabled={!isUploadEnabled}
              className='transition duration-300'>
              Upload
            </button>
          </>
        )}

        <div className='mt-6 w-full center'>
          {uploadedImage ? (
            <div className='grid md:grid-cols-3 grid-cols-1'>
              <p className='text-lg font-semibold mb-2'>
                Previously Uploaded Image
              </p>
              <img
                src={`http://localhost:3000/uploads/${uploadedImage.filename}`}
                alt='Uploaded snap'
                className='rounded-lg shadow-lg w-full max-w-md'
              />
            </div>
          ) : (
            <p>No image uploaded yet.</p>
          )}
        </div>
      </div>
    </>
  )
}
