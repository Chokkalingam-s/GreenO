import {Branch} from '../exp_comp'

export default function Item({classN, title, content}) {
  return (
    <div className={classN}>
      <Branch />
      <span>
        {title && <h3>{title}</h3>}
        <p>{content}</p>
      </span>
    </div>
  )
}
