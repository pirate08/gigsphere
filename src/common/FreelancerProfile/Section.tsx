'use client';

import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface SectionProps {
  title: string;
  icon?: IconType;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon: Icon, children }) => (
  <div className='mb-8'>
    <div className='flex items-center gap-2 mb-4'>
      {Icon && <Icon className='w-5 h-5 text-blue-400' />}
      <h2 className='text-xl sm:text-2xl font-bold text-white'>{title}</h2>
    </div>
    {children}
  </div>
);

export default Section;
