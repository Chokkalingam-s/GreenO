import {useState, useEffect, useRef} from 'react'
import {toast} from 'react-toastify'
import {FloatingLabelInput} from '../components/FloatingLabelInput'

const generateRandomText = (length = 6) => {
  const chars = '0123456789#abcdefghijkmnopqrstuvwxyz'
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

      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.stroke()
      }

      const fonts = ['Arial', 'Courier New', 'Georgia', 'Verdana']
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'

      const totalWidth = captchaText.length * 20
      let startX = (canvas.width - totalWidth) / 2 + 10

      for (let i = 0; i < captchaText.length; i++) {
        ctx.font = `${Math.random() * 10 + 24}px ${fonts[Math.floor(Math.random() * fonts.length)]}`
        ctx.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100})`
        ctx.save()
        ctx.translate(startX + i * 20, 30)
        ctx.rotate((Math.random() - 0.5) * 0.4)
        ctx.fillText(captchaText[i], 0, 0)
        ctx.restore()
      }
    }
    drawCaptcha()
  }, [captchaText])

  const handleVerify = () => {
    if (inputValue.toLowerCase() === captchaText.toLowerCase()) {
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
    <div className='center flex-col space-y-6'>
      <canvas ref={canvasRef} className='round sh mx-auto w-56' />
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
