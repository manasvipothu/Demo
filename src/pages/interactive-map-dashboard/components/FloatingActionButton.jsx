import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const FloatingActionButton = ({ onToggleFilters, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'report',
      label: 'Report Hazard',
      icon: 'Plus',
      color: 'bg-red-600 hover:bg-red-700',
      action: () => navigate('/hazard-reporting-form')
    },
    {
      id: 'filters',
      label: 'Filters',
      icon: 'Filter',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: onToggleFilters
    },
    {
      id: 'location',
      label: 'My Location',
      icon: 'MapPin',
      color: 'bg-green-600 hover:bg-green-700',
      action: () => {
        // Mock location centering
        console.log('Centering map to user location');
      }
    },
    {
      id: 'refresh',
      label: 'Refresh Data',
      icon: 'RefreshCw',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => {
        // Mock data refresh
        console.log('Refreshing map data');
      }
    }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Action Buttons */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-2">
          {quickActions?.map((action, index) => (
            <div
              key={action?.id}
              className="flex items-center gap-3 animate-in slide-in-from-bottom duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {action?.label}
              </span>
              <button
                onClick={() => {
                  action?.action();
                  setIsExpanded(false);
                }}
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-200 ${action?.color}`}
              >
                <Icon name={action?.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <button
        onClick={toggleExpanded}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 ${
          isExpanded 
            ? 'bg-gray-600 hover:bg-gray-700 rotate-45' :'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <Icon name={isExpanded ? "X" : "Menu"} size={24} />
      </button>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;