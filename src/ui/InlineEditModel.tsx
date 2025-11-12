'use client';

import React, { useState, useEffect } from 'react';

// Generic props for different item types
interface InlineEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: any) => void;
  itemType: 'experience' | 'portfolio' | 'certificate';
  initialData: any;
}

const InlineEditModal: React.FC<InlineEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  itemType,
  initialData,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({ ...initialData });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: any) => ({
        ...prev,
        [name]: checked,
        ...(name === 'isCurrent' && checked ? { endDate: null } : {}),
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation based on type
    if (itemType === 'experience') {
      if (
        !formData.title?.trim() ||
        !formData.company?.trim() ||
        !formData.startDate?.trim()
      ) {
        setError('Title, Company, and Start Date are required.');
        return;
      }
      if (!formData.isCurrent && !formData.endDate?.trim()) {
        setError(
          'Please provide an End Date or check "Currently working here."'
        );
        return;
      }
    } else if (itemType === 'portfolio') {
      if (!formData.name?.trim() || !formData.url?.trim()) {
        setError('Project Name and URL are required.');
        return;
      }
    } else if (itemType === 'certificate') {
      if (!formData.name?.trim()) {
        setError('Certificate Name is required.');
        return;
      }
    }

    onSave(formData);
    onClose();
  };

  const renderFields = () => {
    switch (itemType) {
      case 'experience':
        return (
          <>
            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Job Title <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='title'
                value={formData.title || ''}
                onChange={handleChange}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Company <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='company'
                value={formData.company || ''}
                onChange={handleChange}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                required
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm text-gray-300 mb-1'>
                  Start Date <span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='startDate'
                  value={formData.startDate || ''}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                  required
                />
              </div>

              <div className={formData.isCurrent ? 'opacity-50' : ''}>
                <label className='block text-sm text-gray-300 mb-1'>
                  End Date
                </label>
                <input
                  type='date'
                  name='endDate'
                  value={formData.endDate || ''}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                  disabled={formData.isCurrent}
                />
              </div>
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                name='isCurrent'
                checked={formData.isCurrent || false}
                onChange={handleChange}
                className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded'
              />
              <label className='ml-2 text-sm text-gray-300'>
                Currently working here
              </label>
            </div>

            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Description
              </label>
              <textarea
                name='description'
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white resize-none'
              />
            </div>
          </>
        );

      case 'portfolio':
        return (
          <>
            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Project Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={formData.name || ''}
                onChange={handleChange}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                URL <span className='text-red-500'>*</span>
              </label>
              <input
                type='url'
                name='url'
                value={formData.url || ''}
                onChange={handleChange}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Description
              </label>
              <textarea
                name='description'
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white resize-none'
              />
            </div>
          </>
        );

      case 'certificate':
        return (
          <>
            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Certificate Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={formData.name || ''}
                onChange={handleChange}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-300 mb-1'>Issuer</label>
              <input
                type='text'
                name='issuer'
                value={formData.issuer || ''}
                onChange={handleChange}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
              />
            </div>

            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Issue Date
              </label>
              <input
                type='date'
                name='date'
                value={formData.date || ''}
                onChange={handleChange}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (itemType) {
      case 'experience':
        return 'Edit Experience';
      case 'portfolio':
        return 'Edit Portfolio Item';
      case 'certificate':
        return 'Edit Certificate';
      default:
        return 'Edit';
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4'>
      <div className='bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] md:max-h-[85vh] overflow-y-auto p-4 sm:p-6 md:p-8'>
        <h2 className='text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3'>
          {getTitle()}
        </h2>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {renderFields()}

          {error && (
            <p className='text-sm text-red-400 p-3 bg-red-900/30 rounded-lg border border-red-800/50'>
              {error}
            </p>
          )}

          <div className='flex justify-end gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors'>
              Cancel
            </button>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors'>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InlineEditModal;
