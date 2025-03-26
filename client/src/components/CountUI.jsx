export default function CountUI({data, title, head = null, icons}) {
  return (
    <div className='info_card'>
      {head && <h1 className='head'>{head}</h1>}
      <div>
        {icons.map((icon, index) => (
          <div key={index} className='_detail'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox={icon.viewBox}>
              <path d={icon.path} />
            </svg>
            <span>
              <h3>{title[index]}</h3>
              <p>{data[index]}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}