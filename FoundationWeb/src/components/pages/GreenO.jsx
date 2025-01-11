import { Footer } from '../../exp_comp'

export default function GreenOPage() {
  return (
    <div className='main-container'>
      <div className='banner relative text-center text-white h-[400px] bg-green-300'>
        <div className='banner-overlay absolute inset-0 bg-black opacity-40'></div>
        <div className='banner-content relative z-10 p-10 flex flex-col justify-center items-center h-full'>
          <h1 className='text-4xl font-bold mb-4 animate-bounce'>
            Plant a tree today for a better tomorrow!
          </h1>
          <a
            href='/'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 px-8 py-3 bg-green-600 text-white text-lg rounded hover:bg-green-500 transition duration-300'>
            Join us now
          </a>
        </div>
      </div>

      <div className='service-section py-16 bg-gray-50'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-extrabold text-green-700'>
            The Art of Planting
          </h2>
          <p className='text-gray-600'>
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
              className='bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 text-center'>
              <div className='text-6xl'>{item.icon}</div>
              <h3 className='text-xl font-semibold mt-4 text-green-700'>
                {item.title}
              </h3>
              <p className='mt-2 text-gray-600'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='best-class-club py-16 bg-gray-100'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 md:px-16'>
          <div>
            <h2 className='text-3xl font-bold text-green-700'>
              An Initiative...
            </h2>
            <p className='mt-4 text-gray-600'>
              The One Student One Tree Project is a global initiative that
              encourages students to plant trees. The project aims to raise
              awareness of the importance of trees and to help restore forests.
            </p>
            <ul className='list-disc pl-6 mt-4 text-gray-600'>
              <li>Helps to restore forests</li>
              <li>Teaches students about the importance of trees</li>
              <li>Fun and rewarding experience</li>
            </ul>
            <p className='mt-4 text-gray-600'>
              Overall, the One Student One Tree Project is a valuable initiative
              that has many benefits for the environment, students, and
              communities.
            </p>
          </div>
          <div
            className='best-class-club-img bg-cover bg-center rounded-lg shadow-lg h-[300px]'
            style={{
              backgroundImage: 'url("/phoneSapling.png")'
            }}></div>
        </div>
      </div>

      <div className='advantages-section py-16 bg-white'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-extrabold text-green-700'>
            One Student One Tree
          </h2>
          <p className='text-lg text-gray-600'>
            One student, one tree. Together, we can make a difference.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-16'>
          {[
            {
              title: 'Awareness and Education',
              desc: 'Raise awareness about the importance of trees and the need to protect the environment.'
            },
            {
              title: 'Mental Health',
              desc: 'Spending time in nature has been shown to improve mental health.'
            },
            {
              title: 'Volunteerism',
              desc: 'Encourages students to volunteer their time to plant trees and to help care for them.'
            },
            {
              title: 'Civic Responsibility',
              desc: 'Volunteering to plant trees and care for them can help students to develop a sense of civic responsibility.'
            },
            {
              title: 'Community Engagement',
              desc: 'The project can help to build community spirit by bringing students together to plant trees and care for them.'
            },
            {
              title: 'Green Environment',
              desc: 'Makes the way for a clean and green environment.'
            }
          ].map((item, index) => (
            <div
              key={index}
              className='p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300'>
              <h3 className='text-xl font-bold text-green-600'>{item.title}</h3>
              <p className='mt-4 text-gray-600'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='yogaPlace-section py-16 bg-gray-100'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-bold text-gray-800'>
            Progress and Evolution
          </h2>
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
              <p className='mt-2 text-gray-600'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='join-us-section py-16 text-center bg-green-50'>
        <h2 className='text-3xl font-bold text-green-700'>Start from Today!</h2>
        <p className='mt-4 text-gray-600'>
          Don't wait until tomorrow. Plant the seed today.
        </p>
        <br />
        <a
          href='/'
          target='_blank'
          rel='noopener noreferrer'
          className='mt-6 px-8 py-3 bg-green-600 text-white text-lg rounded hover:bg-green-500 transition duration-300'>
          Join us now
        </a>
      </div>

      <Footer />
    </div>
  )
}
