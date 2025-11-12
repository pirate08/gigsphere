'use client';

import React, { useState } from 'react';
import { LiaCertificateSolid } from 'react-icons/lia';

// Define the expected shape of an experience item
export interface CertificateItem {
  _id: string;
  name: string;
  issuer?: string;
  date?: string;
}

// Define the props for the modal
interface AddNewCertificateProps {
  isOpen: boolean;
  onClose: () => void;
  // Function to handle saving the new experience
  onSave: (newCertificate: CertificateItem) => void;
}

const AddNewCertificate: React.FC<AddNewCertificateProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState<string>('');
  const [issuer, setIssuer] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setName('');
    setIssuer('');
    setDate('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!name.trim()) {
      setError('Certificate Name are required fields.');
      return;
    }

    // Create a new experience object
    const newCertificate: CertificateItem = {
      // Temporary ID, should be replaced by a database ID upon persistence
      _id: crypto.randomUUID(),
      name,
      issuer,
      date,
    };

    onSave(newCertificate);

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
          <span>
            <LiaCertificateSolid />
          </span>
          Add New Certificate
        </h2>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* --Certificate Name-- */}
          <div>
            <label htmlFor='name' className='block text-sm text-gray-300 mb-1'>
              Certificate Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='e.g., AWS Certified Developer – Associate'
              required
            />
          </div>

          {/* --Issuer Name-- */}
          <div>
            <label htmlFor='issuer' className='text-sm text-gray-300 mb-1'>
              Issuer Name
            </label>
            <input
              type='text'
              id='issuer'
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              placeholder='e.g., Amazon Web Services'
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor='date' className='text-sm text-gray-300 mb-1'>
              Date
            </label>
            <input
              type='date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition-colors'
            />
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

export default AddNewCertificate;
