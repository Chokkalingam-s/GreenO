import {Item, Card, Footer, Timeline} from '../../exp_comp'
import {focusAreas} from './data'
import {useNavigate} from 'react-router-dom'
import {missionVisionItems, greenOItems} from './data'
import About from '../About'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <section className='h-screen flex'>
        <span className='absolute top-1/2 -translate-y-1/2 md:left-20 space-y-4 z-20'>
          <h1 className='text-5xl font-bold mb-10'>CG Foundation</h1>
          <h1 className='text-4xl font-semibold md:w-2/6 w-1/2 border-b-2 pb-2 border-tertiary'>
            About Us
          </h1>
          <p className='content'>
            Welcome to CG Foundation, where impactful change meets
            innovative action. Our initiatives are crafted with passion,
            purpose, and a vision to create a sustainable future for all.
            Join us in building resilient communities and fostering
            inclusive growth—because every small effort counts towards a
            giant leap forward.
          </p>
        </span>
        <img
          src='/home1.svg'
          alt='foundation background'
          className='md:w-9/12 md:h-4/5 absolute bottom-0 md:-bottom-6 md:-right-60 object-cover'
        />
      </section>

      <section>
        <h2 className='text-3xl font-bold mb-8'>Domains of Change</h2>
        <p className='text-lg mb-12'>
          We believe in targeted actions to maximize impact.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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

      <section className='timeline md:grid hidden'>
        <div className='relative w-full grid grid-cols-3'>
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

      <section className='timeline md:grid hidden last'>
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
              className='absolute left-0 -bottom-20 text-xl font-semibold'
              onClick={() => navigate('/OneStudentOneTree')}>
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
