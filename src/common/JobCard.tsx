'use client'

import React from 'react';
import { FiMapPin, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import { BiTime } from 'react-icons/bi';
import Link from 'next/link';

interface CardProps {
  _id: string; // ADDED
  title: string;
  description: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  budget: number;
  link: string;
  skills: string[] | undefined | null;
  createdAt: Date;
  hasApplied?: boolean; // ADDED
  onApplyClick: (jobId: string, jobTitle: string) => void; // ADDED
}

const JobCard: React.FC<CardProps> = ({
  _id,
  title,
  description,
  location,
  employmentType,
  budget,
  skills,
  link,
  createdAt,
  hasApplied = false,
  onApplyClick,
}) => {
  const safeSkills = skills ?? [];

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
  };

  const formatEmploymentType = (type: string): string => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getBadgeColor = (type: string): string => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'part-time':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      case 'contract':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-400';
      case 'internship':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApplyClick(_id, title);
  };

  return (
    <div className='w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/50 text-white rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 group cursor-pointer'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4'>
        <div className='flex-1'>
          <h1 className='bg-gradient-to-r font-bold from-blue-400 to-green-500 bg-clip-text text-transparent text-xl sm:text-2xl mb-2 group-hover:from-green-400 group-hover:to-blue-400 transition-all'>
            {title}
          </h1>

          <div className='flex flex-wrap items-center gap-3 text-sm text-gray-400'>
            <div className='flex items-center gap-1'>
              <BiTime className='text-base' />
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className='flex items-center gap-1'>
              <FiMapPin className='text-base' />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border ${getBadgeColor(
            employmentType
          )} whitespace-nowrap self-start`}>
          <div className='flex items-center gap-1.5'>
            <FiBriefcase className='text-sm' />
            {formatEmploymentType(employmentType)}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className='text-gray-300 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed'>
        {description}
      </p>

      {/* Skills Section */}
      <div className='mb-4'>
        <div className='flex flex-wrap gap-2'>
          {safeSkills.slice(0, 6).map((skill, index) => (
            <span
              key={index}
              className='px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-xs sm:text-sm text-gray-300 hover:bg-gray-600/50 hover:border-gray-500 transition-colors'>
              {skill}
            </span>
          ))}
          {safeSkills.length > 6 && (
            <span className='px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-xs sm:text-sm text-gray-400'>
              +{safeSkills.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-700'>
        <div className='flex items-center gap-2 text-green-400 font-semibold text-lg'>
          <FiDollarSign className='text-xl' />
          <span>${budget.toLocaleString()}</span>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2 sm:gap-3'>
          <Link href={link}>
            <button className='flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors border border-gray-600 cursor-pointer'>
              View Details
            </button>
          </Link>
          <button
            onClick={handleApplyClick}
            disabled={hasApplied}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg ${
              hasApplied
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:shadow-green-500/20 cursor-pointer'
            }`}>
            {hasApplied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
