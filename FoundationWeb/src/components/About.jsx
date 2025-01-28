export default function About({items, title, imgSrc, imgAlt}) {
  return (
    <section className='timeline md:hidden grid grd_cont'>
      <h2>{title}</h2>
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
