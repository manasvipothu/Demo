import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [alertCount, setAlertCount] = useState(3);
  const [userRole, setUserRole] = useState('Official'); // Mock user role
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigationItems = [
    {
      label: 'Report',
      path: '/hazard-reporting-form',
      icon: 'AlertTriangle',
      tooltip: 'Submit hazard reports'
    },
    {
      label: 'Monitor',
      path: '/interactive-map-dashboard',
      icon: 'Map',
      tooltip: 'Real-time monitoring dashboard',
      hasAlerts: true
    },
    {
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Data analytics and insights',
      roleRequired: 'Official'
    },
    {
      label: 'Manage',
      path: '/report-management',
      icon: 'FileText',
      tooltip: 'Manage reports and responses',
      roleRequired: 'Official'
    }
  ];

  const secondaryItems = [
    {
      label: 'Social Analytics',
      path: '/social-media-analytics',
      icon: 'MessageSquare',
      tooltip: 'Social media monitoring'
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'User',
      tooltip: 'User settings and profile'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const getVisibleItems = () => {
    return navigationItems?.filter(item => 
      !item?.roleRequired || item?.roleRequired === userRole
    );
  };

  const ConnectivityIndicator = () => (
    <div className="flex items-center">
      <div 
        className={`w-2 h-2 rounded-full mr-2 ${
          isOnline ? 'bg-success' : 'bg-error'
        }`}
        title={isOnline ? 'Online' : 'Offline'}
      />
      <span className="text-sm text-text-secondary hidden sm:inline">
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );

  const UserRoleBadge = () => {
    if (!userRole || userRole === 'Citizen') return null;
    
    return (
      <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
        {userRole}
      </div>
    );
  };

  const AlertIndicator = ({ count }) => {
    if (!count || count === 0) return null;
    
    return (
      <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
        {count > 9 ? '9+' : count}
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Waves" size={20} color="white" />
          </div>
          <span className="text-xl font-bold text-primary">Oceansaathi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {getVisibleItems()?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-primary hover:bg-muted hover:text-primary'
              }`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
              {item?.hasAlerts && item?.label === 'Monitor' && (
                <AlertIndicator count={alertCount} />
              )}
            </Link>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              More
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 z-10">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                      isActivePath(item?.path) ? 'text-primary font-medium' : 'text-text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Side Items */}
        <div className="flex items-center space-x-4">
          <ConnectivityIndicator />
          <UserRoleBadge />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            Menu
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {getVisibleItems()?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`relative flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-primary hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.hasAlerts && item?.label === 'Monitor' && (
                  <AlertIndicator count={alertCount} />
                )}
              </Link>
            ))}
            
            <div className="border-t border-border pt-2 mt-2">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;