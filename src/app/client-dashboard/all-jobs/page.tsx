import AllJobsComponent from '@/components/AllJobs';
import React from 'react';
import { cookies } from 'next/headers';

// Define the Job interface to match backend
interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  budget: number;
  skills: string[];
  clientId: string;
  status: 'open' | 'closed' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const AllJobs = async () => {
  // Get the cookies instance
  const cookieStore = await cookies();

  // Fetch the token from the cookie
  const token = cookieStore.get('user_token')?.value;

  // Fetch All jobs here
  let jobs: Job[] = [];
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

  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/my-jobs`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Fixed: Include the actual token
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (data.ok) {
      const res = await data.json();
      jobs = res.jobs || [];
    } else {
      console.error('Failed to fetch jobs:', data.status, data.statusText);
      error = `Failed to fetch jobs: ${data.statusText}`;
    }
  } catch (err) {
    console.log('Unable to fetch all jobs...', err);
    error = 'Error in fetching data. Please try again.';
  }

  return (
    <div>
      <AllJobsComponent jobs={jobs} error={error} />
    </div>
  );
};

export default AllJobs;
