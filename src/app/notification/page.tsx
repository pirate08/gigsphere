import NotificationList from '@/components/NotificationList';
import React from 'react';
import { cookies } from 'next/headers';

// Define the interface of the notification
interface NotificationProps {
  _id: string;
  type: 'APPLICATION_STATUS' | 'NEW_JOB_OPEN' | 'MESSAGE';
  message: string;
  link: string;
  read: boolean;
  createdAt: Date;
}

const Notification = async () => {
  // Get the cookies instance
  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;

  // Fetch All notification here
  let notifications: NotificationProps[] = []; // CHANGED: notification -> notifications
  let error: string | null = null;

  if (!token) {
    console.log('No authentication token found');
    return (
      <div>
        <p className='h-screen text-2xl flex justify-center items-center bg-black text-white'>
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/notifications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    if (response.ok) {
      const data = await response.json();
      notifications = data.notifications || data.notification || [];
    } else {
      console.error(
        'Failed to fetch notifications:',
        response.status,
        response.statusText
      );
      error = `Failed to fetch notifications: ${response.statusText}`;
    }
  } catch (err) {
    console.log('Error in fetching notification', err);
    error = 'Error in fetching data. Please try again.';
  }

  return (
    <div className='bg-black min-h-screen text-white'>
      {/* Notification Content */}
      <div className='pt-20 md:pt-16'>
        <NotificationList notifications={notifications} error={error} />
      </div>
    </div>
  );
};

export default Notification;
