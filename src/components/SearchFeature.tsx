'use client';

import React, { useState } from 'react';
import { IoSearch, IoFilter } from 'react-icons/io5';
import { FaUserTag, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { MdOutlineSort } from 'react-icons/md';
import FreelancerCard from '@/ui/FreelancerCard';

// Mock data structure based on your backend output
interface Freelancer {
  _id: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  role: 'freelancer';
  totalApplications: number;
  applicationsToYourJobs: number;
  recentApplications: any[];
}

// Mock data for UI demonstration
const mockFreelancers: Freelancer[] = [
  {
    _id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    location: 'Remote, UK',
    bio: 'Full-stack developer specializing in MERN stack and scalable cloud solutions.',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Next.js'],
    role: 'freelancer',
    totalApplications: 15,
    applicationsToYourJobs: 3,
    recentApplications: [{ jobId: { title: 'Marketing Website' } }],
  },
  {
    _id: '2',
    name: 'Sara Khan',
    email: 'sara@example.com',
    location: 'New York, USA',
    bio: 'Lead UI/UX designer focused on accessibility and user-centered design principles.',
    skills: [
      'Figma',
      'Sketch',
      'User Research',
      'Prototyping',
      'Accessibility',
    ],
    role: 'freelancer',
    totalApplications: 8,
    applicationsToYourJobs: 0,
    recentApplications: [],
  },
  {
    _id: '3',
    name: 'Ben Chen',
    email: 'ben@example.com',
    location: 'Hybrid, CA',
    bio: 'Data scientist with expertise in Python, Machine Learning, and Big Data processing.',
    skills: [
      'Python',
      'Pandas',
      'TensorFlow',
      'SQL',
      'Data Science',
      'Machine Learning',
    ],
    role: 'freelancer',
    totalApplications: 22,
    applicationsToYourJobs: 1,
    recentApplications: [{ jobId: { title: 'Internal Tool Refactor' } }],
  },
];

const SearchFeatureUI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile menu

  // Mock function to simulate search/filter application
  const handleSearch = () => {
    console.log('Searching for:', searchTerm, 'with filters:', activeFilters);
    // In a real app, this would trigger an API call
  };

  // Mock function to add a skill filter
  const addSkillFilter = (skill: string) => {
    if (!activeFilters.includes(skill)) {
      setActiveFilters([...activeFilters, skill]);
    }
  };

  // Mock function to remove a filter
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  // Mock pagination for UI
  const pagination = {
    currentPage: 1,
    limit: 10,
    total: 35,
    totalPages: 4,
  };

  return (
    <div className='bg-gray-900 min-h-screen text-white pt-10 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent mb-2'>
          Find Freelancers
        </h1>
        <p className='text-lg text-gray-400 mb-8'>
          Discover talented professionals ready to bring your projects to life
        </p>
        {/* Search Bar & Mobile Filter Button */}
        <div className='mb-8 flex flex-col md:flex-row gap-4'>
          <div className='relative flex-grow'>
            <IoSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search by Name or Skills (e.g., "Jane Doe" or "React, Figma")'
              className='w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className='md:hidden p-3 bg-gray-700 rounded-lg flex items-center justify-center text-sm font-semibold hover:bg-gray-600 transition'>
            <IoFilter className='w-5 h-5 mr-2' />
            Filters
          </button>
        </div>
        {/* Main Content Area: Filters (Sidebar) + Results */}
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Filters Sidebar (Hidden on mobile by default, shown via state) */}
          <div
            className={`md:block md:w-1/4 ${
              isFilterOpen ? 'block' : 'hidden'
            } fixed inset-0 z-40 md:static md:z-auto bg-gray-900 md:bg-transparent p-6 md:p-0 border-r md:border-r-0 border-gray-800`}>
            <button
              onClick={() => setIsFilterOpen(false)}
              className='md:hidden absolute top-4 right-4 text-gray-400 hover:text-white'>
              <FaTimes className='w-6 h-6' />
            </button>

            <div className='sticky top-10 space-y-6'>
              <h2 className='text-xl font-bold border-b border-gray-700 pb-3'>
                Filters
              </h2>

              {/* Skills/Tags Filter (Backend Requirement) */}
              <div className='space-y-3'>
                <label className='font-semibold text-sm flex items-center'>
                  <FaUserTag className='mr-2 text-green-400' /> Skills
                </label>
                <input
                  type='text'
                  placeholder='e.g., React, Python, Figma'
                  // NOTE: In a real app, this input would control the 'skills' query parameter
                  className='w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-sm'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      addSkillFilter(e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <div className='flex flex-wrap gap-2 pt-2'>
                  {activeFilters.map((filter) => (
                    <span
                      key={filter}
                      className='flex items-center text-xs font-medium px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full cursor-pointer hover:bg-blue-600/50 transition'
                      onClick={() => removeFilter(filter)}>
                      {filter} <FaTimes className='ml-1 w-3 h-3' />
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Filters (Example for UI richness) */}
              <div className='space-y-3 pt-4 border-t border-gray-800'>
                <label className='font-semibold text-sm flex items-center'>
                  <FaMapMarkerAlt className='mr-2 text-yellow-400' /> Location
                </label>
                <select className='w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-sm'>
                  <option>Any Location</option>
                  <option>Remote Only</option>
                  <option>Local (Within 50mi)</option>
                </select>
              </div>

              <div className='pt-4'>
                <button
                  onClick={handleSearch}
                  className='w-full py-2 bg-green-600 rounded-lg font-bold hover:bg-green-500 transition flex items-center justify-center'>
                  <IoSearch className='mr-2' />
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          {/* Results List */}
          <div className='w-full md:w-3/4'>
            {/* Results Header and Sort */}
            <div className='flex justify-between items-center mb-6 border-b border-gray-800 pb-3'>
              <p className='text-lg font-medium text-gray-300'>
                Showing {mockFreelancers.length} of {pagination.total}{' '}
                freelancers found
              </p>
              <div className='flex items-center text-sm'>
                <MdOutlineSort className='mr-2 w-5 h-5 text-gray-400' />
                <label htmlFor='sort' className='mr-2 hidden sm:inline'>
                  Sort by:
                </label>
                <select
                  id='sort'
                  className='bg-gray-800 border border-gray-700 rounded-lg p-1.5 focus:ring-blue-500 focus:border-blue-500'>
                  <option value='newest'>Newest Registered</option>
                  <option value='most-applications'>Most Applications</option>
                  <option value='relevance'>Relevance (Default)</option>
                </select>
              </div>
            </div>

            {/* Freelancer Cards */}
            <div className='space-y-6'>
              {mockFreelancers.map((freelancer) => (
                <FreelancerCard key={freelancer._id} freelancer={freelancer} />
              ))}
            </div>

            {/* Pagination */}
            <div className='mt-10 flex justify-center'>
              <div className='flex items-center space-x-2'>
                <button
                  disabled={pagination.currentPage === 1}
                  className='p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 transition'>
                  Previous
                </button>
                <span className='px-4 py-2 bg-blue-600 rounded-lg font-semibold'>
                  {pagination.currentPage}
                </span>
                <span className='text-gray-400'>
                  of {pagination.totalPages}
                </span>
                <button
                  disabled={pagination.currentPage === pagination.totalPages}
                  className='p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 transition'>
                  Next
                </button>
              </div>
            </div>
          </div>{' '}
          {/* End Results List */}
        </div>{' '}
        {/* End Main Content Area */}
      </div>
    </div>
  );
};

export default SearchFeatureUI;
