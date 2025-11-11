import React from 'react';

interface SkillBadgeProps {
  skill: string;
  onRemove: (skill: string) => void;
}

const SkillBadgeEditable: React.FC<SkillBadgeProps> = ({ skill, onRemove }) => (
  <span className='px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600 flex items-center gap-1 cursor-pointer'>
    {skill}
    <button
      type='button'
      onClick={() => onRemove(skill)}
      className='ml-1 text-xs text-red-400 hover:text-red-300 transition-colors'>
      &times;
    </button>
  </span>
);

export default SkillBadgeEditable;
