import React from 'react';
import {
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiUser,
  FiMail,
} from 'react-icons/fi';
import { BiTime, BiCheckCircle } from 'react-icons/bi';
import Link from 'next/link';
import FindWorkNavbar from '@/ui/FindWorkNavbar';
import { FaArrowLeft } from 'react-icons/fa';

// Define the Job interface to match the data structure
interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  budget: number;
  skills: string[];
  link: string;
  createdAt: string;
  hasApplied: boolean;
  // --- CLIENT ID ADDED ---
  clientId: {
    name: string;
    email: string;
  };
  // -----------------------
}

// Define the props interface for the component
interface JobDetailsProps {
  job: Job;
}

const FreelanceJobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  // Function to format the date string into a readable 'X days ago' format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  // Function to capitalize the employment type
  const formatEmploymentType = (type: string): string => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get badge color based on employment type
  const getBadgeColor = (type: string): string => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'part-time':
      case 'contract':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-400';
      case 'internship':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  // --- Component JSX ---
  return (
    <div className='min-h-screen bg-black text-white p-4 sm:p-8 lg:p-12'>
      <div className='max-w-7xl mx-auto'>
        {/* --Navbar-- */}
        <div>
          <FindWorkNavbar />
        </div>
        {/* Back Button Placeholder */}
        <div className='mb-6 mt-14 md:mt-10'>
          <Link
            href={'/find-work'}
            className='text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1 font-medium'>
            <FaArrowLeft /> Back to Job Listings
          </Link>
        </div>

        <div className='lg:flex lg:space-x-8'>
          {/* --- LEFT COLUMN: MAIN JOB CONTENT --- */}
          <div className='lg:flex-grow w-full lg:max-w-4xl'>
            <div className='bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl'>
              {/* Job Title & Type */}
              <div className='mb-6 border-b border-gray-700 pb-4'>
                <div className='flex items-start justify-between flex-wrap gap-4'>
                  <h1 className='text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent leading-tight'>
                    {job.title}
                  </h1>
                  <div
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border ${getBadgeColor(
                      job.employmentType
                    )} whitespace-nowrap self-start`}>
                    <div className='flex items-center gap-1.5'>
                      <FiBriefcase className='text-sm' />
                      {formatEmploymentType(job.employmentType)}
                    </div>
                  </div>
                </div>

                {/* Meta Info Row */}
                <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400 mt-3'>
                  <div className='flex items-center gap-1'>
                    <BiTime className='text-base text-gray-500' />
                    <span>Posted {formatDate(job.createdAt)}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <FiMapPin className='text-base text-gray-500' />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <h2 className='text-xl font-bold text-gray-200 mb-4'>
                Job Description
              </h2>
              <p className='text-gray-300 whitespace-pre-wrap leading-relaxed mb-8'>
                {job.description}
              </p>

              {/* Required Skills */}
              <h2 className='text-xl font-bold text-gray-200 mb-4 border-t border-gray-700 pt-6'>
                Required Skills & Expertise
              </h2>
              <div className='flex flex-wrap gap-3'>
                {job.skills && job.skills.length > 0 ? (
                  job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className='px-4 py-1.5 bg-gray-700 border border-gray-600 rounded-full text-sm font-medium text-gray-300'>
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className='text-gray-500'>
                    No specific skills listed.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN CONTAINER --- */}
          <div className='w-full lg:w-96 mt-8 lg:mt-0'>
            {/* ACTION PANEL (Sticky on desktop) */}
            <div className='lg:sticky lg:top-8'>
              <div className='bg-gray-800/80 border border-gray-700/50 rounded-2xl p-6 shadow-2xl mb-8'>
                {/* Budget / Rate */}
                <div className='mb-6 pb-4 border-b border-gray-700'>
                  <p className='text-lg font-semibold text-gray-400 mb-1'>
                    Project Budget / Rate
                  </p>
                  <div className='flex items-center gap-2 text-green-400 font-extrabold text-3xl'>
                    <FiDollarSign className='text-4xl' />
                    <span>${job.budget.toLocaleString()}</span>
                  </div>
                </div>

                {/* Application Status */}
                <div className='mb-6'>
                  <p className='text-lg font-semibold text-gray-400 mb-2'>
                    Application Status
                  </p>
                  {job.hasApplied ? (
                    <div className='flex items-center gap-2 text-purple-400 bg-purple-900/40 border border-purple-700/50 p-3 rounded-xl'>
                      <BiCheckCircle className='text-xl' />
                      <span className='font-medium'>
                        You have already applied!
                      </span>
                    </div>
                  ) : (
                    <div className='text-gray-500 bg-gray-700/30 p-3 rounded-xl'>
                      Applications are still open.
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  disabled={job.hasApplied}
                  className={`w-full py-3 rounded-lg text-lg font-bold transition-all cursor-pointer ${
                    job.hasApplied
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-green-500/40'
                  }`}>
                  {job.hasApplied ? 'Applied' : 'Apply Now'}
                </button>
              </div>

              {/* --- CLIENT SECTION (New Addition) --- */}
              <div className='bg-gray-800/80 border border-gray-700/50 rounded-2xl p-6 shadow-2xl'>
                <h3 className='text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-3'>
                  About the Client
                </h3>

                {/* Client Name */}
                <div className='flex items-center gap-3 mb-3'>
                  <FiUser className='text-lg text-green-400' />
                  <p className='text-lg font-semibold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent'>
                    {job.clientId.name}
                  </p>
                </div>

                {/* Client Email */}
                <div className='flex items-center gap-3'>
                  <FiMail className='text-lg text-green-400' />
                  <a
                    href={`mailto:${job.clientId.email}`}
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors break-all'>
                    {job.clientId.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceJobDetails;
