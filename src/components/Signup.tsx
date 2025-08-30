'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import FormInput from '../ui/FormInput';
import RoleSelection from '../ui/RoleSection';
import { useRouter } from 'next/router';


const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // --Password toggler--
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='relative w-full min-h-screen bg-black flex items-center justify-center py-4 px-3'>
      {/* --Image goes here-- */}
      <div className='absolute inset-0 w-full h-full'>
        <Image
          src='/heroimage3.png'
          alt='Hero Image'
          layout='fill'
          objectFit='cover'
          quality={100}
          className='z-0'
        />
      </div>

      {/* --SignUp card goes here-- */}
      <div className='relative z-10 w-full h-auto md:h-[790px] md:max-h-[850px] max-w-6xl mx-auto rounded-lg shadow-lg border border-gray-700 bg-gray-500/50 flex flex-col md:flex-row overflow-hidden backdrop-blur-sm'>
        {/* --Left Side content-- */}
        <div className='hidden md:flex md:w-1/2 py-10 px-5 bg-gradient-to-br from-blue-400/50 to-green-600/40 h-full flex-col justify-center items-center gap-6 text-center text-white'>
          {/* --Title & Paragraph-- */}
          <div>
            <h1 className='text-green-200 text-4xl font-bold'>GigSphere</h1>
            <h2 className='text-2xl font-bold mt-5'>Unlock Your Potential.</h2>
            <p className='mt-5 text-gray-300 max-w-md'>
              Join our community to connect with top-tier talent or discover
              exciting new projects. Our platform is designed to help you
              succeed, whether you're building a dream team or a fulfilling
              career.
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
              <h3 className='text-sm sm:text-base'>
                Choose projects / clients
              </h3>
            </div>
          </div>
        </div>

        {/* --Right side form-- */}
        <div className='w-full md:w-1/2 bg-white text-center h-full flex flex-col gap-4 px-4 md:px-8 py-10 justify-center rounded-lg md:rounded-l-none'>
          {/* --Title & Paragraph-- */}
          <h1 className='text-3xl font-semibold text-gray-800'>
            Create Account
          </h1>
          <p className='text-gray-500 text-sm'>
            Enter your personal data to create an account.
          </p>

          {/* --Signup with Google-- */}
          <button className='w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 transition duration-300 cursor-pointer hover:bg-gray-400/20'>
            <FaGoogle className='text-red-500 text-xl' />
            <span className='text-md text-gray-700 font-medium'>
              Sign up with Google
            </span>
          </button>
          {/* --Divider-- */}
          <div className='flex items-center my-2'>
            <div className='flex-grow h-px bg-gray-300'></div>
            <span className='mx-4 text-sm text-gray-400'>or</span>
            <div className='flex-grow h-px bg-gray-300'></div>
          </div>

          {/* --Form-- */}
          <form className='flex flex-col gap-5 text-left'>
            {/* --Name-- */}
            <FormInput
              label='Full Name'
              id='name'
              type='text'
              name='name'
              placeholder='Enter your full name'
              value={''}
              onChange={() => {}}
              required={true}
            />
            {/* --Email-- */}
            <FormInput
              label='Email Address'
              id='email'
              type='email'
              name='email'
              placeholder='Enter your email address'
              value={''}
              onChange={() => {}}
            />
            {/* --Role-- */}
            <RoleSelection
              selectedRole={'freelancer'}
              onSelectRole={() => {}}
            />

            {/* --Password section-- */}
            <div className='flex flex-col md:flex-row w-full gap-3'>
              {/* --Password-- */}
              <div className='flex flex-col w-full md:w-1/2'>
                <label
                  className='text-sm text-gray-600 font-medium'
                  htmlFor='password'>
                  Password
                </label>
                <div className='relative w-full'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Create a strong password'
                    className='mt-1 p-2 w-full border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <span
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer'
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              {/* --Confirm Password-- */}
              <div className='flex flex-col w-full md:w-1/2'>
                <label
                  className='text-sm text-gray-600 font-medium'
                  htmlFor='confirmPassword'>
                  Confirm Password
                </label>
                <div className='relative w-full'>
                  <input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Re-enter your password'
                    className='mt-1 p-2 w-full border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <span
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer'
                    onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>
            {/* --Submit button-- */}
            <button
              type='submit'
              className='mt-4 w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer'>
              Sign Up
            </button>
          </form>

          <p className='text-sm text-gray-500 mt-4'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='text-blue-600 font-semibold hover:underline'>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
