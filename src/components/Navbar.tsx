'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  id: number;
  title: string;
  link: string;
}

// Navbar content--
const NavItems: NavItem[] = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'Find Work',
    link: '/find-work',
  },
  {
    id: 3,
    title: 'Find Freelancers',
    link: '/find-freelancers',
  },
  {
    id: 4,
    title: 'How It Works',
    link: '/how-it-works',
  },
  {
    id: 5,
    title: 'Resources',
    link: '/resources',
  },
];

const Navbar = () => {
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

  return (
    <div className='relative'>
      {/* Main Navbar - Now Fixed */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-around sm:px-4 text-white transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-white/20 shadow-lg'
            : 'bg-black border-b-[1px] border-b-white'
        }`}>
        {/* Logo */}
        <div className='flex-shrink-0'>
          <Image
            src='/main-logo-removebg.png'
            alt='logo'
            width={200}
            height={150}
            className={`transition-all duration-300 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}
          />
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-8'>
          {NavItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <span className='text-md hover:text-blue-400 transition-colors cursor-pointer'>
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className='hidden md:flex items-center gap-4 text-sm'>
          <Link href='/login'>
            <button className='px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer'>
              Log In
            </button>
          </Link>
          <Link href='/signup'>
            <button className='button-gradient cursor-pointer text-white px-4 py-2 rounded-md transition'>
              Sign Up
            </button>
          </Link>
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
          {/* Mobile Navigation Links */}
          {NavItems.map((item) => (
            <Link key={item.id} href={item.link} onClick={closeMenu}>
              <div className='block py-2 text-white hover:text-green-400 transition-colors cursor-pointer border-b border-gray-800 last:border-b-0'>
                {item.title}
              </div>
            </Link>
          ))}

          {/* Mobile Buttons */}
          <div className='flex flex-col gap-3 pt-4'>
            <Link href='/login' onClick={closeMenu}>
              <button className='w-full px-4 py-3 rounded-md hover:bg-green-600 transition cursor-pointer text-white border border-gray-600'>
                Log In
              </button>
            </Link>
            <Link href='/signup' onClick={closeMenu}>
              <button className='w-full button-gradient cursor-pointer text-white px-4 py-3 rounded-md transition'>
                Sign Up
              </button>
            </Link>
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

export default Navbar;
