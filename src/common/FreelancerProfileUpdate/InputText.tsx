import React from 'react';

interface InputTextProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'url';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const InputText: React.FC<InputTextProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label htmlFor={id} className='text-sm font-medium text-gray-300'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className='p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white transition-colors placeholder:text-gray-500'
      />
    </div>
  );
};

export default InputText;
