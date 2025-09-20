import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationPreferences = ({ preferences, onUpdate }) => {
  const [settings, setSettings] = useState(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  const alertTypeOptions = [
    { value: 'tsunami', label: 'Tsunami Warnings' },
    { value: 'storm', label: 'Storm Alerts' },
    { value: 'pollution', label: 'Pollution Reports' },
    { value: 'marine_life', label: 'Marine Life Hazards' },
    { value: 'oil_spill', label: 'Oil Spill Incidents' },
    { value: 'debris', label: 'Marine Debris' },
    { value: 'weather', label: 'Weather Updates' }
  ];

  const deliveryMethodOptions = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notifications' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Summary' },
    { value: 'weekly', label: 'Weekly Report' }
  ];

  const radiusOptions = [
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '25', label: '25 km' },
    { value: '50', label: '50 km' },
    { value: '100', label: '100 km' },
    { value: 'state', label: 'Entire State' },
    { value: 'country', label: 'Entire Country' }
  ];

  const handleToggleChange = (field, checked) => {
    setSettings(prev => ({ ...prev, [field]: checked }));
    setHasChanges(true);
  };

  const handleSelectChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(settings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(preferences);
    setHasChanges(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Bell" size={24} className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
      </div>
      <div className="space-y-8">
        {/* General Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <Checkbox
              label="Enable all notifications"
              description="Receive notifications for ocean hazard alerts and updates"
              checked={settings?.enableNotifications}
              onChange={(e) => handleToggleChange('enableNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Emergency alerts only"
              description="Only receive critical emergency notifications"
              checked={settings?.emergencyOnly}
              onChange={(e) => handleToggleChange('emergencyOnly', e?.target?.checked)}
              disabled={!settings?.enableNotifications}
            />
          </div>
        </div>

        {/* Alert Types */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Types</h3>
          <Select
            label="Hazard Types"
            description="Select the types of ocean hazards you want to be notified about"
            options={alertTypeOptions}
            value={settings?.alertTypes}
            onChange={(value) => handleSelectChange('alertTypes', value)}
            multiple
            searchable
            disabled={!settings?.enableNotifications}
            placeholder="Select alert types"
          />
        </div>

        {/* Delivery Methods */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Methods</h3>
          <Select
            label="How would you like to receive notifications?"
            options={deliveryMethodOptions}
            value={settings?.deliveryMethods}
            onChange={(value) => handleSelectChange('deliveryMethods', value)}
            multiple
            disabled={!settings?.enableNotifications}
            placeholder="Select delivery methods"
          />
        </div>

        {/* Geographic Preferences */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Geographic Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Alert Radius"
              description="Receive alerts within this distance from your location"
              options={radiusOptions}
              value={settings?.alertRadius}
              onChange={(value) => handleSelectChange('alertRadius', value)}
              disabled={!settings?.enableNotifications}
              placeholder="Select radius"
            />
            
            <Select
              label="Notification Frequency"
              description="How often would you like to receive notifications"
              options={frequencyOptions}
              value={settings?.frequency}
              onChange={(value) => handleSelectChange('frequency', value)}
              disabled={!settings?.enableNotifications}
              placeholder="Select frequency"
            />
          </div>
        </div>

        {/* Advanced Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Settings</h3>
          <div className="space-y-4">
            <Checkbox
              label="Quiet hours (10 PM - 6 AM)"
              description="Suppress non-emergency notifications during quiet hours"
              checked={settings?.quietHours}
              onChange={(e) => handleToggleChange('quietHours', e?.target?.checked)}
              disabled={!settings?.enableNotifications}
            />
            
            <Checkbox
              label="Weekly summary report"
              description="Receive a weekly summary of ocean hazard activity in your area"
              checked={settings?.weeklySummary}
              onChange={(e) => handleToggleChange('weeklySummary', e?.target?.checked)}
              disabled={!settings?.enableNotifications}
            />
            
            <Checkbox
              label="Community updates"
              description="Get notified about new features and community announcements"
              checked={settings?.communityUpdates}
              onChange={(e) => handleToggleChange('communityUpdates', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {hasChanges && (
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            Save Preferences
          </Button>
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleReset}
          >
            Reset Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPreferences;