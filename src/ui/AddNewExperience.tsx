'use client';

import React, { useState, useMemo } from 'react';

// Define the expected shape of an experience item
export interface ExperienceItem2 {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

// Define the props for the modal
interface AddNewExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  // Function to handle saving the new experience
  onSave: (newExperience: ExperienceItem2) => void;
}

const AddNewExperience: React.FC<AddNewExperienceProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isCurrent, setIsCurrent] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState('');

  // Ensures the latest value of endDate reflects the 'isCurrent' status
  const finalEndDate = useMemo(
    () => (isCurrent ? null : endDate || null),
    [isCurrent, endDate]
  );

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setTitle('');
    setCompany('');
    setStartDate('');
    setEndDate('');
    setIsCurrent(false);
    setDescription('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!title.trim() || !company.trim() || !startDate.trim()) {
      setError('Title, Company, and Start Date are required fields.');
      return;
    }

    // Check end date only if it's not a current job
    if (!isCurrent && !endDate.trim()) {
      setError('Please provide an End Date or check "Currently working here."');
      return;
    }

    // Create a new experience object
    const newExperience: ExperienceItem2 = {
      // Temporary ID, should be replaced by a database ID upon persistence
      _id: crypto.randomUUID(),
      title,
      company,
      startDate,
      endDate: finalEndDate,
      isCurrent,
      description,
    };

    onSave(newExperience);

    // Clear the form and close the modal
    resetForm();
    onClose();
  };

  return (
    // Overlay (Fixed position, full screen, semi-transparent background)
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4'>
      {/* Modal Content */}
      <div className='bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-lg max-h-[100vh] p-6 sm:p-8 transform transition-all duration-300 scale-100'>
        <h2 className='text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3 flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M2 10l8 7 8-7'></path>
            <path d='M10 10V3H4v7'></path>
            <path d='M20 10V3h-6v7'></path>
            <rect x='2' y='14' width='20' height='7' rx='2'></rect>
          </svg>
          Add New Experience
        </h2>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* --Experience title or Role-- */}
          <div>
            <label htmlFor='title' className='block text-sm text-gray-300 mb-1'>
              Job Title / Role Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='e.g., Senior Frontend Developer'
              required
            />
          </div>

          {/* --Company Name-- */}
          <div>
            <label
              htmlFor='company'
              className='block text-sm text-gray-300 mb-1'>
              Company Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='company'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='e.g., Acme Corporation'
              required
            />
          </div>

          {/* --Start Date && End Date Container-- */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {/* Start Date */}
            <div>
              <label
                htmlFor='startDate'
                className='block text-sm  text-gray-300 mb-1'>
                Start Date <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                id='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-colors'
                required
              />
            </div>

            {/* End Date */}
            <div className={isCurrent ? 'opacity-50 pointer-events-none' : ''}>
              <label
                htmlFor='endDate'
                className='block text-sm  text-gray-300 mb-1'>
                End Date
              </label>
              <input
                type='date'
                id='endDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-colors'
                disabled={isCurrent}
              />
            </div>
          </div>

          {/* --Currently Working Checkbox-- */}
          <div className='flex items-center pt-2'>
            <input
              id='isCurrent'
              type='checkbox'
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500'
            />
            <label
              htmlFor='isCurrent'
              className='ml-2 text-sm font-medium text-gray-300'>
              Currently working here
            </label>
          </div>

          {/* --Description-- */}
          <div>
            <label
              htmlFor='description'
              className='block text-sm text-gray-300 mb-1'>
              Job Description / Responsibilities
            </label>
            <textarea
              id='description'
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none'
              placeholder='Summarize your key achievements and responsibilities...'></textarea>
          </div>

          {/* Error Message */}
          {error && (
            <p className='text-sm text-red-400 p-3 bg-red-900/30 rounded-lg border border-red-800/50'>
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className='flex justify-end gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer'>
              Cancel
            </button>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewExperience;
