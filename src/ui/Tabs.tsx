import React from 'react';

const Tabs = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 bg-gray-600/70 text-center text-white mt-10 max-w-6xl mx-auto'>
      <div>
        <h1>All Jobs</h1>
      </div>
      <div>
        <h1>Create a new job</h1>
      </div>
      <div>
        <h1>Search Freelancer</h1>
      </div>
    </div>
  );
};

export default Tabs;
