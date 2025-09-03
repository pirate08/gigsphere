import FindFreelancerHero from '@/ui/FindFreelancerHero';
import React from 'react';

const FindFreelancer = () => {
  return (
    <div>
      {/* --HeroSection-- */}
      <div>
        <FindFreelancerHero
          image='/findfreelancerheroimage.png'
          title='Find the Right Talent, Anytime 🚀'
          paragraph='Connect with skilled professionals from around the world. Whether you need developers, designers, or creators, our platform makes it easy to collaborate, innovate, and bring your vision to life—all in one place.'
        />
      </div>
    </div>
  );
};

export default FindFreelancer;
