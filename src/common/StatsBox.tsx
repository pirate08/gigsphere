import { motion } from 'framer-motion';
import React from 'react';

interface StatBoxProps {
  label: string;
  value: number;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className='flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-lg hover:shadow-blue-500/30 transition-all duration-300'>
      <h3 className='text-3xl sm:text-4xl font-bold text-white'>{value}</h3>
      <p className='text-gray-400 text-sm sm:text-base mt-2'>{label}</p>
    </motion.div>
  );
};

export default StatBox;
