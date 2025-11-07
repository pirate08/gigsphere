'use client';

import SearchJobs from '@/ui/SearchJobsFreelancer';
import React, { useState } from 'react';
import JobFeedCard from './JobFeedCardSection';

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

interface Metadata {
  total: number;
  page: number;
  pages: number;
}

const JobFeed = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const handleJobsUpdate = (fetchedJobs: Job[], fetchedMetadata: Metadata) => {
    setJobs(fetchedJobs);
    setMetadata(fetchedMetadata);
  };

  return (
    <div className='mt-5'>
      {/* --Header-- */}
      <div>
        <h1 className='text-2xl font-bold md:text-4xl mt-2 md:mt-14'>
          Find{' '}
          <span className='bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent'>
            Work
          </span>
        </h1>

        {/* Jobs count and pagination info */}
        <p className='text-sm md:text-[16px] text-gray-400 mt-1'>
          Browse thousands of projects and find your next opportunity.
        </p>

        {/* Display job count */}
        {metadata && (
          <p className='text-sm text-gray-500 mt-2'>
            Showing {jobs.length} of {metadata.total} jobs (Page {metadata.page}{' '}
            of {metadata.pages})
          </p>
        )}
      </div>

      {/* --Search Feature-- */}
      <div>
        <SearchJobs onJobsUpdate={handleJobsUpdate} />
      </div>

      {/* --Job Cards-- */}
      <div>
        <JobFeedCard jobs={jobs} />
      </div>
    </div>
  );
};

export default JobFeed;
