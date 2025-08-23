import Link from 'next/link';
import React from 'react';
import {
  FaSearch,
  FaComments,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa';

interface HowItWorksProps {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  glowColor: 'blue' | 'green' | 'cyan';
}

const steps: HowItWorksProps[] = [
  {
    id: 1,
    number: '01',
    title: 'Post Your Project',
    description:
      'Describe your project requirements and get free quotes from our global community of freelancers.',
    icon: <FaSearch className='w-6 h-6 text-white' />,
    iconBg: 'from-blue-500 to-blue-600',
    glowColor: 'blue',
  },
  {
    id: 2,
    number: '02',
    title: 'Choose Freelancers',
    description:
      'Review profiles, portfolios, and proposals. Interview and choose the best freelancer for your project.',
    icon: <FaComments className='w-6 h-6 text-white' />,
    iconBg: 'from-green-500 to-green-600',
    glowColor: 'green',
  },
  {
    id: 3,
    number: '03',
    title: 'Pay Safely',
    description:
      'Use our secure payment system. Release payments as work is completed and approved by you.',
    icon: <FaCheckCircle className='w-6 h-6 text-white' />,
    iconBg: 'from-cyan-500 to-teal-600',
    glowColor: 'cyan',
  },
];

const HowItWorks = () => {
  return (
    <div className='bg-[#0a0b0f] text-white py-16 sm:py-20 lg:py-24'>
      {/* Steps Section - Constrained width */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 lg:mb-32'>
        {/* Header Section */}
        <div className='text-center mb-16 sm:mb-20 lg:mb-24'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6'>
            How{' '}
            <span className='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
              It Works
            </span>
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed'>
            Get your project done in three simple steps. From posting to
            payment, we make it easy.
          </p>
        </div>

        {/* Steps Section */}
        <div className='relative'>
          {/* Desktop Layout */}
          <div className='hidden lg:flex items-center justify-center space-x-8'>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <div className='group relative'>
                  {/* Glow Effect Background */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${
                      step.glowColor === 'blue'
                        ? 'from-blue-500/20 to-blue-600/20'
                        : step.glowColor === 'green'
                        ? 'from-green-500/20 to-green-600/20'
                        : 'from-cyan-500/20 to-teal-600/20'
                    } rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

                  {/* Main Card */}
                  <div className='relative bg-[#1a1b23] border border-gray-800 group-hover:border-blue-500/50 rounded-xl p-8 w-80 h-96 flex flex-col items-center text-center transition-all duration-300 group-hover:transform cursor-pointer'>
                    {/* Step Number */}
                    <div className='text-6xl font-bold text-gray-700 mb-4'>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.iconBg} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:scale-110 group-hover:shadow-${step.glowColor}-500/25 transition-all duration-300`}>
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className='text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300'>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className='text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300'>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow between steps (except after last step) */}
                {index < steps.length - 1 && (
                  <div className='flex items-center'>
                    <FaArrowRight className='text-blue-400 text-2xl' />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile/Tablet Layout */}
          <div className='lg:hidden space-y-8'>
            {steps.map((step, index) => (
              <div key={step.id} className='flex flex-col items-center'>
                {/* Step Card */}
                <div className='group relative w-full max-w-md'>
                  {/* Glow Effect Background */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${
                      step.glowColor === 'blue'
                        ? 'from-blue-500/20 to-blue-600/20'
                        : step.glowColor === 'green'
                        ? 'from-green-500/20 to-green-600/20'
                        : 'from-cyan-500/20 to-teal-600/20'
                    } rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

                  {/* Main Card */}
                  <div className='relative bg-[#1a1b23] border border-gray-800 group-hover:border-blue-500/50 rounded-xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:transform group-hover:scale-105 cursor-pointer'>
                    {/* Step Number */}
                    <div className='text-4xl sm:text-5xl font-bold text-gray-700 mb-3'>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${step.iconBg} flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-lg transition-all duration-300`}>
                      <div className='sm:scale-100 scale-75'>{step.icon}</div>
                    </div>

                    {/* Title */}
                    <h3 className='text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors duration-300'>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className='text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300'>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow between steps (except after last step) */}
                {index < steps.length - 1 && (
                  <div className='flex items-center justify-center mt-6 mb-2'>
                    <div className='w-px h-9 bg-gradient-to-b from-blue-400/50 to-transparent'></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Power Buttons Section - Full width */}
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto border bg-[#1a1b23] border-gray-800 rounded-lg p-8 sm:p-10 lg:p-12'>
          {/* Title */}
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6'>
            Ready to Get Started?
          </h1>

          {/* Description */}
          <p className='text-base sm:text-lg text-gray-400 max-w-2xl text-center mx-auto leading-relaxed mb-8 sm:mb-10'>
            Get your project done in three simple steps. From posting to
            payment, we make it easy.
          </p>

          {/* Responsive Buttons Section */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6'>
            <Link href='/find-freelancers' className='w-full sm:w-auto'>
              <button className='w-full sm:w-auto button-gradient text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-white rounded-md hover:brightness-110 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2 md:gap-4'>
                Start as Client
                <span className='text-white text-sm md:text-xl'>
                  <FaArrowRight />
                </span>
              </button>
            </Link>

            <Link href='/find-work' className='w-full sm:w-auto'>
              <button className='w-full sm:w-auto bg-transparent border-2 border-white text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-white rounded-md hover:bg-green-400 hover:text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'>
                Join as Freelancer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
