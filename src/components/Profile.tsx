'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatBox from '@/common/StatsBox';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/common/PasswordInput';

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
    avatar: 'M',
    fullName: 'Mayukh Deb Goswami',
    email: 'tiklu@gmail.com',
    totalWork: 20,
    openJobs: 10,
    draftJobs: 4,
    closedJobs: 6,
  },
];

const ProfileUI = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState(UserDetails[0].fullName);
  const [editEmail, setEditEmail] = useState(UserDetails[0].email);

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
            <h1 className='h-28 w-28 object-fit rounded-full flex items-center justify-center text-3xl md:text-5xl bg-white z-50 text-black'>
              {user.avatar}
            </h1>
            <div className='absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-20 blur-lg group-hover:opacity-40 transition duration-300'></div>
          </div>

          {/* Editable Name & Email */}
          <div className='w-full mt-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='text-center sm:text-left w-full'>
              {isEditing ? (
                <div className='space-y-3'>
                  <input
                    type='text'
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className='w-full bg-gray-800/70 border border-blue-500 rounded-lg px-4 py-2 text-white text-center sm:text-left focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <input
                    type='email'
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className='w-full bg-gray-800/70 border border-blue-500 rounded-lg px-4 py-2 text-white text-center sm:text-left focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              ) : (
                <div>
                  <h2 className='text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>
                    {editName}
                  </h2>
                  <p className='text-gray-400 text-sm sm:text-base mt-1'>
                    {editEmail}
                  </p>
                </div>
              )}
            </div>

            {/* Edit or Save/Cancel Buttons */}
            <div className='flex items-center justify-center sm:justify-end w-full sm:w-auto gap-3 mt-4 sm:mt-0'>
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className='p-2 rounded-full bg-red-600 hover:bg-red-500 transition duration-200'>
                    <FaTimes />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)} // replace with save function later
                    className='p-2 rounded-full bg-green-600 hover:bg-green-500 transition duration-200'>
                    <FaCheck />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-200'>
                  <FaPen />
                </button>
              )}
            </div>
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

          {/* Security Settings */}
          <div className='w-full max-w-md mx-auto'>
            <div className='flex items-center justify-center gap-2'>
              <FaLock className='text-blue-400' />
              <h3 className='text-lg font-semibold'>Security Settings</h3>
            </div>
            <p className='text-center text-sm text-gray-400 mt-1'>
              Manage your password and security settings
            </p>

            {/* Input Fields */}
            <div className='space-y-5 mt-7'>
              {/* Current Password */}
              <PasswordInput
                placeholder='Current Password'
                visible={currentPassword}
                setVisible={setCurrentPassword}
                color='blue'
              />

              {/* New Password */}
              <PasswordInput
                placeholder='New Password'
                visible={newPassword}
                setVisible={setNewPassword}
                color='green'
              />

              {/* Confirm Password */}
              <PasswordInput
                placeholder='Confirm Password'
                visible={confirmPassword}
                setVisible={setConfirmPassword}
                color='purple'
              />
            </div>

            {/* Buttons */}
            <div className='flex justify-end items-center gap-2 mt-7'>
              <button
                className='px-5 py-2 bg-gray-700 hover:bg-gray-600 text-sm md:text-base text-white rounded-lg transition-all duration-200 cursor-pointer'
                onClick={() => router.back()}>
                Go Back
              </button>
              <button className='px-5 py-2 bg-blue-600 hover:bg-blue-500 text-sm md:text-base text-white rounded-lg transition-all duration-200 cursor-pointer'>
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileUI;
