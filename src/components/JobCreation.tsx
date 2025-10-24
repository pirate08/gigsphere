'use client';

import EditDescriptionInput from '@/common/EditDescriptionInput';
import EditFormInput from '@/common/EditFormInput';
import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';

const JobCreation = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    employmentType: '',
    budget: '',
    skills: [] as string[],
    status: 'draft',
  });
  const [skillsInput, setSkillsInput] = useState(''); // Add this state to track raw input
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // -- Handler for input changes --
  const handleInputChanges = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let newValue: string | string[] = value;

      if (name === 'budget') {
        newValue = value.replace(/[^0-9]/g, '');
      }

      if (name === 'skills') {
        return prevData;
      }

      return {
        ...prevData,
        [name]: newValue,
      };
    });
  };

  // --Handle the skills array separately--
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillString = e.target.value;
    setSkillsInput(skillString); // Store the raw input

    const skillsArray = skillString
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    setFormData((prevData) => ({
      ...prevData,
      skills: skillsArray,
    }));
  };

  // --Handle for Submission--
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);

    // --Getting the token--
    const token = getCookie('user_token');

    if (!token) {
      toast.error('User not authenticated. Please log in.');
      setIsSaving(false);
      return;
    }

    // --Data to send--
    const dataToSend = {
      ...formData,
      budget: Number(formData.budget),
    };

    // --API Call to create the job--
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/jobs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        toast.success('Job created successfully!');
        // --Sending the user to the job details page--
        const result = await response.json();
        router.push(`/client-dashboard/job-details/${result.job._id}`);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error(
        'An error occurred while creating the job. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 py-10'>
      <div className='w-full max-w-3xl bg-gray-900/80 rounded-2xl shadow-2xl backdrop-blur-md text-white p-6 sm:p-8 md:p-10 flex flex-col'>
        {/* Header */}
        <div className='text-center mb-8 sm:mb-10'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent'>
            Create a Job
          </h1>
          <p className='text-gray-400 text-xs sm:text-sm mt-2'>
            Fill in the details below to post a new job opportunity.
          </p>
        </div>

        {/* Form */}
        <form className='space-y-5 sm:space-y-6' onSubmit={handleSubmit}>
          {/* Full Name */}
          <EditFormInput
            label='Full Name'
            id='title'
            type='text'
            name='title'
            placeholder='Enter your full name...'
            value={formData.title}
            onChange={handleInputChanges}
            required={true}
          />

          {/* Description */}
          <EditDescriptionInput
            label='Description'
            id='description'
            name='description'
            placeholder='Enter job description...'
            value={formData.description}
            onChange={handleInputChanges}
            required={true}
          />

          {/* Responsive Two-column Section (Location + Employment Type) */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {/* Location */}
            <div className='flex flex-col gap-2'>
              <label
                className='text-sm font-medium text-gray-200'
                htmlFor='location'>
                Location
              </label>
              <select
                name='location'
                id='location'
                value={formData.location}
                onChange={handleInputChanges}
                className='p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                <option value=''>Select Location</option>
                <option value='On-Site'>On-Site</option>
                <option value='Remote'>Remote</option>
                <option value='Hybrid'>Hybrid</option>
              </select>
            </div>

            {/* Employment Type */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='employmentType'
                className='text-sm font-medium text-gray-200'>
                Employment Type
              </label>
              <select
                name='employmentType'
                id='employmentType'
                value={formData.employmentType}
                onChange={handleInputChanges}
                className='p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                <option value=''>Select Type</option>
                <option value='full-time'>Full-Time</option>
                <option value='part-time'>Part-Time</option>
                <option value='contract'>Contract</option>
                <option value='internship'>Internship</option>
              </select>
            </div>
          </div>

          {/* Budget */}
          <EditFormInput
            label='Budget ($)'
            id='budget'
            type='text'
            name='budget'
            placeholder='Enter the project budget...'
            value={formData.budget}
            onChange={handleInputChanges}
            required={true}
          />

          {/* Skills */}
          <EditDescriptionInput
            label='Skills Required'
            id='skills'
            name='skills'
            placeholder='Add skills (e.g., React, Node.js, TypeScript)...'
            value={skillsInput}
            onChange={
              handleSkillsChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>
            }
            required={true}
          />

          {/* Status */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='status'
              className='text-sm font-medium text-gray-200'>
              Status
            </label>
            <select
              name='status'
              id='status'
              value={formData.status}
              onChange={handleInputChanges}
              className='p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
              <option value=''>Select Status</option>
              <option value='open'>Open</option>
              <option value='closed'>Closed</option>
              <option value='draft'>Draft</option>
            </select>
          </div>

          {/* Buttons */}
          <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6'>
            <button
              type='button'
              onClick={() => router.back()}
              className='flex items-center justify-center gap-2 bg-gray-200 text-black px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-all duration-200 w-full sm:w-auto cursor-pointer'>
              <RiArrowGoBackLine />
              Go Back
            </button>

            <button
              type='submit'
              disabled={isSaving}
              className='flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition-all duration-200 w-full sm:w-auto cursor-pointer'>
              <FaSave />
              {isSaving ? 'Saving...' : ' Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreation;
