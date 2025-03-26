import {useState, useEffect} from 'react'

export default function StudentHome() {
  const [activeSDG, setActiveSDG] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSDG(prev => (prev === 15 ? 13 : 15))
    }, 7_000)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    {
      title: 'Green O Initiative',
      content: [
        "Empowering students to nurture and grow trees as part of their academic journey. Together, let's make the planet greener, cleaner, and healthier—one student, one tree at a time."
      ],
      imgSrc: '/GreenO_Logo.png'
    },
    {
      title: 'About GreenO',
      content: [
        'The Green O Initiative blends education with environmental sustainability. By planting and nurturing trees, students contribute to ecological conservation and mitigate climate change.',
        'Each tree symbolizes hope, resilience, and a commitment to a greener future, fostering responsibility and ecological mindfulness in every participant.'
      ],
      imgSrc: '/home.svg'
    },
    {
      title: 'How It Works',
      content: [
        '🌍 Enable location access for accurate tree monitoring.',
        '📸 Upload a photo of your tree each semester to track growth.',
        '📊 Monitor progress via your student dashboard.',
        '🏆 Receive recognition for contributing to sustainability!'
      ],
      imgSrc: '/homeLast.svg'
    }
  ]

  return (
    <section className='mx-auto my-10 max-w-screen-lg flex-col px-4'>
      <header className='h-44 text-center md:mt-6 md:h-32'>
        <h2 className='text-3xl font-bold tracking-wide'>
          {activeSDG === 15 ? '🌍' : '🌏'} Sustainable Development Goal {activeSDG}
        </h2>
        <p className='mx-auto mt-2 max-w-2xl text-lg'>
          <strong>{activeSDG === 15 ? '"Life on Land"' : '"Climate Action"'}</strong>
          {activeSDG === 15
            ? ' protects ecosystems, forests, and reduces land degradation.'
            : ' takes urgent action against climate change and fosters resilience.'}
        </p>
      </header>
      <div className='mb-10 grid gap-4 md:mb-0'>
        {sections.map(({title, content, imgSrc}, index) => (
          <article
            key={title}
            className={`flex flex-col-reverse items-center md:flex-row ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } glassy animate-fadeIn round sh gap-6 px-6 py-4 text-justify`}>
            <div className='flex-1 text-center md:text-left'>
              <h2 className='mb-4 text-left text-2xl font-semibold tracking-wide'>
                {title}
              </h2>
              {Array.isArray(content) && content[0].startsWith('🌍') ? (
                <ul className='space-y-2'>
                  {content.map((item, idx) => (
                    <li key={idx} className='text-left'>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                content.map((para, idx) => (
                  <p key={idx} className='mb-4 text-left'>
                    {para}
                  </p>
                ))
              )}
            </div>
            <div className='flex flex-1 justify-center'>
              <img src={imgSrc} alt={title} className='w-10/12 max-w-full md:w-3/4' />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
