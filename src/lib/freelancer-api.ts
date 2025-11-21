import 'server-only';

export interface FreelancerProfileProps {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
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

export async function getProfileData(id: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/freelancers/${id}/profile`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch freelancer profile data');
  }
  return response.json();
}
