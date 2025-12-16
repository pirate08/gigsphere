'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
  FaQuoteRight,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from 'react-icons/fa';

interface sliderProps {
  id: number;
  avatar: string;
  quote: string;
  name: string;
  role: string;
  message: string;
}

const sliderDetails: sliderProps[] = [
  {
    id: 1,
    avatar: '/Avatar/avatar1.jpg',
    quote:
      'FreelanceHub connected us with an amazing developer who delivered our MVP in record time. The quality exceeded our expectations, and the communication was flawless.',
    name: 'Joey Tribbani',
    role: 'CEO, TechStart',
    message: 'Mobile App Development',
  },
  {
    id: 2,
    avatar: '/Avatar/avatar2.jpg',
    quote:
      'As a freelancer, FreelanceHub has transformed my career. The platform makes it easy to find quality clients and the payment protection gives me peace of mind.',
    name: 'Marcus Rodriguez',
    role: 'Freelance Designer',
    message: 'Brand Identity Design',
  },
  {
    id: 3,
    avatar: '/Avatar/avatar4.jpg',
    quote:
      'We&apos;ve hired multiple freelancers through FreelanceHub for our content marketing needs. Every single experience has been professional and results-driven.',
    name: 'Emily Johnson',
    role: 'Marketing Director, GrowthCo',
    message: 'Content Marketing Campaign',
  },
  {
    id: 4,
    avatar: '/Avatar/avatar3.jpg',
    quote:
      'The matching algorithm is incredible. I get project invitations that perfectly match my skills and interests. Plus, the milestone payment system is fantastic.',
    name: 'David Kim',
    role: 'Full-Stack Developer',
    message: 'E-commerce Platform',
  },
  {
    id: 5,
    avatar: '/Avatar/avatar5.jpg',
    quote:
      "FreelanceHub&apos;s project management tools make collaboration seamless. We've completed over 50 projects with zero payment issues.",
    name: 'Lisa Thompson',
    role: 'Founder, CreativeStudio',
    message: 'Website Redesign',
  },
];

const Testimonal = () => {
  // Initialize with the first item (index 0)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // --- Next slide function ---
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderDetails.length - 1 ? 0 : prevIndex + 1
    );
  };

  // --- Previous slide function ---
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderDetails.length - 1 : prevIndex - 1
    );
  };

  // Get the current testimonial item based on the state
  const currentItem = sliderDetails[currentIndex];

  return (
    <div className='w-full min-h-screen deep-colour py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-blue-950 to-green-950'>
      {/* Header Section */}
      <div className='text-center mb-12 sm:mb-16 lg:mb-20'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6'>
          What Our{' '}
          <span className='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
            Community{' '}
          </span>
          Says
        </h2>
        <p className='text-base sm:text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed'>
          Join thousands of satisfied clients and freelancers who&apos;ve found
          success on our platform
        </p>
      </div>
      {/* ---Testimonial Slider--- */}
      <div>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-500/10 rounded-xl py-10'>
          <div className='h-full flex flex-col items-center gap-5'>
            {/* Quote icon */}
            <span>
              <FaQuoteRight className='h-10 w-10 text-blue-500' />
            </span>
            {/* Stars */}
            <div className='flex gap-1 items-center'>
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar key={index} className='h-5 w-5 text-yellow-500' />
              ))}
            </div>
            {/* Single Testimonial Display */}
            <div key={currentItem.id}>
              {/* Paragraph */}
              <p className='text-center text-lg sm:text-xl lg:text-2xl max-w-3xl mb-10 italic text-white'>
                &quot;{currentItem.quote}&quot;
              </p>
              {/* Details of the speaker */}
              <div className='flex justify-center items-center gap-4 mt-6'>
                <Image
                  src={currentItem.avatar}
                  alt={currentItem.name}
                  className='w-20 h-20 rounded-full object-fit border border-blue-500'
                  width={80}
                  height={80}
                />
                <div className='text-center sm:text-left'>
                  <h3 className='text-xl font-semibold text-white'>
                    {currentItem.name}
                  </h3>
                  <p className='text-md text-gray-400'>{currentItem.role}</p>
                  <p className='text-sm text-blue-400'>{currentItem.message}</p>
                </div>
              </div>
            </div>
          </div>
          {/* --- */}
          {/* Buttons and Dots */}
          <div className='flex justify-center items-center gap-8 mt-16'>
            {/* Left button */}
            <button
              onClick={prevSlide}
              className='p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition cursor-pointer'>
              <FaChevronLeft className='h-5 w-5' />
            </button>
            {/* Indicator dots */}
            <div className='flex space-x-2'>
              {sliderDetails.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                  }`}></button>
              ))}
            </div>
            {/* Right button */}
            <button
              onClick={nextSlide}
              className='p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition cursor-pointer'>
              <FaChevronRight className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonal;
