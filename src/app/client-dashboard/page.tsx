'use client';

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('user_token');
    const role = getCookie('user_role');

    if (!token || !role) {
      router.push('/login');
      return;
    }

    if (role !== 'client') {
      router.push('/');
      return;
    }
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white px-6'>
      <h1 className='text-3xl font-bold mb-4'>
        Welcome to Your Client Dashboard 🎯
      </h1>
      <p className='text-lg text-gray-300 max-w-2xl text-center'>
        Here you can manage all your job postings and applications.
        <br />
        Start by creating a new job, reviewing your active listings, or browsing
        applicants who have applied to your jobs.
      </p>

      <div className='mt-6 space-y-2 text-center text-gray-400'>
        <p>✅ Post new jobs to find the right talent</p>
        <p>✅ View and edit your active job listings</p>
        <p>✅ Review applications and manage applicants</p>
        <p>✅ Accept or reject freelancers easily</p>
      </div>

      <p className='mt-8 text-sm text-gray-500 italic'>
        Tip: Head over to <span className='font-semibold'>All Jobs</span> to see
        your active listings.
      </p>
    </div>
  );
};

export default Page;
