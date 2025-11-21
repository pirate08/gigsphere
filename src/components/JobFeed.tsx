'use client';

import SearchJobs from '@/ui/SearchJobsFreelancer';
import React, { useState } from 'react';
import JobFeedCard from './JobFeedCardSection';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons for pagination

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  budget: number;
  skills: string[];
  createdAt: string;
  link: string;
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
  // 1. New State for current page
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleJobsUpdate = (fetchedJobs: Job[], fetchedMetadata: Metadata) => {
    setJobs(fetchedJobs);
    setMetadata(fetchedMetadata);
  };

  // New handler for page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && metadata && page <= metadata.pages) {
      setCurrentPage(page);
      // The SearchJobs component will handle the actual fetch via useEffect
    }
  };

  // Helper component to render the pagination controls
  const PaginationControls = () => {
    if (!metadata || metadata.pages <= 1) return null;

    const { page, pages } = metadata;

    return (
      <div className='flex justify-center items-center gap-4 mt-8 pb-10'>
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
          <FaChevronLeft className='text-xs' /> Previous
        </button>

        {/* Current Page Indicator */}
        <span className='text-sm text-white font-semibold'>
          Page {page} of {pages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pages}
          className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
          Next <FaChevronRight className='text-xs' />
        </button>
      </div>
    );
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
        {/* Pass currentPage and setCurrentPage to SearchJobs */}
        <SearchJobs
          onJobsUpdate={handleJobsUpdate}
          currentPage={currentPage} // Pass the state
          setCurrentPage={setCurrentPage} // Pass the setter
        />
      </div>

      {/* --Job Cards-- */}
      <div>
        <JobFeedCard jobs={jobs} />
      </div>

      {/* --Pagination Controls-- */}
      <PaginationControls />
    </div>
  );
};

export default JobFeed;
