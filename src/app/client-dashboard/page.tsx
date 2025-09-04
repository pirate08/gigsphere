'use client';

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const page = () => {
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
      <h1>Hello Sirji</h1>
    </div>
  );
};

export default page;
