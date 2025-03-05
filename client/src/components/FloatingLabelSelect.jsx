export const FloatingLabelSelect = ({id, value, setValue, placeholder, children, ...props}) => {
  return (
    <div className='relative w-full'>
      <select
        id={id || null}
        value={value}
        onChange={e => setValue(e.target.value)}
        className='peer'
        required
        {...props}>
        {children}
      </select>
      <label
        htmlFor={id}
        className={`${!value ? 'peer-placeholder-shown:opacity-0' : ''} peer-focus:top-1/2 peer-focus:right-1 peer-focus:-translate-y-1/2 peer-focus:opacity-100`}>
        {placeholder}
      </label>
    </div>
  )
}
