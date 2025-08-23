export default function HorizontalTimeline() {
  const timelineData = [
    {
      title: 'Grow Green, Grow Together',
      content:
        'One student, one sapling—nurturing a greener future, one tree at a time.',
      position: 'top'
    },
    {
      title: 'Geo-Verified Growth',
      content:
        'Upload geotagged sapling photos each semester with verified images and locations.',
      position: 'bottom'
    },
    {
      title: 'Track Progress',
      content:
        'Dashboards for HODs, Principals, and Admins to track rankings at all levels.',
      position: 'top'
    },
    {
      title: 'Green Movement',
      content:
        'Uniting colleges across India to create a collective environmental impact.',
      position: 'bottom'
    },
    {
      title: 'Small Acts, Big Change',
      content:
        'Every sapling planted is a step toward hope, positivity, and a greener tomorrow.',
      position: 'top'
    }
  ]

  return (
    <div className='w-full bg-gradient-to-br from-emerald-50 to-green-50 px-4 py-16'>
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .timeline-item {
          animation: fade-up 0.6s ease-out forwards;
        }

        .timeline-item:nth-child(1) {
          animation-delay: 0.1s;
        }
        .timeline-item:nth-child(2) {
          animation-delay: 0.2s;
        }
        .timeline-item:nth-child(3) {
          animation-delay: 0.3s;
        }
        .timeline-item:nth-child(4) {
          animation-delay: 0.4s;
        }
        .timeline-item:nth-child(5) {
          animation-delay: 0.5s;
        }
      `}</style>

      {/* Header */}
      <div className='mb-12 text-center'>
        <h1 className='mb-2 bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-4xl font-bold text-transparent'>
          GreenO Timeline
        </h1>
        <p className='text-gray-600'>
          One Student One Tree Initiative
        </p>
      </div>

      {/* Horizontal Timeline */}
      <div className='relative mx-auto max-w-7xl'>
        {/* Main horizontal line - thicker and more prominent */}
        <div className='absolute top-1/2 right-0 left-0 z-10 h-2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 shadow-md'></div>

        {/* Timeline items */}
        <div className='relative z-20 flex min-h-80 items-center justify-between'>
          {timelineData.map((item, index) => (
            <div
              key={index}
              className='timeline-item flex flex-col items-center opacity-0'
            >
              {/* Content card positioned above or below */}
              <div
                className={`relative mb-8 w-64 ${item.position === 'top' ? 'order-1' : 'order-3'} ${item.position === 'bottom' ? 'mt-8 mb-0' : ''} `}
              >
                <div className='rounded-xl border border-emerald-100 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                  <h3 className='mb-3 text-center text-lg font-semibold text-gray-800'>
                    {item.title}
                  </h3>
                  <p className='text-center text-sm leading-relaxed text-gray-600'>
                    {item.content}
                  </p>
                </div>

                {/* Connector line from card to center */}
                <div
                  className={`absolute left-1/2 w-1 -translate-x-1/2 transform bg-gradient-to-b from-emerald-400 to-emerald-300 shadow-sm ${item.position === 'top' ? 'top-full h-10' : 'bottom-full h-10'} `}
                ></div>
              </div>

              {/* Center dot - always in middle */}
              <div className='relative order-2'>
                <div className='h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-emerald-500 shadow-lg transition-transform duration-300 hover:scale-125'>
                  <div className='absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white'></div>
                </div>

                {/* Step number */}
                <div className='absolute -bottom-8 left-1/2 -translate-x-1/2 transform'>
                  <span className='rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700'>
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End caps - larger and more prominent */}
        <div className='absolute top-1/2 left-0 z-20 h-6 w-6 -translate-y-1/2 transform rounded-full border-2 border-white bg-emerald-600 shadow-lg'></div>
        <div className='absolute top-1/2 right-0 z-20 h-6 w-6 -translate-y-1/2 transform rounded-full border-2 border-white bg-emerald-600 shadow-lg'></div>
      </div>
    </div>
  )
}
