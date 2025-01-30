import {useState} from 'react'
import {plantGrowthData, videoData} from './data'

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
    <div className='grid grid-cols-1 md:w-8/12 relative top-12 md:top-6 pb-14 md:pb-0'>
      <main className='mx-auto p-4'>
        <section className='px-6 py-4 glassy'>
          <h2 className='head'>GreenO Plant Care</h2>
          <ul className='pl-1'>
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
          <h2 className='head my-4'>Plant Growth Process</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 relative'>
            {plantGrowthData.map((data, index) => (
              <div key={index} className='glassy p-4'>
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
          <div className='fixed inset-0 bg-black/50 center z-50'>
            <div className='glassy center flex-col p-6 max-w-[90vw] max-h-[80vh]'>
              <h3 className='head my-2'>{selectedCard?.title}</h3>
              <div className='md:w-[60ch] px-4 text-lg max-h-[50vh] overflow-y-auto'>
                {selectedCard?.detailedContent}
              </div>
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
              <div key={video.id} className='glassy p-2'>
                <p className='font-semibold'>{video.description}</p>
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
