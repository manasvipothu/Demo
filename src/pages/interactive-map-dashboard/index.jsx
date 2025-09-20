import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapContainer from './components/MapContainer';
import FilterPanel from './components/FilterPanel';
import MarkerPopup from './components/MarkerPopup';
import NavigationHeader from './components/NavigationHeader';
import FloatingActionButton from './components/FloatingActionButton';
import RealTimeUpdates from './components/RealTimeUpdates';

const InteractiveMapDashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [showLegend, setShowLegend] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapView, setMapView] = useState('roadmap');
  
  const [filters, setFilters] = useState({
    eventTypes: [],
    dataSources: [],
    severityLevels: [],
    locationRadius: 50,
    dateRange: {
      startDate: '2025-01-01',
      endDate: '2025-01-17'
    }
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && !showFilters) {
        setShowFilters(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showFilters]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'Escape') {
        setSelectedMarker(null);
        if (isMobile) {
          setShowFilters(false);
        }
      }
      if (e?.key === 'f' && e?.ctrlKey) {
        e?.preventDefault();
        setShowFilters(!showFilters);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFilters, isMobile]);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleToggleLegend = () => {
    setShowLegend(!showLegend);
  };

  const handleMarkerClick = (report) => {
    setSelectedMarker(report);
  };

  const handleClosePopup = () => {
    setSelectedMarker(null);
  };

  const handleViewDetails = (report) => {
    navigate('/report-management', { 
      state: { selectedReport: report?.id } 
    });
  };

  const handleNavigateToLocation = (report) => {
    // Mock navigation functionality
    console.log(`Navigating to: ${report?.lat}, ${report?.lng}`);
    // In a real app, this would open maps app or provide directions
    alert(`Navigation to ${report?.title} would open here`);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleMapViewChange = (view) => {
    setMapView(view);
  };

  const handleNewReport = (report) => {
    // Handle new real-time report
    console.log('New report received:', report);
  };

  const getActiveFiltersCount = () => {
    return filters?.eventTypes?.length + filters?.dataSources?.length + filters?.severityLevels?.length;
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Navigation Header */}
      <NavigationHeader
        onToggleFilters={handleToggleFilters}
        onToggleLegend={handleToggleLegend}
        showLegend={showLegend}
        activeFiltersCount={getActiveFiltersCount()}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Map Container */}
        <div className="absolute inset-0">
          <MapContainer
            selectedFilters={filters}
            onMarkerClick={handleMarkerClick}
            showLegend={showLegend}
            mapView={mapView}
            onMapViewChange={handleMapViewChange}
          />
        </div>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilters}
          onToggle={handleToggleFilters}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isMobile={isMobile}
        />

        {/* Marker Popup */}
        {selectedMarker && (
          <MarkerPopup
            report={selectedMarker}
            onClose={handleClosePopup}
            onViewDetails={handleViewDetails}
            onNavigate={handleNavigateToLocation}
          />
        )}

        {/* Real-time Updates */}
        <RealTimeUpdates onNewReport={handleNewReport} />

        {/* Floating Action Button (Mobile) */}
        <FloatingActionButton
          onToggleFilters={handleToggleFilters}
          isMobile={isMobile}
        />

        {/* Loading Overlay (if needed) */}
        {false && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map data...</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar (Mobile) */}
      {isMobile && (
        <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            {getActiveFiltersCount() > 0 
              ? `${getActiveFiltersCount()} filters active` 
              : 'No filters applied'
            }
          </span>
          <span>Last updated: just now</span>
        </div>
      )}
    </div>
  );
};

export default InteractiveMapDashboard;