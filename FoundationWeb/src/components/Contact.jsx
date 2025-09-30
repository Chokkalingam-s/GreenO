import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const isValid =
    form.name.trim() &&
    form.mobile.trim() &&
    form.email.trim() &&
    form.message.trim()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setStatus(data.message)
    } catch (err) {
      setStatus('Failed to send. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='center min-h-screen'>
      <div className='sh max-h-[60vh] w-full rounded-2xl border border-green-600/20 p-8 outline-2 outline-offset-2 outline-green-500/40'>
        <h2 className='grad_txt mb-6 text-2xl font-bold'>Contact</h2>

        <form className='contact space-y-4' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Your name'
            className='w-full'
            value={form.name}
            onChange={handleChange}
          />

          <div className='flex gap-x-2'>
            <input
              type='tel'
              name='mobile'
              placeholder='Your mobile no.'
              className='w-1/2'
              value={form.mobile}
              onChange={handleChange}
            />
            <input
              type='email'
              name='email'
              placeholder='Your email'
              className='w-1/2'
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <textarea
            rows='4'
            name='message'
            placeholder='Your Message'
            className='w-full'
            value={form.message}
            onChange={handleChange}
          ></textarea>

          <button
            type='submit'
            disabled={!isValid || loading}
            className={`w-full px-4 py-2 rounded ${
              isValid ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-200'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {status && <p className='text-sm mt-2'>{status}</p>}
        </form>
      </div>
    </div>
  )
}
