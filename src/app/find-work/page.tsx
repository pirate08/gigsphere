'use client';
import FindWorkUi from '@/components/FindWork';
import Modal from '@/common/CreateProfileModel';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const FindWork = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    // Check if the "profile_prompt_shown" cookie is set
    const profilePromptShown = getCookie('profile_prompt_shown');

    if (!profilePromptShown) {
      // If not shown, set a timeout to display the modal after 30 seconds (30000ms)
      const timerId = setTimeout(() => {
        setIsModalOpen(true);
      }, 10000);

      // Cleanup the timer if the component unmounts or conditions change
      return () => clearTimeout(timerId);
    }
  }, [router]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Set a cookie so the modal doesn't appear again for this user
    // You might want to set an expiration time (e.g., 1 year or a longer duration)
    setCookie('profile_prompt_shown', 'true', { maxAge: 60 * 60 * 24 * 365 });
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    router.push('/create-profile');
  };

  return (
    <div>
      <FindWorkUi />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
};

export default FindWork;
