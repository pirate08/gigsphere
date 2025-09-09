'use client';

import React, { useState, useMemo } from 'react';
import { FaDollarSign } from 'react-icons/fa';

// Define the Job interface
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

// Define the props for this component
interface AllJobsComponentProps {
  jobs: Job[];
  error: string | null;
}

const AllJobsComponent = ({ jobs, error }: AllJobsComponentProps) => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8); // Number of jobs per page

  // Calculate pagination
  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;

  // Get current jobs for the page
  const currentJobs = useMemo(() => {
    return jobs.slice(startIndex, endIndex);
  }, [jobs, startIndex, endIndex]);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show smart pagination
      if (currentPage <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show middle pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Status color logic
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Error state
  if (error) {
    return (
      <div className='flex items-center justify-center h-screen bg-black text-white'>
        <div className='text-red-400 text-center text-lg md:text-xl p-6 border border-red-500/50 rounded-lg bg-red-500/10'>
          <div className='mb-2'>❌ Error</div>
          {error}
        </div>
      </div>
    );
  }

  // Empty state
  if (jobs.length === 0) {
    return (
      <div className='flex items-center justify-center h-screen bg-black text-white'>
        <div className='text-gray-400 text-center text-lg md:text-xl p-6 border border-gray-500/50 rounded-lg bg-gray-500/10'>
          <div className='mb-4 text-4xl'>📋</div>
          <div className='mb-2 font-semibold'>No Jobs Found</div>
          <p className='text-gray-500'>
            Create your first job posting to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='text-white p-4 md:p-8 bg-black min-h-screen'>
      {/* Title */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold md:text-4xl mt-2 md:mt-14'>
          All{' '}
          <span className='bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent'>
            Jobs
          </span>
        </h1>

        {/* Jobs count and pagination info */}
        <div className='text-sm text-gray-400 mt-2 md:mt-14'>
          Showing {startIndex + 1}-{Math.min(endIndex, totalJobs)} of{' '}
          {totalJobs} jobs
        </div>
      </div>

      {/* Jobs Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {currentJobs.map((job) => (
          <div
            key={job._id}
            className='bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 flex flex-col justify-between border border-gray-700/50 hover:border-blue-400/50 hover:shadow-blue-500/10 hover:shadow-xl transition-all duration-300 cursor-pointer group'>
            <div>
              {/* Status Badge */}
              <div className='flex justify-end mb-4'>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(
                    job.status
                  )}`}>
                  {job.status.toUpperCase()}
                </span>
              </div>

              {/* Job Title */}
              <h3 className='text-lg md:text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300'>
                {job.title}
              </h3>

              {/* Job Description */}
              <p className='text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed'>
                {job.description}
              </p>

              {/* Skills Section - Fixed UI */}
              <div className='mb-4'>
                <h4 className='text-xs font-medium text-gray-300 mb-2 uppercase tracking-wide'>
                  Skills Required
                </h4>
                <div className='flex flex-wrap gap-1.5'>
                  {job.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200'>
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-500/20 text-gray-300 border border-gray-500/30'>
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Job Details Section */}
            <div className='mt-auto pt-4 border-t border-gray-700/50'>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 flex items-center'>
                    <svg
                      className='w-4 h-4 mr-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    Location:
                  </span>
                  <span className='font-semibold text-white'>
                    {job.location}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 flex items-center'>
                    <svg
                      className='w-4 h-4 mr-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h2a2 2 0 012 2v1M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2'
                      />
                    </svg>
                    Type:
                  </span>
                  <span className='font-semibold text-white capitalize'>
                    {job.employmentType.replace('-', ' ')}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-gray-400 flex items-center'>
                    <span className='w-4 h-4 mr-1'>
                      <FaDollarSign />
                    </span>
                    Budget:
                  </span>
                  <span className='text-green-400 font-bold text-base'>
                    ${job.budget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className='mt-12 flex justify-center items-center'>
          <nav className='flex items-center space-x-2'>
            {/* Previous Button */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className='px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === '...' ? (
                  <span className='px-3 py-2 text-gray-500'>...</span>
                ) : (
                  <button
                    onClick={() => goToPage(pageNumber as number)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      currentPage === pageNumber
                        ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500'
                    }`}>
                    {pageNumber}
                  </button>
                )}
              </React.Fragment>
            ))}

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className='px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </nav>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className='mt-6 text-center text-sm text-gray-400'>
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
};

export default AllJobsComponent;
