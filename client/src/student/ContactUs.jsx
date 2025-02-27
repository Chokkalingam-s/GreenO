import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FloatingLabelInput} from '../components/FloatingLabelInput'

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
    <div className='main relative top-2 m-4 flex-col p-4'>
      <h2 className='head'>Contact Us</h2>
      <p className='my-2'>Have an issue or suggestion? Let us know</p>
      <div>
        <FloatingLabelInput
          type='text'
          id='problem'
          value={problem}
          setValue={setProblem}
          placeholder='Issue'
        />

        <textarea
          id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Description'
          rows='5'
          className='round border-secondary w-full border-2 border-solid'
        />
        <label className='mb-2 text-lg font-medium'>
          Images <span className='text-base'>(Optional)</span>
        </label>
        <div
          className='border-secondary bg-secondary/20 round center my-4 cursor-pointer border-2 border-dashed p-2'
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
            <div className='h-40 overflow-y-auto'>
              {images.length > 0 && (
                <div className='center mt-4 flex-wrap gap-4'>
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt={`Uploaded ${index + 1}`}
                      className='round h-32 w-32 object-cover'
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        <span className='float-end flex space-x-2'>
          <button type='submit'>Submit</button>
          <button type='submit' className='cancel' onClick={() => navigate('/home')}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  )
}
