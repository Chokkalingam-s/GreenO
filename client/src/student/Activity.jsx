import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Modal } from '../exp_components'

export default function Activity() {
  const [images, setImages] = useState([])
  const token = localStorage.getItem('token') || ''
  const [modalSrc, setModalSrc] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/get-uploaded-images',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setImages(response.data)
      } catch (error) {
        console.error('Error fetching images:', error)
        toast.error('Error fetching images. Please try again later.')
      }
    }

    if (token) fetchImages()
  }, [token])

  return (
    <div className='center flex-col'>
      <h2 className='head mb-4 round glassy p-2'>Activity</h2>
      {images.length === 0 ? (
        <p className='glassy round p-1'>No images uploaded yet.</p>
      ) : (
        <div className='grid gap-2 grid-cols-2 md:grid-cols-4 round'>
          {images.map((image, index) => (
            <div
              key={image.id}
              className='glassy round'
              onClick={() =>
                setModalSrc(`http://localhost:3000/${image.filePath}`)
              }>
              <img
                className='w-full mx-auto round aspect-video mt-1 object-cover'
                src={`http://localhost:3000/${image.filePath}`}
                alt={`Semester ${index + 1}`}
              />
              <h3 className='font-medium tracking-wider text-center text-xl my-2'>
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
