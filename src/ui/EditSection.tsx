'use client';

import EditDescriptionInput from '@/common/EditDescriptionInput';
import EditFormInput from '@/common/EditFormInput';
import React, { useState } from 'react';
// import toast from 'react-hot-toast';

// Define the Job interface to match the data structure
interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  budget: number;
  skills: string[];
  clientId: string;
  status: 'open' | 'closed' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface JobDetailsProps {
  job: Job;
}

const Edit: React.FC<JobDetailsProps> = ({ job }) => {
  // --State to handle the job deatils and help to handle the form inputs--
  const [formData, setFormdata] = useState<Job>(job);

  const handleInputChanges = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='h-screen flex flex-col justify-start items-center w-full md:max-w-3xl mx-auto brightness-50 px-10 py-6 bg-gray-900 text-white'>
      <h1 className='text-2xl md:text-3xl bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent font-bold'>
        Edit Job Section
      </h1>
      {/* --Form-- */}
      <div className='w-full mt-6'>
        <form className='space-y-6'>
          {/* --Title Section-- */}
          <EditFormInput
            label='Full Name'
            id='name'
            type='text'
            name='name'
            placeholder={'Enter your full name'}
            value={formData.title}
            onChange={handleInputChanges}
            required={true}
          />
          {/* --Description Section-- */}
          <EditDescriptionInput
            label='Description'
            id='description'
            name='description'
            placeholder={'Enter your full name'}
            value={formData.description}
            onChange={handleInputChanges}
            required={true}
          />
          {/* --Location Section-- */}
          <div className='flex flex-col gap-2 mb-4'>
            <label
              className='text-md text-gray-100 font-medium cursor-pointer'
              htmlFor='location'>
              Location
            </label>
            <select
              name='location'
              id='location'
              value={formData.location}
              onChange={handleInputChanges}
              className='p-2 border border-gray-300 rounded-md focus:outline-none bg-black text-white focus:ring-2 focus:ring-blue-500 '>
              <option value='on-site' className='cursor-pointer'>
                On-Site
              </option>
              <option value='remote' className='cursor-pointer'>
                Remote
              </option>
              <option value='hybrid' className='cursor-pointer'>
                Hybrid
              </option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
