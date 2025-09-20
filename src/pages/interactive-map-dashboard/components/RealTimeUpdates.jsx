import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeUpdates = ({ onNewReport }) => {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Mock real-time updates
  const mockUpdates = [
    {
      id: 1,
      type: 'new-report',
      title: 'New Oil Spill Reported',
      message: 'Citizen report from Juhu Beach area',
      timestamp: new Date(),
      severity: 'high',
      location: 'Juhu Beach, Mumbai'
    },
    {
      id: 2,
      type: 'social-mention',
      title: 'Social Media Alert',
      message: 'Multiple tweets about debris near Marine Drive',
      timestamp: new Date(Date.now() - 300000),
      severity: 'medium',
      location: 'Marine Drive, Mumbai'
    },
    {
      id: 3,
      type: 'official-update',
      title: 'Coast Guard Update',
      message: 'Chemical spill cleanup operation completed',
      timestamp: new Date(Date.now() - 600000),
      severity: 'low',
      location: 'Bandra-Worli Sea Link'
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const randomUpdate = mockUpdates?.[Math.floor(Math.random() * mockUpdates?.length)];
      const newNotification = {
        ...randomUpdate,
        id: Date.now(),
        timestamp: new Date(),
        isNew: true
      };

      setNotifications(prev => [newNotification, ...prev?.slice(0, 4)]);
      setIsVisible(true);

      // Auto-hide after 5 seconds
      setTimeout(() => {
        setNotifications(prev => 
          prev?.map(notif => 
            notif?.id === newNotification?.id 
              ? { ...notif, isNew: false }
              : notif
          )
        );
      }, 5000);

      if (onNewReport) {
        onNewReport(newNotification);
      }
    }, 15000); // New update every 15 seconds

    return () => clearInterval(interval);
  }, [onNewReport]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new-report': return 'AlertCircle';
      case 'social-mention': return 'MessageSquare';
      case 'official-update': return 'Shield';
      default: return 'Bell';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev?.filter(notif => notif?.id !== id));
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed top-20 right-4 z-40 w-80 max-w-sm">
      {/* Toggle Button */}
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleVisibility}
          iconName={isVisible ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="bg-white shadow-sm"
        >
          Updates ({notifications?.length})
        </Button>
      </div>
      {/* Notifications Panel */}
      {isVisible && notifications?.length > 0 && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm">Real-time Updates</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">Live</span>
              </div>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-3 border-l-4 border-b border-gray-100 last:border-b-0 transition-all duration-300 ${
                  getSeverityColor(notification?.severity)
                } ${notification?.isNew ? 'animate-pulse' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <div className={`p-1 rounded-full ${
                      notification?.severity === 'high' ? 'bg-red-100' :
                      notification?.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <Icon 
                        name={getNotificationIcon(notification?.type)} 
                        size={14}
                        color={
                          notification?.severity === 'high' ? '#DC2626' :
                          notification?.severity === 'medium' ? '#D97706' : '#059669'
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight">
                        {notification?.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {notification?.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(notification?.timestamp)}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 truncate">
                          {notification?.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dismissNotification(notification?.id)}
                    className="flex-shrink-0 w-6 h-6 -mt-1 -mr-1"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="p-3 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => console.log('Navigate to all updates')}
            >
              View All Updates
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeUpdates;