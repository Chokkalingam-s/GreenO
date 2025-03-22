import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FloatingLabelInput} from '../components/FloatingLabelInput'
import {useAuth} from '../components/auth/signin/AuthContext'
import CloseButton from '../components/CloseButton'

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

      <div className={`${preview ? 'md:flex' : ''} w-full gap-4`}>
        <div className={`round ${preview ? 'mt-2 w-full md:w-1/2' : ''}`}>
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
            rows='4'
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

          <button type='submit' className='w-full'>
            Submit
          </button>
          <CloseButton onClick={handleCancel} />
        </div>

        {preview && images.length > 0 ? (
          <div className='round c mt-4 flex-col p-2 md:mt-0 md:w-1/2 md:-translate-y-8'>
            <h2 className='text-lg'>Preview</h2>
            <div className='max-h-40 overflow-y-auto px-1 md:max-h-80'>
              <div className='mt-2 grid grid-cols-2 place-items-center gap-2'>
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
