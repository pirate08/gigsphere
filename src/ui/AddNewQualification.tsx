import React, { useState } from 'react';

// Define the expected shape of a qualification item
export interface QualificationItem {
  name: string;
}

// Define the props for the modal
interface AddNewQualificationProps {
  isOpen: boolean;
  onClose: () => void;
  // Function to handle saving the new qualification, typically passed up to the parent component
  onSave: (newQualification: QualificationItem) => void;
}

const AddNewQualification: React.FC<AddNewQualificationProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('All fields are required.');
      return;
    }

    // Create a new qualification object
    const newQualification: QualificationItem = {
      name,
    };

    onSave(newQualification);

    // Clear the form and close the modal
    setName('');
    onClose();
  };

  return (
    // Overlay (Fixed position, full screen, semi-transparent background)
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm'>
      {/* Modal Content */}
      <div className='bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-full max-w-lg mx-4 p-6 sm:p-8 transform transition-all duration-300 scale-100'>
        <h2 className='text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3'>
          🎓 Add New Qualification
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Qualification Name */}
          <div>
            <label
              htmlFor='qualificationName'
              className='block text-sm font-medium text-gray-300 mb-1'>
              Qualification Name
            </label>
            <input
              type='text'
              id='qualificationName'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='e.g., Master of Science in AI'
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className='text-sm text-red-400 p-2 bg-red-900/20 rounded-md'>
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
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewQualification;
