import JobCard from '@/common/JobCard'; // Assuming '@/common/JobCard' points to the JobCard component
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Define the interface for job data to use with the dummy array
interface JobData {
  title: string;
  description: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  budget: number;
  skills: string[];
  createdAt: Date;
}

// --- STATIC DUMMY JOB DATA ---
const DUMMY_JOBS: JobData[] = [
  // 12 items for demonstration of pagination (3 pages of 4 items)
  {
    title: 'Full Stack Developer',
    description:
      'Looking for an experienced full-stack developer to build a modern web application...',
    location: 'Remote',
    employmentType: 'full-time',
    budget: 5000,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    createdAt: new Date('2024-11-01'),
  },
  {
    title: 'UI/UX Designer',
    description:
      'Design a clean, modern interface for a new FinTech application.',
    location: 'New York, USA',
    employmentType: 'contract',
    budget: 3500,
    skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
    createdAt: new Date('2024-10-28'),
  },
  {
    title: 'Content Writer (Tech)',
    description:
      'Write engaging, SEO-optimized articles on AI and machine learning.',
    location: 'Remote',
    employmentType: 'part-time',
    budget: 800,
    skills: ['SEO', 'Blogging', 'Copywriting', 'AI'],
    createdAt: new Date('2024-11-05'),
  },
  {
    title: 'DevOps Engineer',
    description:
      'Maintain and optimize our CI/CD pipelines and cloud infrastructure.',
    location: 'London, UK',
    employmentType: 'full-time',
    budget: 7000,
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
    createdAt: new Date('2024-10-25'),
  },
  {
    title: 'Mobile App Developer',
    description:
      'Develop cross-platform mobile application using React Native.',
    location: 'Remote',
    employmentType: 'contract',
    budget: 4500,
    skills: ['React Native', 'iOS', 'Android', 'Redux'],
    createdAt: new Date('2024-11-03'),
  },
  {
    title: 'Data Analyst Intern',
    description: 'Assist the team in cleaning and visualizing large datasets.',
    location: 'San Francisco, USA',
    employmentType: 'internship',
    budget: 1500,
    skills: ['Python', 'SQL', 'Pandas', 'Tableau'],
    createdAt: new Date('2024-10-30'),
  },
  {
    title: 'E-commerce Specialist',
    description:
      'Manage and optimize product listings and campaigns on Shopify.',
    location: 'Remote (EST)',
    employmentType: 'part-time',
    budget: 1200,
    skills: ['Shopify', 'SEM', 'Marketing', 'Analytics'],
    createdAt: new Date('2024-11-02'),
  },
  {
    title: 'Backend API Developer',
    description:
      'Design and implement high-performance REST APIs using Python/Django.',
    location: 'Berlin, Germany',
    employmentType: 'contract',
    budget: 6000,
    skills: ['Python', 'Django', 'PostgreSQL', 'REST'],
    createdAt: new Date('2024-10-20'),
  },
  {
    title: 'Social Media Manager',
    description:
      'Create and schedule content for various social media platforms.',
    location: 'Remote',
    employmentType: 'part-time',
    budget: 900,
    skills: ['Instagram', 'Canva', 'Content Strategy', 'Analytics'],
    createdAt: new Date('2024-11-04'),
  },
  {
    title: 'Security Consultant',
    description:
      'Perform penetration testing and security audits for web applications.',
    location: 'Remote',
    employmentType: 'full-time',
    budget: 8500,
    skills: ['Penetration Testing', 'Security Audit', 'OWASP'],
    createdAt: new Date('2024-10-15'),
  },
  {
    title: 'Technical Writer',
    description:
      'Produce high-quality technical documentation and user guides.',
    location: 'Remote',
    employmentType: 'contract',
    budget: 2500,
    skills: ['Documentation', 'Markdown', 'Git', 'API Specs'],
    createdAt: new Date('2024-11-06'),
  },
  {
    title: 'Graphic Designer',
    description:
      'Create branding assets, illustrations, and marketing visuals.',
    location: 'Los Angeles, USA',
    employmentType: 'part-time',
    budget: 1800,
    skills: ['Photoshop', 'Illustrator', 'Branding', 'Typography'],
    createdAt: new Date('2024-10-18'),
  },
];
// --- END STATIC DUMMY JOB DATA ---

const JobFeedCard = () => {
  // --- Pagination State and Constants ---
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4; // Display 4 job cards per page

  const totalItems = DUMMY_JOBS.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  // Slicing the dummy array to get the jobs for the current page
  const currentJobs = DUMMY_JOBS.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the range of jobs currently displayed (e.g., 1-4 of 12)
  const startJob = indexOfFirstItem + 1;
  const endJob = Math.min(indexOfLastItem, totalItems);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // In a real application, this is where you would fetch data from the API:
      // fetchJobs(pageNumber, ITEMS_PER_PAGE);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // --- Render Pagination Controls ---
  const renderPaginationControls = () => (
    <div className='flex items-center justify-between mt-8 mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className='flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-600 text-white'>
        <IoIosArrowBack /> Previous
      </button>

      <div className='hidden sm:flex space-x-2'>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              currentPage === number
                ? 'bg-green-500 text-gray-900 shadow-md shadow-green-500/30'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}>
            {number}
          </button>
        ))}
      </div>

      <div className='block sm:hidden text-sm text-gray-300'>
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-600 text-white'>
        Next <IoIosArrowForward />
      </button>
    </div>
  );

  return (
    <div className='mt-10'>
      {/* --- Job Summary and Page Info (NEW SECTION) --- */}
      <div className='flex items-center justify-between mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
        <div className='text-sm sm:text-base text-gray-300'>
          Showing{' '}
          <span className='font-bold text-green-400'>
            {startJob}-{endJob}
          </span>{' '}
          of <span className='font-bold text-green-400'>{totalItems}</span> Jobs
        </div>
        <div className='text-sm sm:text-base text-gray-300'>
          Page <span className='font-bold text-blue-400'>{currentPage}</span> of{' '}
          <span className='font-bold text-blue-400'>{totalPages}</span>
        </div>
      </div>

      {/* --- Job Card Display --- */}
      <div className='space-y-6'>
        {currentJobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>

      {/* --- Pagination Controls --- */}
      {totalPages > 1 && renderPaginationControls()}

      {/* Note for the user */}
      <p className='text-center text-sm text-gray-500 mt-8'>
        <span className='font-bold text-gray-400'>Note:</span> Pagination logic
        is static and simulates fetching data. In a real application, clicking
        the buttons would trigger an API call.
      </p>
    </div>
  );
};

export default JobFeedCard;
