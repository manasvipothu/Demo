import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MapContainer = ({ 
  selectedFilters, 
  onMarkerClick, 
  showLegend, 
  mapView,
  onMapViewChange 
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai coordinates
  const [zoomLevel, setZoomLevel] = useState(10);

  // Mock hazard reports data
  const hazardReports = [
    {
      id: 1,
      type: 'oil-spill',
      severity: 'high',
      lat: 19.0760,
      lng: 72.8777,
      title: 'Oil Spill Near Gateway of India',
      timestamp: '2025-01-17T14:30:00Z',
      source: 'citizen',
      description: 'Large oil spill observed near the coastline affecting marine life',
      reportedBy: 'Rajesh Kumar'
    },
    {
      id: 2,
      type: 'debris',
      severity: 'medium',
      lat: 19.1136,
      lng: 72.8697,
      title: 'Plastic Debris Accumulation',
      timestamp: '2025-01-17T12:15:00Z',
      source: 'social-media',
      description: 'Heavy plastic debris spotted by fishing boats',
      reportedBy: 'Twitter User @fisherman_mumbai'
    },
    {
      id: 3,
      type: 'algae-bloom',
      severity: 'low',
      lat: 18.9220,
      lng: 72.8347,
      title: 'Algae Bloom Formation',
      timestamp: '2025-01-17T10:45:00Z',
      source: 'citizen',
      description: 'Green algae bloom observed in coastal waters',
      reportedBy: 'Priya Sharma'
    },
    {
      id: 4,
      type: 'chemical-discharge',
      severity: 'high',
      lat: 19.0330,
      lng: 72.8570,
      title: 'Chemical Discharge Alert',
      timestamp: '2025-01-17T16:20:00Z',
      source: 'official',
      description: 'Industrial chemical discharge reported by coast guard',
      reportedBy: 'Coast Guard Station'
    },
    {
      id: 5,
      type: 'oil-spill',
      severity: 'medium',
      lat: 18.9750,
      lng: 72.8258,
      title: 'Minor Oil Leak',
      timestamp: '2025-01-17T08:30:00Z',
      source: 'citizen',
      description: 'Small oil leak from fishing vessel',
      reportedBy: 'Amit Patel'
    }
  ];

  // Filter reports based on selected filters
  const filteredReports = hazardReports?.filter(report => {
    if (selectedFilters?.eventTypes?.length > 0 && !selectedFilters?.eventTypes?.includes(report?.type)) {
      return false;
    }
    if (selectedFilters?.dateSources?.length > 0 && !selectedFilters?.dateSources?.includes(report?.source)) {
      return false;
    }
    if (selectedFilters?.severityLevels?.length > 0 && !selectedFilters?.severityLevels?.includes(report?.severity)) {
      return false;
    }
    return true;
  });

  const getMarkerColor = (type, severity) => {
    const colors = {
      'oil-spill': severity === 'high' ? '#DC2626' : severity === 'medium' ? '#F59E0B' : '#10B981',
      'debris': severity === 'high' ? '#7C2D12' : severity === 'medium' ? '#EA580C' : '#FB923C',
      'algae-bloom': severity === 'high' ? '#166534' : severity === 'medium' ? '#16A34A' : '#4ADE80',
      'chemical-discharge': severity === 'high' ? '#7C2D12' : severity === 'medium' ? '#DC2626' : '#F87171'
    };
    return colors?.[type] || '#6B7280';
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'citizen': return 'User';
      case 'social-media': return 'MessageSquare';
      case 'official': return 'Shield';
      default: return 'MapPin';
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 3));
  };

  return (
    <div className="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Ocean Hazard Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed&maptype=${mapView}`}
        className="absolute inset-0"
      />
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        {/* Map View Toggle */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex gap-1">
            <button
              onClick={() => onMapViewChange('roadmap')}
              className={`px-3 py-1 text-xs rounded ${
                mapView === 'roadmap' ?'bg-blue-600 text-white' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => onMapViewChange('satellite')}
              className={`px-3 py-1 text-xs rounded ${
                mapView === 'satellite' ?'bg-blue-600 text-white' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => onMapViewChange('terrain')}
              className={`px-3 py-1 text-xs rounded ${
                mapView === 'terrain' ?'bg-blue-600 text-white' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Terrain
            </button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="bg-white rounded-lg shadow-lg">
          <button
            onClick={handleZoomIn}
            className="block w-10 h-10 flex items-center justify-center hover:bg-gray-50 border-b border-gray-200"
          >
            <Icon name="Plus" size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="block w-10 h-10 flex items-center justify-center hover:bg-gray-50"
          >
            <Icon name="Minus" size={16} />
          </button>
        </div>
      </div>
      {/* Simulated Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {filteredReports?.map((report, index) => (
          <div
            key={report?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + (index - 2) * 8}%`,
              top: `${50 + (index - 2) * 6}%`
            }}
            onClick={() => onMarkerClick(report)}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse"
              style={{ backgroundColor: getMarkerColor(report?.type, report?.severity) }}
            >
              <Icon 
                name={getSourceIcon(report?.source)} 
                size={14} 
                color="white" 
              />
            </div>
            {/* Severity indicator */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white ${
              report?.severity === 'high' ? 'bg-red-500' :
              report?.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`} />
          </div>
        ))}
      </div>
      {/* Legend Panel */}
      {showLegend && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
          <h3 className="font-semibold text-sm mb-3 text-gray-800">Map Legend</h3>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">Hazard Types</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-600"></div>
                  <span className="text-xs text-gray-700">Oil Spill</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-600"></div>
                  <span className="text-xs text-gray-700">Debris</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-600"></div>
                  <span className="text-xs text-gray-700">Algae Bloom</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                  <span className="text-xs text-gray-700">Chemical Discharge</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">Data Sources</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Icon name="User" size={12} />
                  <span className="text-xs text-gray-700">Citizen Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={12} />
                  <span className="text-xs text-gray-700">Social Media</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={12} />
                  <span className="text-xs text-gray-700">Official Sources</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">Severity Levels</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-700">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-gray-700">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-700">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Real-time Updates Indicator */}
      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium z-10 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
        Live Updates
      </div>
    </div>
  );
};

export default MapContainer;