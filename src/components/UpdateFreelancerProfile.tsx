// UpdateProfileUI.tsx (Modified to use real data)

'use client';

import React, { useState } from 'react';
import InputText from '@/common/FreelancerProfileUpdate/InputText';
import TextArea from '@/common/FreelancerProfileUpdate/TextArea';
import FormSection from '@/common/FreelancerProfileUpdate/FormSection';
import SkillBadgeEditable from '@/common/FreelancerProfileUpdate/SkillBadgeEditable';
import ExperienceItemEditable from '@/common/FreelancerProfileUpdate/ExperienceItemEditable';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Re-export interfaces for use in other files
export interface PortfolioItem {
  _id: string;
  name: string;
  url: string;
  description: string;
}
export interface CertificateItem {
  _id: string;
  name: string;
  issuer?: string;
  date?: string;
}
export interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
}

// --- Initial State (Defined in Section 1) ---
const API_RESPONSE_DATA = {
  fullName: 'Himadri Shekhar Deb Goswami',
  email: 'himadri&pritha@gmail.com',
  avatar: 'H',
  profile: {
    _id: '6904b653ca4dc298bdd22c4f',
    userId: '6903a9a9b6a416b367bbf60e',
    description:
      'Seasoned Full-Stack Developer specializing in MERN stack, delivering scalable web applications and intuitive user experiences for over 6 years.',
    qualification: ['Bachelor of Science in Software Engineering'],
    skills: [
      'React',
      'Node.js',
      'MongoDB',
      'TypeScript',
      'AWS Lambda',
      'Unit Testing (Jest)',
    ],
    yearsOfExperience: 6,
    hourlyRate: 65,
    location: 'Remote - Europe',
    portfolio: [
      {
        name: 'Senior Collaborative Task Manager',
        url: 'https://taskmanager.com',
        description: 'Led development of new features.',
        _id: '6905059a93225efd90add8fb',
      },
    ],
    certificates: [
      {
        name: 'AWS Certified Developer – Associate',
        issuer: 'Amazon Web Services',
        date: '2023-09-01T00:00:00.000Z',
        _id: '6904b653ca4dc298bdd22c52',
      },
      {
        name: 'Advanced React Hooks',
        issuer: 'Frontend Masters',
        _id: '6904b653ca4dc298bdd22c53',
      },
    ],
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Global Tech Solutions',
        startDate: '2022-01-15T00:00:00.000Z',
        endDate: null,
        isCurrent: true,
        description:
          'Led a team of three developers in migrating legacy APIs to serverless architecture on AWS. Implemented CI/CD pipelines using GitHub Actions.',
        _id: '6904b653ca4dc298bdd22c54',
      },
      {
        title: 'Full Stack Developer',
        company: 'Digital Innovators Co.',
        startDate: '2019-03-01T00:00:00.000Z',
        endDate: '2021-12-31T00:00:00.000Z',
        isCurrent: false,
        description:
          'Built and maintained client-facing dashboards. Responsible for both frontend state management (Redux) and backend API development (Node/Express).',
        _id: '6904b653ca4dc298bdd22c55',
      },
    ],
  },
};
const profileData = API_RESPONSE_DATA.profile;

const initialFormState: ProfileFormState = {
  fullName: API_RESPONSE_DATA.fullName,
  email: API_RESPONSE_DATA.email,
  description: profileData.description,
  qualification: profileData.qualification,
  skills: profileData.skills,
  yearsOfExperience: profileData.yearsOfExperience,
  hourlyRate: profileData.hourlyRate,
  location: profileData.location,
  portfolio: profileData.portfolio as PortfolioItem[],
  certificates: profileData.certificates as CertificateItem[],
  experience: profileData.experience as ExperienceItem[],
  newSkill: '',
  newQualification: '',
};

interface ProfileFormState {
  fullName: string;
  email: string;
  description: string;
  qualification: string[];
  skills: string[];
  yearsOfExperience: number;
  hourlyRate: number;
  location: string;
  portfolio: PortfolioItem[];
  certificates: CertificateItem[];
  experience: ExperienceItem[];
  newSkill: string;
  newQualification: string;
}
// ---

const UpdateProfileUI: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileFormState>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleAddSkill = () => {
    const skill = formData.newSkill.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
        newSkill: '',
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleEditListItem = (id: string, type: string) => {
    alert(`Editing ${type} item with ID: ${id}`);
  };

  const handleRemoveListItem = (id: string, type: keyof ProfileFormState) => {
    setFormData((prev) => ({
      ...prev,
      [type]: (prev[type] as any[]).filter((item) => item._id !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting updated profile data:', formData);
    alert('Profile update simulated! Check console for data.');
  };

  return (
    <div className='min-h-screen bg-black text-white flex justify-center py-10 px-4'>
      <div className='w-full max-w-5xl space-y-8'>
        <h1 className='text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent'>
          Update Your Profile
        </h1>

        <p className='text-gray-400 text-center text-sm md:text-md'>
          Review and update your professional information.
        </p>

        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* --- 1. Basic Information Section --- */}
          <FormSection title='Basic Information'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <InputText
                id='fullName'
                label='Full Name'
                type='text'
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <InputText
                id='email'
                label='Email Address'
                type='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <TextArea
              id='description'
              label='Professional Description'
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </FormSection>
          {/* --- 2. Rate, Experience, & Location Section --- */}
          <FormSection title='Professional Metrics'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <InputText
                id='hourlyRate'
                label='Hourly Rate ($)'
                type='number'
                value={formData.hourlyRate}
                onChange={handleChange}
                required
              />

              <InputText
                id='yearsOfExperience'
                label='Years of Experience'
                type='number'
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
              />

              <InputText
                id='location'
                label='Location/Timezone'
                type='text'
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </FormSection>

          {/* --- 3. Skills and Qualifications Section --- */}

          <FormSection title='Skills & Education'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Skills Input */}
              <div>
                <h3 className='text-lg font-semibold text-gray-300 mb-3'>
                  Skills
                </h3>

                <div className='flex gap-2 mb-4'>
                  <InputText
                    id='newSkill'
                    label=''
                    type='text'
                    value={formData.newSkill}
                    onChange={handleChange}
                    placeholder='Add a new skill'
                    className='flex-grow'
                  />

                  <button
                    type='submit'
                    onSubmit={handleAddSkill}
                    className='px-4  bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer'>
                    Add
                  </button>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {formData.skills.map((skill, index) => (
                    <SkillBadgeEditable
                      key={index}
                      skill={skill}
                      onRemove={handleRemoveSkill}
                    />
                  ))}
                </div>
              </div>
              {/* Education/Qualification Display */}
              <div>
                <h3 className='text-lg font-semibold text-gray-300 mb-3'>
                  Qualifications
                </h3>

                <ul className='space-y-2'>
                  {formData.qualification.map((q, index) => (
                    <li
                      key={index}
                      className='bg-gray-700/50 p-3 rounded-lg flex justify-between items-center'>
                      <span className='text-gray-300 text-sm'>{q}</span>
                      {/* Remove button for qualifications */}
                      <button
                        type='button'
                        onClick={() => {
                          /* logic to remove qualification */
                        }}
                        className='text-red-400 hover:text-red-300 text-sm cursor-pointer'>
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type='button'
                  className='mt-3 w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer'>
                  + Add New Qualification
                </button>
              </div>
            </div>
          </FormSection>

          {/* --- 4. Dynamic Sections (Experience, Portfolio, Certificates) --- */}

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Experience */}
            <FormSection title='Experience (Jobs)' className='lg:col-span-3'>
              <div className='space-y-4'>
                {formData.experience.map((exp) => (
                  <ExperienceItemEditable
                    key={exp._id}
                    experience={exp}
                    onEdit={(id) => handleEditListItem(id, 'experience')}
                    onRemove={(id) => handleRemoveListItem(id, 'experience')}
                  />
                ))}
              </div>

              <button
                type='button'
                className='mt-3 w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer'>
                + Add New Experience
              </button>
            </FormSection>
            {/* Portfolio and Certificates in two columns on large screens */}
            <div className='lg:col-span-2 space-y-8'>
              <FormSection title='Portfolio'>
                <div className='space-y-4'>
                  {formData.portfolio.map((p) => (
                    <div
                      key={p._id}
                      className='bg-gray-700/50 p-4 rounded-lg border border-gray-600 flex justify-between items-start sm:items-center'>
                      <Link href={p.url}>
                        <h1 className='text-lg'>{p.name}</h1>
                        <p className='mt-3 text-gray-300 text-md'>
                          {p.description}
                        </p>
                      </Link>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          onClick={() => handleEditListItem(p._id, 'portfolio')}
                          className='text-blue-400 hover:text-blue-300 text-sm cursor-pointer'>
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() =>
                            handleRemoveListItem(p._id, 'portfolio')
                          }
                          className='text-red-400 hover:text-red-300 text-sm cursor-pointer'>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type='button'
                  className='mt-3 w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer'>
                  + Add New Portfolio Item
                </button>
              </FormSection>
            </div>
            <div className='lg:col-span-1 space-y-8'>
              <FormSection title='Certifications'>
                <div className='space-y-4'>
                  {formData.certificates.map((c) => (
                    <div
                      key={c._id}
                      className='bg-gray-700/50 p-4 rounded-lg border border-gray-600'>
                      <p className='font-semibold text-white'>{c.name}</p>
                      <p className='text-gray-400 text-sm'>
                        {c.issuer || 'N/A'}
                      </p>
                      <div className='flex justify-end gap-2 text-sm mt-2'>
                        <button
                          type='button'
                          onClick={() =>
                            handleEditListItem(c._id, 'certificate')
                          }
                          className='text-blue-400 hover:text-blue-300 cursor-pointer'>
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() =>
                            handleRemoveListItem(c._id, 'certificates')
                          }
                          className='text-red-400 hover:text-red-300 cursor-pointer'>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type='button'
                  className='mt-3 w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer'>
                  + Add New Certificate
                </button>
              </FormSection>
            </div>
          </div>
          {/* --- Submit Button --- */}
          <div className='flex justify-center pt-4 gap-5'>
            <button
              type='submit'
              className='px-8 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 cursor-pointer'>
              Save Profile Updates
            </button>
            {/* --Back button-- */}
            <div>
              <button
                type='button'
                onClick={() => router.back()}
                className='cursor-pointer px-4 py-3 rounded-md bg-gray-900/100 hover:bg-gray-800/100 text-white'>
                Go Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileUI;
