import { cookies } from 'next/headers';
import JobDetailsPage from '@/components/JobDetailsPage';

async function getJobDetails(id: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/jobs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch job details');
  }
  return res.json();
}

const JobDetails = async ({
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
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  try {
    const data = await getJobDetails(jobId, token);
    const job = data.job;

    return <JobDetailsPage job={job} />;
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

export default JobDetails;
