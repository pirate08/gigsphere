import FreelancerProfile from '@/components/FreelancerProfile';
import { cookies } from 'next/headers';
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
  // --Fetching the token--
  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;
  let profileData: FreelancerProfileProps[] = [];
  let dashboardStats: StatsProps | null = null;
  let error: string | null = null;

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

  // --Fetch api goes here (Get profile data)--
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
      // console.log(data.responseData);

      // Flatten the API response to match the component's expected structure
      const apiData = data.responseData;
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

  // --Get Dashboard Stats--

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
      // console.log(dashboardStats);
    } else {
      console.error('Failed to fetch profile:', res.status, res.statusText);
      error = `Failed to fetch stats: ${res.statusText}`;
    }
  } catch (err) {
    console.log('Error in fetching stats', err);
    error = 'Error in fetching stats. Please try again';
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
