import React from 'react';
import HeroSection from './components/HeroSection';
import Categories from './ui/Categories';

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
    </div>
  );
}
