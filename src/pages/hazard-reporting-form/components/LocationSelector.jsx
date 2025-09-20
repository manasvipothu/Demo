import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationSelector = ({ location, onLocationChange, error }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          onLocationChange({
            ...location,
            latitude: latitude?.toFixed(6),
            longitude: longitude?.toFixed(6),
            address: `${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}`
          });
          setIsDetecting(false);
          setMapVisible(true);
        },
        (error) => {
          console.error('Location detection failed:', error);
          setIsDetecting(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      setIsDetecting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Address/Location"
          type="text"
          placeholder="Enter location or address"
          value={location?.address || ''}
          onChange={(e) => onLocationChange({ ...location, address: e?.target?.value })}
          error={error}
          required
          description="Describe the location where the hazard was observed"
        />
        
        <div className="flex flex-col justify-end">
          <Button
            variant="outline"
            onClick={detectLocation}
            loading={isDetecting}
            iconName="MapPin"
            iconPosition="left"
            className="h-10"
          >
            {isDetecting ? 'Detecting...' : 'Use GPS Location'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Latitude"
          type="number"
          placeholder="0.000000"
          value={location?.latitude || ''}
          onChange={(e) => onLocationChange({ ...location, latitude: e?.target?.value })}
          step="0.000001"
          min="-90"
          max="90"
        />
        
        <Input
          label="Longitude"
          type="number"
          placeholder="0.000000"
          value={location?.longitude || ''}
          onChange={(e) => onLocationChange({ ...location, longitude: e?.target?.value })}
          step="0.000001"
          min="-180"
          max="180"
        />
      </div>
      {mapVisible && location?.latitude && location?.longitude && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Icon name="Map" size={16} className="mr-2" />
              Location Preview
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMapVisible(false)}
              iconName="X"
              iconSize={14}
            >
              Close
            </Button>
          </div>
          <div className="h-64">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Hazard Location"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&z=15&output=embed`}
              className="border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;