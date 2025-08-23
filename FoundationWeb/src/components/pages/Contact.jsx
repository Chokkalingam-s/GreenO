import {useState} from 'react'

const faqs = [
  {
    q: 'What is CG Foundation?',
    a: 'We are a non-profit focused on sustainability and community growth.'
  },
  {
    q: 'How can I get involved?',
    a: 'You can join as an individual, student, college, or corporate partner.'
  },
  {
    q: 'Where do donations go?',
    a: 'All contributions directly fund green initiatives and community projects.'
  }
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <div className='flex max-w-full flex-col'>
      {faqs.map((item, idx) => (
        <div key={idx}>
          <button
            onClick={() =>
              setOpen(open === idx ? null : idx)
            }
            className='flex h-14 w-full items-center justify-between text-left'
          >
            <span className='pr-4'>{item.q}</span>
            <span className='flex-shrink-0 text-xl font-bold'>
              {open === idx ? '−' : '+'}
            </span>
          </button>
          {open === idx && (
            <div className='pl-6'>
              <p className='leading-relaxed'>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ContactUs() {
  return (
    <main className='mx-auto grid min-h-screen w-11/12 grid-cols-1 items-center justify-between gap-x-6 py-14 md:grid-cols-2'>
      <aside>
        <h2 className='grad_txt mb-6 text-2xl font-bold'>
          Frequently Asked Questions
        </h2>
        <FAQ />
      </aside>

      <aside className='sh max-h-[60vh] w-full rounded-2xl border border-green-600/20 p-8 outline-2 outline-offset-2 outline-green-500/40'>
        <h2 className='grad_txt mb-6 text-2xl font-bold'>
          Contact Us
        </h2>
        <form className='contact space-y-4'>
          <input
            type='text'
            placeholder='Your name'
          />

          <div className='flex gap-4'>
            <input
              type='tel'
              placeholder='Your mobile number'
            />
            <input
              type='email'
              placeholder='Your email'
            />
          </div>

          <textarea
            rows='4'
            placeholder='Your Message'
          ></textarea>

          <button type='button'>Send Message</button>
        </form>
      </aside>
    </main>
  )
}
