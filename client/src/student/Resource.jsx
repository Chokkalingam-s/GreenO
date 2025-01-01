import { useState } from 'react'
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
    <div className='grid grid-cols-1 md:w-8/12 relative top-16 mb-16 md:mb-0'>
      <main className='container mx-auto p-4'>
        <section className='p-6 glassy round'>
          <h2 className='head mb-4'>GreenO Plant Care</h2>
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
          <h2 className='head my-4'>Plant Growth Process</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 relative'>
            {plantGrowthData.map((data, index) => (
              <div key={index} className='glassy round p-4'>
                <h3 className='font-bold text-lg mb-2'>{data.title}</h3>
                <p>{data.description}</p>
                <button
                  className='relative -bottom-4 float-end'
                  onClick={() => handleLearnMoreClick(data)}>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </section>

        {showModal && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-primary'>
            <div className='main flex-col'>
              <h3 className='text-xl font-bold my-4 underline underline-offset-2'>
                {selectedCard?.title}
              </h3>
              <p className='w-11/12'>{selectedCard?.detailedContent}</p>
              <div className='mt-4 text-right'>
                <button className='cancel float-end' onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <section>
          <h2 className='head my-4'>Video Resources</h2>
          <div className='grid md:grid-cols-2 gap-4'>
            {videoData.map(video => (
              <div key={video.id} className='glassy round p-2'>
                <p className=' text-white font-semibold'>{video.description}</p>
                <iframe
                  className='w-full round'
                  height='200'
                  src={video.src}
                  title={video.title}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen></iframe>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
