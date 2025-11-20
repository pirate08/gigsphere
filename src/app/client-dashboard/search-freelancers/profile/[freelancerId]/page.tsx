import SearchFreelancerProfileUI from '@/components/SearchFreelancerProfileUI';
import { cookies } from 'next/headers';
import React from 'react';

interface FreelancerProfileProps {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
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

export async function getProfileData(id: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/freelancers/${id}/profile`,
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
    throw new Error('Failed to fetch freelancer profile data');
  }
  return response.json();
}

const SearchFreelancerProfile = async ({
  params,
}: {
  params: Promise<{ freelancerId: string }>;
}) => {
  const { freelancerId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;

  if (!token) {
    return (
      <div className='flex items-center justify-center h-screen bg-black text-white'>
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  try {
    const data = await getProfileData(freelancerId, token);
    const profile: FreelancerProfileProps = data.freelancer;

    return <SearchFreelancerProfileUI profile={profile} />;
  } catch {
    return (
      <div className='flex items-center justify-center h-screen bg-black text-white'>
        <div className='text-red-400 text-center text-lg md:text-xl p-6'>
          Error loading job details.
        </div>
      </div>
    );
  }
};

export default SearchFreelancerProfile;
