'use client';

import { useState } from 'react';

export const useJobApplication = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>('');

  const openApplicationModal = (jobId: string, jobTitle: string) => {
    setSelectedJobId(jobId);
    setSelectedJobTitle(jobTitle);
    setIsModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsModalOpen(false);
    // Don't reset jobId and title immediately to avoid visual glitch
    setTimeout(() => {
      setSelectedJobId(null);
      setSelectedJobTitle('');
    }, 300);
  };

  return {
    isModalOpen,
    selectedJobId,
    selectedJobTitle,
    openApplicationModal,
    closeApplicationModal,
  };
};
