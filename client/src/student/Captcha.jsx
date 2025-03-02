import {useState, useEffect, useRef} from 'react'
import {toast} from 'react-toastify'
import {FloatingLabelInput} from '../components/FloatingLabelInput'

const generateRandomText = (length = 6) => {
  const chars = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopq@rstuvwxyz'
  return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function Captcha({onVerify}) {
  const [captchaText, setCaptchaText] = useState(generateRandomText())
  const [inputValue, setInputValue] = useState('')
  const canvasRef = useRef(null)

  useEffect(() => {
    const drawCaptcha = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      canvas.width = 150
      canvas.height = 50

      ctx.fillStyle = '#F7FFF0'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const fonts = ['Arial', 'Courier New', 'Georgia', 'Verdana']
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'

      const totalWidth = captchaText.length * 14
      let startX = (canvas.width - totalWidth) / 2

      for (let i = 0; i < captchaText.length; i++) {
        ctx.font = `${Math.random() * 10 + 24}px ${fonts[Math.floor(Math.random() * fonts.length)]}`
        ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`
        ctx.fillText(captchaText[i], startX + i * 14, 30 + Math.random() * 10 - 5)
      }
    }
    drawCaptcha()
  }, [captchaText])
  console.log(captchaText)

  const handleVerify = () => {
    if (inputValue === captchaText) {
      toast.success('Captcha verified successfully!')
      onVerify(true)
    } else {
      toast.error('Incorrect captcha, try again!')
      onVerify(false)
    }
  }

  const handleRefresh = () => {
    setCaptchaText(generateRandomText())
    setInputValue('')
    onVerify(false)
  }

  return (
    <div className='center mt-10 flex-col space-y-6'>
      <canvas ref={canvasRef} className='round sh w-56' />
      <div className='flex items-center space-x-1'>
        <FloatingLabelInput
          id='captcha'
          value={inputValue}
          setValue={setInputValue}
          placeholder='Captcha'
        />
        <button onClick={handleVerify}>Verify</button>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    </div>
  )
}
