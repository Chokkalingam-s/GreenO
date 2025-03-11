import {useState} from 'react'
import {plantGrowthData, videoData} from './data'

export default function Resource() {
  const [showModal, setShowModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleClose = e => {
    if (e.target.matches('.modal')) setShowModal(false)
  }

  return (
    <div className='resource'>
      <div>
        <section>
          <h2>GreenO Plant Care</h2>
          <ul>
            <li>🌿 Water early in the morning to prevent excess evaporation.</li>
            <li>☀️ Ensure 6 hours of sunlight daily.</li>
            <li>🍃 Organic fertilizers for nourishment.</li>
            <li>✂️ Prune plants regularly for healthy growth.</li>
            <li>💧 Monitor soil moisture, avoid over-watering.</li>
          </ul>
        </section>
        <div className='line'></div>
        <section>
          <h2>Video Resources</h2>
          <div className='grid md:grid-cols-2'>
            {videoData.map(video => (
              <div key={video.id} className='md:px-4 py-2'>
                <iframe
                  className='round sh w-full'
                  height='200'
                  src={video.src}
                  title={video.title}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen></iframe>
              </div>
            ))}
          </div>
        </section>
        <div className='line'></div>
        <section>
          <div className='mb-2 flex items-center justify-between'>
            <h2>Plant Growth Process</h2>
            <button onClick={() => setShowModal(true)}>Learn More</button>
          </div>
          <div className='relative grid grid-cols-1 gap-4 md:grid-cols-3'>
            {plantGrowthData.map((data, index) => (
              <div key={index} className='glassy_inline sh grid grid-cols-1 grid-rows-1 p-4'>
                <div>
                  <h3 className='mb-2 text-lg font-bold'>{data.title}</h3>
                  <p>{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {showModal && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
            onClick={handleClose}>
            <div className='glassy round sh relative z-50 flex max-h-[80vh] max-w-[90vw] flex-col p-6 backdrop-blur-lg'>
              <h3 className='head my-2'>{`Stage ${currentSlide + 1}`}</h3>
              <p className='max-h-[50vh] overflow-y-auto px-4'>
                {plantGrowthData[currentSlide].detailedContent}
              </p>

              <div className='mt-4 flex items-center justify-center gap-x-4'>
                {currentSlide > 0 && (
                  <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                    <img src='/arrow-up-solid.svg' alt='Previous' className='icon -rotate-90' />
                  </button>
                )}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === currentSlide ? 'bg-primary' : 'bg-secondary'}`}
                  />
                ))}
                {currentSlide < 2 && (
                  <button onClick={() => setCurrentSlide(currentSlide + 1)}>
                    <img src='/arrow-up-solid.svg' alt='Next' className='icon -rotate-[270deg]' />
                  </button>
                )}
                <button className='cancel btn_r' onClick={() => setShowModal(false)}>
                  <img src='/xmark-solid.svg' alt='Close' />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
