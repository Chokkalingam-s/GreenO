import {useState, useEffect} from 'react'

export default function StudentHome() {
  const [activeSDG, setActiveSDG] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSDG(prev => (prev === 15 ? 13 : 15))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className='homePage'>
      <div className='glassy round sh p-2'>
        <section className='py-6 text-center tracking-wide'>
          <h2 className='mb-2 text-3xl font-semibold'>
            {activeSDG === 15 ? '🌍' : '🌏'} Sustainable Development Goal {activeSDG}
          </h2>
          <p className='mx-auto max-w-2xl text-lg'>
            <strong>{activeSDG === 15 ? '"Life on Land"' : '"Climate Action"'}</strong> focuses on
            {activeSDG === 15
              ? ' protecting terrestrial ecosystems, forests, and reducing land degradation.'
              : ' urgent actions to combat climate change and foster resilience.'}
          </p>
        </section>
        <section className='mx-auto grid grid-cols-1 items-center justify-center justify-items-center md:grid-cols-[78%_20%]'>
          <div>
            <h1 className='mb-4 text-2xl font-semibold'>Green O Initiative</h1>
            <p className='text-md leading-relaxed'>
              Empowering students to nurture and grow trees as part of their academic journey.
              Together, let&apos;s make the planet greener, cleaner, and healthier—one student, one
              tree at a time.
            </p>
          </div>
          <img src='/GreenO_Logo.png' alt='website logo' />
        </section>
      </div>

      <section className='about'>
        <div>
          <h2>
            About <span className='font-semibold italic'>GreenO</span>
          </h2>
          <p>
            The <span>Green O Initiative</span> blends education with environmental sustainability.
            By planting and nurturing trees, students contribute to ecological conservation and
            mitigate climate change.
          </p>
          <p>
            Each tree symbolizes hope, resilience, and a commitment to a greener future, fostering
            responsibility and ecological mindfulness in every participant.
          </p>
        </div>
        <img src='/home.svg' alt='Green O Initiative' />
      </section>

      <section className='about'>
        <div>
          <h2>How It Works</h2>
          <ol>
            <li>Enable location access for accurate tree monitoring.</li>
            <li>Upload a photo of your tree each semester to track growth.</li>
            <li>Monitor progress via your student dashboard.</li>
            <li>Receive recognition for contributing to sustainability!</li>
          </ol>
        </div>
        <img src='/homeLast.svg' alt='Green O Initiative' />
      </section>
    </main>
  )
}
