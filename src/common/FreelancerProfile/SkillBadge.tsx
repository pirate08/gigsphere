'use client';

import React from 'react';

interface SkillBadgeProps {
  skill: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => (
  <span className='px-3 py-1.5 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-600/30 transition-colors'>
    {skill}
  </span>
);

export default SkillBadge;
