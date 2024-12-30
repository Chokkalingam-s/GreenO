import { useState, useEffect } from 'react'
import axios from 'axios'
import { Layout } from '../exp_components'
import { toast } from 'react-toastify'

export default function MyActivities() {
  const [images, setImages] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/get-uploaded-images',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setImages(response.data)
      } catch (error) {
        console.error('Error fetching images:', error)
        toast.error('Error fetching images...')
      }
    }
    if (token) fetchImages()
  }, [token])

  return (
    <Layout>
      <span className='center flex-col'>
        <h2 className='head mt-4 round glassy p-2'>My Progress</h2>
        <div>
          {images.length === 0 ? (
            <p className='glassy round p-2'>No images uploaded yet.</p>
          ) : (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {images.map((image, index) => (
                <div key={index} className='glassy round p-2'>
                  <img
                    className='w-full h-48 object-cover round'
                    src={`${image.path}`}
                    alt={`Semester ${index + 1}`}
                  />
                  <div className='p-2'>
                    <h3 className='text-lg font-medium'>
                      Semester {index + 1}
                    </h3>
                    <p>{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </span>
    </Layout>
  )
}
