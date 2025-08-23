export default function ContentWithImage({
  title,
  content,
  img
}) {
  return (
    <>
      <h2 className='grad_txt my-10 text-3xl font-bold'>
        {title}
      </h2>
      <div
        className={`flex flex-col items-center justify-center gap-10`}
      >
        <img
          src={img}
          alt={title}
          className='h-64 w-full rounded-lg object-cover shadow-lg'
        />

        <p className='leading-relaxed'>{content}</p>
      </div>
    </>
  )
}
