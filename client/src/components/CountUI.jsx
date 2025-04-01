import {useEffect, useState, useRef} from 'react'

export default function CountUI({data, title, head = null, icons, center}) {
  const [animatedData, setAnimatedData] = useState(data.map(() => 0))
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 1
    })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    const intervals = data.map((value, index) => {
      let current = 0
      const step = Math.ceil(value / 50)
      return setInterval(() => {
        current += step
        if (current >= value) {
          current = value
          clearInterval(intervals[index])
        }
        setAnimatedData(prev => {
          const newData = [...prev]
          newData[index] = current
          return newData
        })
      }, 20)
    })

    return () => intervals.forEach(clearInterval)
  }, [inView, data])

  return (
    <div ref={ref} className={`info_card ${!center ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
      {head && <h1 className='head'>{head}</h1>}
      <div>
        {icons.map((icon, index) => (
          <div key={index} className='_detail'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox={icon.viewBox}>
              <path d={icon.path} />
            </svg>
            <span>
              <h3>{title[index]}</h3>
              <p>{animatedData[index]}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
