import {useState} from 'react'
import {plantGrowthData, videoData} from '../exported_data'
import {useOverlay} from '../components/OverlayContext'

export default function Resource() {
  const {showOverlay} = useOverlay()
  const [, setCurrentSlide] = useState(0)

  const openModal = index => {
    setCurrentSlide(index)
    showOverlay(
      <div className='flex flex-col p-2'>
        <h3 className='head my-2'>{`Stage ${index + 1}`}</h3>
        <p className='max-h-[50vh] overflow-y-auto px-4'>
          {plantGrowthData[index].detailedContent}
        </p>
        <div className='mt-4 flex items-center justify-center gap-x-4'>
          {index > 0 && (
            <button onClick={() => openModal(index - 1)}>
              <img src='/arrow-up-solid.svg' alt='Previous' className='icon -rotate-90' />
            </button>
          )}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${i === index ? 'bg-primary' : 'bg-secondary'}`}
            />
          ))}
          {index < 2 && (
            <button onClick={() => openModal(index + 1)}>
              <img src='/arrow-up-solid.svg' alt='Next' className='icon -rotate-[270deg]' />
            </button>
          )}
        </div>
      </div>
    )
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
              <div key={video.id} className='py-2 md:px-4'>
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
            <button onClick={() => openModal(0)}>Learn More</button>
          </div>
          <div className='grid gap-4 md:grid-cols-3'>
            {plantGrowthData.map((data, index) => (
              <div key={index} className='glassy_inline sh round p-4'>
                <h3 className='mb-2 text-lg font-bold'>{data.title}</h3>
                <p>{data.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
