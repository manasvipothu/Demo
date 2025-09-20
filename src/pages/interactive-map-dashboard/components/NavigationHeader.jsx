import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationHeader = ({ 
  onToggleFilters, 
  onToggleLegend, 
  showLegend, 
  activeFiltersCount,
  isMobile 
}) => {
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/hazard-reporting-form', label: 'Report Hazard', icon: 'Plus' },
    { path: '/social-media-analytics', label: 'Social Analytics', icon: 'MessageSquare' },
    { path: '/analytics-dashboard', label: 'Analytics', icon: 'BarChart3' },
    { path: '/report-management', label: 'Reports', icon: 'FileText' },
    { path: '/user-profile-settings', label: 'Profile', icon: 'User' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="Waves" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Oceansaathi</h1>
              <p className="text-xs text-gray-500">Interactive Map Dashboard</p>
            </div>
          </div>
        </div>

        {/* Center Section - Navigation (Desktop Only) */}
        {!isMobile && (
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                className="text-gray-600 hover:text-gray-900"
              >
                {item?.label}
              </Button>
            ))}
          </nav>
        )}

        {/* Right Section - Controls */}
        <div className="flex items-center gap-2">
          {/* Filter Toggle */}
          <Button
            variant={activeFiltersCount > 0 ? "default" : "outline"}
            size="sm"
            onClick={onToggleFilters}
            iconName="Filter"
            iconPosition="left"
            className="relative"
          >
            {!isMobile && "Filters"}
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {/* Legend Toggle */}
          <Button
            variant={showLegend ? "default" : "outline"}
            size="sm"
            onClick={onToggleLegend}
            iconName="Info"
            iconPosition="left"
          >
            {!isMobile && "Legend"}
          </Button>

          {/* Mobile Menu */}
          {isMobile && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                iconName="Menu"
              />
            </div>
          )}

          {/* Real-time Status */}
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">
              {isMobile ? "Live" : "Live Updates"}
            </span>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobile && (
        <div className="mt-3 flex gap-1 overflow-x-auto pb-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item?.path)}
              iconName={item?.icon}
              className="flex-shrink-0 text-gray-600 hover:text-gray-900"
            >
              {item?.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationHeader;