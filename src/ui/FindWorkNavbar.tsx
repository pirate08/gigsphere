'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const FindWorkNavbar = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    deleteCookie('user_token');
    deleteCookie('user_role');
    setIsMenuOpen(false);
    router.push('/login');
  };

  return (
    <div className='relative'>
      {/* Main Navbar - Now Fixed */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between sm:px-20 text-white transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-white/20 shadow-lg'
            : 'bg-black border-b-[1px] border-b-white'
        }`}>
        {/* Logo */}
        <div className='flex-shrink-0'>
          <Link href='/'>
            <Image
              src='/main-logo-removebg.png'
              alt='logo'
              width={200}
              height={150}
              className={`transition-all duration-300 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
            />
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className='hidden md:flex items-center gap-4 text-sm'>
          <Link href='/profile'>
            <button className='group relative px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer'>
              <CgProfile className='text-xl' />
              <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none'>
                Profile
              </span>
            </button>
          </Link>
          <button
            className='group relative button-gradient cursor-pointer text-white px-4 py-2 rounded-md transition'
            onClick={handleLogout}>
            <MdLogout className='text-xl' />
            <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none'>
              Logout
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button
            onClick={toggleMenu}
            className='p-2 rounded-md hover:bg-gray-800 transition-colors'
            aria-label='Toggle menu'>
            <div className='space-y-1'>
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-t border-white/20'
            : 'bg-black border-t border-gray-800'
        } ${
          isMenuOpen
            ? 'opacity-100 visible transform translate-y-0'
            : 'opacity-0 invisible transform -translate-y-4'
        }`}>
        <div className='px-4 py-4 space-y-4'>
          {/* Mobile Buttons */}
          <div className='flex flex-col gap-3 pt-4'>
            <Link href='/profile' onClick={closeMenu}>
              <button className='w-full px-4 py-3 rounded-md hover:bg-green-600 transition cursor-pointer text-white border border-gray-600 flex items-center gap-2 justify-center'>
                Profile
                <span>
                  <CgProfile className='text-xl' />
                </span>
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className='w-full button-gradient cursor-pointer text-white px-4 py-3 rounded-md transition flex items-center gap-2 justify-center'>
              Logout{' '}
              <span>
                <MdLogout className='text-xl' />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={closeMenu}
        />
      )}

      {/* Spacer div to prevent content from hiding behind fixed navbar */}
      <div className='h-16'></div>
    </div>
  );
};

export default FindWorkNavbar;
