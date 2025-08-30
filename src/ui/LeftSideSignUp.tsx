import React from 'react';

const SignupLeftCard = () => {
  return (
    <div className='hidden md:flex md:w-1/2 py-10 px-5 bg-gradient-to-br from-blue-400/50 to-green-600/40 h-full flex-col justify-center items-center gap-6 text-center text-white'>
      {/* --Title & Paragraph-- */}
      <div>
        <h1 className='text-green-200 text-4xl font-bold'>GigSphere</h1>
        <h2 className='text-2xl font-bold mt-5'>Unlock Your Potential.</h2>
        <p className='mt-5 text-gray-300 max-w-md'>
          Join our community to connect with top-tier talent or discover
          exciting new projects. Our platform is designed to help you succeed,
          whether you're building a dream team or a fulfilling career.
        </p>
      </div>
      {/* --Process-- */}
      <div className='mt-8 w-full flex flex-col gap-3 items-center'>
        <div className='flex items-center gap-4 bg-gray-300 px-4 py-2 rounded-2xl text-black w-2/3'>
          <span className='py-1 px-3 rounded-full text-sm bg-black text-white'>
            1
          </span>
          <h3 className='text-sm sm:text-base'>Sign up your account</h3>
        </div>
        <div className='flex items-center gap-4 bg-gray-700/90 px-4 py-2 rounded-2xl text-white w-2/3'>
          <span className='py-1 px-3 rounded-full text-sm bg-gray-800/90 text-white'>
            2
          </span>
          <h3 className='text-sm sm:text-base'>Set up your profile</h3>
        </div>
        <div className='flex items-center gap-4 bg-gray-700/90 px-4 py-2 rounded-2xl text-white w-2/3'>
          <span className='py-1 px-3 rounded-full text-sm bg-gray-800/90 text-white'>
            3
          </span>
          <h3 className='text-sm sm:text-base'>Choose projects / clients</h3>
        </div>
      </div>
    </div>
  );
};

export default SignupLeftCard;
