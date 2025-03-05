export const FloatingLabelInput = ({type = 'text', id, placeholder, value, setValue, ...props}) => {
  return (
    <div className='relative'>
      <input
        type={type}
        id={id || null}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className='peer'
        required
        {...props}
      />
      <label
        htmlFor={id}
        className={`peer-focus:opacity-100peer-focus:top-1/2 peer-hover:top-1/2 peer-hover:right-1 peer-hover:-translate-y-1/2 peer-hover:opacity-100 peer-focus:top-1/2 peer-focus:right-1 peer-focus:-translate-y-1/2 peer-focus:opacity-100`}>
        {placeholder}
      </label>
    </div>
  )
}
