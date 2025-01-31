import {Footer} from '../../exp_comp'

export default function GreenOPage() {
   window.scrollTo(0, 0)
  return (
    <div>
      <div className='relative top-16 z-10 text-center h-[50vh] text-white overflow-hidden center flex-col'>
        <h1 className='text-4xl font-semibold mb-4 animate-bounce'>
          Plant a tree today for a better tomorrow!
        </h1>
        <a href="https://greeno.cgfoundation.in">
  <button>Join us now</button>
</a>

        <img
          src='https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='background image'
          className='w-full absolute top-0 -z-10 object-cover h-full'
        />
        <div class='absolute inset-0 bg-black opacity-50 -z-10'></div>
      </div>

      <section className='grid grid-cols-1 md:grid-cols-2 justify-items-center items-center justify-center text-center md:text-start mt-6'>
        <div className='content'>
          <h2 className='italic'>An Initiative...</h2>
          <br />
          <p>
            The
            <strong className='italic text-tertiary'>
              {' '}
              One Student One Tree Project
            </strong>{' '}
            is a global initiative that encourages students to plant trees.
            The project aims to raise awareness of the importance of trees
            and to help restore forests.
            <br />
            <br />
            <ul className='list-disc pl-10 text-start'>
              <li>Helps to restore forests</li>
              <li>Teaches students about the importance of trees</li>
              <li>Fun and rewarding experience</li>
            </ul>
            <br />
            Overall, the One Student One Tree Project is a valuable
            initiative that has many benefits for the environment,
            students, and communities.
          </p>
        </div>
        <img src='/osot.svg' className='w-10/12' />
      </section>

      <section className='bg_sect bg-cover bg-center min-h-[80vh]'>
        <div className='grid lg:grid-cols-2 lg:gap-y-6 items-center justify-items-center md:gap-x-48'>
          <div className='col-span-2 text-center'>
            <h2>One Student One Tree</h2>
            <p className='text-lg'>
              One student, one tree. Together, we can make a difference.
            </p>
          </div>
          <section className='grd_cont cont_1'>
            <div>
              <h2>🍀</h2>
              <span>
                <h3>Awareness and education</h3>
                <p>
                  Raise awareness about the importance of trees and the
                  need to protect the environment.
                </p>
              </span>
            </div>
            <div>
              <h2>🍀</h2>
              <span>
                <h3>Mental health</h3>
                <p>
                  Spending time in nature has been shown to improve mental
                  health.
                </p>
              </span>
            </div>
            <div>
              <h2>🍀</h2>
              <span>
                <h3>Volunteerism</h3>
                <p>
                  Encourages students to volunteer their time to plant
                  trees and to help care for them.
                </p>
              </span>
            </div>
          </section>
          <section className='grd_cont cont_2'>
            <div>
              <span>
                <h3>Civic responsibility</h3>
                <p>
                  Volunteering to plant trees and care for them can help
                  students to develop a sense of civic responsibility.
                </p>
              </span>
              <h2>🍀</h2>
            </div>
            <div>
              <span>
                <h3>Community engagement</h3>
                <p>
                  The project can help to build community spirit by
                  bringing students together to plant trees and care for
                  them.
                </p>
              </span>
              <h2>🍀</h2>
            </div>
            <div>
              <span>
                <h3>Green environment</h3>
                <p>Makes the way for clean and green environment.</p>
              </span>
              <h2>🍀</h2>
            </div>
          </section>
        </div>
      </section>

      <section className='text-center'>
        <h2 className='mb-10'>Progress and Evolution</h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-16'>
          {[
            {
              img: '/img/student.jpg',
              title: 'Student',
              desc: 'Starts with a small group of students.'
            },
            {
              img: '/img/clg.jpg',
              title: 'College',
              desc: 'Across various colleges in the community.'
            },
            {
              img: '/img/state.jpeg',
              title: 'Across State',
              desc: 'Across many states in the country.'
            },
            {
              img: '/img/country.jpg',
              title: 'Entire Country',
              desc: 'Ends up with the Green Nation.'
            }
          ].map((item, index) => (
            <div key={index} className='card text-center'>
              <div className='w-24 h-24 mx-auto round out'>
                <img
                  src={item.img}
                  alt={item.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className='center text-center flex-col'>
        <div className='mb-16'>
          <h2>The Art of Planting</h2>
          <p>
            Plant a seed of kindness, water it with love, and watch it
            grow!
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16'>
          {[
            {
              icon: '🌱',
              title: 'Seeding',
              desc: 'Mark the rows where you want to plant and sow the seeds.'
            },
            {
              icon: '💦',
              title: 'Watering',
              desc: 'Water the seeds regularly, especially during hot weather.'
            },
            {
              icon: '🌳',
              title: 'Grown Tree',
              desc: 'Finally ends up with a beautiful tree and contributes to this world!'
            }
          ].map((item, index) => (
            <div key={index} className='card'>
              <div className='text-6xl'>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className='center flex-col last'>
        <h2>Start from Today!</h2>
        <p className='mt-4'>
          Don't wait until tomorrow. Plant the seed today.
        </p>
        <br />
        <a href="https://greeno.cgfoundation.in">
  <button>Join us now</button>
</a>

      </section>
      <Footer />
    </div>
  )
}
