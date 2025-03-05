import {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Modal} from '../exp_components'

export default function Activity() {
  const [images, setImages] = useState([])
  const token = localStorage.getItem('token') || ''
  const [modalSrc, setModalSrc] = useState(null)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

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
    <div className='c_main f_h flex-col p-4'>
      {images.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div className='round grid grid-cols-2 gap-2 overflow-y-auto md:grid-cols-4'>
          {images.map((image, index) => (
            <div key={image.id} onClick={() => setModalSrc(`${backendUrl}/${image.filePath}`)}>
              <img
                className='mx-auto mt-1 aspect-video w-full object-contain'
                src={`${backendUrl}/${image.filePath}`}
                alt={`Semester ${index + 1}`}
              />
              <h3 className='my-2 text-center text-xl font-medium tracking-wider'>
                Semester {index + 1}
              </h3>
            </div>
          ))}
        </div>
      )}
      {modalSrc && <Modal src={modalSrc} onClose={() => setModalSrc(null)} />}
    </div>
  )
}
