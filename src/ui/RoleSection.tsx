import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';

interface RoleSelectionProps {
  selectedRole: 'freelancer' | 'client' | null;
  onSelectRole: (role: 'freelancer' | 'client') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  selectedRole,
  onSelectRole,
}) => (
  <div className='flex flex-col gap-2'>
    <label className='text-sm text-gray-600 font-medium' htmlFor='role'>
      I want to:
    </label>
    <div className='flex flex-col sm:flex-row gap-4'>
      <div
        className={`flex-1 px-4 py-3 border rounded-md cursor-pointer transition-colors duration-200 ${
          selectedRole === 'client'
            ? 'border-blue-500 ring-2 ring-blue-500'
            : 'border-gray-300'
        }`}
        onClick={() => onSelectRole('client')}>
        <div className='flex flex-col items-center justify-center gap-2'>
          <FaShoppingBag className='text-2xl text-blue-500' />
          <h3 className='font-semibold text-sm text-gray-800 text-center'>
            Hire Freelancers
          </h3>
          <p className='text-xs text-gray-500 text-center'>
            I'm a client looking for talent
          </p>
        </div>
      </div>
      <div
        className={`flex-1 px-4 py-3 border rounded-md cursor-pointer transition-colors duration-200 ${
          selectedRole === 'freelancer'
            ? 'border-green-500 ring-2 ring-green-500'
            : 'border-gray-300'
        }`}
        onClick={() => onSelectRole('freelancer')}>
        <div className='flex flex-col items-center justify-center gap-2'>
          <BsPeopleFill className='text-2xl text-green-500' />
          <h3 className='font-semibold text-sm text-gray-800 text-center'>
            Find Work
          </h3>
          <p className='text-xs text-gray-500 text-center'>
            I'm a freelancer seeking jobs
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default RoleSelection;
