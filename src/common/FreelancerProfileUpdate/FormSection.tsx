import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-gray-800/70 p-6 rounded-xl border border-gray-700 space-y-6 ${className}`}>
      <h2 className='text-xl font-bold flex items-center gap-3 text-blue-400 border-b border-gray-700 pb-3'>
        <BsPencilSquare /> {title}
      </h2>
      {children}
    </div>
  );
};

export default FormSection;
