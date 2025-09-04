'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaSignOutAlt,
  FaTimes,
  FaSearch,
} from 'react-icons/fa';
import { IoCreate } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
  isMobile: boolean;
  closeMobileMenu: () => void;
  toggleSidebar: () => void;
}

const sidebarItems = [
  {
    name: 'Home',
    icon: FaHome,
    href: '/',
  },
  {
    name: 'My Jobs',
    icon: FaClipboardList,
    href: '/client-dashboard/all-jobs',
  },
  {
    name: 'Create New Job',
    icon: IoCreate,
    href: '/client-dashboard/create-job',
  },
  {
    name: 'Search Freelancers',
    icon: FaSearch,
    href: '/client-dashboard/search-freelancers',
  },
  { name: 'Profile', icon: FaUser, href: '/client-dashboard/profile' },
];

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isMobileMenuOpen,
  isMobile,
  closeMobileMenu,
  toggleSidebar,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMobileLinkClick = () => {
    if (isMobile) {
      closeMobileMenu();
    }
  };

  const handleLogout = () => {
    deleteCookie('user_token');
    deleteCookie('user_role');
    router.push('/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`
          sidebar hidden md:flex flex-col
          bg-gray-900 text-white transition-all duration-300
          ${isCollapsed ? 'w-20' : 'w-64'}
          min-h-screen border-r border-gray-800 relative
        `}>
        <button
          onClick={toggleSidebar}
          className={`
            absolute -right-3 top-6 z-10
            bg-gray-800 hover:bg-gray-700 text-white
            w-6 h-6 rounded-full border-2 border-gray-600
            flex items-center justify-center
            transition-all duration-300 text-xs font-bold
            shadow-lg hover:shadow-xl cursor-pointer
          `}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {isCollapsed ? '›' : '‹'}
        </button>

        <div className='flex items-center p-4 border-b border-gray-700'>
          <div className={`${isCollapsed ? 'text-center w-full' : ''}`}>
            <h1
              className={`text-xl font-bold bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent ${
                isCollapsed ? 'text-sm' : ''
              }`}>
              {isCollapsed ? 'GS' : 'GigSphere'}
            </h1>
          </div>
        </div>

        <div className='flex-1'>
          <ul className='space-y-2 py-4'>
            {sidebarItems.map((item, index) => {
              const isActive = isClient ? pathname === item.href : false;
              return (
                <li key={index}>
                  <Link href={item.href}>
                    <div
                      className={`
                        flex items-center py-3 px-4 rounded-lg mx-2
                        transition-colors cursor-pointer
                        ${isCollapsed ? 'justify-center' : ''}
                        ${
                          isActive
                            ? 'bg-gray-700 font-semibold'
                            : 'hover:bg-gray-800'
                        }
                      `}>
                      <item.icon className='text-xl flex-shrink-0' />
                      <span
                        className={`
                          ml-3 transition-all duration-300 whitespace-nowrap
                          ${
                            isCollapsed
                              ? 'opacity-0 w-0 overflow-hidden'
                              : 'opacity-100'
                          }
                        `}>
                        {item.name}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='p-4 border-t border-gray-700'>
          <div
            className={`
                flex items-center py-3 px-4 rounded-lg mx-2
                hover:bg-gray-800 transition-colors cursor-pointer
                ${isCollapsed ? 'justify-center' : ''}
              `}
            onClick={handleLogout}>
            <FaSignOutAlt className='text-xl flex-shrink-0' />
            <span
              className={`
                  ml-3 transition-all duration-300 whitespace-nowrap
                  ${
                    isCollapsed
                      ? 'opacity-0 w-0 overflow-hidden'
                      : 'opacity-100'
                  }
                `}>
              Logout
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          sidebar fixed top-0 left-0 z-50 md:hidden
          bg-gray-900 text-white h-full w-80 max-w-[85vw]
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
        `}>
        <div className='flex items-center justify-between p-4 border-b border-gray-700'>
          <h1 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>
            GigSphere
          </h1>
          <button
            onClick={closeMobileMenu}
            className='p-2 rounded-lg hover:bg-gray-800 transition-colors'
            aria-label='Close menu'>
            <FaTimes className='text-xl' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto'>
          <ul className='space-y-2 py-4'>
            {sidebarItems.map((item, index) => {
              const isActive = isClient ? pathname === item.href : false;
              return (
                <li key={index}>
                  <Link href={item.href}>
                    <div
                      className={`flex items-center py-4 px-6 transition-colors cursor-pointer
                          ${
                            isActive
                              ? 'bg-gray-700 font-semibold'
                              : 'hover:bg-gray-800'
                          }
                      `}
                      onClick={handleMobileLinkClick}>
                      <item.icon className='text-xl' />
                      <span className='ml-4 text-lg'>{item.name}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='p-4 border-t border-gray-700'>
          <div
            className='flex items-center py-4 px-6 hover:bg-gray-800 transition-colors cursor-pointer'
            onClick={handleLogout}>
            <FaSignOutAlt className='text-xl' />
            <span className='ml-4 text-lg'>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
