'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import React from 'react';

// Create an interface for the layout props, including children
interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Add React.FC<DashboardLayoutProps> to define the component's props type
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMobile &&
        isMobileMenuOpen &&
        !target.closest('.sidebar') &&
        !target.closest('.mobile-menu-button')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className='flex bg-gray-800 min-h-screen relative'>
      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        isMobile={isMobile}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
        toggleSidebar={toggleSidebar} // Added this prop
      />

      <main className='flex-1 flex flex-col min-h-screen'>
        {/* Mobile header */}
        <header className='md:hidden bg-gray-900 text-white p-4 flex items-center justify-between border-b border-gray-700'>
          <button
            onClick={toggleSidebar}
            className='mobile-menu-button text-white p-2 rounded-lg hover:bg-gray-700 transition-colors'
            aria-label='Toggle menu'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
          <h1 className='text-lg font-semibold bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
            GigSphere
          </h1>
          <div className='w-10' />
        </header>

        {/* Main content - removed the duplicate desktop toggle button */}
        <div className='flex-1 p-4 md:p-8'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
