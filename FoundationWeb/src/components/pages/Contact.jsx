import {useState} from 'react'

const faqs = [
  {
    q: 'What is CG Foundation?',
    a: 'CG Foundation is a non-profit organization dedicated to creating sustainable impact in the areas of environment, education, healthcare, women empowerment, livelihood, and child welfare across India.'
  },
  {
    q: 'What is GreenO – One Student One Tree?',
    a: 'GreenO is our flagship initiative where students plant and nurture saplings with geo-verified tracking and AI-driven validation, promoting environmental responsibility and transparency.'
  },
  {
    q: 'Who can get involved?',
    a: 'Anyone can join! We welcome students, individuals, colleges, corporates, and NGOs to contribute through volunteering, sponsorship, mentorship, or partnerships.'
  },
  {
    q: 'How does my contribution make a difference?',
    a: 'Every action, whether planting a tree, mentoring a child, or funding a project, directly impacts communities, the environment, and empowers individuals to lead better lives.'
  },
  {
    q: 'Are donations and participation transparent?',
    a: 'Yes! All donations and project contributions are tracked carefully, with measurable results, reports, and recognition for participants to ensure accountability.'
  },
  {
    q: 'How can I contact CG Foundation?',
    a: 'You can fill out the contact form on our website under the "Get Involved" section or reach us via email - info@cgfoundation.in for guidance on participation and collaboration.'
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
            className='flex h-14 w-full items-center justify-between text-left'>
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
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const isValid =
    form.name.trim() &&
    form.mobile.trim() &&
    form.email.trim() &&
    form.message.trim()

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch(
        'http://localhost:5000/send-mail',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(form)
        }
      )
      const data = await res.json()
      setStatus(data.message)
    } catch (err) {
      setStatus('Failed to send. Try again.')
    } finally {
      setLoading(false)
    }
  }

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
        <form
          className='contact space-y-4'
          onSubmit={e => e.preventDefault()}>
          <input
            type='text'
            name='name'
            placeholder='Your name'
            value={form.name}
            onChange={handleChange}
          />

          <div className='flex gap-4'>
            <input
              type='tel'
              name='mobile'
              placeholder='Your mobile number'
              value={form.mobile}
              onChange={handleChange}
            />
            <input
              type='email'
              name='email'
              placeholder='Your email'
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <textarea
            rows='4'
            name='message'
            placeholder='Your Message'
            value={form.message}
            onChange={handleChange}></textarea>

          <button
            type='button'
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className={`px-4 py-2 rounded ${isValid ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-200'}`}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {status && (
            <p className='text-sm mt-2'>{status}</p>
          )}
        </form>
      </aside>
    </main>
  )
}
