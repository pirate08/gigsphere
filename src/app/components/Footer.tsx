import Link from 'next/link';
import React from 'react';
import { CiMail, CiPhone, CiLocationOn } from 'react-icons/ci';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className='bg-[#1a1b23] h-full flex items-center justify-center flex-col py-14 px-10 text-white'>
      {/* --Email Section-- */}
      <div>
        <div className='text-center flex flex-col gap-4 justify-center items-center'>
          <h1 className='flex items-center flex-wrap gap-2 text-xl md:text-3xl font-semibold'>
            Stay Updated with{' '}
            <span className='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
              GigSphere
            </span>
          </h1>
          <p className='text-sm md:text-xl text-gray-400'>
            Get the latest updates on new features, freelancer tips, and client
            success stories.
          </p>
        </div>
        <div className='mt-6 flex justify-center  gap-1'>
          <input
            type='email'
            required
            placeholder='Enter your email'
            className='px-2 py-2 w-48 md:w-96 border border-gray-400/20 bg-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
          />
          <button
            type='submit'
            className='px-3 py-1 bg-gradient-to-r from-blue-400 to-green-600 rounded-r-md font-semibold hover:brightness-110 transition-all duration-300 cursor-pointer'>
            Subscribe
          </button>
        </div>
      </div>
      {/* --White line to divide-- */}
      <span className='w-full max-w-7xl mx-auto mt-14 mb-14 h-[0.1px] bg-gray-600'></span>
      {/* --Main Footer Content-- */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl w-full mx-auto'>
        {/* --Company Info-- */}
        <div className='space-y-4'>
          {/* --Title-- */}
          <h2 className='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent text-2xl md:text-3xl font-bold'>
            GigSphere
          </h2>
          {/* --Paragraph-- */}
          <p className='text-md text-gray-400'>
            The premier marketplace connecting businesses with top freelancers
            worldwide. Building the future of remote work.
          </p>
          {/* --Mail-- */}
          <h6 className='flex gap-2 items-center text-gray-400'>
            <span className='text-blue-500 text-lg'>
              <CiMail />
            </span>{' '}
            support@gigsphere.com
          </h6>
          {/* --Phone-- */}
          <h6 className='flex gap-2 items-center text-gray-400'>
            <span className='text-blue-500 text-lg'>
              <CiPhone />
            </span>{' '}
            +1 (555) 123-4567
          </h6>
          {/* --Location-- */}
          <h6 className='flex gap-2 items-center text-gray-400'>
            <span className='text-blue-500 text-lg'>
              <CiLocationOn />
            </span>{' '}
            San Francisco, CA
          </h6>
        </div>
        {/* --For Freelancers-- */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold mb-6'>For Freelancers</h3>
          <ul className='space-y-2 text-gray-400'>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Find Work
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              How to Earn
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Success Stories
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Resources
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Community
            </li>
          </ul>
        </div>
        {/* --For clients-- */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold mb-6'>For Clients</h3>
          <ul className='space-y-2 text-gray-400'>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Post a Project
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Find Freelancers
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Enterprise Solutions
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Case Studies
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Pricing
            </li>
          </ul>
        </div>
        {/* --Company-- */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold mb-6'>Company</h3>
          <ul className='space-y-2 text-gray-400'>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              About Us
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Careers
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Press & News
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Trust & Safety
            </li>
            <li className='hover:text-blue-500 transition cursor-pointer'>
              Help Center
            </li>
          </ul>
        </div>
      </div>
      {/* --White line to divide-- */}
      <span className='w-full max-w-7xl mx-auto mt-14 mb-14 h-[0.1px] bg-gray-600'></span>
      {/* --Bottom Footer-- */}
      <div className='max-w-7xl w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm'>
        {/* -- Copyright Text -- */}
        <div>
          &copy; {new Date().getFullYear()} GigSphere. All rights reserved.
        </div>
        {/* -- Social Media & Terms Container -- */}
        <div className='flex flex-col md:flex-row items-center gap-4'>
          {/* -- Social Media Icons -- */}
          <div className='flex gap-4 items-center text-lg'>
            <Link href='https://www.facebook.com/'>
              <div className='cursor-pointer hover:bg-green-700 p-1 hover:text-white rounded-full'>
                <FaFacebookF />
              </div>
            </Link>
            <Link href='https://www.twitter.com/'>
              <div className='cursor-pointer hover:bg-green-700 p-1 hover:text-white rounded-full'>
                <FaXTwitter />
              </div>
            </Link>
            <Link href='https://www.instagram.com/'>
              <div className='cursor-pointer hover:bg-green-700 p-1 hover:text-white rounded-full'>
                <FaInstagram />
              </div>
            </Link>
            <Link href='https://www.linkedin.com/'>
              <div className='cursor-pointer hover:bg-green-700 p-1 hover:text-white rounded-full'>
                <FaLinkedinIn />
              </div>
            </Link>
          </div>
          {/* -- Terms-- */}
          <div className='flex gap-2 items-center text-sm'>
            <Link href='/privacy-policy'>
              <span className='hover:text-blue-500 transition cursor-pointer'>
                Privacy Policy
              </span>
            </Link>
            <Link href='/terms-of-service'>
              <span className='hover:text-blue-500 transition cursor-pointer'>
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
