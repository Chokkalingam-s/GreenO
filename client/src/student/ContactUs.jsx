import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function ContactUs() {
  const [problem, setProblem] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const navigate = useNavigate()
  const [preview, setPreview] = useState(false)

  const handleImageUpload = e => {
    const files = Array.from(e.target.files)
    setImages(files)
    setPreview(true)
  }

  return (
    <div className='main flex-col relative top-2 p-4 m-4'>
      <h2 className='head'>Contact Us</h2>
      <div>
        <input
          type='text'
          id='problem'
          value={problem}
          onChange={e => setProblem(e.target.value)}
          placeholder='Enter the problem title'
        />
        <textarea
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Enter the problem description'
          rows='5'
        />
        <label className='text-lg font-medium mb-2'>
          Images <span className='text-base'>(Optional)</span>
        </label>
        <div
          className='my-4 p-2 border-2 border-dashed border-secondary glassy round center'
          onClick={() => document.getElementById('file-input').click()}>
          <span>Choose File</span>
          <input
            id='file-input'
            type='file'
            onChange={handleImageUpload}
            className='hidden'
            multiple
            accept='image/*'
          />
        </div>
        {preview && (
          <>
            <h2 className='text-lg'>Preview</h2>
            <div className='overflow-y-auto h-40'>
              {images.length > 0 && (
                <div className='mt-4 center gap-4 flex-wrap'>
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt={`Uploaded ${index + 1}`}
                      className='w-32 h-32 object-cover round'
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        <span className='flex space-x-2 float-end'>
          <button type='submit'>Submit</button>
          <button
            type='submit'
            className='cancel'
            onClick={() => navigate('/home')}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  )
}
