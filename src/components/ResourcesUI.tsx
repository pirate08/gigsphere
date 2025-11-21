import React from 'react';

const ResourcesUI = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Hero Section */}
      <div className='max-w-6xl mx-auto px-4 py-16 sm:py-24'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent'>
            Resources
          </h1>
          <p className='text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto'>
            Everything you need to succeed as a freelancer or client. Guides,
            tips, and tools to help you thrive.
          </p>
        </div>

        {/* Guides Section */}
        <div className='mb-20'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-10 text-blue-400'>
            Getting Started Guides
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Guide 1 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors'>
              <div className='text-3xl mb-4'>📚</div>
              <h3 className='text-xl font-semibold mb-3'>
                Freelancer&apos;s Handbook
              </h3>
              <p className='text-gray-400 mb-4'>
                Learn how to create a winning profile, write compelling
                proposals, and land your first client. Complete guide for
                beginners.
              </p>
              <button className='text-blue-400 hover:text-blue-300 font-semibold'>
                Read Guide →
              </button>
            </div>

            {/* Guide 2 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors'>
              <div className='text-3xl mb-4'>💼</div>
              <h3 className='text-xl font-semibold mb-3'>
                Client&apos;s Guide to Hiring
              </h3>
              <p className='text-gray-400 mb-4'>
                Master the art of finding and hiring the right freelancer. Tips
                on writing job posts, evaluating candidates, and managing
                projects.
              </p>
              <button className='text-blue-400 hover:text-blue-300 font-semibold'>
                Read Guide →
              </button>
            </div>

            {/* Guide 3 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors'>
              <div className='text-3xl mb-4'>💰</div>
              <h3 className='text-xl font-semibold mb-3'>
                Pricing Your Services
              </h3>
              <p className='text-gray-400 mb-4'>
                Discover strategies for setting competitive rates, calculating
                your worth, and negotiating with confidence.
              </p>
              <button className='text-purple-400 hover:text-purple-300 font-semibold'>
                Read Guide →
              </button>
            </div>

            {/* Guide 4 */}
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors'>
              <div className='text-3xl mb-4'>⚖️</div>
              <h3 className='text-xl font-semibold mb-3'>Legal & Contracts</h3>
              <p className='text-gray-400 mb-4'>
                Understand contracts, intellectual property, and legal
                protections. Essential knowledge for secure freelancing.
              </p>
              <button className='text-purple-400 hover:text-purple-300 font-semibold'>
                Read Guide →
              </button>
            </div>
          </div>
        </div>

        {/* Tips & Best Practices */}
        <div className='mb-20'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-10 text-purple-400'>
            Tips & Best Practices
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Tip 1 */}
            <div className='bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-gray-800 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
                <span className='text-2xl'>✨</span>
                Stand Out From the Crowd
              </h3>
              <ul className='text-gray-400 space-y-2 text-sm'>
                <li>• Craft a unique personal brand</li>
                <li>• Showcase your best work prominently</li>
                <li>• Keep your portfolio updated</li>
                <li>• Highlight client testimonials</li>
              </ul>
            </div>

            {/* Tip 2 */}
            <div className='bg-gradient-to-br from-purple-900/30 to-purple-900/10 border border-gray-800 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
                <span className='text-2xl'>💬</span>
                Communication is Key
              </h3>
              <ul className='text-gray-400 space-y-2 text-sm'>
                <li>• Respond to messages promptly</li>
                <li>• Set clear expectations upfront</li>
                <li>• Provide regular progress updates</li>
                <li>• Be professional and courteous</li>
              </ul>
            </div>

            {/* Tip 3 */}
            <div className='bg-gradient-to-br from-green-900/30 to-green-900/10 border border-gray-800 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
                <span className='text-2xl'>🎯</span>
                Deliver Quality Work
              </h3>
              <ul className='text-gray-400 space-y-2 text-sm'>
                <li>• Meet deadlines consistently</li>
                <li>• Exceed client expectations</li>
                <li>• Request feedback proactively</li>
                <li>• Build long-term relationships</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tools & Templates */}
        <div className='mb-20'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-10 text-green-400'>
            Tools & Templates
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500 transition-colors'>
              <div className='text-4xl mb-3'>📝</div>
              <h3 className='font-semibold mb-2'>Proposal Templates</h3>
              <p className='text-gray-400 text-sm mb-4'>
                Ready-to-use templates for winning proposals
              </p>
              <button className='text-green-400 hover:text-green-300 text-sm font-semibold'>
                Download
              </button>
            </div>

            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500 transition-colors'>
              <div className='text-4xl mb-3'>📋</div>
              <h3 className='font-semibold mb-2'>Contract Templates</h3>
              <p className='text-gray-400 text-sm mb-4'>
                Legal contracts for various project types
              </p>
              <button className='text-green-400 hover:text-green-300 text-sm font-semibold'>
                Download
              </button>
            </div>

            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500 transition-colors'>
              <div className='text-4xl mb-3'>🧮</div>
              <h3 className='font-semibold mb-2'>Rate Calculator</h3>
              <p className='text-gray-400 text-sm mb-4'>
                Calculate your ideal hourly or project rate
              </p>
              <button className='text-green-400 hover:text-green-300 text-sm font-semibold'>
                Use Tool
              </button>
            </div>

            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500 transition-colors'>
              <div className='text-4xl mb-3'>📊</div>
              <h3 className='font-semibold mb-2'>Invoice Generator</h3>
              <p className='text-gray-400 text-sm mb-4'>
                Create professional invoices instantly
              </p>
              <button className='text-green-400 hover:text-green-300 text-sm font-semibold'>
                Use Tool
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mb-20'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-10 text-center'>
            Frequently Asked Questions
          </h2>

          <div className='max-w-3xl mx-auto space-y-4'>
            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-2'>How do I get paid?</h3>
              <p className='text-gray-400'>
                Payments are processed securely through our platform. Clients
                fund projects in escrow, and you receive payment upon milestone
                completion or project delivery.
              </p>
            </div>

            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-2'>
                What fees does the platform charge?
              </h3>
              <p className='text-gray-400'>
                We charge a small service fee on completed transactions.
                Freelancers pay 10% on earnings, while clients pay a 3%
                processing fee on payments.
              </p>
            </div>

            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-2'>
                How do I handle disputes?
              </h3>
              <p className='text-gray-400'>
                Our dispute resolution team is here to help. If issues arise,
                both parties can open a dispute case, and our team will mediate
                to find a fair solution.
              </p>
            </div>

            <div className='bg-gray-900 border border-gray-800 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-2'>
                Can I work with international clients?
              </h3>
              <p className='text-gray-400'>
                Absolutely! Our platform supports global transactions with
                multiple currencies and payment methods, making international
                collaboration seamless.
              </p>
            </div>
          </div>
        </div>

        {/* Support CTA */}
        <div className='bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-gray-800 rounded-2xl p-8 sm:p-12 text-center'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-4'>
            Need More Help?
          </h2>
          <p className='text-gray-400 mb-6 max-w-2xl mx-auto'>
            Can&apos;t find what you&apos;re looking for? Our support team is
            available 24/7 to assist you with any questions or concerns.
          </p>
          <button className='px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-600/30'>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesUI;
