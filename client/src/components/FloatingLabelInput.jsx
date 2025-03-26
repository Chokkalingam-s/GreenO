export const FloatingLabelInput = ({
  type = 'text',
  id,
  placeholder,
  value,
  setValue,
  space = 1,
  ...props
}) => {
  return (
    <div className={`relative ${space == 1 ? 'mb-4' : ''}`}>
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
