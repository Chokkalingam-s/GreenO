import { Footer } from '../../exp_comp'

export default function GreenOPage() {
  return (
    <div>
      <div className='relative top-14 z-10 text-center h-[50vh] text-white overflow-hidden center flex-col'>
        <h1 className='text-4xl font-semibold mb-4 animate-bounce'>
          Plant a tree today for a better tomorrow!
        </h1>
        <button>Join us now</button>
        <img
          src='https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='background image'
          className='w-full absolute top-0 -z-10 object-cover h-full'
        />
        <div class='absolute inset-0 bg-black opacity-50 -z-10'></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center main relative top-14'>
        <div className='content'>
          <h2 className='text-3xl font-bold text-tertiary italic'>
            An Initiative...
          </h2>
          <br />
          <p>
            The{' '}
            <strong className='italic text-tertiary'>
              One Student One Tree Project
            </strong>{' '}
            is a global initiative that encourages students to plant trees. The
            project aims to raise awareness of the importance of trees and to
            help restore forests.
            <br />
            <br />
            <ul className='list-disc pl-10'>
              <li>Helps to restore forests</li>
              <li>Teaches students about the importance of trees</li>
              <li>Fun and rewarding experience</li>
            </ul>
            <br />
            Overall, the One Student One Tree Project is a valuable initiative
            that has many benefits for the environment, students, and
            communities.
          </p>
        </div>
        <img src='/public/osot.svg' className='w-10/12' />
      </div>

      <div className='relative top-0 bg_sect bg-cover bg-center min-h-[80vh]'>
        <div className='grid lg:grid-cols-2 lg:gap-y-14 pt-4 items-center justify-items-center md:gap-x-48 w-11/12 mx-auto'>
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
                  Raise awareness about the importance of trees and the need to
                  protect the environment.
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
                  Encourages students to volunteer their time to plant trees and
                  to help care for them.
                </p>
              </span>
            </div>
          </section>
          <section className='grd_cont cont_2'>
            <div>
              <h2>🍀</h2>
              <span>
                <h3>Civic responsibility</h3>
                <p>
                  Volunteering to plant trees and care for them can help
                  students to develop a sense of civic responsibility.
                </p>
              </span>
            </div>
            <div>
              <h2>🍀</h2>
              <span>
                <h3>Community engagement</h3>
                <p>
                  The project can help to build community spirit by bringing
                  students together to plant trees and care for them.
                </p>
              </span>
            </div>
            <div>
              <h2>🍀</h2>
              <span>
                <h3>Green environment</h3>
                <p>Makes the way for clean and green environment.</p>
              </span>
            </div>
          </section>
        </div>
      </div>

      <div className='py-16'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-bold'>Progress and Evolution</h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-16'>
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
            <div
              key={index}
              className='text-center bg-white shadow-md rounded-lg p-6'>
              <div className='w-24 h-24 mx-auto overflow-hidden rounded-full border-4 border-gray-200'>
                <img
                  src={item.img}
                  alt={item.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <h3 className='text-lg font-bold mt-4 text-gray-700'>
                {item.title}
              </h3>
              <p className='mt-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='py-16'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-extrabold text-tertiary'>
            The Art of Planting
          </h2>
          <p>
            Plant a seed of kindness, water it with love, and watch it grow!
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
            <div
              key={index}
              className='p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 text-center'>
              <div className='text-6xl'>{item.icon}</div>
              <h3 className='text-xl font-semibold mt-4 text-green-700'>
                {item.title}
              </h3>
              <p className='mt-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='join-us-section py-16 text-center bg-green-50'>
        <h2 className='text-3xl font-bold text-green-700'>Start from Today!</h2>
        <p className='mt-4'>Don't wait until tomorrow. Plant the seed today.</p>
        <br />
        <button>Join us now</button>
      </div>
      <Footer />
    </div>
  )
}
