'use client';

import React, { useState, useEffect } from 'react';

// Define types for each item (matching the parent component's interfaces)
interface ExperienceData {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
}

interface PortfolioData {
  _id: string;
  name: string;
  url: string;
  description: string;
}

interface CertificateData {
  _id: string;
  name: string;
  issuer?: string;
  date?: string;
}

type ItemData = ExperienceData | PortfolioData | CertificateData;

// Generic props for different item types
interface InlineEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: ItemData) => void;
  itemType: 'experience' | 'portfolio' | 'certificate';
  initialData: ItemData | null;
}

const InlineEditModal: React.FC<InlineEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  itemType,
  initialData,
}) => {
  const [formData, setFormData] = useState<ItemData | null>(initialData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({ ...initialData });
    }
  }, [isOpen, initialData]);

  if (!isOpen || !formData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: checked,
          ...(name === 'isCurrent' && checked ? { endDate: null } : {}),
        };
      });
    } else {
      setFormData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData) return;

    // Validation based on type
    if (itemType === 'experience') {
      const data = formData as ExperienceData;
      if (
        !data.title?.trim() ||
        !data.company?.trim() ||
        !data.startDate?.trim()
      ) {
        setError('Title, Company, and Start Date are required.');
        return;
      }
      if (!data.isCurrent && !data.endDate?.trim()) {
        setError(
          'Please provide an End Date or check "Currently working here."'
        );
        return;
      }
    } else if (itemType === 'portfolio') {
      const data = formData as PortfolioData;
      if (!data.name?.trim() || !data.url?.trim()) {
        setError('Project Name and URL are required.');
        return;
      }
    } else if (itemType === 'certificate') {
      const data = formData as CertificateData;
      if (!data.name?.trim()) {
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
        const expData = formData as ExperienceData;
        return (
          <>
            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Job Title <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='title'
                value={expData.title || ''}
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
                value={expData.company || ''}
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
                  value={expData.startDate || ''}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                  required
                />
              </div>

              <div className={expData.isCurrent ? 'opacity-50' : ''}>
                <label className='block text-sm text-gray-300 mb-1'>
                  End Date
                </label>
                <input
                  type='date'
                  name='endDate'
                  value={expData.endDate || ''}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white'
                  disabled={expData.isCurrent}
                />
              </div>
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                name='isCurrent'
                checked={expData.isCurrent || false}
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
                value={expData.description || ''}
                onChange={handleChange}
                rows={4}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white resize-none'
              />
            </div>
          </>
        );

      case 'portfolio':
        const portData = formData as PortfolioData;
        return (
          <>
            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Project Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={portData.name || ''}
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
                value={portData.url || ''}
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
                value={portData.description || ''}
                onChange={handleChange}
                rows={4}
                className='w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white resize-none'
              />
            </div>
          </>
        );

      case 'certificate':
        const certData = formData as CertificateData;
        return (
          <>
            <div>
              <label className='block text-sm text-gray-300 mb-1'>
                Certificate Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={certData.name || ''}
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
                value={certData.issuer || ''}
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
                value={certData.date || ''}
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
