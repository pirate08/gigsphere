import Footer from '@/components/Footer';
import HowItWorksUI from '@/components/HowItWorksUI';
import Navbar from '@/components/Navbar';
import React from 'react';

const HowItWorks = () => {
  return (
    <div>
      {/* --Navbar-- */}
      <Navbar />
      {/* --Main component-- */}
      <HowItWorksUI />
      {/* --Footer-- */}
      <Footer />
    </div>
  );
};

export default HowItWorks;
