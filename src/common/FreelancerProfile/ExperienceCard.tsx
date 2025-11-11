'use client';

import React from 'react';
import { BsCalendar3 } from 'react-icons/bs';

interface Experience {
  _id?: string;
  title: string;
  company: string; // Allow Date or string, since it's common for API data to be passed as string
  startDate: Date | string;
  endDate?: Date | string | null; // Allow Date, string, or null/undefined
  isCurrent: boolean;
  description?: string;
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  // Update formatDate to accept Date object, string, or undefined/null
  const formatDate = (dateValue: Date | string | null | undefined): string => {
    if (!dateValue) return experience.isCurrent ? '' : 'N/A';

    let date: Date; // 1. Check if it's already a Date object

    if (dateValue instanceof Date) {
      date = dateValue;
    }
    // 2. Otherwise, treat it as a string and attempt conversion
    else if (typeof dateValue === 'string') {
      date = new Date(dateValue);
    } else {
      // Should not happen with the union type, but for safety
      return 'N/A';
    } // 3. Ensure the converted Date object is valid

    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    }

    return 'N/A';
  };

  return (
    <div className='bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-colors'>
      <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3'>
        <div>
          <h3 className='text-lg font-semibold text-white'>
            {experience.title}
          </h3>

          <p className='text-blue-400 font-medium'>{experience.company}</p>
        </div>
        <div className='flex items-center gap-2 text-gray-400 text-sm'>
          <BsCalendar3 className='w-4 h-4' />
          <span>
            {formatDate(experience.startDate)} -{' '}
            {formatDate(experience.endDate)}
          </span>
          {experience.isCurrent && (
            <span className='px-2 py-0.5 bg-green-600/20 text-green-400 rounded text-xs border border-green-500/30'>
              Current
            </span>
          )}
        </div>
      </div>
      <p className='text-gray-300 text-sm leading-relaxed'>
        {experience.description}
      </p>
    </div>
  );
};

export default ExperienceCard;
