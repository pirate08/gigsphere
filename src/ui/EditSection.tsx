'use client';

import EditDescriptionInput from '@/common/EditDescriptionInput';
import EditFormInput from '@/common/EditFormInput';
import React, { useState } from 'react';
// import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';

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

interface EditProps {
  job: Job;
  closeModel: () => void; // Must match the prop passed from JobDetailsPage.tsx
}

const Edit: React.FC<EditProps> = ({ job, closeModel }) => {
  // 1. Initialize formData with original job data
  const [formData, setFormdata] = useState<Job>(job);
  // 2. Local state for skills input as a comma-separated string
  const [localSkillsInput, setLocalSkillsInput] = useState<string>(
    job.skills.join(', ')
  );
  // 3.

  // General handler for all fields *except* skills and budget
  const handleInputChanges = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'skills') {
      // 3. For 'skills', just update the local input state. DO NOT process the array here.
      setLocalSkillsInput(value);
      return; // Exit early to prevent generic update
    }

    let updatedValue: string | number = value;

    if (name === 'budget') {
      // Handle budget conversion (important for consistency)
      updatedValue = Number(value);
    }

    setFormdata((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  // 4. New handler for when the user leaves the skills input
  const handleSkillsBlur = () => {
    // Perform the array conversion and final state update here (on blur)
    const newSkillsArray = localSkillsInput
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    setFormdata((prevData) => ({
      ...prevData,
      skills: newSkillsArray,
    }));
  };

  const handleCancel = () => {
    closeModel();
  };

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center md:max-w-3xl mx-auto px-4 sm:px-8 py-8 md:py-10 bg-gray-900/70 text-white rounded-2xl  backdrop-blur-md'>
      <h1 className='text-2xl md:text-3xl bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent font-bold'>
        Edit Job Section
      </h1>
      {/* --Form-- */}
      <div className='w-full mt-6'>
        <form className='space-y-6'>
          {/* --Title Section-- */}
          <EditFormInput
            label='Full Name'
            id='title'
            type='text'
            name='title'
            placeholder={'Enter your full name...'}
            value={formData.title}
            onChange={handleInputChanges}
            required={true}
          />
          {/* --Description Section-- */}
          <EditDescriptionInput
            label='Description'
            id='description'
            name='description'
            placeholder={'Enter job description...'}
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
              <option value='On-Site' className='cursor-pointer'>
                On-Site
              </option>
              <option value='Remote' className='cursor-pointer'>
                Remote
              </option>
              <option value='Hybrid' className='cursor-pointer'>
                Hybrid
              </option>
            </select>
          </div>
          {/* --Employment-Type Section-- */}
          <div className='flex flex-col gap-2 mb-4'>
            <label
              htmlFor='employment'
              className='text-md text-gray-100 font-medium cursor-pointer'>
              Employment Type
            </label>
            <select
              name='employmentType'
              id='employmentType'
              value={formData.employmentType}
              onChange={handleInputChanges}
              className='p-2 border border-gray-300 rounded-md focus:outline-none bg-black text-white focus:ring-2 focus:ring-blue-500 '>
              <option value='full-time'>Full-Time</option>
              <option value='part-time'>Part-Time</option>
              <option value='contract'>Contract</option>
              <option value='internship'>Internship</option>
            </select>
          </div>
          {/* --Budget Section-- */}
          <EditFormInput
            label='Budget ($)'
            id='budget'
            type='number'
            name='budget'
            placeholder={'Enter the project budget...'}
            value={formData.budget}
            onChange={handleInputChanges}
            required={true}
          />
          {/* --Skills Section-- */}
          <EditDescriptionInput
            label='Skills Required'
            id='skills'
            name='skills'
            placeholder={'Add skills (e.g., React, Node.js, TypeScript)...'}
            value={localSkillsInput}
            onBlur={handleSkillsBlur}
            onChange={handleInputChanges}
            required={true}
          />
          {/* --Status Section-- */}
          <div className='flex flex-col gap-2 mb-4'>
            <label
              htmlFor='employment'
              className='text-md text-gray-100 font-medium cursor-pointer'>
              Status
            </label>
            <select
              name='status'
              id='status'
              value={formData.status}
              onChange={handleInputChanges}
              className='p-2 border border-gray-300 rounded-md focus:outline-none bg-black text-white focus:ring-2 focus:ring-blue-500 '>
              <option value='open'>Open</option>
              <option value='closed'>Closed</option>
              <option value='draft'>Draft</option>
            </select>
          </div>
        </form>
        {/* --Buttons-- */}
        <div className='flex justify-center gap-4 mt-6'>
          <button
            className='flex items-center gap-1 bg-white text-black cursor-pointer px-4 py-2 rounded-md hover:bg-gray-200'
            onClick={handleCancel}>
            <span>
              <RiArrowGoBackLine />
            </span>
            Go Back
          </button>
          <button className='flex items-center gap-2 bg-green-700 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-green-800'>
            <span>
              <FaSave />
            </span>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
