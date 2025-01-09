import { Card, Footer } from '../../exp_comp'
import { focusAreas } from './data'

export default function HomePage() {
  return (
    <div>
      <section className='bg-blue-500 text-white py-16 text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          Empowering Lives, Sustaining Futures
        </h1>
        <p className='text-lg mb-8'>
          Welcome to CG Foundation, where impactful change meets innovative
          action. Join us in building resilient communities and fostering
          inclusive growth—because every small effort counts towards a giant
          leap forward.
        </p>
        <button className='bg-white text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100'>
          Join Us in Making a Difference
        </button>
      </section>

      <section className='py-16 bg-gray-100'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8'>Domains of Change</h2>
          <p className='text-lg mb-12'>
            We believe in targeted actions to maximize impact.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {focusAreas.map((area, index) => (
              <Card key={index} title={area.title} content={area.content} />
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-white text-center'>
        <h2 className='text-3xl font-bold mb-8'>
          Mission to Inspire and Impact
        </h2>
        <p className='text-lg mb-8'>
          At CG Foundation, our mission is to inspire positive change through
          holistic development. Rooted in the principles of the United Nations
          Sustainable Development Goals (SDGs), we aim to foster innovation,
          uplift marginalized communities, and promote sustainable solutions to
          preserve our environment.
        </p>
        <button className='bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600'>
          Be a Part of the Mission
        </button>
      </section>

      <section className='py-16 bg-gray-100 text-center'>
        <h2 className='text-3xl font-bold mb-8'>
          Your Generosity Can Create Wonders
        </h2>
        <p className='text-lg mb-8'>
          The smallest act of kindness can lead to the biggest change. Every
          contribution you make, be it your time, resources, or ideas, goes a
          long way in transforming lives. Step forward, give back, and join
          hands to leave an indelible mark of hope and positivity.
        </p>
        <div className='flex justify-center space-x-6'>
          <button className='bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600'>
            Contribute Now
          </button>
          <button className='bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600'>
            Volunteer With Us
          </button>
        </div>
      </section>
      <Footer />
    </div>
  )
}
