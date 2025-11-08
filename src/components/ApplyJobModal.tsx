'use client';

import { getCookie } from 'cookies-next';
import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  onSuccess?: () => void;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  onSuccess,
}) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coverLetter.trim()) {
      setError('Please enter a cover letter');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Get auth token from localStorage or your auth context
      const token = getCookie('user_token');

      const response = await fetch(
        'http://localhost:5000/api/freelancer/jobs/apply',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            jobId: jobId,
            coverLetter: coverLetter.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      const data = await response.json();
      console.log('Application submitted successfully:', data);

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Reset form and close modal
      setCoverLetter('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setCoverLetter('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'>
      <div className='bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl'>
        {/* Header */}
        <div className='flex items-start justify-between p-6 border-b border-gray-700'>
          <div>
            <h2 className='text-2xl font-bold text-white mb-1'>
              Apply for Job
            </h2>
            <p className='text-gray-400 text-sm'>{jobTitle}</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className='text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg'
            aria-label='Close modal'>
            <FiX className='text-xl' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6'>
          <div className='mb-6'>
            <label
              htmlFor='coverLetter'
              className='block text-gray-300 font-medium mb-2'>
              Cover Letter <span className='text-red-400'>*</span>
            </label>
            <textarea
              id='coverLetter'
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder='Tell the client why you are the best fit for this project. Highlight your relevant experience and skills...'
              rows={8}
              disabled={isSubmitting}
              className='w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed'
              required
            />
            <p className='text-gray-500 text-xs mt-2'>
              {coverLetter.length} characters
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm'>
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex gap-3 justify-end'>
            <button
              type='button'
              onClick={handleClose}
              disabled={isSubmitting}
              className='px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting || !coverLetter.trim()}
              className='px-6 py-2.5 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'>
              {isSubmitting ? (
                <>
                  <span className='animate-spin'>⏳</span>
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheck />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;
