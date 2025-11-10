import FreelancerProfile from '@/components/FreelancerProfile';
import React from 'react';

interface FreelancerProfileProps {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  description: string;
  qualification: string[];
  skills: string[];
  yearsOfExperience: number;
  hourlyRate: number;
  location: string;
  portfolio: { name: string; description: string; url: string }[];
  certificates: { name: string; issuer?: string; date?: Date }[];
  experience: {
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    isCurrent: boolean;
    description?: string;
  }[];
}

const Profile = () => {
  return (
    <div>
      <FreelancerProfile />
    </div>
  );
};

export default Profile;
