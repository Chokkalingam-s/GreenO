import {Card} from '../exp_comp'

export default function Timeline({items, title, imgSrc, imgAlt}) {
  return (
    <section className='timeline md:hidden grid'>
      <h2 className='text-center text-2xl font-bold my-4'>{title}</h2>
      <div className='relative w-full grid gap-6'>
        {items.map((item, index) => (
          <div key={index}>
            <Card
              content={item.content}
              title={item.title}
              showBtn={false}
              fixed={false}
            />
          </div>
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
