export default function ContactForm() {
  return (
    <div className='center min-h-screen'>
      <div className='sh max-h-[60vh] w-full rounded-2xl border border-green-600/20 p-8 outline-2 outline-offset-2 outline-green-500/40'>
        <h2 className='grad_txt mb-6 text-2xl font-bold'>
          Contact
        </h2>
        <form className='contact space-y-4'>
          <input
            type='text'
            placeholder='Your name'
            className='w-full'
          />
          <div className='flex gap-x-2'>
            <input
              type='tel'
              placeholder='Your mobile no.'
              className='w-1/2'
            />
            <input
              type='email'
              placeholder='Your email'
              className='w-1/2'
            />
          </div>
          <textarea
            rows='4'
            placeholder='Your Message'
            className='w-full'
          ></textarea>
          <button
            type='submit'
            className='w-full'
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
