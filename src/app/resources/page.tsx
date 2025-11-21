import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ResourcesUI from '@/components/ResourcesUI';
import React from 'react';

const Resources = () => {
  return (
    <div>
      {/* --Navbar-- */}
      <Navbar />
      {/* --Main Component-- */}
      <ResourcesUI />
      {/* --Footer-- */}
      <Footer />
    </div>
  );
};

export default Resources;
