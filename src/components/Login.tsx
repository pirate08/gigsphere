'use client';

import SigninLeftCard from '@/ui/LeftSideSignIn';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosPeople } from 'react-icons/io';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // --Password toggler--
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='relative w-full min-h-screen bg-black flex items-center justify-center py-6 px-3'>
      {/* --Background Image-- */}
      <div className='absolute inset-0 w-full h-full'>
        <Image
          src='/signinhero.png'
          alt='Hero Image'
          fill
          priority
          className='object-cover z-0'
        />
        <div className='absolute inset-0 bg-black/60' /> {/* Dark overlay */}
      </div>

      {/* --SignIn Container-- */}
      <div className='relative z-10 w-full md:max-w-5xl max-w-md h-full md:h-[600px] rounded-xl shadow-lg border border-gray-700 bg-gray-900/30 flex flex-col md:flex-row overflow-hidden backdrop-blur-md'>
        {/* --Left Side Card-- */}
        <SigninLeftCard />

        {/* --Right Side Form-- */}
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center py-10 px-6 text-white'>
          {/* Title with Icon */}
          <div className='flex flex-col items-center gap-1 mb-6'>
            <span className='text-purple-400 text-5xl'>
              <IoIosPeople />
            </span>
            <h2 className='text-3xl font-semibold text-center'>User Login</h2>
          </div>
          {/* --Login Form--*/}
          <form className='w-full max-w-sm flex flex-col gap-4'>
            {/* --Email-- */}
            <input
              type='email'
              placeholder='Email'
              className='px-4 py-3 rounded-md bg-gray-900/70 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            {/* --Password-- */}
            <div className='relative w-full'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='px-4 pr-10 py-3 w-full rounded-md bg-gray-900/70 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              <span
                className='absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 cursor-pointer'
                onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* --Submission Button-- */}
            <button
              type='submit'
              className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-3 rounded-md hover:opacity-90 transition'>
              Sign In
            </button>
          </form>
          {/* --New account-- */}
          <p className='mt-6 text-sm text-gray-400 text-center'>
            Don’t have an account?{' '}
            <Link href='/signup' className='text-purple-400 hover:underline'>
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
