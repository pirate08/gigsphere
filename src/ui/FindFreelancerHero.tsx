import Image from 'next/image';
import React from 'react';

interface HeroProps {
  image: string;
  title: string;
  paragraph: string;
}

const FindFreelancerHero: React.FC<HeroProps> = ({
  image,
  title,
  paragraph,
}) => {
  return (
    <div className='relative w-full h-[600px]'>
      {/* <-- Fixed Height Added Here */}
      {/* --Image Section-- */}
      <div className='absolute inset-0 w-full h-[600px]'>
        <Image
          src={image}
          alt={title}
          fill
          priority
          className='object-cover z-0'
          quality={100}
        />
        <div className='absolute inset-0 bg-black/60' /> {/* Dark overlay */}
      </div>
      {/* --Text Section-- */}
      <div className='relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-6 text-white'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
          {title}
        </h1>
        <p className='text-md md:text-lg max-w-full md:max-w-3xl text-gray-400'>
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default FindFreelancerHero;
