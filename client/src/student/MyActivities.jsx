import { useState, useEffect } from 'react'
import axios from 'axios'
import { Layout } from '../exp_components'

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
      }
    }

    if (token) fetchImages()
  }, [token])

  return (
    <Layout>
      <div className='grid-container'>
        <main className='main-container my-activities-container'>
          <div className=''>
            <div className='my-activities-content'>
              <div className='my-activities-body'>
                <h2>My Progress</h2>
                <div className='gallery-container'>
                  {images.length === 0 ? (
                    <p className='no-images-placeholder'>
                      No images uploaded yet.
                    </p>
                  ) : (
                    images.map((image, index) => (
                      <div key={index} className='image-card'>
                        <img
                          className='image-card-img'
                          src={`http://localhost:3000/${image.filePath}`}
                          alt={`Semester ${index + 1}`}
                        />
                        <div className='image-card-content'>
                          <h3>Semester {index + 1}</h3>
                          <p>{image.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
