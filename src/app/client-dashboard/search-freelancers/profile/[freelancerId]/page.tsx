import SearchFreelancerProfileUI from '@/components/SearchFreelancerProfileUI';
import { cookies } from 'next/headers';
import React from 'react';

import { getProfileData, FreelancerProfileProps } from '@/lib/freelancer-api';

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

    // Pass the fetched data (profile) to the client component
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
