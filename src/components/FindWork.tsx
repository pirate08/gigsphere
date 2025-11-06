import FindWorkNavbar from '@/ui/FindWorkNavbar';
import React from 'react';
import JobFeed from './JobFeed';

const FindWorkUi = () => {
  return (
    <div className='h-screen w-full bg-black text-white px-5 md:px-16'>
      {/* --Navbar-- */}
      <FindWorkNavbar />
      {/* --Job Feed-- */}
      <JobFeed />
    </div>
  );
};

export default FindWorkUi;
