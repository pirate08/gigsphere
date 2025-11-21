import Link from 'next/link';
import React from 'react';

const HowItWorksUI = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Hero Section */}
      <div className='max-w-6xl mx-auto px-4 py-16 sm:py-24'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent'>
            How It Works
          </h1>
          <p className='text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto'>
            Connect with talented freelancers or find your next opportunity in
            just a few simple steps
          </p>
        </div>

        {/* For Clients Section */}
        <div className='mb-20'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-400'>
            For Clients
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Step 1 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors'>
              <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4'>
                1
              </div>
              <h3 className='text-xl font-semibold mb-3'>Post Your Project</h3>
              <p className='text-gray-400'>
                Create a detailed project listing with your requirements,
                budget, and timeline. Be specific to attract the right
                freelancers.
              </p>
            </div>

            {/* Step 2 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors'>
              <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4'>
                2
              </div>
              <h3 className='text-xl font-semibold mb-3'>Review Proposals</h3>
              <p className='text-gray-400'>
                Browse through freelancer profiles, portfolios, and proposals.
                Compare rates, experience, and skills to find your perfect
                match.
              </p>
            </div>

            {/* Step 3 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors'>
              <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4'>
                3
              </div>
              <h3 className='text-xl font-semibold mb-3'>Hire & Collaborate</h3>
              <p className='text-gray-400'>
                Select your freelancer, set milestones, and start working. Track
                progress and communicate seamlessly through our platform.
              </p>
            </div>
          </div>
        </div>

        {/* For Freelancers Section */}
        <div className='mb-20'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center mb-12 text-purple-400'>
            For Freelancers
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Step 1 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors'>
              <div className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4'>
                1
              </div>
              <h3 className='text-xl font-semibold mb-3'>
                Create Your Profile
              </h3>
              <p className='text-gray-400'>
                Build a compelling profile showcasing your skills, experience,
                portfolio, and certifications. Stand out from the crowd.
              </p>
            </div>

            {/* Step 2 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors'>
              <div className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4'>
                2
              </div>
              <h3 className='text-xl font-semibold mb-3'>Browse Projects</h3>
              <p className='text-gray-400'>
                Explore available projects that match your expertise. Filter by
                category, budget, and timeline to find the perfect fit.
              </p>
            </div>

            {/* Step 3 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors'>
              <div className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4'>
                3
              </div>
              <h3 className='text-xl font-semibold mb-3'>Submit Proposals</h3>
              <p className='text-gray-400'>
                Send tailored proposals highlighting how you can solve the
                client's problem. Get hired and start earning on your terms.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className='bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-gray-800 rounded-2xl p-8 sm:p-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center mb-12'>
            Why Choose Our Platform?
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='text-center'>
              <div className='text-4xl mb-3'>🔒</div>
              <h3 className='text-lg font-semibold mb-2'>Secure Payments</h3>
              <p className='text-gray-400 text-sm'>
                Protected transactions with milestone-based payments
              </p>
            </div>

            <div className='text-center'>
              <div className='text-4xl mb-3'>⚡</div>
              <h3 className='text-lg font-semibold mb-2'>Fast Matching</h3>
              <p className='text-gray-400 text-sm'>
                AI-powered algorithm connects you with the right talent
              </p>
            </div>

            <div className='text-center'>
              <div className='text-4xl mb-3'>💬</div>
              <h3 className='text-lg font-semibold mb-2'>Real-time Chat</h3>
              <p className='text-gray-400 text-sm'>
                Communicate seamlessly with built-in messaging
              </p>
            </div>

            <div className='text-center'>
              <div className='text-4xl mb-3'>⭐</div>
              <h3 className='text-lg font-semibold mb-2'>Quality Assured</h3>
              <p className='text-gray-400 text-sm'>
                Verified profiles and rating system ensure quality
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center mt-16'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-6'>
            Ready to Get Started?
          </h2>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link href='/find-freelancers'>
              <button className='px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-600/30 cursor-pointer'>
                Post a Project
              </button>
            </Link>
            <Link href='/find-work'>
              <button className='px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors shadow-lg shadow-purple-600/30 cursor-pointer'>
                Find Work
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksUI;
