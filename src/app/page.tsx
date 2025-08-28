import React from 'react';
import HeroSection from '../components/HeroSection';
import Categories from '../ui/Categories';
import HowItWorks from '../ui/HowItWorks';
import Testimonal from '../ui/Testimonal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      {/* --Navbar-- */}
      <div>
        <Navbar />
      </div>
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
      {/* --Footer-- */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
