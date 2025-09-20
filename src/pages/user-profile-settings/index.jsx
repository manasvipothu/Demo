import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PersonalInfoSection from './components/PersonalInfoSection';
import NotificationPreferences from './components/NotificationPreferences';
import SecuritySettings from './components/SecuritySettings';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import SubmissionHistory from './components/SubmissionHistory';
import LocationPreferences from './components/LocationPreferences';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock user data
  const [userInfo, setUserInfo] = useState({
    fullName: "Arjun Patel",
    email: "arjun.patel@email.com",
    phoneNumber: "+91 98765 43210",
    preferredLanguage: "en",
    location: "Mumbai, Maharashtra",
    occupation: "Marine Biologist",
    profilePhoto: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    enableNotifications: true,
    emergencyOnly: false,
    alertTypes: ['tsunami', 'storm', 'pollution'],
    deliveryMethods: ['email', 'push'],
    alertRadius: '25',
    frequency: 'immediate',
    quietHours: true,
    weeklySummary: true,
    communityUpdates: false
  });

  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: true,
    lastPasswordChange: '2024-08-15',
    activeSessions: 3
  });

  const [locationPreferences, setLocationPreferences] = useState({
    defaultState: 'maharashtra',
    defaultCity: 'mumbai',
    defaultArea: 'Bandra West',
    pincode: '400050',
    currentLatitude: '19.0596',
    currentLongitude: '72.8295',
    autoDetectLocation: true,
    sharePreciseLocation: true,
    saveLocationHistory: true,
    nearbyAlerts: true
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'photo', label: 'Profile Photo', icon: 'Camera' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'location', label: 'Location', icon: 'MapPin' },
    { id: 'history', label: 'My Reports', icon: 'FileText' }
  ];

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handlePersonalInfoUpdate = (updatedInfo) => {
    setUserInfo(updatedInfo);
    
    // Update language in localStorage if changed
    if (updatedInfo?.preferredLanguage !== currentLanguage) {
      localStorage.setItem('preferredLanguage', updatedInfo?.preferredLanguage);
      setCurrentLanguage(updatedInfo?.preferredLanguage);
    }
    
    showSuccess('Personal information updated successfully');
  };

  const handleNotificationUpdate = (updatedPreferences) => {
    setNotificationPreferences(updatedPreferences);
    showSuccess('Notification preferences updated successfully');
  };

  const handleSecurityUpdate = (updateData) => {
    switch (updateData?.type) {
      case 'password':
        setSecurityData(prev => ({
          ...prev,
          lastPasswordChange: new Date()?.toISOString()?.split('T')?.[0]
        }));
        showSuccess('Password updated successfully');
        break;
      case 'twoFactor':
        setSecurityData(prev => ({
          ...prev,
          twoFactorEnabled: updateData?.data?.enabled
        }));
        showSuccess(`Two-factor authentication ${updateData?.data?.enabled ? 'enabled' : 'disabled'}`);
        break;
      case 'terminateSession': showSuccess('Session terminated successfully');
        break;
      case 'terminateAllSessions': showSuccess('All other sessions terminated successfully');
        break;
      case 'updateRecoveryEmail': showSuccess('Recovery email update initiated');
        break;
      case 'downloadData':
        showSuccess('Data export request submitted');
        break;
      case 'configureTwoFactor': showSuccess('Two-factor authentication settings opened');
        break;
      default:
        break;
    }
  };

  const handleProfilePhotoUpdate = (updateData) => {
    if (updateData?.data?.url) {
      setUserInfo(prev => ({ ...prev, profilePhoto: updateData?.data?.url }));
      showSuccess('Profile photo updated successfully');
    } else {
      setUserInfo(prev => ({ ...prev, profilePhoto: null }));
      showSuccess('Profile photo removed successfully');
    }
  };

  const handleLocationUpdate = (updatedPreferences) => {
    if (updatedPreferences?.type) {
      // Handle specific actions
      switch (updatedPreferences?.type) {
        case 'addEmergencyContact': showSuccess('Emergency contact form opened');
          break;
        case 'editEmergencyContact': showSuccess('Emergency contact edit form opened');
          break;
        case 'deleteEmergencyContact':
          showSuccess('Emergency contact deleted successfully');
          break;
        default:
          break;
      }
    } else {
      setLocationPreferences(updatedPreferences);
      showSuccess('Location preferences updated successfully');
    }
  };

  const handleViewReport = (reportId) => {
    navigate(`/report-management?reportId=${reportId}`);
  };

  const showSuccess = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoSection
            userInfo={userInfo}
            onUpdate={handlePersonalInfoUpdate}
          />
        );
      case 'photo':
        return (
          <ProfilePhotoUpload
            currentPhoto={userInfo?.profilePhoto}
            onUpdate={handleProfilePhotoUpdate}
          />
        );
      case 'notifications':
        return (
          <NotificationPreferences
            preferences={notificationPreferences}
            onUpdate={handleNotificationUpdate}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            securityData={securityData}
            onUpdate={handleSecurityUpdate}
          />
        );
      case 'location':
        return (
          <LocationPreferences
            preferences={locationPreferences}
            onUpdate={handleLocationUpdate}
          />
        );
      case 'history':
        return (
          <SubmissionHistory
            reports={[]}
            onViewReport={handleViewReport}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={() => navigate(-1)}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-sm text-gray-600">Manage your account preferences and security</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Home"
                iconPosition="left"
                onClick={() => navigate('/interactive-map-dashboard')}
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={20} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">{showSuccessMessage}</span>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab?.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' :'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon 
                      name={tab?.icon} 
                      size={20} 
                      className={activeTab === tab?.id ? 'text-blue-600' : 'text-gray-500'} 
                    />
                    <span className="font-medium">{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                  onClick={() => navigate('/hazard-reporting-form')}
                >
                  Report Hazard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Map"
                  iconPosition="left"
                  fullWidth
                  onClick={() => navigate('/interactive-map-dashboard')}
                >
                  View Map
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BarChart3"
                  iconPosition="left"
                  fullWidth
                  onClick={() => navigate('/analytics-dashboard')}
                >
                  Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;