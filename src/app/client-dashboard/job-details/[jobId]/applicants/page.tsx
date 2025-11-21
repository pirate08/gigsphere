import Applicants from '@/components/Applicants';
import { cookies } from 'next/headers';
import React from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Application {
  _id: string;
  jobId: string;
  userId: User;
  status: 'pending' | 'accepted' | 'rejected';
  coverLetter: string;
  isMessaged: boolean;
  appliedAt: string;
  __v: number;
  freelancerProfileId: string | null;
}

interface ApplicantsResponse {
  applications: Application[];
  jobTitle: string;
  totalApplications: number;
}

const ApplicantList = async ({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) => {
  const { jobId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;

  if (!token) {
    return (
      <div className='flex items-center justify-center h-screen bg-black text-white'>
        <p className='text-red-400'>You must be logged in to view this page.</p>
      </div>
    );
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/jobs/${jobId}/applications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch applicants');
    }

    const data: ApplicantsResponse = await res.json();

    return (
      <div>
        <Applicants
          jobId={jobId}
          jobTitle={data.jobTitle}
          initialApplicants={data.applications}
          totalApplicants={data.totalApplications}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return (
      <div className='flex items-center justify-center h-screen bg-black text-white'>
        <div className='text-center'>
          <p className='text-red-400 text-xl mb-4'>Error loading applicants</p>
          <p className='text-gray-400'>
            Please try again later or contact support.
          </p>
        </div>
      </div>
    );
  }
};

export default ApplicantList;
