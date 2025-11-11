import React from 'react';

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 5,
  className = '',
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label htmlFor={id} className='text-sm font-medium text-gray-300'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>

      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className='p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white transition-colors placeholder:text-gray-500'></textarea>
    </div>
  );
};

export default TextArea;
