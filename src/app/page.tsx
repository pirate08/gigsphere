import React from 'react';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4'>
        Welcome to Gigsphere!
      </h1>
      <p className='text-lg mb-8'>Your hub for gigs and events.</p>
    </div>
  );
}
