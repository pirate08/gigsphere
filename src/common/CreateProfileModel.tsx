// components/Modal.jsx
import React from 'react';

// Define the TypeScript interface for the component props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Destructure the props and apply the ModalProps interface
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    // Backdrop container is fixed and covers the entire viewport
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      {/* Modal content adapts to screen size */}
      <div className='bg-white p-8 rounded-lg shadow-xl text-center w-full max-w-sm'>
        <h2 className='text-2xl font-semibold mb-4'>Complete Your Profile</h2>

        <p className='mb-6 text-gray-600'>
          It looks like this is your first time here. Would you like to create
          your profile now?
        </p>

        {/* Buttons remain centered and spaced */}
        <div className='flex justify-center space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer'>
            Maybe later
          </button>

          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out cursor-pointer'>
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
