import FreelancerProfile from '@/components/FreelancerProfile';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

interface FreelancerProfileProps {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  description: string;
  qualification: string[];
  skills: string[];
  yearsOfExperience: number;
  hourlyRate: number;
  location: string;
  portfolio: { name: string; description: string; url: string }[];
  certificates: { name: string; issuer?: string; date?: Date }[];
  experience: {
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    isCurrent: boolean;
    description?: string;
  }[];
}

interface StatsProps {
  totalApplied: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}

const Profile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;
  let profileData: FreelancerProfileProps[] = [];
  let dashboardStats: StatsProps | null = null;
  let error: string | null = null;
  let hasProfile = false;

  if (!token) {
    console.log('No authentication token found');
    return (
      <div>
        <p className='h-screen text-2xl flex justify-center items-center bg-black text-white'>
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  // --Fetch API (Get profile data)--
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    if (response.ok) {
      const data = await response.json();
      const apiData = data.responseData;

      // ✅ Check if profile exists before accessing it
      if (apiData.profile && apiData.profile._id) {
        hasProfile = true;
        profileData = [
          {
            _id: apiData.profile._id,
            fullName: apiData.fullName,
            email: apiData.email,
            avatar: apiData.avatar,
            description: apiData.profile.description,
            qualification: apiData.profile.qualification,
            skills: apiData.profile.skills,
            yearsOfExperience: apiData.profile.yearsOfExperience,
            hourlyRate: apiData.profile.hourlyRate,
            location: apiData.profile.location,
            portfolio: apiData.profile.portfolio,
            certificates: apiData.profile.certificates,
            experience: apiData.profile.experience,
          },
        ];
      } else {
        // Profile doesn't exist yet
        console.log('No profile found for this user');
        hasProfile = false;
      }
    } else {
      console.error(
        'Failed to fetch profile:',
        response.status,
        response.statusText
      );
      error = `Failed to fetch profile: ${response.statusText}`;
    }
  } catch (err) {
    console.log('Error in fetching profile', err);
    error = 'Error in fetching data. Please try again.';
  }

  // --Get Dashboard Stats (only if profile exists)--
  if (hasProfile) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/dashboard`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        }
      );

      if (res.ok) {
        const stats = await res.json();
        dashboardStats = stats.jobStats;
      } else {
        console.error('Failed to fetch stats:', res.status, res.statusText);
      }
    } catch (err) {
      console.log('Error in fetching stats', err);
    }
  }

  // ✅ Show "Create Profile" message if no profile exists
  if (!hasProfile) {
    return (
      <div className='h-screen flex flex-col justify-center items-center bg-black text-white'>
        <div className='text-center space-y-6 max-w-md px-4'>
          {/* Icon */}
          <div className='flex justify-center'>
            <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
              <svg
                className='w-10 h-10 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent'>
            No Profile Found
          </h2>

          {/* Description */}
          <p className='text-gray-400 text-lg'>
            You need to create your profile to start finding work and showcase
            your skills.
          </p>

          {/* Create Profile Button */}
          <Link
            href='/find-work/create-profile'
            className='inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transform hover:scale-105'>
            Create Your Profile
          </Link>

          {/* Additional Info */}
          <div className='pt-6 border-t border-gray-800'>
            <p className='text-sm text-gray-500'>
              Setting up your profile only takes a few minutes
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FreelancerProfile
        profileData={profileData}
        error={error}
        stats={
          dashboardStats || {
            totalApplied: 0,
            pendingApplications: 0,
            acceptedApplications: 0,
            rejectedApplications: 0,
          }
        }
      />
    </div>
  );
};

export default Profile;
