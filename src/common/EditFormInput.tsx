import React from 'react';

interface EditFormInputProps {
  label: string;
  id: string;
  htmlFor?: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const EditFormInput: React.FC<EditFormInputProps> = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <div className='flex flex-col gap-2 mb-4'>
      <label
        className='text-md text-gray-100 font-medium cursor-pointer'
        htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 '
      />
    </div>
  );
};

export default EditFormInput;
