'use client';

import React from 'react';
import { BsAward } from 'react-icons/bs';

interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  date?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const formatDate = (date: string | undefined): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className='bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors'>
      <div className='flex items-start gap-3'>
        <BsAward className='w-5 h-5 text-yellow-400 mt-1 flex-shrink-0' />
        <div className='flex-1'>
          <h3 className='text-white font-semibold'>{certificate.name}</h3>
          <p className='text-gray-400 text-sm'>{certificate.issuer}</p>
          {certificate.date && (
            <p className='text-gray-500 text-xs mt-1'>
              {formatDate(certificate.date)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
