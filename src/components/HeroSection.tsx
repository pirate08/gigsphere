import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Showcase from '../ui/Showcase';

const HeroSection = () => {
  return (
    <div className='relative top-0 left-0 w-full h-[620px] sm:h-[700px] md:h-[800px] lg:h-[900px] bg-black'>
      {/* --Image goes here-- */}
      <div className='h-full w-full'>
        <Image
          src='/heroimage4.png'
          alt='Hero Image'
          width={500}
          height={300}
          className='w-full h-full object-cover'
        />
      </div>

      {/* --Text part goes here-- */}
      <div className='absolute inset-0 flex items-start py-10 md:items-center justify-center'>
        <div className='text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto'>
          {/* Badge */}
          <div className='mb-4 sm:mb-6'>
            <span className='inline-block bg-blue-700/20 border border-blue-500 text-blue-400 px-3 py-1.5 rounded-full text-xs sm:text-sm md:text-base'>
              🚀 Join 50,000+ freelancers worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2'>
            Connect with Top
          </h1>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 flex items-center justify-center flex-wrap gap-2 lg:gap-3'>
            <span className='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
              Freelancers
            </span>
            <span className='text-white'>Worldwide</span>
          </h1>

          {/* Description Paragraph */}
          <div className='max-w-2xl mx-auto mb-6 sm:mb-8'>
            <p className='text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed'>
              The premium marketplace where businesses find skilled
              professionals and freelancers discover their dream projects. Work
              smarter, earn more.
            </p>
          </div>

          {/* Responsive Buttons Section */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12'>
            <Link href='/find-freelancers' className='w-full sm:w-auto'>
              <button className='w-full sm:w-auto button-gradient text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-white rounded-md hover:brightness-110 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2 md:gap-4'>
                Find Freelancers
                <span className='text-white text-sm md:text-xl'>
                  <FaArrowRight />
                </span>
              </button>
            </Link>

            <Link href='/watch-demo' className='w-full sm:w-auto'>
              <button className='w-full sm:w-auto bg-transparent border-2 border-white text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-white rounded-md hover:bg-green-400 hover:text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'>
                Watch Demo
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* --Responsive ShowCase part goes here-- */}
      <div className='absolute bottom-2 sm:bottom-6 lg:bottom-8 left-0 w-full z-10'>
        <Showcase />
      </div>
    </div>
  );
};

export default HeroSection;
