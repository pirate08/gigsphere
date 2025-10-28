import ProfileUI from '@/components/Profile';
import { cookies } from 'next/headers';
import React from 'react';

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

const Profile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;

  // 1. Authentication Check
  if (!token) {
    console.log('No authentication token found');
    return (
      <div className='h-screen text-2xl flex justify-center items-center bg-black text-white'>
        You must be logged in to view this page.
      </div>
    );
  }

  let profileData: UserProps[] = [];

  // 2. Data Fetching and Extraction
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`Error fetching profile data: ${response.status}`);
      return <div>Failed to load profile data. Status: {response.status}.</div>;
    }

    const data = await response.json();
    // console.log('Fetched profile data (raw):', data);

    const userProfile = data;

    if (userProfile) {
      if (Array.isArray(userProfile) && userProfile.length > 0) {
        // Case 1: API returned a non-empty array
        profileData = userProfile as UserProps[];
      } else if (
        // Case 2: API returned a single, non-empty object
        !Array.isArray(userProfile) &&
        typeof userProfile === 'object' &&
        Object.keys(userProfile).length > 0
      ) {
        // Wrap the single object in an array for ProfileUI
        profileData = [userProfile as UserProps];
      } else {
        // Case 3: data.profile exists but is empty ({}, []) or malformed
        console.warn(
          'API returned OK status, but user profile data is empty or malformed.'
        );
      }
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return <div>An unexpected network error occurred.</div>;
  }

  // 3. Final Render Check
  if (profileData.length === 0) {
    return (
      <div className='h-screen text-2xl flex justify-center items-center bg-gray-900 text-red-400'>
        Profile data is currently unavailable.
      </div>
    );
  }

  return (
    <div>
      <ProfileUI profileData={profileData} />
    </div>
  );
};

export default Profile;
