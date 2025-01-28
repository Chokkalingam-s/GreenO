export default function About({items, title, title2, imgSrc, imgAlt}) {
  return (
    <section className='timeline md:hidden grid grd_cont'>
      <div className='flex items-center justify-between'>
        <span>
          <h2>{title}</h2>
          <h2 className='text-xl'>{title2}</h2>
        </span>
        <span>
          <button
            className='text-xl font-semibold'
            onClick={() => navigate('/greenO')}>
            Join Us
          </button>
        </span>
      </div>
      <div className='relative w-full grid gap-6 mt-4 glassy out p-4 round'>
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
          className='mt-4 mx-auto w-full max-w-xs'
        />
      )}
    </section>
  )
}
