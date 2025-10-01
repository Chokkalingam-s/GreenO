export default function ContentWithImage({
  title,
  subtitle,
  content,
  img
}) {
  return (
    <div className='flex flex-col gap-y-4 mt-16 px-4 md:px-0'>
      {/* Hero Image + Title */}
      <span className='flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-4'>
        <h2 className='grad_txt text-2xl font-semibold border-b-2 border-green-500'>
          {title}
        </h2>
        <p className='grad_txt hidden md:block'>~</p>
        <h3 className='grad_txt text-xl font-medium italic'>
          {subtitle}
        </h3>
      </span>

      {/* Hero Quote */}
      {content.heroQuote && (
        <p className='text-lg italic text-green-700 opacity-90 animate-fadeIn'>
          “{content.heroQuote}”
        </p>
      )}

      {/* Description */}
      <p className='leading-relaxed text-gray-800'>
        {content.description}
      </p>

      <div className='grid grid-cols-1 md:grid-cols-[70%_1fr] gap-6 items-start'>
        <div className='space-y-6 p-2 md:p-4'>
          {/* Contributions */}
          {content.contributions && (
            <div className='space-y-2'>
              <h3 className='text-xl font-semibold grad_txt underline decoration-green-500 underline-offset-4'>
                How You Can Contribute:
              </h3>
              <ul className='list-disc list-inside space-y-1 text-gray-700'>
                {content.contributions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {content.benefits && (
            <div className='space-y-2'>
              <h3 className='text-xl font-semibold grad_txt underline decoration-green-500 underline-offset-4'>
                Impact & Benefits:
              </h3>
              <ul className='list-disc list-inside space-y-1 text-gray-700'>
                {content.benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Image */}
        <img
          src={img}
          alt={title}
          className='w-full h-auto rounded-lg shadow-md object-cover'
        />
      </div>

      {/* CTA */}
      {content.cta && (
        <p className='font-semibold text-green-700 text-lg mt-4'>
          {content.cta}
        </p>
      )}
    </div>
  )
}
