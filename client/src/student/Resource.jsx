import { useState } from 'react'
import './Resource.css'
import { Layout } from '../exp_components'
import { plantGrowthData, videoData } from './data'

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
      <div className='grid grid-cols-1 w-8/12 relative top-16'>
        <main className='container mx-auto p-4'>
          <div className='space-y-8'>
            <section className='p-6 glassy rounded-xl shadow-lg'>
              <h2 className='text-2xl font-bold text-green-800 mb-4'>
                GreenO Plant Care
              </h2>
              <ul className='pl-2'>
                <li>
                  <img
                    src='/tree-solid.svg'
                    alt='Tree'
                    className='icon inline mr-2'
                  />
                  🌿 Water early in the morning to prevent excess evaporation.
                </li>
                <li>
                  <img
                    src='/tree-solid.svg'
                    alt='Tree'
                    className='icon inline mr-2'
                  />
                  ☀️ Ensure 6 hours of sunlight daily.
                </li>
                <li>
                  <img
                    src='/tree-solid.svg'
                    alt='Tree'
                    className='icon inline mr-2'
                  />
                  🍃 Use organic fertilizers for nourishment.
                </li>
                <li>
                  <img
                    src='/tree-solid.svg'
                    alt='Tree'
                    className='icon inline mr-2'
                  />
                  ✂️ Prune plants regularly for healthy growth.
                </li>
                <li>
                  <img
                    src='/tree-solid.svg'
                    alt='Tree'
                    className='icon inline mr-2'
                  />
                  💧 Monitor soil moisture, avoid over-watering.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='text-2xl font-bold mb-4'>Plant Growth Process</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 relative'>
                {plantGrowthData.map((data, index) => (
                  <div
                    key={index}
                    className='glassy round p-4 border border-gray-200'>
                    <h3 className='font-bold text-lg mb-2'>{data.title}</h3>
                    <p className='text-gray-600 mb-4'>{data.description}</p>
                    <button
                      className='absolute right-2 bottom-0'
                      onClick={() => handleLearnMoreClick(data)}>
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {showModal && (
              <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-primary'>
                <div className='glassy round p-6 w-4/5 max-w-md'>
                  <h3 className='text-xl font-bold mb-4 underline underline-offset-2'>
                    {selectedCard?.title}
                  </h3>
                  <p className='text-gray-700 text-inherit'>
                    {selectedCard?.detailedContent}
                  </p>
                  <div className='mt-4 text-right'>
                    <button className='cancel float-end' onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <section>
              <h2 className='text-2xl font-bold mb-4'>Video Resources</h2>
              <div className='grid md:grid-cols-2 gap-4'>
                {videoData.map(video => (
                  <div key={video.id} className='glassy round p-2'>
                    <iframe
                      className='w-full round'
                      height='200'
                      src={video.src}
                      title={video.title}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen></iframe>
                    <p className='mt-1 font-bold'>{video.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </Layout>
  )
}
