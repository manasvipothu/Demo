import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Navigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/hazard-reporting-form',
      name: 'Report Hazard',
      icon: 'AlertTriangle',
      description: 'Submit new hazard reports'
    },
    {
      path: '/interactive-map-dashboard',
      name: 'Map Dashboard',
      icon: 'Map',
      description: 'View hazards on interactive map'
    },
    {
      path: '/social-media-analytics',
      name: 'Social Analytics',
      icon: 'TrendingUp',
      description: 'Monitor social media trends'
    },
    {
      path: '/analytics-dashboard',
      name: 'Analytics',
      icon: 'BarChart3',
      description: 'View detailed analytics'
    },
    {
      path: '/report-management',
      name: 'Report Management',
      icon: 'FileText',
      description: 'Manage and review reports'
    },
    {
      path: '/user-profile-settings',
      name: 'Profile Settings',
      icon: 'Settings',
      description: 'Manage your profile'
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="Waves" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Oceansaathi</span>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location?.pathname === item?.path
                    ? 'bg-blue-100 text-blue-700' :'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mt-4 pb-4">
          <div className="grid grid-cols-2 gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location?.pathname === item?.path
                    ? 'bg-blue-100 text-blue-700' :'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;