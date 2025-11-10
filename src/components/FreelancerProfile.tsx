'use client';

import React from 'react';
import {
  BsBriefcase,
  BsGeoAlt,
  BsCurrencyDollar,
  BsAward,
  BsCodeSlash,
  BsBoxArrowUpRight,
  BsMortarboard,
} from 'react-icons/bs';

import Section from '@/common/FreelancerProfile/Section';
import SkillBadge from '@/common/FreelancerProfile/SkillBadge';
import ExperienceCard from '@/common/FreelancerProfile/ExperienceCard';
import CertificateCard from '@/common/FreelancerProfile/CertificateCard';
import PortfolioCard from '@/common/FreelancerProfile/PortfolioCard';
import { useRouter } from 'next/navigation';
import StatBox from '@/common/StatsBox';

const FreelancerProfile: React.FC = () => {
  const profileData = {
    fullName: 'Himadri Shekhar Deb Goswami',
    email: 'himadri&pritha@gmail.com',
    avatar: 'H',
    profile: {
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
          _id: '1',
        },
      ],
      certificates: [
        {
          name: 'AWS Certified Developer – Associate',
          issuer: 'Amazon Web Services',
          date: '2023-09-01T00:00:00.000Z',
          _id: '2',
        },
        {
          name: 'Advanced React Hooks',
          issuer: 'Frontend Masters',
          _id: '3',
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
          _id: '4',
        },
        {
          title: 'Full Stack Developer',
          company: 'Digital Innovators Co.',
          startDate: '2019-03-01T00:00:00.000Z',
          endDate: '2021-12-31T00:00:00.000Z',
          isCurrent: false,
          description:
            'Built and maintained client-facing dashboards. Responsible for both frontend state management (Redux) and backend API development (Node/Express).',
          _id: '5',
        },
      ],
    },
  };

  const Dashboard = [
    {
      id: 1,
      name: 'Total Applied',
      value: 5,
    },
    {
      id: 2,
      name: 'Pending Applications',
      value: 4,
    },
    {
      id: 3,
      name: 'Accepted Applications',
      value: 0,
    },
    {
      id: 4,
      name: 'Rejected Applications',
      value: 1,
    },
  ];

  const router = useRouter();

  return (
    <div className='bg-black text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 sm:p-8 mb-8 border border-gray-700 shadow-2xl'>
          <div className='flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6'>
            <div className='h-24 w-24 sm:h-28 sm:w-28 rounded-full flex items-center justify-center text-4xl sm:text-5xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-lg flex-shrink-0'>
              {profileData.avatar}
            </div>
            <div className='flex-1 text-center sm:text-left'>
              <h1 className='text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-2'>
                {profileData.fullName}
              </h1>
              <p className='text-gray-400 text-sm sm:text-base mb-4'>
                {profileData.email}
              </p>

              <div className='flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start'>
                <div className='flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700'>
                  <BsGeoAlt className='w-4 h-4 text-blue-400' />
                  <span>{profileData.profile.location}</span>
                </div>
                <div className='flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700'>
                  <BsCurrencyDollar className='w-4 h-4 text-green-400' />
                  <span>${profileData.profile.hourlyRate}/hr</span>
                </div>
                <div className='flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700'>
                  <BsBriefcase className='w-4 h-4 text-purple-400' />
                  <span>{profileData.profile.yearsOfExperience} yrs exp.</span>
                </div>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-700 pt-6'>
            <h2 className='text-lg font-semibold text-gray-300 mb-3'>About</h2>
            <p className='text-gray-300 leading-relaxed text-sm sm:text-base'>
              {profileData.profile.description}
            </p>
          </div>

          {/* --Stats Box-- */}
          <div className='mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full'>
            {Dashboard.map((dashboard) => (
              <div key={dashboard.id}>
                <StatBox value={dashboard.value} label={dashboard.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            <Section title='Experience' icon={BsBriefcase}>
              <div className='space-y-4'>
                {profileData.profile.experience.map((exp) => (
                  <ExperienceCard key={exp._id} experience={exp} />
                ))}
              </div>
            </Section>

            <Section title='Portfolio' icon={BsBoxArrowUpRight}>
              <div className='space-y-4'>
                {profileData.profile.portfolio.map((p) => (
                  <PortfolioCard key={p._id} project={p} />
                ))}
              </div>
            </Section>
          </div>

          <div className='space-y-8'>
            <Section title='Skills' icon={BsCodeSlash}>
              <div className='flex flex-wrap gap-2'>
                {profileData.profile.skills.map((s, i) => (
                  <SkillBadge key={i} skill={s} />
                ))}
              </div>
            </Section>

            <Section title='Education' icon={BsMortarboard}>
              <div className='space-y-3'>
                {profileData.profile.qualification.map((q, i) => (
                  <div
                    key={i}
                    className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
                    <p className='text-gray-300 text-sm'>{q}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title='Certifications' icon={BsAward}>
              <div className='space-y-3'>
                {profileData.profile.certificates.map((c) => (
                  <CertificateCard key={c._id} certificate={c} />
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
      {/* --Button Section-- */}
      <div className='flex items-center justify-center gap-5'>
        {/* --Update button-- */}
        <div>
          <button
            onClick={() => router.push('/freelancer-profile/update')}
            className='cursor-pointer px-4 py-2 rounded-md bg-green-900/100 hover:bg-green-800/100 text-white '>
            Update Profile
          </button>
        </div>
        {/* --Back button-- */}
        <div>
          <button
            onClick={() => router.back()}
            className='cursor-pointer px-4 py-2 rounded-md bg-gray-900/100 hover:bg-gray-800/100 text-white '>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
