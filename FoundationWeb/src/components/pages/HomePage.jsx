import {Branch, Card, Footer} from '../../exp_comp'
import {focusAreas} from './data'
import {useNavigate} from 'react-router-dom'
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

      <section className='timeline'>
        <div className='relative w-full grid grid-cols-3'>
          <div className='hidden md:inline'></div>
          <div className='item'>
            <Branch />
            <p>
              To empower communities through innovative and sustainable
              solutions.
            </p>
          </div>
          <div className='item'>
            <Branch />
            <p>
              To create a world where sustainable development drives
              inclusive growth.
            </p>
          </div>
          <h2 className='title'>Mission and Vision</h2>
          <div className='hidden md:inline'></div>
          <div className='item1'>
            <Branch />
            <p>
              To promote equality, education, and environmental
              preservation for a better tomorrow.
            </p>
          </div>
          <div className='item1'>
            <Branch />
            <p>
              To be a catalyst for positive change across environment,
              education, and empowerment.
            </p>
          </div>
        </div>
        <img src='/mission&vision.svg' alt='icon for mission vision' />
      </section>

      <section className='timeline'>
        <div className='relative w-full grid md:grid-cols-[20%_26%_28%_26%]'>
          <div className='hidden md:inline'></div>
          <div className='hidden md:inline'></div>
          <div className='item3'>
            <Branch />
            <p>
              One student, one sapling—building a sustainable future, one
              tree at a time.
            </p>
            <h3>Grow Green, Grow Together</h3>
          </div>
          <div className='item3'>
            <Branch />
            <p>
              Upload geotagged sapling photos each semester with
              authenticity ensured through image and location checks.
            </p>
            <h3>Geo-Verified Growth</h3>
          </div>

          <h2 className='title_last'>
            GreenO <br />
            <span className='text-xl'>One Student One Tree</span>
          </h2>
          <div className='hidden md:inline'></div>
          <div className='item1'>
            <Branch />
            <h3>Track and Inspire Progress</h3>
            <p>
              Dashboards for HODs, Principals, and Admins to monitor
              department, college, and national rankings.
            </p>
          </div>
          <div className='item1'>
            <Branch />
            <h3>Nationwide Green Movement</h3>
            <p>
              Uniting colleges across India to create a collective
              environmental impact.
            </p>
          </div>
          <div className='item1'>
            <Branch />
            <h3>Small Acts, Big Change</h3>
            <p>
              Every sapling planted is a step toward hope, positivity, and
              a greener tomorrow.
            </p>
          </div>
        </div>
        <img src='/osot.svg' alt='GreenO - One Student One Tree logo' />
      </section>
      <Footer />
    </>
  )
}
