import React from 'react';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { CiClock2, CiStar } from 'react-icons/ci';
import { FiDollarSign } from 'react-icons/fi';
import { IoMdPeople } from 'react-icons/io';
import { FaBoltLightning } from 'react-icons/fa6';

interface ChooseFreelanceHubProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const chooseProps: ChooseFreelanceHubProps[] = [
  {
    id: 1,
    title: 'Secure payments',
    description:
      'Escrow protection and secure payment processing for every project',
    icon: (
      <RiSecurePaymentLine className='text-3xl sm:text-4xl text-blue-400' />
    ),
  },
  {
    id: 2,
    title: 'Fast Matching',
    description:
      'AI-powered matching connects you with perfect freelancers in minutes',
    icon: <CiClock2 className='text-3xl sm:text-4xl text-blue-400' />,
  },
  {
    id: 3,
    title: 'Fair Pricing',
    description:
      'Transparent pricing with no hidden fees and competitive rates',
    icon: <FiDollarSign className='text-3xl sm:text-4xl text-blue-400' />,
  },
  {
    id: 4,
    title: 'Vetted Professionals',
    description: 'All freelancers go through our rigorous screening process',
    icon: <IoMdPeople className='text-3xl sm:text-4xl text-blue-400' />,
  },
  {
    id: 5,
    title: 'Quality Guarantee',
    description:
      "100% satisfaction guarantee or we'll help you find a replacement",
    icon: <CiStar className='text-3xl sm:text-4xl text-blue-400' />,
  },
  {
    id: 6,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your needs',
    icon: <FaBoltLightning className='text-3xl sm:text-4xl text-blue-400' />,
  },
];

const ChooseFreelanceHub = () => {
  return (
    <div className='text-center'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center mb-16 sm:mb-16 lg:mb-24'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6'>
            Why Choose{' '}
            <span className='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
              GigSphere?
            </span>
          </h2>
          <p className='text-base sm:text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed'>
            We provide everything you need for successful project collaboration
          </p>
        </div>
        {/* --Props-- */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {chooseProps.map((prop) => (
            <div key={prop.id}>
              <div className='group relative cursor-pointer h-full flex flex-col items-center text-center'>
                <div className='mb-4 bg-blue-500/10 group-hover:bg-blue-300/10 rounded-full p-3 transition-colors duration-300'>
                  {prop.icon}
                </div>
                <h3 className='text-md sm:text-xl font-semibold text-white mb-2'>
                  {prop.title}
                </h3>
                <p className='text-gray-400'>{prop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseFreelanceHub;
