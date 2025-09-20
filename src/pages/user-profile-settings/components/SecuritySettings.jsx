import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SecuritySettings = ({ securityData, onUpdate }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securityData?.twoFactorEnabled);

  const activeSessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Mumbai, Maharashtra",
      lastActive: "2 minutes ago",
      current: true,
      ipAddress: "192.168.1.100"
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Mumbai, Maharashtra", 
      lastActive: "1 hour ago",
      current: false,
      ipAddress: "192.168.1.101"
    },
    {
      id: 3,
      device: "Chrome on Android",
      location: "Pune, Maharashtra",
      lastActive: "2 days ago",
      current: false,
      ipAddress: "203.192.12.45"
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    
    if (!passwordForm?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePasswordForm()) {
      // Mock validation - in real app, verify current password with backend
      if (passwordForm?.currentPassword !== 'ocean123') {
        setErrors({ currentPassword: 'Current password is incorrect' });
        return;
      }
      
      onUpdate({ type: 'password', data: passwordForm });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  const handleTwoFactorToggle = (enabled) => {
    setTwoFactorEnabled(enabled);
    onUpdate({ type: 'twoFactor', data: { enabled } });
  };

  const handleTerminateSession = (sessionId) => {
    onUpdate({ type: 'terminateSession', data: { sessionId } });
  };

  const handleTerminateAllSessions = () => {
    onUpdate({ type: 'terminateAllSessions' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Shield" size={24} className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
      </div>
      <div className="space-y-8">
        {/* Change Password */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4 max-w-md">
            <Input
              label="Current Password"
              type={showPasswords ? "text" : "password"}
              value={passwordForm?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              error={errors?.currentPassword}
              placeholder="Enter current password"
              required
            />
            
            <Input
              label="New Password"
              type={showPasswords ? "text" : "password"}
              value={passwordForm?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              error={errors?.newPassword}
              placeholder="Enter new password"
              description="Must be at least 8 characters long"
              required
            />
            
            <Input
              label="Confirm New Password"
              type={showPasswords ? "text" : "password"}
              value={passwordForm?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              placeholder="Confirm new password"
              required
            />
            
            <Checkbox
              label="Show passwords"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e?.target?.checked)}
            />
            
            <Button
              variant="default"
              iconName="Key"
              iconPosition="left"
              onClick={handlePasswordSubmit}
            >
              Update Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Checkbox
                label="Enable Two-Factor Authentication"
                description="Add an extra layer of security to your account by requiring a verification code from your phone"
                checked={twoFactorEnabled}
                onChange={(e) => handleTwoFactorToggle(e?.target?.checked)}
              />
              
              {twoFactorEnabled && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} className="text-green-600" />
                    <span className="text-sm font-medium text-green-800">Two-factor authentication is enabled</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Your account is protected with SMS verification codes sent to +91 98765 43210
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                    className="mt-3"
                    onClick={() => onUpdate({ type: 'configureTwoFactor' })}
                  >
                    Configure Settings
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Active Sessions</h3>
            <Button
              variant="outline"
              size="sm"
              iconName="LogOut"
              iconPosition="left"
              onClick={handleTerminateAllSessions}
            >
              Sign Out All Devices
            </Button>
          </div>
          
          <div className="space-y-4">
            {activeSessions?.map((session) => (
              <div key={session?.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon 
                    name={session?.device?.includes('iPhone') ? 'Smartphone' : session?.device?.includes('Android') ? 'Smartphone' : 'Monitor'} 
                    size={20} 
                    className="text-gray-500 mt-1" 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{session?.device}</span>
                      {session?.current && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Current Session
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{session?.location}</p>
                    <p className="text-xs text-gray-500">Last active: {session?.lastActive} • IP: {session?.ipAddress}</p>
                  </div>
                </div>
                
                {!session?.current && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    onClick={() => handleTerminateSession(session?.id)}
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Account Recovery */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Recovery</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Recovery Email</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Your recovery email is set to: r****@gmail.com
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    iconPosition="left"
                    className="mt-2"
                    onClick={() => onUpdate({ type: 'updateRecoveryEmail' })}
                  >
                    Update Recovery Email
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={20} className="text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">Download Your Data</h4>
                  <p className="text-sm text-amber-800 mt-1">
                    Download a copy of your account data including reports and settings
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    className="mt-2"
                    onClick={() => onUpdate({ type: 'downloadData' })}
                  >
                    Request Data Export
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;