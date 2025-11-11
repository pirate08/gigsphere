// ExperienceItemEditable.tsx
import React from 'react';
import { BsCalendar3, BsTrash, BsPencil } from 'react-icons/bs';
import { ExperienceItem } from '@/components/UpdateFreelancerProfile'; // Assuming export from the main file

interface ExperienceItemProps {
  experience: ExperienceItem;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

const formatDate = (dateValue: string | null | undefined): string => {
  if (!dateValue) return 'Present';
  try {
    const date = new Date(dateValue);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Invalid Date';
  }
};

const ExperienceItemEditable: React.FC<ExperienceItemProps> = ({
  experience,
  onEdit,
  onRemove,
}) => (
  <div className='bg-gray-700/50 p-4 rounded-lg border border-gray-600 space-y-2'>
    <div className='flex justify-between items-start'>
      <h4 className='text-lg font-semibold text-white'>
        {experience.title} at {experience.company}
      </h4>

      <div className='flex gap-2'>
        <button
          type='button'
          onClick={() => onEdit(experience._id)}
          className='text-blue-400 hover:text-blue-300 cursor-pointer'>
          <BsPencil />
        </button>

        <button
          type='button'
          onClick={() => onRemove(experience._id)}
          className='text-red-400 hover:text-red-300 cursor-pointer'>
          <BsTrash />
        </button>
      </div>
    </div>

    <p className='text-gray-400 text-sm flex items-center gap-2'>
      <BsCalendar3 /> {formatDate(experience.startDate)} -{' '}
      {formatDate(experience.endDate)}
      {experience.isCurrent && (
        <span className='ml-2 px-2 py-0.5 bg-green-600/20 text-green-400 rounded text-xs'>
          Current
        </span>
      )}
    </p>
  </div>
);

export default ExperienceItemEditable;
