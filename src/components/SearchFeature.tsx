'use client';

import React, { useState, useEffect } from 'react';
import { IoSearch, IoFilter } from 'react-icons/io5';
import { FaUserTag, FaTimes } from 'react-icons/fa';
import { MdOutlineSort, MdPeople } from 'react-icons/md';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import FreelancerCard from '@/ui/FreelancerCard';

// ⚠️ IMPORTANT: These interfaces are required for TypeScript
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

interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  totalPages: number;
}

const SearchFeatureUI = () => {
  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // API State
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Default search trigger on component mount and page change
  useEffect(() => {
    handleSearch(currentPage);
  }, [currentPage]); // Re-run search when page changes

  // Helper to add a skill filter
  const addSkillFilter = (skill: string) => {
    if (!skillsFilter.includes(skill)) {
      setSkillsFilter([...skillsFilter, skill]);
    }
  };

  // Helper to remove a filter
  const removeFilter = (filter: string) => {
    setSkillsFilter(skillsFilter.filter((f) => f !== filter));
  };

  // --- API Integration Function ---
  const handleSearch = async (page: number = 1) => {
    setLoading(true);
    const token = getCookie('user_token');

    if (!token) {
      toast.error('You must be logged in to search freelancers.');
      setLoading(false);
      return;
    }

    // 1. Construct Query Parameters
    const params = new URLSearchParams();
    params.append('page', page.toString());

    // Add name search term
    if (searchTerm.trim()) {
      params.append('name', searchTerm.trim());
    }

    // Add skills filters (backend accepts comma-separated string)
    if (skillsFilter.length > 0) {
      params.append('skills', skillsFilter.join(','));
    }

    // 🎯 API ENDPOINT
    const url = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/client/search/freelancers?${params.toString()}`;

    // 2. Execute Fetch
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Session expired. Please log in again.');
        }
        throw new Error(data.message || 'Failed to fetch freelancers.');
      }

      // 3. Update State
      setFreelancers(data.freelancers || []);
      setPagination(
        data.pagination || {
          currentPage: page,
          limit: 10,
          total: 0,
          totalPages: 0,
        }
      );
      setCurrentPage(data.pagination.currentPage);
    } catch (error: any) {
      console.error('Search error:', error);
      toast.error(error.message || 'Error executing search.');
      setFreelancers([]);
    } finally {
      setLoading(false);
      setIsFilterOpen(false); // Close mobile filters after search
    }
  };

  // Function to handle filter/search button click (resets to page 1)
  const handleFilterSearch = () => {
    if (currentPage === 1) {
      handleSearch(1);
    } else {
      setCurrentPage(1);
    }
  };

  // Function to handle pagination clicks
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='bg-gray-900 min-h-screen text-white pt-10 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 mb-8'>
          Find Freelancers
        </h1>
        {/* Search Bar & Mobile Filter Button */}
        <div className='mb-8 flex flex-col md:flex-row gap-4'>
          <div className='relative flex-grow'>
            <IoSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search by Name or Keywords'
              className='w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFilterSearch()}
            />
          </div>
          <button
            onClick={handleFilterSearch}
            className='bg-blue-600 p-3 rounded-lg flex items-center justify-center text-sm font-semibold hover:bg-blue-500 transition w-full md:w-auto'>
            <IoSearch className='w-5 h-5 mr-2' />
            Search
          </button>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className='md:hidden p-3 bg-gray-700 rounded-lg flex items-center justify-center text-sm font-semibold hover:bg-gray-600 transition'>
            <IoFilter className='w-5 h-5 mr-2' />
            Filters
          </button>
        </div>
        {/* Main Content Area: Filters (Sidebar) + Results */}
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Filters Sidebar */}
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

              {/* Skills Filter */}
              <div className='space-y-3'>
                <label className='font-semibold text-sm flex items-center'>
                  <FaUserTag className='mr-2 text-green-400' /> Filter by Skills
                </label>
                <input
                  type='text'
                  placeholder='Type a skill and press Enter'
                  className='w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-sm'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      addSkillFilter(e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <div className='flex flex-wrap gap-2 pt-2 min-h-[30px]'>
                  {skillsFilter.map((filter) => (
                    <span
                      key={filter}
                      className='flex items-center text-xs font-medium px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full cursor-pointer hover:bg-blue-600/50 transition'
                      onClick={() => removeFilter(filter)}>
                      {filter} <FaTimes className='ml-1 w-3 h-3' />
                    </span>
                  ))}
                </div>
              </div>

              <div className='pt-4'>
                <button
                  onClick={handleFilterSearch}
                  disabled={loading}
                  className='w-full py-2 bg-green-600 rounded-lg font-bold hover:bg-green-500 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'>
                  {loading ? 'Searching...' : 'Apply Filters'}
                </button>
              </div>
            </div>
          </div>
          {/* Results List */}
          <div className='w-full md:w-3/4'>
            {/* Results Header and Sort */}
            <div className='flex justify-between items-center mb-6 border-b border-gray-800 pb-3'>
              <p className='text-lg font-medium text-gray-300'>
                Showing {freelancers.length} of {pagination.total} freelancers
                found
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
                  <option value='relevance'>Relevance (Default)</option>
                </select>
              </div>
            </div>

            {/* Loading/Error/No Results States */}
            {loading && (
              <div className='text-center py-10 text-blue-400'>
                <MdPeople className='animate-spin mx-auto w-8 h-8 mb-3' />
                Searching for top freelancers...
              </div>
            )}

            {!loading && freelancers.length === 0 && (
              <div className='text-center py-10 text-gray-400 bg-gray-800 rounded-lg'>
                <IoSearch className='mx-auto w-10 h-10 mb-3' />
                No freelancers found matching your criteria. Try different
                keywords.
              </div>
            )}

            {/* Freelancer Cards */}
            <div className='space-y-6'>
              {freelancers.map((freelancer) => (
                <FreelancerCard key={freelancer._id} freelancer={freelancer} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className='mt-10 flex justify-center'>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className='p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 transition'>
                    Previous
                  </button>
                  <span className='px-4 py-2 bg-blue-600 rounded-lg font-semibold'>
                    {currentPage}
                  </span>
                  <span className='text-gray-400'>
                    of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages || loading}
                    className='p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 transition'>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>{' '}
          {/* End Results List */}
        </div>{' '}
        {/* End Main Content Area */}
      </div>
    </div>
  );
};

export default SearchFeatureUI;
