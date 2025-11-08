'use client';

import React, { useState } from 'react';
import {
  FiBell,
  FiAlertCircle,
  FiBriefcase,
  FiMessageSquare,
} from 'react-icons/fi';
import { BiTime } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

// Match your API response structure
interface NotificationProps {
  _id: string;
  type: 'APPLICATION_STATUS' | 'NEW_JOB_OPEN' | 'MESSAGE';
  message: string;
  link: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationListProps {
  notifications: NotificationProps[];
  error: string | null;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications: initialNotifications,
  error,
}) => {
  const [notifications, setNotifications] =
    useState<NotificationProps[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const router = useRouter();

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'APPLICATION_STATUS':
        return <FiBriefcase className='text-blue-400' />;
      case 'NEW_JOB_OPEN':
        return <FiBell className='text-green-400' />;
      case 'MESSAGE':
        return <FiMessageSquare className='text-purple-400' />;
      default:
        return <FiBell className='text-gray-400' />;
    }
  };

  // Get badge color based on type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'APPLICATION_STATUS':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      case 'NEW_JOB_OPEN':
        return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'MESSAGE':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  // Format notification type for display
  const formatType = (type: string): string => {
    switch (type) {
      case 'APPLICATION_STATUS':
        return 'Application';
      case 'NEW_JOB_OPEN':
        return 'New Job';
      case 'MESSAGE':
        return 'Message';
      default:
        return type;
    }
  };

  // Format time ago
  const formatTimeAgo = (date: Date | string): string => {
    const notifDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - notifDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0)
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0)
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const token = await getCookie('user_token');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelancer/read/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === id ? { ...notif, read: true } : notif
          )
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Filter notifications
  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Show error state
  if (error) {
    return (
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center py-16'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-red-900/20 rounded-full mb-4'>
            <FiAlertCircle className='text-3xl text-red-400' />
          </div>
          <h3 className='text-xl font-semibold text-gray-300 mb-2'>
            Error Loading Notifications
          </h3>
          <p className='text-gray-500'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent'>
              Notifications
            </h1>
            <p className='text-gray-400 mt-2'>
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${
                    unreadCount > 1 ? 's' : ''
                  }`
                : 'All caught up!'}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className='flex gap-4 border-b border-gray-700'>
          <button
            onClick={() => setFilter('all')}
            className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
              filter === 'all'
                ? 'text-green-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}>
            All Notifications
            {filter === 'all' && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-green-400' />
            )}
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
              filter === 'unread'
                ? 'text-green-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}>
            Unread ({unreadCount})
            {filter === 'unread' && (
              <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-green-400' />
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className='text-center py-16'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4'>
            <FiBell className='text-3xl text-gray-500' />
          </div>
          <h3 className='text-xl font-semibold text-gray-300 mb-2'>
            No notifications
          </h3>
          <p className='text-gray-500'>
            {filter === 'unread'
              ? 'You have no unread notifications'
              : "You're all caught up!"}
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {filteredNotifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => !notification.read && markAsRead(notification._id)}
              className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                notification.read
                  ? 'border-gray-700/50 hover:border-gray-600/50'
                  : 'border-green-500/30 hover:border-green-500/50 bg-gray-800/70'
              }`}>
              <div className='flex gap-4'>
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.read ? 'bg-gray-700/50' : 'bg-gray-700'
                  }`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-3 mb-2'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(
                            notification.type
                          )}`}>
                          {formatType(notification.type)}
                        </span>
                        {!notification.read && (
                          <span className='w-2 h-2 bg-green-500 rounded-full' />
                        )}
                      </div>
                    </div>
                  </div>

                  <p
                    className={`text-sm mb-3 leading-relaxed ${
                      notification.read ? 'text-gray-400' : 'text-gray-300'
                    }`}>
                    {notification.message}
                  </p>

                  {/* Footer */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1.5 text-gray-500 text-xs'>
                      <BiTime className='text-sm' />
                      <span>{formatTimeAgo(notification.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* --Back button-- */}
          <div className='text-center mt-10'>
            <button
              onClick={() => router.back()}
              className='cursor-pointer px-4 py-2 rounded-md bg-gray-900/100 hover:bg-gray-800/100 text-white '>
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
