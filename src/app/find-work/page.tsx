'use client';

import FindWorkUi from '@/components/FindWork';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const FindWork = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('user_token');
    const role = getCookie('user_role');

    if (!token || !role) {
      router.push('/login');
      return;
    }

    if (role !== 'freelancer') {
      router.push('/');
      return;
    }
  }, [router]);

  return (
    <div>
      <FindWorkUi />
    </div>
  );
};

export default FindWork;
