export const FloatingLabelSelect = ({id, value, setValue, placeholder, children, ...props}) => {
  return (
    <div className='relative w-full'>
      <select
        id={id || null}
        value={value}
        onChange={e => setValue(e.target.value)}
        className='peer round border-secondary w-full border-2 border-solid focus:outline-none focus:placeholder:text-transparent'
        required
        {...props}>
        {children}
      </select>
      <label
        htmlFor={id}
        className={`bg-secondary/20 text-primary round absolute right-0 px-2 opacity-0 transition-transform ${!value ? 'peer-placeholder-shown:opacity-0' : ''} peer-focus:top-1/2 peer-focus:right-1 peer-focus:-translate-y-1/2 peer-focus:opacity-100`}>
        {placeholder}
      </label>
    </div>
  )
}
