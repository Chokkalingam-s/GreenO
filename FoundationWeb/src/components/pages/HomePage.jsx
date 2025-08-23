import {Item, Card, Footer, Timeline} from '../../exp_comp'
import {focusAreas} from './data'
import {useNavigate} from 'react-router-dom'
import {missionVisionItems, greenOItems} from './data'
import About from '../About'
import AboutUs from './AboutUs'
import HorizontalTimeline from '../Tree'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <section className='flex h-screen'>
        <aside className='flex flex-col justify-center'>
          {/* <h1 className='mb-4 grad_txt text-5xl font-semibold '>
            CG Foundation
          </h1>*/}
          <AboutUs />
        </aside>
        <img
          src='/home1.svg'
          alt='foundation background'
          className='absolute bottom-0 object-cover md:-right-60 md:-bottom-6 md:h-4/5 md:w-9/12'
        />
      </section>

      <section>
        <h2 className='grad_txt text-center text-3xl font-bold'>
          Domains of Change
        </h2>
        <p className='mb-8 text-center text-lg'>
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
        <h2 className='grad_txt mb-6 text-center text-2xl font-bold'>
          Our Mission & Vision
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {missionVisionItems.map((item, index) => (
            <Card
              key={index}
              content={item.content}
              showBtn={false}
              fixed={false}
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
              onClick={() => navigate('/OSOT')}
            >
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
