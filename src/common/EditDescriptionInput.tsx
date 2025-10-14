import React from 'react';

interface EditFormDescriptionProps {
  label: string;
  id: string;
  htmlFor?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const EditDescriptionInput: React.FC<EditFormDescriptionProps> = ({
  id,
  label,
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
      <textarea
        id={id}
        cols={30}
        rows={5}
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

export default EditDescriptionInput;
