import FreelanceJobDetails from '@/components/FreelanceJobDetails';
import React from 'react';
import { cookies } from 'next/headers';

// --Fetch api--
async function getJobDetails(id: string, token: string) {
  // Fix: Ensure proper URL formatting with trailing/leading slashes
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.endsWith('/')
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `${process.env.NEXT_PUBLIC_BASE_URL}/`;

  const url = `${baseUrl}api/freelancer/jobs/${id}`;

  //   console.log('Fetching from URL:', url); // Debug log

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  //   console.log('Response status:', response.status); // Debug log

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', errorText);
    throw new Error(`Failed to fetch job details: ${response.status}`);
  }

  const data = await response.json();
  //   console.log('Received data:', data);
  return data;
}

const JobDetails = async ({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) => {
  const { jobId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;

  //   console.log('JobId:', jobId); // Debug log
  //   console.log('Token exists:', !!token); // Debug log

  if (!token) {
    return (
      <div className='flex items-center justify-center h-screen bg-black text-white'>
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  try {
    const data = await getJobDetails(jobId, token);
    const job = data.data;

    if (!job) {
      return (
        <div className='flex items-center justify-center h-screen bg-black text-white'>
          <div className='text-yellow-400 text-center text-lg md:text-xl p-6'>
            Job not found.
          </div>
        </div>
      );
    }

    return <FreelanceJobDetails job={job} />;
  } catch (error) {
    console.error('Error in JobDetails component:', error); // Debug log

    return (
      <div className='flex items-center justify-center h-screen bg-black text-white'>
        <div className='text-red-400 text-center text-lg md:text-xl p-6'>
          <p>Error loading job details.</p>
          <p className='text-sm text-gray-400 mt-2'>
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }
};

export default JobDetails;
