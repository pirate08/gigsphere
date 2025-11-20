import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt, FaUserTag, FaBriefcase } from 'react-icons/fa';
import { MdChevronRight } from 'react-icons/md';

// ⚠️ IMPORTANT: Define or import the Freelancer interface
interface Freelancer {
  _id: string;
  name: string;
  location: string;
  bio: string;
  skills: string[] | null | undefined; // Updated type to be safe
  totalApplications: number;
  applicationsToYourJobs: number;
}

const FreelancerCard: React.FC<{ freelancer: Freelancer }> = ({
  freelancer,
}) => {
  // Safely use skills, defaulting to an empty array if undefined/null
  const safeSkills = freelancer.skills || [];

  return (
    <div className='bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-600 transition-all'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
        {/* Name and Bio */}
        <div>
          <h2 className='text-2xl font-bold text-blue-400 hover:text-blue-300 cursor-pointer transition'>
            {freelancer.name}
          </h2>
          <p className='text-sm text-gray-400 flex items-center mt-1'>
            <FaMapMarkerAlt className='mr-1.5 w-3 h-3' /> {freelancer.location}
          </p>
          <p className='text-gray-300 mt-3 line-clamp-2'>{freelancer.bio}</p>
        </div>
        {/* Action Button */}
        <div className='mt-4 sm:mt-0'>
          <Link
            href={`/client-dashboard/search-freelancers/profile/${freelancer._id}`}>
            <button className='flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-500 transition-all whitespace-nowrap cursor-pointer'>
              View Profile <MdChevronRight className='w-5 h-5' />
            </button>
          </Link>
        </div>
      </div>
      <div className='mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-4 items-center'>
        {/* Skills */}
        <div className='flex items-center'>
          <FaUserTag className='mr-2 text-green-400 w-4 h-4' />

          <div className='flex flex-wrap gap-2'>
            {safeSkills.slice(0, 5).map(
              (
                skill // 🎯 FIX Applied here
              ) => (
                <span
                  key={skill}
                  className='text-xs px-2 py-0.5 bg-gray-700/50 text-gray-300 rounded'>
                  {skill}
                </span>
              )
            )}

            {safeSkills.length > 5 && ( // 🎯 FIX Applied here
              <span className='text-xs px-2 py-0.5 text-gray-500'>
                + {safeSkills.length - 5} more
              </span>
            )}
          </div>
        </div>
        {/* Client-Specific Context (Backend Feature) */}
        <div className='flex items-center gap-4 ml-auto'>
          <div className='text-center'>
            <p className='text-xs text-gray-400'>Total Apps</p>

            <p className='text-lg font-bold text-white'>
              {freelancer.totalApplications}
            </p>
          </div>
          <div className='h-8 w-px bg-gray-700'></div>
          {/* Separator */}
          <div className='text-center'>
            <p className='text-xs text-gray-400'>Applied to Yours</p>
            <p
              className={`text-lg font-bold ${
                freelancer.applicationsToYourJobs > 0
                  ? 'text-yellow-400'
                  : 'text-white'
              }`}>
              {freelancer.applicationsToYourJobs}
            </p>

            {freelancer.applicationsToYourJobs > 0 && (
              <p className='text-xs text-yellow-500 mt-1 flex items-center justify-center'>
                <FaBriefcase className='mr-1 w-3 h-3' />
                Familiar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerCard;
