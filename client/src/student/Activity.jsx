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
        // setImages(response.data)
        setImages([
          {
            filePath:
              'https://images.unsplash.com/photo-1736168432643-2d5882e17aeb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            filePath:
              'https://images.unsplash.com/photo-1736168432643-2d5882e17aeb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            filePath:
              'https://images.unsplash.com/photo-1736168432643-2d5882e17aeb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            filePath:
              'https://images.unsplash.com/photo-1736168432643-2d5882e17aeb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            filePath:
              'https://images.unsplash.com/photo-1736168432643-2d5882e17aeb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        ])
      } catch (error) {
        console.error('Error fetching images:', error)
        toast.error('Error fetching images. Please try again later.')
      }
    }

    if (token) fetchImages()
  }, [token])

  return (
    <div className='center flex-col relative mt-12 mb-4 md:m-0'>
      <h2 className='head mt-4 round glassy p-2'>Activity</h2>
      {images.length === 0 ? (
        <p className='glassy round p-2'>No images uploaded yet.</p>
      ) : (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-4 round'>
          {images.map((image, index) => (
            <div
              key={image.id}
              className='glassy round'
              onClick={() =>
                setModalSrc(`http://localhost:3000/${image.filePath}`)
              }>
              <img
                className='w-8/12 mx-auto aspect-square object-contain'
                src={`${image.filePath}`}
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
//http://localhost:3000/