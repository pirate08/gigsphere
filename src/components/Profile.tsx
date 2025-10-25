'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import StatBox from '@/common/StatsBox';

interface UserProps {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  totalWork: number;
  openJobs: number;
  draftJobs: number;
  closedJobs: number;
}

const UserDetails: UserProps[] = [
  {
    id: 1,
    avatar: '/Avatar/avatar1.jpg',
    fullName: 'Mayukh Deb Goswami',
    email: 'tiklu@gmail.com',
    totalWork: 20,
    openJobs: 10,
    draftJobs: 4,
    closedJobs: 6,
  },
];

const ProfileUI = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex justify-center items-center py-8 px-4 sm:px-6 lg:px-10'>
      {UserDetails.map((user) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-3xl bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col items-center text-white'>
          {/* Avatar */}
          <div className='relative group'>
            <Image
              src={user.avatar}
              alt={user.fullName}
              width={140}
              height={110}
              className='rounded-full border-4 border-transparent group-hover:border-blue-500 transition-all duration-300 object-cover shadow-lg'
            />
            <div className='absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-20 blur-lg group-hover:opacity-40 transition duration-300'></div>
          </div>

          {/* Name & Email */}
          <div className='text-center mt-6'>
            <h2 className='text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>
              {user.fullName}
            </h2>
            <p className='text-gray-400 text-sm sm:text-base mt-2'>
              {user.email}
            </p>
          </div>

          {/* Divider */}
          <div className='w-full border-t border-gray-700 my-8'></div>

          {/* Stats Section */}
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full'>
            <StatBox label='Total Work' value={user.totalWork} />
            <StatBox label='Open Jobs' value={user.openJobs} />
            <StatBox label='Draft Jobs' value={user.draftJobs} />
            <StatBox label='Closed Jobs' value={user.closedJobs} />
          </div>

          {/* Divider */}
          <div className='w-full border-t border-gray-700 my-8'></div>

          {/* --Security Settings-- */}
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileUI;
