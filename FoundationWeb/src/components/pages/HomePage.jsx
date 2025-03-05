import {Item, Card, Footer, Timeline} from '../../exp_comp'
import {focusAreas} from './data'
import {useNavigate} from 'react-router-dom'
import {missionVisionItems, greenOItems} from './data'
import About from '../About'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <section className='flex h-screen'>
        <span className='absolute top-1/2 z-20 -translate-y-1/2 space-y-4 md:left-20'>
          <h1 className='mb-10 text-5xl font-bold'>CG Foundation</h1>
        </span>
        <img
          src='/home1.svg'
          alt='foundation background'
          className='absolute bottom-0 object-cover md:-right-60 md:-bottom-6 md:h-4/5 md:w-9/12'
        />
      </section>

      <section>
        <h2 className='mb-8 text-3xl font-bold'>Domains of Change</h2>
        <p className='mb-12 text-lg'>We believe in targeted actions to maximize impact.</p>
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

      <section className='timeline hidden md:grid'>
        <div className='relative grid w-full grid-cols-3'>
          <div className='hidden md:inline'></div>
          <Item
            classN='top'
            content='To empower communities through innovative and sustainable solutions.'
          />
          <Item
            classN='top'
            content='To create a world where sustainable development drives inclusive growth.'
          />
          <span className='title-container'>
            <h2 className='title'>
              <div>Mission</div>
              <div>&</div>
              <div>Vision</div>
            </h2>
            <div className='line'></div>
          </span>

          <div className='hidden md:inline'></div>
          <Item
            classN='bottom1'
            content='To promote equality, education, and environmental preservation for a better tomorrow.'
          />
          <Item
            classN='bottom1'
            content='To be a catalyst for positive change across environment, education, and empowerment.'
          />
        </div>
        <img src='/mission&vision.svg' alt='icon for mission vision' />
      </section>

      <section className='timeline last hidden md:grid'>
        <div className='grid md:grid-cols-[20%_26%_28%_26%]'>
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
          <h2 className='title_last'>
            GreenO <br />
            <span className='text-xl'>One Student One Tree</span>
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
        <img src='/osot.svg' alt='GreenO - One Student One Tree logo' />
      </section>

      <Timeline
        items={missionVisionItems}
        title='Mission and Vision'
        imgSrc='/mission&vision.svg'
        imgAlt='Icon for Mission and Vision'
      />
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
