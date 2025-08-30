import React from 'react';

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) => (
  <div className='flex flex-col'>
    <label className='text-sm text-gray-600 font-medium' htmlFor={id}>
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
      className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
  </div>
);

export default FormInput;
