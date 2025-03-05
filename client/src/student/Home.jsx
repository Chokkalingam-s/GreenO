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
      <section className='h-30 h-36 text-center'>
        <h2 className='text-4xl font-bold'>
          {activeSDG === 15 ? '🌍' : '🌏'} Sustainable Development Goal {activeSDG}
        </h2>
        <p className='mx-auto mt-2 max-w-2xl text-lg'>
          <strong>{activeSDG === 15 ? '"Life on Land"' : '"Climate Action"'}</strong>
          {activeSDG === 15
            ? ' protects ecosystems, forests, and reduces land degradation.'
            : ' takes urgent action against climate change and fosters resilience.'}
        </p>
      </section>
      {[
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
      ].map(({title, content, imgSrc}) => (
        <section
          key={title}
          className='grid grid-cols-[60%_20%] items-center justify-center gap-x-6'>
          <div className='w-full justify-between text-center md:text-left'>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            {Array.isArray(content) && content[0].startsWith('🌍') ? (
              <ul className='space-y-2'>
                {content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              content.map((para, idx) => <p key={idx}>{para}</p>)
            )}
          </div>
          <img src={imgSrc} alt={title} />
        </section>
      ))}
    </main>
  )
}
