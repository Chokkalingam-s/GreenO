import {icons} from '../exported_data'

export default function CountUI({data, title, head, type = 0}) {
  const {flag, sapling, group} = icons
  return (
    <div className='info_card'>
      <h1 className='head'>{head}</h1>
      <div>
        <div className='_detail'>
          {type == 0 ? (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox={group.viewBox}>
              <path d={group.path} />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox={flag.viewBox}>
              <path d={flag.path} />
            </svg>
          )}
          <span>
            <h3>{title[0]}</h3>
            <p>{data[0]}</p>
          </span>
        </div>
        <div className='_detail'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox={sapling.viewBox}>
            <path d={sapling.path} />
          </svg>
          <span>
            <h3>{title[1]}</h3>
            <p>{data[1]}</p>
          </span>
        </div>
      </div>
    </div>
  )
}
