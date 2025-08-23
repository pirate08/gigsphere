import React from 'react';
import HeroSection from './components/HeroSection';
import Categories from './ui/Categories';
import HowItWorks from './ui/HowItWorks';

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
    </div>
  );
}
