import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LocationPreferences = ({ preferences, onUpdate }) => {
  const [settings, setSettings] = useState(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  const stateOptions = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'goa', label: 'Goa' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'west_bengal', label: 'West Bengal' }
  ];

  const coastalCities = {
    maharashtra: [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'pune', label: 'Pune' },
      { value: 'nashik', label: 'Nashik' },
      { value: 'aurangabad', label: 'Aurangabad' },
      { value: 'solapur', label: 'Solapur' }
    ],
    gujarat: [
      { value: 'ahmedabad', label: 'Ahmedabad' },
      { value: 'surat', label: 'Surat' },
      { value: 'vadodara', label: 'Vadodara' },
      { value: 'rajkot', label: 'Rajkot' }
    ],
    goa: [
      { value: 'panaji', label: 'Panaji' },
      { value: 'margao', label: 'Margao' },
      { value: 'vasco', label: 'Vasco da Gama' }
    ]
  };

  const emergencyContacts = [
    {
      id: 1,
      name: "Rajesh Kumar",
      relationship: "Spouse",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      isPrimary: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      relationship: "Sister",
      phone: "+91 87654 32109",
      email: "priya.sharma@email.com",
      isPrimary: false
    }
  ];

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleToggleChange = (field, checked) => {
    setSettings(prev => ({ ...prev, [field]: checked }));
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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          setSettings(prev => ({
            ...prev,
            currentLatitude: latitude?.toFixed(6),
            currentLongitude: longitude?.toFixed(6)
          }));
          setHasChanges(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please check your browser permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="MapPin" size={24} className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Location Preferences</h2>
      </div>
      <div className="space-y-8">
        {/* Default Reporting Location */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Default Reporting Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="State"
              options={stateOptions}
              value={settings?.defaultState}
              onChange={(value) => handleInputChange('defaultState', value)}
              placeholder="Select your state"
              searchable
            />
            
            <Select
              label="City"
              options={coastalCities?.[settings?.defaultState] || []}
              value={settings?.defaultCity}
              onChange={(value) => handleInputChange('defaultCity', value)}
              placeholder="Select your city"
              disabled={!settings?.defaultState}
              searchable
            />
            
            <Input
              label="Area/Locality"
              type="text"
              value={settings?.defaultArea}
              onChange={(e) => handleInputChange('defaultArea', e?.target?.value)}
              placeholder="Enter your area or locality"
            />
            
            <Input
              label="Pincode"
              type="text"
              value={settings?.pincode}
              onChange={(e) => handleInputChange('pincode', e?.target?.value)}
              placeholder="Enter pincode"
              maxLength={6}
            />
          </div>
        </div>

        {/* Current Location */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="text"
              value={settings?.currentLatitude}
              onChange={(e) => handleInputChange('currentLatitude', e?.target?.value)}
              placeholder="19.0760"
              disabled
            />
            
            <Input
              label="Longitude"
              type="text"
              value={settings?.currentLongitude}
              onChange={(e) => handleInputChange('currentLongitude', e?.target?.value)}
              placeholder="72.8777"
              disabled
            />
          </div>
          
          <div className="mt-4">
            <Button
              variant="outline"
              iconName="Navigation"
              iconPosition="left"
              onClick={getCurrentLocation}
            >
              Get Current Location
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              Click to automatically detect your current GPS coordinates
            </p>
          </div>
        </div>

        {/* Location Settings */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location Settings</h3>
          <div className="space-y-4">
            <Checkbox
              label="Auto-detect location for reports"
              description="Automatically use your current location when submitting hazard reports"
              checked={settings?.autoDetectLocation}
              onChange={(e) => handleToggleChange('autoDetectLocation', e?.target?.checked)}
            />
            
            <Checkbox
              label="Share precise location"
              description="Share exact GPS coordinates with authorities for better response"
              checked={settings?.sharePreciseLocation}
              onChange={(e) => handleToggleChange('sharePreciseLocation', e?.target?.checked)}
            />
            
            <Checkbox
              label="Location history"
              description="Save your reporting locations for quick access in future reports"
              checked={settings?.saveLocationHistory}
              onChange={(e) => handleToggleChange('saveLocationHistory', e?.target?.checked)}
            />
            
            <Checkbox
              label="Nearby hazard alerts"
              description="Receive notifications about hazards reported near your location"
              checked={settings?.nearbyAlerts}
              onChange={(e) => handleToggleChange('nearbyAlerts', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Emergency Contacts</h3>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => onUpdate({ type: 'addEmergencyContact' })}
            >
              Add Contact
            </Button>
          </div>
          
          <div className="space-y-4">
            {emergencyContacts?.map((contact) => (
              <div key={contact?.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="User" size={20} className="text-gray-500 mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{contact?.name}</span>
                      {contact?.isPrimary && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{contact?.relationship}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Icon name="Phone" size={14} />
                        <span>{contact?.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Mail" size={14} />
                        <span>{contact?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onUpdate({ type: 'editEmergencyContact', contactId: contact?.id })}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => onUpdate({ type: 'deleteEmergencyContact', contactId: contact?.id })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Preview */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location Preview</h3>
          <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Default Location"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${settings?.currentLatitude || '19.0760'},${settings?.currentLongitude || '72.8777'}&z=14&output=embed`}
              className="border-0"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This map shows your default reporting location. Update your coordinates above to change the preview.
          </p>
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
            Save Location Preferences
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

export default LocationPreferences;