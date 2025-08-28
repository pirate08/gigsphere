import React from 'react';

const Showcase = () => {
  const stats = [
    {
      id: 1,
      number: '50K+',
      label: 'Active Freelancers',
    },
    {
      id: 2,
      number: '10K+',
      label: 'Projects Completed',
    },
    {
      id: 3,
      number: '98%',
      label: 'Client Satisfaction',
    },
    {
      id: 4,
      number: '24/7',
      label: 'Support Available',
    },
  ];

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Background overlay for better readability */}
        <div className='bg-black/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-white/10'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-white'>
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className='flex flex-col items-center justify-center text-center group'>
                {/* Number */}
                <span className='text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300'>
                  {stat.number}
                </span>

                {/* Label */}
                <h6 className='text-xs sm:text-sm md:text-base lg:text-md text-gray-300 font-medium leading-tight group-hover:text-white transition-colors duration-300'>
                  {stat.label}
                </h6>

                {/* Separator line (except for last item on desktop) */}
                {index < stats.length - 1 && (
                  <div className='hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent' />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
