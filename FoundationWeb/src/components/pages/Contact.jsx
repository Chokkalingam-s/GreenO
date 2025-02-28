export default function ContactUs() {
  return (
    <div className='center min-h-screen'>
      <div className='w-full max-w-lg p-8 glassy sh rounded-2xl max-h-[60vh]'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
          Contact Us
        </h2>
        <form className='space-y-4'>
          <div>
            <label className='block text-gray-700'>Name</label>
            <input
              type='text'
              className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
              placeholder='Enter your name'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Message</label>
            <textarea
              className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none'
              rows='4'
              placeholder='Your Message'></textarea>
          </div>
          <button type='submit' className='w-full'>
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
