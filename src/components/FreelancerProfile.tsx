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

interface FreelancerProfileProps {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  description: string;
  qualification: string[];
  skills: string[];
  yearsOfExperience: number;
  hourlyRate: number;
  location: string;
  portfolio: { _id?: string; name: string; description: string; url: string }[];
  certificates: { _id?: string; name: string; issuer?: string; date?: Date }[];
  experience: {
    _id?: string;
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    isCurrent: boolean;
    description?: string;
  }[];
}

interface StatsProps {
  totalApplied: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}

interface Props {
  profileData: FreelancerProfileProps[];
  error: string | null;
  stats: StatsProps;
}

const FreelancerProfile: React.FC<Props> = ({ profileData, error, stats }) => {
  const router = useRouter();

  // Handle error state
  if (error) {
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-400 text-xl mb-4'>{error}</p>
          <button
            onClick={() => router.back()}
            className='cursor-pointer px-4 py-2 rounded-md bg-gray-900/100 hover:bg-gray-800/100 text-white'>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Handle empty profile data
  if (!profileData || profileData.length === 0) {
    return (
      <div className='bg-black text-white min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-gray-400 text-xl mb-4'>No profile data found.</p>
          <button
            onClick={() => router.push('/freelancer-profile/create')}
            className='cursor-pointer px-4 py-2 rounded-md bg-green-900/100 hover:bg-green-800/100 text-white'>
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  // Get the first profile (assuming single profile per user)
  const profile = profileData[0];

  // --Storing the fetched data in localstorage--
  const handleClickUpdate = () => {
    const profileToEdit = profileData[0];

    // --Stringify and save the complex object to localStorage--
    localStorage.setItem(
      'freelancerProfileToEdit',
      JSON.stringify(profileToEdit)
    );

    // --Navigate to the update page--
    router.push('/freelancer-profile/update');
  };

  return (
    <div className='bg-black text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 sm:p-8 mb-8 border border-gray-700 shadow-2xl'>
          <div className='flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6'>
            <div className='h-24 w-24 sm:h-28 sm:w-28 rounded-full flex items-center justify-center text-4xl sm:text-5xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-lg flex-shrink-0'>
              {profile.avatar}
            </div>
            <div className='flex-1 text-center sm:text-left'>
              <h1 className='text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-2'>
                {profile.fullName}
              </h1>
              <p className='text-gray-400 text-sm sm:text-base mb-4'>
                {profile.email}
              </p>

              <div className='flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start'>
                <div className='flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700'>
                  <BsGeoAlt className='w-4 h-4 text-blue-400' />
                  <span>{profile.location}</span>
                </div>
                <div className='flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700'>
                  <BsCurrencyDollar className='w-4 h-4 text-green-400' />
                  <span>${profile.hourlyRate}/hr</span>
                </div>
                <div className='flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700'>
                  <BsBriefcase className='w-4 h-4 text-purple-400' />
                  <span>{profile.yearsOfExperience} yrs exp.</span>
                </div>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-700 pt-6'>
            <h2 className='text-lg font-semibold text-gray-300 mb-3'>About</h2>
            <p className='text-gray-300 leading-relaxed text-sm sm:text-base'>
              {profile.description}
            </p>
          </div>

          {/* --Stats Box-- */}
          <div className='mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full'>
            <StatBox value={stats.totalApplied} label={'Total Applied'} />
            <StatBox
              value={stats.pendingApplications}
              label={'Pending Applications'}
            />
            <StatBox
              value={stats.acceptedApplications}
              label={'Accepted Applications'}
            />
            <StatBox
              value={stats.rejectedApplications}
              label={'Rejected Applications'}
            />
          </div>
        </div>

        {/* Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            <Section title='Experience' icon={BsBriefcase}>
              <div className='space-y-4'>
                {profile.experience && profile.experience.length > 0 ? (
                  profile.experience.map((exp, index) => (
                    <ExperienceCard key={index} experience={exp} />
                  ))
                ) : (
                  <p className='text-gray-500 text-sm'>
                    No experience added yet.
                  </p>
                )}
              </div>
            </Section>

            <Section title='Portfolio' icon={BsBoxArrowUpRight}>
              <div className='space-y-4'>
                {profile.portfolio && profile.portfolio.length > 0 ? (
                  profile.portfolio.map((p, index) => (
                    <PortfolioCard key={index} project={p} />
                  ))
                ) : (
                  <p className='text-gray-500 text-sm'>
                    No portfolio items added yet.
                  </p>
                )}
              </div>
            </Section>
          </div>

          <div className='space-y-8'>
            <Section title='Skills' icon={BsCodeSlash}>
              <div className='flex flex-wrap gap-2'>
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((s, i) => <SkillBadge key={i} skill={s} />)
                ) : (
                  <p className='text-gray-500 text-sm'>No skills added yet.</p>
                )}
              </div>
            </Section>

            <Section title='Education' icon={BsMortarboard}>
              <div className='space-y-3'>
                {profile.qualification && profile.qualification.length > 0 ? (
                  profile.qualification.map((q, i) => (
                    <div
                      key={i}
                      className='bg-gray-800/50 rounded-lg p-4 border border-gray-700'>
                      <p className='text-gray-300 text-sm'>{q}</p>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 text-sm'>
                    No education added yet.
                  </p>
                )}
              </div>
            </Section>

            <Section title='Certifications' icon={BsAward}>
              <div className='space-y-3'>
                {profile.certificates && profile.certificates.length > 0 ? (
                  profile.certificates.map((c, index) => (
                    <CertificateCard key={index} certificate={c} />
                  ))
                ) : (
                  <p className='text-gray-500 text-sm'>
                    No certifications added yet.
                  </p>
                )}
              </div>
            </Section>
          </div>
        </div>
      </div>
      {/* --Button Section-- */}
      <div className='flex items-center justify-center gap-5 mt-8'>
        {/* --Update button-- */}
        <div>
          <button
            onClick={handleClickUpdate}
            className='cursor-pointer px-4 py-2 rounded-md bg-green-900/100 hover:bg-green-800/100 text-white'>
            Update Profile
          </button>
        </div>
        {/* --Back button-- */}
        <div>
          <button
            onClick={() => router.back()}
            className='cursor-pointer px-4 py-2 rounded-md bg-gray-900/100 hover:bg-gray-800/100 text-white'>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
