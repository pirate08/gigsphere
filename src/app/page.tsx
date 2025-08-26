import React from 'react';
import HeroSection from './components/HeroSection';
import Categories from './ui/Categories';
import HowItWorks from './ui/HowItWorks';
import Testimonal from './ui/Testimonal';

export default function Home() {
  return (
    <div>
      {/* --HeroSection-- */}
      <div>
        <HeroSection />
      </div>
      {/* --Categories-- */}
      <div>
        <Categories />
      </div>
      {/* --HowItWorks-- */}
      <div>
        <HowItWorks />
      </div>
      {/* --Testimonal-- */}
      <div>
        <Testimonal />
      </div>
    </div>
  );
}
