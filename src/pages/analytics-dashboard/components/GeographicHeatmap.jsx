import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicHeatmap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { id: 1, name: 'Mumbai Coast', incidents: 156, severity: 'high', lat: 19.0760, lng: 72.8777 },
    { id: 2, name: 'Goa Beaches', incidents: 89, severity: 'medium', lat: 15.2993, lng: 74.1240 },
    { id: 3, name: 'Kerala Backwaters', incidents: 67, severity: 'low', lat: 9.9312, lng: 76.2673 },
    { id: 4, name: 'Chennai Marina', incidents: 134, severity: 'high', lat: 13.0827, lng: 80.2707 },
    { id: 5, name: 'Visakhapatnam Port', incidents: 98, severity: 'medium', lat: 17.6868, lng: 83.2185 },
    { id: 6, name: 'Kochi Harbor', incidents: 45, severity: 'low', lat: 9.9312, lng: 76.2673 }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Low Risk</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Container */}
        <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ height: '300px' }}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Indian Coastal Regions"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=15.2993,74.1240&z=6&output=embed"
            className="border-0">
          </iframe>
          
          {/* Overlay indicators */}
          <div className="absolute inset-0 pointer-events-none">
            {regions?.map((region) => (
              <div
                key={region?.id}
                className={`absolute w-4 h-4 ${getSeverityColor(region?.severity)} rounded-full opacity-75 animate-pulse`}
                style={{
                  top: `${Math.random() * 70 + 15}%`,
                  left: `${Math.random() * 70 + 15}%`
                }}
              />
            ))}
          </div>
        </div>

        {/* Region Statistics */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 mb-4">Regional Incident Summary</h4>
          {regions?.map((region) => (
            <div
              key={region?.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedRegion === region?.id 
                  ? 'border-blue-500 bg-blue-50' :'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRegion(selectedRegion === region?.id ? null : region?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${getSeverityColor(region?.severity)} rounded-full`}></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{region?.name}</p>
                    <p className="text-xs text-gray-600">{region?.incidents} incidents</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${getSeverityTextColor(region?.severity)} capitalize`}>
                    {region?.severity}
                  </span>
                  <Icon 
                    name={selectedRegion === region?.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-gray-400" 
                  />
                </div>
              </div>
              
              {selectedRegion === region?.id && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-600">Coordinates:</span>
                      <p className="font-mono">{region?.lat}, {region?.lng}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Risk Level:</span>
                      <p className={`font-medium ${getSeverityTextColor(region?.severity)} capitalize`}>
                        {region?.severity}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatmap;