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
    <div className='homePage'>
      <section className='text-center py-6 tracking-wide'>
        <h2 className='text-3xl font-semibold mb-2'>
          {activeSDG === 15 ? '🌍' : '🌏'}
          Sustainable Development Goal
          {activeSDG === 15 ? ' 15' : ' 13'}
        </h2>
        <p className='text-lg max-w-2xl mx-auto'>
          <strong>
            {activeSDG === 15 ? '"Life on Land" ' : '"Climate Action" '}
          </strong>
          focuses on
          {activeSDG === 15
            ? ' protecting terrestrial ecosystems, forests, and reducing land degradation.'
            : ' urgent actions to combat climate change and foster resilience.'}
        </p>
      </section>
      <section className='flex flex-col items-center text-center py-8 backdrop-blur-lg bg-black/40 round'>
        <h1 className='text-2xl font-bold mb-4'>🌱 Green O Initiative</h1>
        <p className='text-md leading-relaxed text-justify px-4 '>
          Empowering students to nurture and grow trees as part of their
          academic journey. Together, let&apos;s make the planet greener,
          cleaner, and healthier—one student, one tree at a time.
        </p>
      </section>
      <section className='about'>
        <span className='pl-6'>
          <h2>
            About <span className='text-secondary'>GreenO</span>
          </h2>
          <p>
            The <strong>Green O Initiative</strong> blends education with
            environmental sustainability. By planting and nurturing trees
            during their academic journey, students can contribute to
            <strong> ecological conservation</strong> and gain a deeper
            understanding of their role in mitigating climate change.
          </p>
          <p>
            Each tree symbolizes hope, resilience, and a commitment to a
            brighter, greener future. The program nurtures a spirit of
            responsibility and ecological mindfulness in every participant.
          </p>
        </span>
        <img src='/home.svg' alt='Green O Initiative' />
      </section>

      <section className='about'>
        <span>
          <h2>How It Works</h2>
          <ol className='list-disc list-inside text-left my-4'>
            <li>
              Enable location access for accurate tree monitoring and
              accountability.
            </li>
            <li>
              Upload a photo of your tree at the start of every semester to
              track its progress.
            </li>
            <li>
              Monitor and review your growth journey via your student
              dashboard.
            </li>
            <li>
              Receive recognition for contributing towards a sustainable
              planet!
            </li>
          </ol>
        </span>
        <img src='/homeLast.svg' alt='Green O Initiative' />
      </section>
    </div>
  )
}
