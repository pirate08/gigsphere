import SearchJobs from '@/ui/SearchJobsFreelancer';
import React from 'react';
import JobFeedCard from './JobFeedCardSection';

const JobFeed = () => {
  return (
    <div className='mt-5'>
      {/* --Header-- */}
      {/* Title */}
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
      </div>

      {/* --Search Feature goes here-- */}
      <div>
        <SearchJobs />
      </div>

      {/* --Job Card goes here-- */}
      <div>
        <JobFeedCard />
      </div>
    </div>
  );
};

export default JobFeed;
