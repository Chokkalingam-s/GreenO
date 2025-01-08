import { useState } from 'react'

export default function ContactUs() {
  const [problem, setProblem] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const handleImageUpload = e => {
    const files = Array.from(e.target.files)
    setImages(files)
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-8'>
      <div className='w-full max-w-3xl bg-white shadow-lg rounded-lg p-6'>
        <input
          type='text'
          id='problem'
          value={problem}
          onChange={e => setProblem(e.target.value)}
          className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 mb-4'
          placeholder='Enter the problem title'
        />

        <textarea
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 resize-y mb-4'
          placeholder='Enter the problem description'
          rows='5'
        />

        <label
          htmlFor='images'
          className='block text-lg font-medium text-gray-700 mb-2'>
          Images (Optional)
        </label>
        <input
          type='file'
          id='images'
          onChange={handleImageUpload}
          className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 mb-4'
          multiple
          accept='image/*'
        />

        {images.length > 0 && (
          <div className='mt-4 flex gap-4 flex-wrap'>
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt={`Uploaded ${index + 1}`}
                className='w-32 h-32 object-cover rounded'
              />
            ))}
          </div>
        )}

        <button
          type='submit'
          className='w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
          Submit
        </button>
      </div>
    </div>
  )
}
