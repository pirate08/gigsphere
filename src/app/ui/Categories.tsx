import React from 'react';
import {
  FaCode,
  FaPalette,
  FaPen,
  FaBullhorn,
  FaVideo,
  FaChartBar,
} from 'react-icons/fa';
import Link from 'next/link';
import ChooseFreelanceHub from './ChooseFreelanceHub';

interface Category {
  id: number;
  title: string;
  description: string;
  jobs: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: 1,
    title: 'Development & IT',
    description: 'Web development, mobile apps, software engineering',
    jobs: '2,500+ jobs',
    icon: <FaCode className='text-2xl sm:text-3xl text-blue-400' />,
  },
  {
    id: 2,
    title: 'Design & Creative',
    description: 'UI/UX design, graphic design, branding',
    jobs: '1,800+ jobs',
    icon: <FaPalette className='text-2xl sm:text-3xl text-blue-400' />,
  },
  {
    id: 3,
    title: 'Writing & Translation',
    description: 'Content writing, copywriting, translation',
    jobs: '1,200+ jobs',
    icon: <FaPen className='text-2xl sm:text-3xl text-blue-400' />,
  },
  {
    id: 4,
    title: 'Marketing & Sales',
    description: 'Digital marketing, SEO, social media',
    jobs: '900+ jobs',
    icon: <FaBullhorn className='text-2xl sm:text-3xl text-blue-400' />,
  },
  {
    id: 5,
    title: 'Video & Animation',
    description: 'Video editing, motion graphics, 3D animation',
    jobs: '600+ jobs',
    icon: <FaVideo className='text-2xl sm:text-3xl text-blue-400' />,
  },
  {
    id: 6,
    title: 'Data & Analytics',
    description: 'Data science, analytics, business intelligence',
    jobs: '450+ jobs',
    icon: <FaChartBar className='text-2xl sm:text-3xl text-blue-400' />,
  },
];

const Categories = () => {
  return (
    <div className='w-full min-h-screen bg-[#131c12] py-12 sm:py-16 lg:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center mb-12 sm:mb-16 lg:mb-20'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6'>
            Explore Popular{' '}
            <span className='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
              Categories
            </span>
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed'>
            Find the perfect freelancer for your project in our most popular
            categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-20'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='group relative bg-[#000] hover:bg-[#2a3142] border border-gray-700 hover:border-blue-500/50 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer'>
              {/* Background Gradient Overlay on Hover */}
              <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>

              {/* Content */}
              <div className='relative z-10'>
                {/* Icon */}
                <div className='mb-4 sm:mb-6'>
                  <div className='w-12 h-12 sm:w-16 sm:h-16 bg-blue-100/10 border  rounded-lg flex items-center justify-center group-hover:bg-blue-300 transition-colors duration-300'>
                    {category.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className='text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors duration-300'>
                  {category.title}
                </h3>

                {/* Description */}
                <p className='text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed'>
                  {category.description}
                </p>

                {/* Job Count */}
                <div className='flex items-center justify-between'>
                  <span className='text-blue-400 font-semibold text-sm sm:text-base'>
                    {category.jobs}
                  </span>

                  {/* Arrow Icon */}
                  <div className='w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300 group-hover:translate-x-1'>
                    <Link href='/find-work'>
                      <svg
                        className='w-4 h-4 sm:w-5 sm:h-5 text-blue-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className='absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            </div>
          ))}
        </div>

        {/* --Choosing FreelanceHub-- */}
        <div className='mt-10 md:mt-20'>
          <ChooseFreelanceHub />
        </div>
      </div>
    </div>
  );
};

export default Categories;
