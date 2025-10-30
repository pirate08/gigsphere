import React from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const PasswordInput = ({
  placeholder,
  visible,
  setVisible,
  color,
  value,
  onChange,
}: {
  placeholder: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className='relative'>
    <input
      type={visible ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-gray-800/70 text-sm md:text-base text-white pl-4 pr-10 py-3 rounded-lg border border-gray-700 focus:border-${color}-500 focus:ring-1 focus:ring-${color}-500 outline-none transition-all duration-200`}
    />
    <button
      type='button'
      onClick={() => setVisible(!visible)}
      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'>
      {visible ? <FaEye /> : <FaEyeSlash />}
    </button>
  </div>
);

export default PasswordInput;
