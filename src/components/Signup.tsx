'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import FormInput from '../ui/FormInput';
import RoleSelection from '../ui/RoleSection';
import SignupLeftCard from '../ui/LeftSideSignUp';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'freelancer' | 'client';
}

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'freelancer',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // --Handle form input changes--
  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --Handle role selection--
  const handleRoleSelection = (role: 'freelancer' | 'client') => {
    setFormData({ ...formData, role });
  };

  // --Password toggler--
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // --Handle form submission--
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // --Validation checks--
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success('Signup successful! Redirecting to login...', {
          duration: 4000,
        });
        // --Redirecting to the login page--
        router.push('/login');
      } else {
        toast.error(data.message || 'Registration failed. Please try again.', {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error('Signup failed. Please try again.', { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
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
        <SignupLeftCard /> {/* Use the new component here */}
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
          <form
            className='flex flex-col gap-5 text-left'
            onSubmit={handleFormSubmit}>
            {/* --Name-- */}
            <FormInput
              label='Full Name'
              id='name'
              type='text'
              name='name'
              placeholder='Enter your full name'
              value={formData.name}
              onChange={handleInputChanges}
              required={true}
            />
            {/* --Email-- */}
            <FormInput
              label='Email Address'
              id='email'
              type='email'
              name='email'
              placeholder='Enter your email address'
              value={formData.email}
              onChange={handleInputChanges}
              required={true}
            />
            {/* --Role-- */}
            <RoleSelection
              selectedRole={formData.role}
              onSelectRole={handleRoleSelection}
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
                    value={formData.password}
                    onChange={handleInputChanges}
                    name='password'
                    required
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
                    value={formData.confirmPassword}
                    onChange={handleInputChanges}
                    name='confirmPassword'
                    required
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
              disabled={isLoading}
              className='mt-4 w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed'>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
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
