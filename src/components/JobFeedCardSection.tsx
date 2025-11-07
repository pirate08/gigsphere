import JobCard from '@/common/JobCard';
import React from 'react';

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  budget: number;
  skills: string[];
  createdAt: string;
  hasApplied: boolean;
}

interface JobFeedCardProps {
  jobs: Job[];
}

const JobFeedCard: React.FC<JobFeedCardProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className='mt-6 h-screen text-center py-12 border-2 border-dashed border-gray-700 rounded-xl'>
        <p className='text-gray-400 text-lg'>No jobs found</p>
        <p className='text-gray-500 text-sm mt-2'>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className='mt-6 space-y-4'>
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          title={job.title}
          description={job.description}
          location={job.location}
          employmentType={job.employmentType}
          budget={job.budget}
          skills={job.skills}
          createdAt={new Date(job.createdAt)}
        />
      ))}
    </div>
  );
};

export default JobFeedCard;
