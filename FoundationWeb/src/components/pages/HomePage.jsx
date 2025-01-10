import { Card, Footer } from '../../exp_comp'
import { focusAreas } from './data'

export default function HomePage() {
  return (
    <>
      <section className='h-screen flex'>
        <span className='absolute top-1/2 -translate-y-1/2 left-20 space-y-4 z-20'>
          <h1 className='text-5xl font-bold mb-10'>CG Foundation</h1>
          <h1 className='text-4xl font-semibold w-2/6 border-b-2 pb-2 border-tertiary'>
            About Us
          </h1>
          <p className='content'>
            Welcome to CG Foundation, where impactful change meets innovative
            action. Our initiatives are crafted with passion, purpose, and a
            vision to create a sustainable future for all. Join us in building
            resilient communities and fostering inclusive growth—because every
            small effort counts towards a giant leap forward.
          </p>
        </span>
        <img
          src='/home1.svg'
          alt='foundation background'
          className='w-9/12 h-4/5 absolute -bottom-6 -right-60 object-cover'
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
            />
          ))}
        </div>
      </section>

      <section className='section'>
        <div className='sect'>
          <h2>Mission and Vision</h2>
          <p className='content'>
            At CG Foundation, our mission is to inspire positive change through
            holistic development. Rooted in the principles of the United Nations
            Sustainable Development Goals (SDGs), we aim to foster innovation,
            uplift marginalized communities, and promote sustainable solutions
            to preserve our environment.
          </p>
          <div className='flex justify-end'>
            <button>Be a Part</button>
          </div>
        </div>
        <img src='/mission&vision.svg' alt='placeholder' />
      </section>

      <section className='section'>
        <div className='sect'>
          <h2>One Student, One Tree.</h2>
          <p className='content'>
            The smallest act of kindness can lead to the biggest change. Every
            contribution you make, be it your time, resources, or ideas, goes a
            long way in transforming lives. Step forward, give back, and join
            hands to leave an indelible mark of hope and positivity.
          </p>
          <div className='flex justify-end gap-x-6'>
            <button>Contribute Now</button>
            <button>Volunteer With Us</button>
          </div>
        </div>
        <img src='/osot.svg' alt='placeholder' />
      </section>
      <Footer />
    </>
  )
}
