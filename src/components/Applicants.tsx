'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import {
  FaUserCircle,
  FaEye,
  FaCheck,
  FaTimes,
  FaArrowLeft,
} from 'react-icons/fa';

// 🔹 Demo Applicant Data
const demoApplicants = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
  },
  {
    id: 3,
    name: 'Michael Lee',
    email: 'michael.lee@example.com',
  },
];

const Applicants = () => {
  const router = useRouter();
  return (
    <div className='w-full max-w-5xl mx-auto mt-8 px-4 space-y-4'>
      {/* --Total number and back button-- */}
      <div className='flex items-start sm:items-center sm:justify-between flex-col sm:flex-row gap-4 mb-5'>
        {/* --Total Applicants Number-- */}
        <div className='bg-white px-5 py-2 rounded-md hover:bg-gray-200'>
          <h1 className='text-lg sm:text-lg'>Total Applicants: 03</h1>
        </div>
        {/* --Back Button-- */}
        <div className='bg-green-800 text-white px-5 py-2 rounded-md hover:bg-green-700'>
          <button
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => router.back()}>
            <span>
              <FaArrowLeft />
            </span>
            Go back to job details
          </button>
        </div>
      </div>
      {/* --List view render here-- */}
      {demoApplicants.map((applicant, index) => (
        <div
          key={applicant.id}
          className='bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-xl
          flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          {/* Serial Number + Left Section */}
          <div className='flex items-center gap-4'>
            {/* Serial Number */}
            <div className='text-white text-xl font-bold w-8 text-center'>
              {index + 1}
            </div>

            <FaUserCircle className='text-4xl text-blue-400' />

            <div>
              <h3 className='text-lg font-semibold text-white'>
                {applicant.name}
              </h3>
              <p className='text-gray-300 text-sm'>{applicant.email}</p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className='flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto'>
            <button
              className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
              text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto transition cursor-pointer'>
              <FaEye /> Profile
            </button>

            <button
              className='flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700
              text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto transition cursor-pointer'>
              <FaCheck /> Accept
            </button>

            <button
              className='flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700
              text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto transition cursor-pointer'>
              <FaTimes /> Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Applicants;
