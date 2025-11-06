import React, { useState } from 'react';
import {
  FiSearch,
  FiMapPin,
  FiDollarSign,
  FiFilter,
  FiX,
} from 'react-icons/fi';
import { BiCodeAlt } from 'react-icons/bi';

interface Filters {
  search: string;
  skills: string;
  location: string;
  minRate: string;
  maxRate: string;
}

type FilterField = keyof Filters;

const SearchJobs: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    skills: '',
    location: '',
    minRate: '',
    maxRate: '',
  });

  const handleFilterChange = (field: FilterField, value: string): void => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = (): void => {
    setFilters({
      search: '',
      skills: '',
      location: '',
      minRate: '',
      maxRate: '',
    });
  };

  const handleSearch = (): void => {
    // Search logic will be implemented later
    console.log('Searching with filters:', filters);
  };

  return (
    <div className='mt-6'>
      {/* Search Section */}
      <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700/50 shadow-xl'>
        {/* Main Search Bar */}
        <div className='flex flex-col sm:flex-row gap-3 mb-4'>
          <div className='flex-1 relative'>
            <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl' />
            <input
              type='text'
              placeholder='Search by job title...'
              value={filters.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange('search', e.target.value)
              }
              className='w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors'
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='sm:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-600'>
            <FiFilter className='text-lg' />
            <span>Filters</span>
            {showFilters && <FiX className='text-lg' />}
          </button>
          <button
            onClick={handleSearch}
            className='sm:w-auto px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/50'>
            Search Jobs
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className='mt-4 pt-4 border-t border-gray-700'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {/* Skills Filter */}
              <div className='relative'>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Skills
                </label>
                <BiCodeAlt className='absolute left-3 top-[42px] text-gray-400' />
                <input
                  type='text'
                  placeholder='React, Node.js...'
                  value={filters.skills}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('skills', e.target.value)
                  }
                  className='w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm'
                />
                <p className='text-xs text-gray-500 mt-1'>Comma separated</p>
              </div>

              {/* Location Filter */}
              <div className='relative'>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Location
                </label>
                <FiMapPin className='absolute left-3 top-[42px] text-gray-400' />
                <input
                  type='text'
                  placeholder='Remote, USA...'
                  value={filters.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('location', e.target.value)
                  }
                  className='w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm'
                />
                <p className='text-xs text-gray-500 mt-1'>Comma separated</p>
              </div>

              {/* Min Rate */}
              <div className='relative'>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Min Budget
                </label>
                <FiDollarSign className='absolute left-3 top-[42px] text-gray-400' />
                <input
                  type='number'
                  placeholder='0'
                  value={filters.minRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('minRate', e.target.value)
                  }
                  className='w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm'
                />
              </div>

              {/* Max Rate */}
              <div className='relative'>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                  Max Budget
                </label>
                <FiDollarSign className='absolute left-3 top-[42px] text-gray-400' />
                <input
                  type='number'
                  placeholder='10000'
                  value={filters.maxRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('maxRate', e.target.value)
                  }
                  className='w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm'
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className='mt-4 flex justify-end'>
              <button
                onClick={clearFilters}
                className='px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2'>
                <FiX />
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      <div className='mt-4 flex flex-wrap gap-2'>
        {filters.search && (
          <span className='px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-sm flex items-center gap-2'>
            Search: {filters.search}
            <button
              onClick={() => handleFilterChange('search', '')}
              className='hover:text-red-400'>
              <FiX size={14} />
            </button>
          </span>
        )}
        {filters.skills && (
          <span className='px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm flex items-center gap-2'>
            Skills: {filters.skills}
            <button
              onClick={() => handleFilterChange('skills', '')}
              className='hover:text-red-400'>
              <FiX size={14} />
            </button>
          </span>
        )}
        {filters.location && (
          <span className='px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm flex items-center gap-2'>
            Location: {filters.location}
            <button
              onClick={() => handleFilterChange('location', '')}
              className='hover:text-red-400'>
              <FiX size={14} />
            </button>
          </span>
        )}
        {(filters.minRate || filters.maxRate) && (
          <span className='px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-sm flex items-center gap-2'>
            Budget: ${filters.minRate || '0'} - ${filters.maxRate || '∞'}
            <button
              onClick={() => {
                handleFilterChange('minRate', '');
                handleFilterChange('maxRate', '');
              }}
              className='hover:text-red-400'>
              <FiX size={14} />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchJobs;
