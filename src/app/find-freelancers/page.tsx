import React from 'react';
import Navbar from '@/components/Navbar';
import FindFreelancer from '@/components/FindFreelancer';
import Footer from '@/components/Footer';

const page = () => {
  return (
    <div>
      {/* --Navbar-- */}
      <div>
        <Navbar />
      </div>
      {/* --Main component-- */}
      <div className='h-screen bg-black'>
        <FindFreelancer />
      </div>
      {/* --Footer-- */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
