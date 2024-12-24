import { useState } from 'react'
import './Resource.css'
import { Layout } from '../exp_components'
import { plantGrowthData } from './data'

export default function Resource() {
  const [showModal, setShowModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleLearnMoreClick = data => {
    setSelectedCard(data)
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
    setSelectedCard(null)
  }

  return (
    <Layout>
      <div className='grid grid-cols-1'>
        <main className='container mx-auto p-4'>
          <div className='space-y-8'>
            <section className='p-6 bg-green-100 rounded-md'>
              <h2 className='text-2xl font-bold text-green-800 mb-4'>
                GreenO Plant Care
              </h2>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  🌿 Water early in the morning to prevent excess evaporation.
                </li>
                <li>☀️ Ensure 6 hours of sunlight daily.</li>
                <li>🍃 Use organic fertilizers for nourishment.</li>
                <li>✂️ Prune plants regularly for healthy growth.</li>
                <li>💧 Monitor soil moisture, avoid over-watering.</li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold mb-4'>Plant Growth Process</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {plantGrowthData.map((data, index) => (
                  <div
                    key={index}
                    className='bg-white shadow-md rounded-md p-4 border border-gray-200'>
                    <h3 className='font-bold text-lg mb-2'>{data.title}</h3>
                    <p className='text-gray-600 mb-4'>{data.description}</p>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                      onClick={() => handleLearnMoreClick(data)}>
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {showModal && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                <div className='bg-white rounded-lg p-6 shadow-lg w-4/5 max-w-md'>
                  <h3 className='text-xl font-bold mb-4'>
                    {selectedCard?.title}
                  </h3>
                  <p className='text-gray-700'>
                    {selectedCard?.detailedContent}
                  </p>
                  <div className='mt-4 text-right'>
                    <button
                      className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                      onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <section>
              <h2 className='text-2xl font-bold mb-4'>Video Resources</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-white shadow-md rounded-md p-4'>
                  <iframe
                    className='w-full rounded'
                    height='315'
                    src='https://www.youtube.com/embed/CBjrdMlZlfE?autoplay=1&mute=1'
                    title='YouTube video player 1'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen></iframe>
                  <p className='mt-2 text-gray-600'>Plant Growth Process</p>
                </div>
                <div className='bg-white shadow-md rounded-md p-4'>
                  <iframe
                    className='w-full rounded'
                    height='315'
                    src='https://www.youtube.com/embed/eLACnABG2LM?autoplay=1&mute=1'
                    title='YouTube video player 2'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen></iframe>
                  <p className='mt-2 text-gray-600'>
                    Major Mistakes We Usually Do
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </Layout>
  )
}
