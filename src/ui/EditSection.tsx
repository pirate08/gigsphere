'use client';

import EditDescriptionInput from '@/common/EditDescriptionInput';
import EditFormInput from '@/common/EditFormInput';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { getCookie } from 'cookies-next';



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
  closeModel: () => void;
}

const Edit: React.FC<EditProps> = ({ job, closeModel }) => {
  // 1. Initialize formData with original job data
  const [formData, setFormdata] = useState<Job>(job);
  // 2. Local state for skills input as a comma-separated string
  const [localSkillsInput, setLocalSkillsInput] = useState<string>(
    job.skills.join(', ')
  );
  // 3. Setting the state to handle the saving button
  const [isSaving, setIsSaving] = useState<boolean>(false);
  // 4. State to track if any modifications have been made
  const [isModified, setIsModified] = useState<boolean>(false);

  //  Function to deeply compare current and original data
  const hasChanges = (data: Job, original: Job, skillsStr: string) => {
    const normalizedSkills = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const sameSkills =
      JSON.stringify(normalizedSkills.sort()) ===
      JSON.stringify(original.skills.sort());

    return !(
      data.title === original.title &&
      data.description === original.description &&
      data.location === original.location &&
      data.employmentType === original.employmentType &&
      data.budget === original.budget &&
      data.status === original.status &&
      sameSkills
    );
  };

  //  Check for changes whenever formData or skills input changes
  useEffect(() => {
    setIsModified(hasChanges(formData, job, localSkillsInput));
  }, [formData, localSkillsInput, job]);

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

  // --Handle Form Submission--
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --Get token from cookies--
    const token = getCookie('user_token');

    if (!token) {
      toast.error('No authentication token found. Please log in again.', {
        duration: 4000,
      });
      return;
    }

    setIsSaving(true);

    // 3. Finalize data to send
    const finalSkillsArray = localSkillsInput
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    const updatedFormData = {
      ...formData,
      skills: finalSkillsArray,
      updatedAt: new Date().toISOString(),
    };

    // --Api Call--
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/jobs/${job._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          body: JSON.stringify(updatedFormData),
        }
      );

      if (response.ok) {
        toast.success('Job updated successfully!', {
          duration: 4000,
        });
        setIsSaving(false);
        closeModel();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error(
        'An error occurred while updating the job. Please try again.',
        {
          duration: 4000,
        }
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center md:max-w-3xl mx-auto px-4 sm:px-8 py-8 md:py-10 bg-gray-900/70 text-white rounded-2xl  backdrop-blur-md'>
      <h1 className='text-2xl md:text-3xl bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent font-bold'>
        Edit Job Section
      </h1>
      {/* --Form-- */}
      <div className='w-full mt-6'>
        <form className='space-y-6' onSubmit={handleSubmit}>
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
          {/* --Buttons-- */}
          <div className='flex justify-center gap-4 mt-6'>
            <button
              type='button'
              className='flex items-center gap-1 bg-white text-black cursor-pointer px-4 py-2 rounded-md hover:bg-gray-200'
              onClick={handleCancel}>
              <span>
                <RiArrowGoBackLine />
              </span>
              Go Back
            </button>
            <button
              type='submit'
              disabled={isSaving || !isModified}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                isSaving || !isModified
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800 cursor-pointer'
              }`}>
              <span>
                <FaSave />
              </span>
              {isSaving ? 'Saving...' : ' Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
