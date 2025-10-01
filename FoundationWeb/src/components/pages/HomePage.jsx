import {focusAreas} from './data'
import {useNavigate} from 'react-router-dom'
import {missionVisionItems, greenOItems} from './data'
import {lazy} from 'react'
const About = lazy(() => import('../About'))
const AboutUs = lazy(() => import('./AboutUs'))
const Card = lazy(() => import('../Card'))
const Item = lazy(() => import('../Item'))
const Footer = lazy(() => import('../Footer'))

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <section className='relative grid md:h-[85vh] grid-cols-1 md:grid-cols-[65%_1fr] items-center px-6 md:px-10'>
        {/* Content */}
        <aside className='relative z-20 flex flex-col justify-center py-8 md:py-0'>
          <AboutUs />
        </aside>

        {/* Visual column */}
        <div className='relative z-10 flex items-center justify-center md:justify-end py-8 md:py-0'>
          <div className='relative'>
            {/* Logo */}
            <img
              src='/logo.png'
              alt='CG Foundation logo'
              className='w-56 md:w-80 filter hue-rotate-260 saturate-200 drop-shadow-lg'
            />

            {/* Tagline chip */}
            <div className='mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur'>
              <span className='h-2 w-2 rounded-full bg-green-600 animate-pulse' />
              <span className='text-sm font-medium text-gray-700'>
                Together for Change
              </span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className='grad_txt text-3xl font-bold'>
          Our impact spans across
        </h2>
        <p className='mb-8 text-lg'>
          We believe in targeted actions to maximize impact.
        </p>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {focusAreas.map((area, index) => (
            <Card
              key={index}
              title={area.title}
              content={area.content}
              disabled={index < 1 ? false : true}
              onClick={() => {
                navigate(area.url)
                window.scrollTo(0, 0)
              }}
            />
          ))}
        </div>
      </section>

      <section className='py-10'>
        <h2 className='grad_txt mb-6 text-2xl font-bold'>
          Our Mission & Vision
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {missionVisionItems.map((item, index) => (
            <Card
              key={index}
              content={item.content}
              showBtn={false}
              fixed={false}
              img={'/svgviewer-output.svg'}
            />
          ))}
        </div>
      </section>

      <section className='timeline last hidden md:grid'>
        <div className='grid gap-x-2 md:grid-cols-[20%_26%_28%_26%]'>
          <div className='hidden md:inline'></div>
          <div className='hidden md:inline'></div>
          <Item
            classN='top1'
            title='Grow Green, Grow Together'
            content='One student, one sapling—nurturing a greener future, one tree at a time.'
          />
          <Item
            classN='top1'
            title='Geo-Verified Growth'
            content='Upload geotagged sapling photos each semester with verified images and locations.'
          />
          <h2 className='title_last grad_txt'>
            <span className='text-2xl font-bold'>
              GreenO
            </span>
            <br />
            <span className='text-xl font-medium'>
              One Student One Tree
            </span>
            <button
              className='absolute -bottom-20 left-0 text-xl font-semibold'
              onClick={() => navigate('/OSOT')}>
              Join Us
            </button>
            <div className='line'></div>
          </h2>
          <div className='hidden md:inline'></div>
          <Item
            classN='bottom'
            title='Track and Inspire Progress'
            content='Dashboards for HODs, Principals, and Admins to track rankings at department, college, and national levels.'
          />
          <Item
            classN='bottom'
            title='Nationwide Green Movement'
            content='Uniting colleges across India to create a collective environmental impact.'
          />
          <Item
            classN='bottom'
            title='Small Acts, Big Change'
            content='Every sapling planted is a step toward hope, positivity, and a greener tomorrow.'
          />
        </div>
        <img
          src='/osot.svg'
          alt='GreenO - One Student One Tree logo'
        />
      </section>

      <About
        items={greenOItems}
        title='GreenO'
        title2='One Student One Tree'
        imgSrc='/osot.svg'
        imgAlt='GreenO - One Student One Tree logo'
      />
      <Footer />
    </>
  )
}
