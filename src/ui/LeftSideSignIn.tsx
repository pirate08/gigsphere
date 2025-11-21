'use client';
import React, { useState, useEffect } from 'react';

interface QuoteOfTheDay {
  id: number;
  quote: string;
}

const quotes: QuoteOfTheDay[] = [
  { id: 1, quote: 'Great things happen when you connect with your team...' },
  {
    id: 2,

    quote:
      'Alone we can do so little; together we can do so much." – Helen Keller',
  },
  {
    id: 3,
    quote:
      'The strength of the team&apos;s unity is the individual member. The strength of each member&apos;s success is the team." – Phil Jackson',
  },
  {
    id: 4,
    quote:
      'Coming together is a beginning. Keeping together is progress. Working together is success." – Henry Ford',
  },
  { id: 5, quote: 'None of us is as smart as all of us." – Ken Blanchard' },
];

const SigninLeftCard = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // --Cycle quotes every 5s--
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --Trigger hand shake every 3s for 3s--
  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000); // Shake for 1 second
    }, 3000); // Every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='hidden md:flex md:w-1/2 py-10 px-8 bg-gradient-to-br from-blue-500/50 via-purple-600/40 to-green-600/50 h-full flex-col justify-center items-center gap-8 text-center text-white backdrop-blur-md shadow-2xl'>
      {/* Logo Section */}
      <div>
        <h1 className='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent text-4xl font-bold'>
          GigSphere
        </h1>
      </div>

      {/* Welcome Section */}
      <div className='space-y-4'>
        <h1 className='text-3xl font-extrabold drop-shadow-md flex items-center justify-center gap-2'>
          Welcome Back
          <span className={`${isShaking ? 'animate-shake' : ''} inline-block`}>
            👋
          </span>
        </h1>
        <p className='max-w-md text-md text-gray-400 leading-relaxed'>
          Sign in to continue your journey with us. Manage projects, collaborate
          with your team, and unlock endless opportunities—all in one place.
        </p>
      </div>

      {/* Extra Quote/Tagline */}
      <div className='mt-6 italic text-gray-200 text-sm max-w-sm transition-opacity duration-700 ease-in-out'>
        &ldquo;{quotes[currentIndex].quote}&rdquo;
      </div>
    </div>
  );
};

export default SigninLeftCard;
