'use client';

import FindFreelancerHero from '@/ui/FindFreelancerHero';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const FindFreelancer = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('user_token');
    const role = getCookie('user_role');

    if (!token || !role) {
      router.push('/login');
      return;
    }

    if (role !== 'client') {
      router.push('/');
      return;
    }
  }, [router]);

  return (
    <div>
      {/* --HeroSection-- */}
      <div>
        <FindFreelancerHero
          image='/findfreelancerheroimage.png'
          title='Find the Right Talent, Anytime 🚀'
          paragraph='Connect with skilled professionals from around the world. Whether you need developers, designers, or creators, our platform makes it easy to collaborate, innovate, and bring your vision to life—all in one place.'
          link='/client-dashboard'
          button='Go to dashboard'
        />
      </div>
    </div>
  );
};

export default FindFreelancer;
