'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatBox from '@/common/StatsBox';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/common/PasswordInput';
import toast from 'react-hot-toast';
import { getCookie, deleteCookie } from 'cookies-next';

// These interfaces are correct and do not need changes
interface UserProps {
  id: number;
  avatar: string;
  name: string;
  email: string;
  totalWork: number;
  openJobs: number;
  draftJobs: number;
  closedJobs: number;
}

interface ProfileUIProps {
  profileData: UserProps[];
}

// ⭐️ FIX 1: Explicitly type the props object (ProfileUIProps)
const ProfileUI = ({ profileData }: ProfileUIProps) => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');

  const initialUser = profileData[0];

  const [editName, setEditName] = useState(initialUser?.name || '');
  const [editEmail, setEditEmail] = useState(initialUser?.email || '');

  // Use a fallback just in case the array is empty
  if (!initialUser) {
    return (
      <div className='text-white text-center p-10'>No user data available.</div>
    );
  }

  // --Handling Api Call-
  const handleSave = async () => {
    if (initialUser.name === editName && initialUser.email === editEmail) {
      toast.error('No changes made to save.');
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);
    const token = getCookie('user_token');
    if (!token) {
      toast.error('User not authenticated.');
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Saving changes...');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/profile/details`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: editName,
            email: editEmail,
          }),
        }
      );
      if (response.ok) {
        toast.success('Profile updated successfully!', { id: loadingToast });
        setIsEditing(false);
        router.refresh();
      } else {
        const errorData = await response.json();
        toast.error(`Update failed: ${errorData.message || 'Server Error'}`, {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error('An error occurred while saving changes.');
      console.error('Error saving profile changes:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --Cancel Function--
  const handleCancel = () => {
    setEditName(initialUser.name);
    setEditEmail(initialUser.email);
    setIsEditing(false);
    toast.dismiss();
    toast('Changes discarded.', { icon: '👋' });
  };

  // --Handle password change--
  const handlePasswordChange = async () => {
    // --Input Validation--
    if (!currentValue || !newValue || !confirmValue) {
      toast.error('All password fields are required');
      return;
    }

    if (newValue !== confirmValue) {
      toast.error('New Password and Confirm Password do not match.');
      return;
    }

    if (newValue.length < 6) {
      toast.error('New password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    const token = getCookie('user_token');

    if (!token) {
      toast.error('User not authenticated.');
      setIsSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Changing password...');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/profile/password`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: currentValue,
            newPassword: newValue,
            confirmPassword: confirmValue,
          }),
        }
      );

      if (response.ok) {
        toast.success('Password changed successfully!', { id: loadingToast });
        // --Clear all the inputs--
        setCurrentValue('');
        setNewValue('');
        setConfirmValue('');

        // --Send the user to logout--
        deleteCookie('user_token');
        deleteCookie('user_role');
        router.push('/login');
      } else {
        const errorData = await response.json();
        toast.error(`Update failed: ${errorData.message || 'Server Error'}`, {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error('An unexpected network error occurred.');
      console.error('Error changing password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex justify-center items-center py-8 px-4 sm:px-6 lg:px-10'>
      {profileData.map((data: UserProps) => (
        <motion.div
          key={data.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-3xl bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col items-center text-white'>
          {/* Avatar */}
          <div className='relative group'>
            <h1 className='h-28 w-28 object-fit rounded-full flex items-center justify-center text-3xl md:text-5xl bg-white z-50 text-black'>
              {data.avatar}
            </h1>
            <div className='absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-green-500 opacity-20 blur-lg group-hover:opacity-40 transition duration-300'></div>
          </div>

          {/* Editable Name & Email - Using editName/editEmail state values here */}
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
                    onClick={handleCancel}
                    className='p-2 rounded-full bg-red-600 hover:bg-red-500 transition duration-200 cursor-pointer'
                    disabled={isSubmitting}>
                    <FaTimes />
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className='p-2 rounded-full bg-green-600 hover:bg-green-500 transition duration-200 cursor-pointer'>
                    <FaCheck />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-200 cursor-pointer'>
                  <FaPen />
                </button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className='w-full border-t border-gray-700 my-8'></div>

          {/* Stats Section - Using the map element 'data' */}
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full'>
            <StatBox label='Total Work' value={data.totalWork} />
            <StatBox label='Open Jobs' value={data.openJobs} />
            <StatBox label='Draft Jobs' value={data.draftJobs} />
            <StatBox label='Closed Jobs' value={data.closedJobs} />
          </div>

          {/* ... Security Settings ... */}
          <div className='w-full border-t border-gray-700 my-8'></div>
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
                onClick={() => router.back()}>
                Go Back
              </button>
              <button
                className='px-5 py-2 bg-blue-600 hover:bg-blue-500 text-sm md:text-base text-white rounded-lg transition-all duration-200 cursor-pointer'
                disabled={isSubmitting}
                onClick={handlePasswordChange}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileUI;
