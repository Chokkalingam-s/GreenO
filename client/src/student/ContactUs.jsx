import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FloatingLabelInput} from '../components/FloatingLabelInput'
import {useAuth} from '../components/auth/signin/AuthContext'

export default function ContactUs() {
  const [problem, setProblem] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const navigate = useNavigate()
  const [preview, setPreview] = useState(false)
  const {role} = useAuth()

  const handleImageUpload = e => {
    const files = Array.from(e.target.files)
    setImages(files)
    setPreview(true)
  }

  const handleCancel = () => {
    switch (role) {
      case 'student':
        navigate('/home')
        break
      case 'admin':
        navigate('/admin')
        break
      case 'hod':
        navigate('/department')
        break
      case 'superAdmin':
        navigate('/dashboard')
        break
      default:
        navigate('/signin')
    }
  }
  return (
    <div className='main relative top-2 flex flex-col p-4'>
      <h2 className='head'>Contact Us</h2>
      <p className='my-2'>Have an issue or suggestion? Let us know</p>

      <div className={`${preview ? 'flex' : ''} w-full gap-4`}>
        <div className={`round ${preview ? 'w-1/2' : ''}`}>
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
            className='round border-secondary w-full border-2 border-solid p-2'
          />
          <label className='mb-2 text-lg font-medium'>
            Images <span className='text-base'>(Optional)</span>
          </label>
          <div
            className='border-secondary bg-secondary/20 round center my-4 cursor-pointer border-2 border-dashed p-2 text-center'
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

          <span className='float-end flex space-x-2'>
            <button type='submit'>Submit</button>
            <button type='button' className='cancel round sh btn' onClick={handleCancel}>
              Cancel
            </button>
          </span>
        </div>

        {preview && images.length > 0 ? (
          <div className='round w-1/2 -translate-y-4 p-2'>
            <h2 className='text-lg'>Preview</h2>
            <div className='max-h-80 overflow-y-auto px-1'>
              <div className='mt-2 grid grid-cols-2 gap-2'>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Uploaded ${index + 1}`}
                    className='round h-32 w-32 object-cover'
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
