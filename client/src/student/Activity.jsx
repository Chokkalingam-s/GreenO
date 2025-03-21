import {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useOverlay} from '../components/OverlayContext'

export default function Activity() {
  const [images, setImages] = useState([])
  const token = localStorage.getItem('token') || ''
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const {showOverlay} = useOverlay()

  const openModal = src => {
    showOverlay(
      <img
        src={src}
        alt='Full view'
        className='h-auto max-h-[80vh] object-contain'
      />
    )
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${backendUrl}/student-get-uploaded-images`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setImages(response.data)
      } catch (error) {
        console.error('Error fetching images:', error)
        toast.error('Error fetching images. Please try again later.')
      }
    }

    if (token) fetchImages()
  }, [token, backendUrl])

  return (
    <div className='c_main f_h'>
      {images.length === 0 ? (
        <div className='c f_h'>
          <p>No images uploaded yet.</p>
        </div>
      ) : (
        <div className='max-h-[calc(100vh-150px)] min-h-0 overflow-y-auto'>
          <div className='round grid grid-cols-2 gap-2 py-10 md:grid-cols-4 md:py-0'>
            {images.map((image, index) => (
              <div
                key={image.id}
                className='group relative cursor-pointer'
                onClick={() => openModal(`${backendUrl}/${image.filePath}`)}>
                <div className='relative mx-auto w-1/2 overflow-hidden'>
                  <img
                    className='round sh aspect-square w-full object-cover transition-transform duration-150 ease-in-out hover:scale-105'
                    src={`${backendUrl}/${image.filePath}`}
                    alt={`Semester ${index + 1}`}
                  />
                  <div className='round absolute bottom-0 left-0 w-full py-2 text-center text-sm font-bold text-black backdrop-blur-md'>
                    Tap to View
                  </div>
                </div>

                <h3 className='my-2 text-center text-xl font-medium tracking-wider'>
                  Semester {index + 1}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
