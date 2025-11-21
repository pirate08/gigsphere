'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  FaUserCircle,
  FaEye,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaEnvelope,
  FaClock,
} from 'react-icons/fa';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';

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

interface ApplicantsProps {
  jobId: string;
  jobTitle: string;
  initialApplicants: Application[];
  totalApplicants: number;
}

const Applicants: React.FC<ApplicantsProps> = ({
  jobId,
  jobTitle,
  initialApplicants,
  totalApplicants,
}) => {
  const router = useRouter();
  const [applicants, setApplicants] =
    useState<Application[]>(initialApplicants);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [expandedCoverLetter, setExpandedCoverLetter] = useState<string | null>(
    null
  );

  const handleStatusUpdate = async (
    applicationId: string,
    status: 'accepted' | 'rejected'
  ) => {
    const token = getCookie('user_token');

    if (!token) {
      toast.error('You must be logged in');
      return;
    }

    setUpdatingStatus(applicationId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/applicants/${applicationId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        toast.success(`Application ${status} successfully`);
        // Update local state
        setApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          )
        );
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred while updating status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleViewProfile = (freelancerProfileId: string | null) => {
    if (!freelancerProfileId) {
      toast.error('Profile not found');
      return;
    }
    router.push(
      `/client-dashboard/search-freelancers/profile/${freelancerProfileId}`
    );
  };

  const toggleCoverLetter = (applicationId: string) => {
    setExpandedCoverLetter((prev) =>
      prev === applicationId ? null : applicationId
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='w-full sm:max-w-6xl mx-auto mt-8  space-y-4 pb-8'>
      {/* Total number and back button */}
      <div className='flex items-start sm:items-center sm:justify-between flex-col sm:flex-row gap-4 mb-5'>
        {/* Total Applicants Number */}
        <div className='bg-white px-5 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md'>
          <h1 className='text-lg font-bold text-gray-800'>
            Total Applicants: {totalApplicants.toString().padStart(2, '0')}
          </h1>
          <p className='text-sm text-gray-600 mt-1'>for {jobTitle}</p>
        </div>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className='bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-600 
          transition-colors shadow-md flex items-center gap-2 cursor-pointer'>
          <FaArrowLeft />
          <span>Go back to job details</span>
        </button>
      </div>

      {/* No Applicants Message */}
      {applicants.length === 0 ? (
        <div className='bg-gray-900 border border-gray-700 rounded-xl p-8 text-center'>
          <p className='text-gray-400 text-lg'>
            No applicants yet for this job.
          </p>
        </div>
      ) : (
        /* List view render here */
        applicants.map((application, index) => (
          <div
            key={application._id}
            className='bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-xl
          hover:border-gray-600 transition-all'>
            {/* Main Content Row */}
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4'>
              {/* Serial Number + Left Section */}
              <div className='flex items-start gap-4 flex-1'>
                {/* Serial Number */}
                <div className='text-white text-xl font-bold w-8 text-center flex-shrink-0 mt-1'>
                  {index + 1}
                </div>

                <FaUserCircle className='text-5xl text-blue-400 flex-shrink-0 mt-1' />

                <div className='flex-1 min-w-0'>
                  <h3 className='text-xl font-semibold text-white mb-1'>
                    {application.userId.name}
                  </h3>

                  {/* Email and Date */}
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400 mb-2'>
                    <div className='flex items-center gap-2'>
                      <FaEnvelope className='flex-shrink-0' />
                      <span className='truncate'>
                        {application.userId.email}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FaClock className='flex-shrink-0' />
                      <span>
                        Applied on {formatDate(application.appliedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      application.status === 'accepted'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : application.status === 'rejected'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                    {application.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Buttons Section */}
              <div className='flex flex-wrap lg:flex-col gap-2 w-full lg:w-auto lg:min-w-[160px]'>
                <button
                  onClick={() =>
                    handleViewProfile(application.freelancerProfileId)
                  }
                  className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                text-white px-4 py-2 rounded-lg text-sm flex-1 lg:flex-none transition cursor-pointer font-medium'>
                  <FaEye /> View Profile
                </button>

                {application.status === 'pending' && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(application._id, 'accepted')
                      }
                      disabled={updatingStatus === application._id}
                      className='flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700
                    text-white px-4 py-2 rounded-lg text-sm flex-1 lg:flex-none transition cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed font-medium'>
                      <FaCheck />{' '}
                      {updatingStatus === application._id
                        ? 'Processing...'
                        : 'Accept'}
                    </button>

                    <button
                      onClick={() =>
                        handleStatusUpdate(application._id, 'rejected')
                      }
                      disabled={updatingStatus === application._id}
                      className='flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700
                    text-white px-4 py-2 rounded-lg text-sm flex-1 lg:flex-none transition cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed font-medium'>
                      <FaTimes />{' '}
                      {updatingStatus === application._id
                        ? 'Processing...'
                        : 'Reject'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Cover Letter Section */}
            {application.coverLetter && (
              <div className='mt-4 pt-4 border-t border-gray-700'>
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='text-sm font-semibold text-gray-300'>
                    Cover Letter:
                  </h4>
                  <button
                    onClick={() => toggleCoverLetter(application._id)}
                    className='text-blue-400 hover:text-blue-300 text-xs'>
                    {expandedCoverLetter === application._id
                      ? 'Show less'
                      : 'Read more'}
                  </button>
                </div>
                <p
                  className={`text-sm text-gray-400 leading-relaxed ${
                    expandedCoverLetter === application._id
                      ? ''
                      : 'line-clamp-2'
                  }`}>
                  {application.coverLetter}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Applicants;
