// ContentWithImage.jsx
export default function ContentWithImage({
  title,
  subtitle,
  content,
  img
}) {
  return (
    <div className='flex flex-col md:gap-y-2 px-2 md:px-0'>
      {/* Title + Subtitle */}
      <div className='flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-2 mt-3'>
        <h2 className='grad_txt text-3xl font-bold border-b-2 border-green-500'>
          {title}
        </h2>
        <p className='grad_txt hidden md:block'>~</p>
        <h3 className='grad_txt text-xl font-medium italic'>
          {subtitle}
        </h3>
      </div>

      {/* Hero Quote */}
      {content.heroQuote && (
        <p className='text-lg italic text-green-700 mt-2'>
          “ {content.heroQuote} ”
        </p>
      )}

      {/* Banner Image */}
      {img && (
        <div className='w-full h-82 overflow-hidden rounded-xl'>
          <img
            src={img}
            alt={title}
            className='size-full md:object-cover object-contain'
          />
        </div>
      )}

      {/* Description */}
      <p className='leading-relaxed text-gray-800 mt-4'>
        {content.description}
      </p>

      {/* Contributions & Benefits */}
      <div className='space-y-4'>
        {content.contributions && (
          <div className='space-y-2'>
            <h3 className='text-xl md:text-2xl font-semibold grad_txt underline decoration-green-500 underline-offset-4'>
              How You Can Contribute:
            </h3>
            <ul className='list-disc list-inside space-y-1 text-gray-700'>
              {content.contributions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {content.benefits && (
          <div className='space-y-2'>
            <h3 className='text-xl md:text-2xl font-semibold grad_txt underline decoration-green-500 underline-offset-4'>
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

      {/* CTA */}
      {content.cta && (
        <p className='font-semibold text-green-700 text-lg my-4'>
          {content.cta}
        </p>
      )}
    </div>
  )
}
