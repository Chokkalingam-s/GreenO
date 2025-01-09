export default function GreenOPage() {
  return (
    <div className='main-container'>
      <div className='banner relative text-center text-white'>
        <div className='banner-overlay absolute inset-0 bg-black opacity-50'></div>
        <div className='top-bar flex justify-between items-center px-4 py-2 bg-gray-800 text-sm'>
          <div className='flex items-center gap-2'>
            <i className='fas fa-envelope-open-text'></i>
            <a href='mailto:info@gmail.com' className='hover:underline'>
              info@gmail.com
            </a>
          </div>
          <div className='logo'></div>
          <div className='flex items-center gap-2'>
            <i className='fas fa-phone-alt'></i>
            <a href='tel:+91984784937' className='hover:underline'>
              +91984784937
            </a>
          </div>
        </div>
        <div className='banner-content relative z-10 p-10'>
          <h1 className='text-3xl font-bold'>
            Plant a tree today for a better tomorrow!
          </h1>
          <a
            href='http://localhost:5173/'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
            Join us now
          </a>
        </div>
      </div>

      <div className='service-section py-12'>
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold'>Art of Planting</h2>
          <p>
            Plant a seed of kindness, water it with love, and watch it grow!
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
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
              desc: 'Finally ends up with a beautiful tree and contribute to this world!'
            }
          ].map((item, index) => (
            <div key={index} className='text-center'>
              <b className='text-4xl'>{item.icon}</b>
              <h3 className='text-xl font-semibold mt-2'>{item.title}</h3>
              <p className='mt-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='best-class-club py-12 bg-gray-100'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='p-6'>
            <h2 className='text-2xl font-bold'>An Initiative...</h2>
            <p className='mt-4'>
              The One Student One Tree Project is a global initiative that
              encourages students to plant trees. The project aims to raise
              awareness of the importance of trees and to help restore forests.
            </p>
            <ul className='list-disc pl-6 mt-4'>
              <li>Helps to restore forests</li>
              <li>Teaches students about the importance of trees</li>
              <li>Fun and rewarding experience</li>
            </ul>
            <p className='mt-4'>
              Overall, the One Student One Tree Project is a valuable initiative
              that has many benefits for the environment, students, and
              communities.
            </p>
          </div>
          <div
            className='best-class-club-img bg-cover bg-center'
            style={{
              backgroundImage: 'url("https://via.placeholder.com/400")'
            }}></div>
        </div>
      </div>

      <div className='advantages-section py-12'>
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold'>One Student One Tree</h2>
          <p>One student, one tree. Together, we can make a difference.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {[
            {
              title: 'Awareness and education',
              desc: 'Raise awareness about the importance of trees and the need to protect the environment.'
            },
            {
              title: 'Mental health',
              desc: 'Spending time in nature has been shown to improve mental health.'
            },
            {
              title: 'Volunteerism',
              desc: 'Encourages students to volunteer their time to plant trees and to help care for them.'
            },
            {
              title: 'Civic responsibility',
              desc: 'Volunteering to plant trees and care for them can help students to develop a sense of civic responsibility.'
            },
            {
              title: 'Community engagement',
              desc: 'The project can help to build community spirit by bringing students together to plant trees and care for them.'
            },
            {
              title: 'Green environment',
              desc: 'Makes the way for clean and green environment.'
            }
          ].map((item, index) => (
            <div key={index} className='p-4 border rounded shadow'>
              <h3 className='text-lg font-semibold'>{item.title}</h3>
              <p className='mt-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='yogaPlace-section py-12 bg-gray-100'>
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold'>Progress and Evolution</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {[
            {
              img: 'img/stu.jpg',
              title: 'Student',
              desc: 'Starts with a small group of students.'
            },
            {
              img: 'img/clg.jpg',
              title: 'College',
              desc: 'Across various colleges in the community.'
            },
            {
              img: 'https://via.placeholder.com/150',
              title: 'Across State',
              desc: 'Across many states in the country.'
            },
            {
              img: 'https://via.placeholder.com/150',
              title: 'Entire Country',
              desc: 'Ends up with the Green Nation'
            }
          ].map((item, index) => (
            <div key={index} className='text-center'>
              <img
                src={item.img}
                alt={item.title}
                className='w-full h-32 object-cover rounded'
              />
              <h3 className='text-lg font-semibold mt-4'>{item.title}</h3>
              <p className='mt-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='join-us-section py-12 text-center'>
        <h2 className='text-2xl font-bold'>Start from today!!</h2>
        <p className='mt-2'>Don't wait until tomorrow. Plant the seed today.</p>
        <a
          href='http://localhost:5173/'
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
          Join us now
        </a>
        <p className='mt-4'>
          or Call:{' '}
          <a href='tel:+91984784937' className='text-green-600 hover:underline'>
            +91984784937
          </a>
        </p>
      </div>

      <footer className='py-4 bg-gray-800 text-white text-center'>
        <p>&copy; 2023 All Rights Reserved. Created by SH</p>
        <div className='mt-2'>
          <a href='#' className='mx-2 hover:underline'>
            Facebook
          </a>
          <a href='#' className='mx-2 hover:underline'>
            Twitter
          </a>
          <a href='#' className='mx-2 hover:underline'>
            Google+
          </a>
          <a href='#' className='mx-2 hover:underline'>
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}
