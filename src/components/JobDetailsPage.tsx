'use client';

import Edit from '@/ui/EditSection';
import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaUsers, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

// Define the Job interface to match the data structure
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

// Define the props interface for the component
interface JobDetailsProps {
  job: Job;
}

// NEW: Interface for the Edit component's props
export interface EditComponentProps {
  job: Job;
  closeModel: () => void;
}

const JobDetailsPage: React.FC<JobDetailsProps> = ({ job }) => {
  const router = useRouter();
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [totalApplicants, setTotalApplicants] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --Function to handle the Model--
  const openModel = () => {
    setModelOpen(!modelOpen);
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const handleDelete = async () => {
    // --Console to check if the delete button is working--
    console.log('Delete button clicked');

    // --Model popup for delete confirmation--
    if (
      !window.confirm(
        `Are you sure you want to delete this ${job.title}? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);

    const token = getCookie('user_token');

    if (!token) {
      toast.error('You must be logged in to delete a job.');
      setIsDeleting(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/jobs/${job._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success('Job deleted successfully!');
        // Redirect to the jobs listing page or another appropriate page
        router.push('/client-dashboard/all-jobs');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete the job. Please try again.');
      setIsDeleting(false);
    }
  };

  // ✅ Fixed: Proper useEffect implementation
  useEffect(() => {
    const fetchTotalApplicants = async () => {
      try {
        const token = getCookie('user_token');
        if (!token) {
          toast.error('You must be logged in to view applicants.');
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/jobs/${job._id}/applications`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log('Total applicants fetched:', data.totalApplications);
          setTotalApplicants(data.totalApplications || 0);
        } else {
          toast.error('Failed to fetch total applicants.');
        }
      } catch (error) {
        console.error('Error fetching total applicants:', error);
        toast.error('Failed to fetch total applicants.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalApplicants();
  }, [job._id]);

  // Handle view applicants
  const handleViewApplicants = () => {
    router.push(`/client-dashboard/job-details/${job._id}/applicants`);
  };

  return (
    <div className='bg-black text-white p-4 sm:p-6 lg:p-8 min-h-screen'>
      {modelOpen ? (
        <div className='cursor-pointer'>
          <Edit job={job} closeModel={closeModel} />
        </div>
      ) : (
        <>
          <div className='w-full max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-700'>
            {/* Header Section */}
            <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6'>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600 break-words'>
                {job.title}
              </h1>
              <div className='flex flex-wrap gap-2 lg:flex-nowrap lg:gap-3'>
                {/* Status */}
                <span
                  className={`px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold border whitespace-nowrap ${getStatusBadgeColor(
                    job.status
                  )}`}>
                  {job.status.toUpperCase()}
                </span>
                {/* Edit */}
                <button
                  className='px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold border bg-green-700/100 cursor-pointer hover:bg-green-600 transition-colors whitespace-nowrap flex items-center gap-1'
                  onClick={openModel}>
                  <span>
                    <MdEdit />
                  </span>
                  Edit
                </button>
                {/* Delete */}
                <button
                  className='px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-semibold border bg-red-700/100 cursor-pointer hover:bg-red-600 transition-colors whitespace-nowrap flex items-center gap-1'
                  onClick={handleDelete}
                  disabled={isDeleting}>
                  <span>
                    <MdDelete />
                  </span>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>

            {/* Description Section */}
            <div className='mb-6 text-gray-400 border-b border-gray-700 pb-6'>
              <h2 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-3'>
                Description
              </h2>
              <p className='text-gray-300 leading-relaxed text-sm sm:text-base break-words whitespace-pre-line'>
                {job.description}
              </p>
            </div>

            {/* Job Details Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>
                <h3 className='text-base sm:text-lg font-medium text-gray-400 sm:w-1/2'>
                  Location:
                </h3>
                <span className='text-white font-semibold text-sm sm:text-base break-words'>
                  {job.location}
                </span>
              </div>
              <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>
                <h3 className='text-base sm:text-lg font-medium text-gray-400 sm:w-1/2'>
                  Employment Type:
                </h3>
                <span className='text-white font-semibold capitalize text-sm sm:text-base'>
                  {job.employmentType.replace('-', ' ')}
                </span>
              </div>
              <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>
                <h3 className='text-base sm:text-lg font-medium text-gray-400 sm:w-1/2'>
                  Budget:
                </h3>
                <span className='text-green-400 font-bold text-sm sm:text-base'>
                  {job.budget.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
              </div>
              <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0'>
                <h3 className='text-base sm:text-lg font-medium text-gray-400 sm:w-1/2'>
                  Posted:
                </h3>
                <span className='text-white text-sm sm:text-base'>
                  {new Date(job.createdAt).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>

            {/* Skills Section */}
            <div className='border-t border-gray-700 pt-6'>
              <h2 className='text-lg sm:text-xl font-semibold text-gray-400 mb-3 sm:mb-4'>
                Skills Required
              </h2>
              <div className='flex flex-wrap gap-2 sm:gap-3'>
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 break-words'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Applicants Section */}
          <div className='w-full max-w-6xl mx-auto mt-6 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gradient-to-r from-blue-600 to-green-600'>
                  <tr>
                    <th className='px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider'>
                      <div className='flex items-center gap-2'>
                        <FaUsers className='text-base sm:text-lg' />
                        <span>Total Applicants</span>
                      </div>
                    </th>
                    <th className='px-4 sm:px-6 py-4 text-center text-xs sm:text-sm font-semibold text-white uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                  <tr className='hover:bg-gray-750 transition-colors'>
                    <td className='px-4 sm:px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-3'>
                        <div className='flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center'>
                          <span className='text-lg sm:text-xl font-bold text-white'>
                            {isLoading ? '...' : totalApplicants}
                          </span>
                        </div>
                        <div>
                          <div className='text-sm sm:text-base font-medium text-white'>
                            {isLoading
                              ? 'Loading...'
                              : `${totalApplicants} Candidate${
                                  totalApplicants !== 1 ? 's' : ''
                                } Applied`}
                          </div>
                          <div className='text-xs sm:text-sm text-gray-400'>
                            for {job.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 sm:px-6 py-4 text-center'>
                      <button
                        onClick={handleViewApplicants}
                        className='inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'>
                        <FaEye className='text-sm sm:text-base' />
                        <span>View List</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Helper function for status badge color
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

export default JobDetailsPage;
