export default function About({
  items,
  title,
  title2,
  imgSrc,
  imgAlt
}) {
  return (
    <section className='timeline grd_cont grid w-11/12 md:hidden'>
      <div className='flex items-center justify-between'>
        <span>
          <h2>{title}</h2>
          <h2 className='text-xl'>{title2}</h2>
        </span>
        <span>
          <button
            className='text-xl font-semibold'
            onClick={() => navigate('/OneStudentOneTree')}
          >
            Join Us
          </button>
        </span>
      </div>
      <div className='glassy out round relative mt-4 grid w-full gap-6 p-4'>
        {items.map(({title, content}) => (
          <span key={title}>
            <h3 className='text-tertiary'>{title}</h3>
            <p className='full'>{content}</p>
          </span>
        ))}
      </div>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={imgAlt}
          className='mx-auto mt-4 w-full max-w-xs'
        />
      )}
    </section>
  )
}
