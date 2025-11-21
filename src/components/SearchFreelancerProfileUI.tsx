'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { CiMail, CiMapPin } from 'react-icons/ci';
import {
  FaDollarSign,
  FaBriefcase,
  FaAward,
  FaExternalLinkAlt,
  FaCalendar,
} from 'react-icons/fa';

interface FreelancerProfileProps {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  qualification: string[];
  skills: string[];
  yearsOfExperience: number;
  hourlyRate: number;
  location: string;
  portfolio: { name: string; description: string; url: string }[];
  certificates: { name: string; issuer?: string; date?: Date }[];
  experience: {
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    isCurrent: boolean;
    description?: string;
  }[];
}

interface SearchFreelancerProfileUIProps {
  profile: FreelancerProfileProps;
}

const SearchFreelancerProfileUI: React.FC<SearchFreelancerProfileUIProps> = ({
  profile,
}) => {
  const router = useRouter();

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'>
      {/* Header Section */}
      <div className='bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <button
            onClick={() => router.back()}
            className='text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 text-sm cursor-pointer'>
            ← Back to Search Results
          </button>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Profile Header Card */}
        <div className='bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 p-6 sm:p-8 mb-8'>
          <div className='flex flex-col sm:flex-row gap-6 items-start'>
            {/* Avatar */}
            <div className='flex-shrink-0'>
              <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-lg'>
                {profile.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Profile Info */}
            <div className='flex-1 min-w-0'>
              <h1 className='text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                {profile.name}
              </h1>
              <p className='text-slate-300 text-base sm:text-lg mb-4 leading-relaxed'>
                {profile.bio}
              </p>

              {/* Quick Info Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='flex items-center gap-2 text-slate-300'>
                  <CiMail className='w-4 h-4 text-cyan-400 flex-shrink-0' />
                  <span className='text-sm truncate'>{profile.email}</span>
                </div>
                <div className='flex items-center gap-2 text-slate-300'>
                  <CiMapPin className='w-4 h-4 text-cyan-400 flex-shrink-0' />
                  <span className='text-sm'>{profile.location}</span>
                </div>
                <div className='flex items-center gap-2 text-slate-300'>
                  <FaDollarSign className='w-4 h-4 text-cyan-400 flex-shrink-0' />
                  <span className='text-sm'>${profile.hourlyRate}/hr</span>
                </div>
                <div className='flex items-center gap-2 text-slate-300'>
                  <FaBriefcase className='w-4 h-4 text-cyan-400 flex-shrink-0' />
                  <span className='text-sm'>
                    {profile.yearsOfExperience} years exp.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Skills & Qualifications */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Skills */}
            <div className='bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm'>
              <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
                <span className='w-1 h-6 bg-cyan-500 rounded-full'></span>
                Skills
              </h2>
              <div className='flex flex-wrap gap-2'>
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className='px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 transition-colors'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div className='bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm'>
              <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
                <span className='w-1 h-6 bg-blue-500 rounded-full'></span>
                Qualifications
              </h2>
              <div className='space-y-2'>
                {profile.qualification.map((qual, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-2 text-slate-300'>
                    <FaAward className='w-4 h-4 text-blue-400 mt-1 flex-shrink-0' />
                    <span className='text-sm'>{qual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            {profile.certificates.length > 0 && (
              <div className='bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm'>
                <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
                  <span className='w-1 h-6 bg-purple-500 rounded-full'></span>
                  Certificates
                </h2>
                <div className='space-y-3'>
                  {profile.certificates.map((cert, index) => (
                    <div
                      key={index}
                      className='border-l-2 border-purple-500/30 pl-4'>
                      <h3 className='font-medium text-slate-200'>
                        {cert.name}
                      </h3>
                      {cert.issuer && (
                        <p className='text-sm text-slate-400 mt-1'>
                          {cert.issuer}
                        </p>
                      )}
                      {cert.date && (
                        <p className='text-xs text-slate-500 mt-1'>
                          {formatDate(cert.date)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Experience & Portfolio */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Experience */}
            <div className='bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm'>
              <h2 className='text-2xl font-semibold mb-6 flex items-center gap-2'>
                <span className='w-1 h-6 bg-emerald-500 rounded-full'></span>
                Work Experience
              </h2>
              <div className='space-y-6'>
                {profile.experience.map((exp, index) => (
                  <div
                    key={index}
                    className='relative pl-8 pb-6 border-l-2 border-emerald-500/30 last:border-0 last:pb-0'>
                    <div className='absolute left-0 top-0 w-3 h-3 bg-emerald-500 rounded-full -translate-x-[7px]'></div>
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2'>
                      <div>
                        <h3 className='text-lg font-semibold text-slate-100'>
                          {exp.title}
                        </h3>
                        <p className='text-cyan-400 font-medium'>
                          {exp.company}
                        </p>
                      </div>
                      <div className='flex items-center gap-2 text-sm text-slate-400 flex-shrink-0'>
                        <FaCalendar className='w-4 h-4' />
                        <span>
                          {formatDate(exp.startDate)} -{' '}
                          {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <p className='text-slate-300 text-sm leading-relaxed mt-2'>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            {profile.portfolio.length > 0 && (
              <div className='bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm'>
                <h2 className='text-2xl font-semibold mb-6 flex items-center gap-2'>
                  <span className='w-1 h-6 bg-orange-500 rounded-full'></span>
                  Portfolio
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {profile.portfolio.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group bg-slate-900/50 rounded-lg p-5 border border-slate-700/50 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10'>
                      <div className='flex items-start justify-between gap-2 mb-2'>
                        <h3 className='font-semibold text-slate-100 group-hover:text-orange-400 transition-colors'>
                          {item.name}
                        </h3>
                        <FaExternalLinkAlt className='w-4 h-4 text-orange-400 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
                      </div>
                      <p className='text-sm text-slate-400 leading-relaxed'>
                        {item.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFreelancerProfileUI;
