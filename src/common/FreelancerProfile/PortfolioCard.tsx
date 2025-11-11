'use client';

import React from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';

interface Portfolio {
  _id?: string;
  name: string;
  url: string;
  description: string;
}

interface PortfolioCardProps {
  project: Portfolio;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => (
  <div className='bg-gray-800/50 rounded-lg p-4 sm:p-5 border border-gray-700 hover:border-gray-600 transition-colors group'>
    <div className='flex items-start justify-between gap-3 mb-2'>
      <h3 className='text-white font-semibold text-lg'>{project.name}</h3>
      <a
        href={project.url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-400 hover:text-blue-300 transition-colors'>
        <BsBoxArrowUpRight className='w-5 h-5' />
      </a>
    </div>
    <p className='text-gray-300 text-sm leading-relaxed'>
      {project.description}
    </p>
    <a
      href={project.url}
      target='_blank'
      rel='noopener noreferrer'
      className='text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block'>
      {project.url}
    </a>
  </div>
);

export default PortfolioCard;
