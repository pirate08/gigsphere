'use client';

import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/common/PasswordInput';
import toast from 'react-hot-toast';

const SettingUi = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');

  // --Handle password change--
  const handlePasswordChange = async () => {
    setIsSubmitting(true);
    console.log('Change Password Clicked');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center px-2'>
      <div className='w-full max-w-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-white'>
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
            <PasswordInput
              placeholder='Current Password'
              visible={currentPassword}
              value={currentValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCurrentValue(e.target.value);
              }}
              setVisible={setCurrentPassword}
              color='blue'
            />

            <PasswordInput
              placeholder='New Password'
              visible={newPassword}
              value={newValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewValue(e.target.value);
              }}
              setVisible={setNewPassword}
              color='green'
            />

            <PasswordInput
              placeholder='Confirm Password'
              visible={confirmPassword}
              value={confirmValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmValue(e.target.value);
              }}
              setVisible={setConfirmPassword}
              color='purple'
            />
          </div>

          {/* Buttons */}
          <div className='flex justify-end items-center gap-2 mt-7'>
            <button
              className='px-5 py-2 bg-gray-700 hover:bg-gray-600 text-sm md:text-base text-white rounded-lg transition-all duration-200 cursor-pointer'
              onClick={() => router.push('/find-work')}>
              Go Back
            </button>
            <button
              className='px-5 py-2 bg-violet-600 hover:bg-violet-700 text-sm md:text-base text-white rounded-lg transition-all duration-200 cursor-pointer'
              disabled={isSubmitting}
              onClick={handlePasswordChange}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingUi;
