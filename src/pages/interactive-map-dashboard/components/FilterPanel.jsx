import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  isOpen, 
  onToggle, 
  filters, 
  onFiltersChange, 
  isMobile = false 
}) => {
  const [locationRadius, setLocationRadius] = useState(filters?.locationRadius || 50);
  const [dateRange, setDateRange] = useState({
    startDate: filters?.dateRange?.startDate || '2025-01-01',
    endDate: filters?.dateRange?.endDate || '2025-01-17'
  });

  const eventTypes = [
    { id: 'oil-spill', label: 'Oil Spills', count: 12 },
    { id: 'debris', label: 'Marine Debris', count: 8 },
    { id: 'algae-bloom', label: 'Algae Blooms', count: 5 },
    { id: 'chemical-discharge', label: 'Chemical Discharge', count: 3 },
    { id: 'wildlife-distress', label: 'Wildlife Distress', count: 7 },
    { id: 'water-pollution', label: 'Water Pollution', count: 15 }
  ];

  const dataSources = [
    { id: 'citizen', label: 'Citizen Reports', count: 28 },
    { id: 'social-media', label: 'Social Media', count: 15 },
    { id: 'official', label: 'Official Sources', count: 7 }
  ];

  const severityLevels = [
    { id: 'high', label: 'High Priority', count: 8, color: 'text-red-600' },
    { id: 'medium', label: 'Medium Priority', count: 22, color: 'text-yellow-600' },
    { id: 'low', label: 'Low Priority', count: 20, color: 'text-green-600' }
  ];

  const handleEventTypeChange = (eventType, checked) => {
    const updatedTypes = checked
      ? [...filters?.eventTypes, eventType]
      : filters?.eventTypes?.filter(type => type !== eventType);
    
    onFiltersChange({
      ...filters,
      eventTypes: updatedTypes
    });
  };

  const handleDataSourceChange = (source, checked) => {
    const updatedSources = checked
      ? [...filters?.dataSources, source]
      : filters?.dataSources?.filter(s => s !== source);
    
    onFiltersChange({
      ...filters,
      dataSources: updatedSources
    });
  };

  const handleSeverityChange = (severity, checked) => {
    const updatedSeverity = checked
      ? [...filters?.severityLevels, severity]
      : filters?.severityLevels?.filter(s => s !== severity);
    
    onFiltersChange({
      ...filters,
      severityLevels: updatedSeverity
    });
  };

  const handleLocationRadiusChange = (e) => {
    const radius = parseInt(e?.target?.value);
    setLocationRadius(radius);
    onFiltersChange({
      ...filters,
      locationRadius: radius
    });
  };

  const handleDateRangeChange = (field, value) => {
    const updatedRange = { ...dateRange, [field]: value };
    setDateRange(updatedRange);
    onFiltersChange({
      ...filters,
      dateRange: updatedRange
    });
  };

  const clearAllFilters = () => {
    setLocationRadius(50);
    setDateRange({
      startDate: '2025-01-01',
      endDate: '2025-01-17'
    });
    onFiltersChange({
      eventTypes: [],
      dataSources: [],
      severityLevels: [],
      locationRadius: 50,
      dateRange: {
        startDate: '2025-01-01',
        endDate: '2025-01-17'
      }
    });
  };

  const getTotalActiveFilters = () => {
    return filters?.eventTypes?.length + filters?.dataSources?.length + filters?.severityLevels?.length;
  };

  const panelContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} />
          <h2 className="font-semibold text-gray-800">Filters</h2>
          {getTotalActiveFilters() > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {getTotalActiveFilters()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Location Radius */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Location Radius</h3>
          <div className="space-y-2">
            <Input
              type="range"
              min="5"
              max="200"
              value={locationRadius}
              onChange={handleLocationRadiusChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>5 km</span>
              <span className="font-medium text-blue-600">{locationRadius} km</span>
              <span>200 km</span>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Date Range</h3>
          <div className="space-y-3">
            <Input
              type="date"
              label="Start Date"
              value={dateRange?.startDate}
              onChange={(e) => handleDateRangeChange('startDate', e?.target?.value)}
            />
            <Input
              type="date"
              label="End Date"
              value={dateRange?.endDate}
              onChange={(e) => handleDateRangeChange('endDate', e?.target?.value)}
            />
          </div>
        </div>

        {/* Event Types */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Event Types</h3>
          <div className="space-y-2">
            {eventTypes?.map(type => (
              <div key={type?.id} className="flex items-center justify-between">
                <Checkbox
                  label={type?.label}
                  checked={filters?.eventTypes?.includes(type?.id)}
                  onChange={(e) => handleEventTypeChange(type?.id, e?.target?.checked)}
                />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {type?.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Data Sources</h3>
          <div className="space-y-2">
            {dataSources?.map(source => (
              <div key={source?.id} className="flex items-center justify-between">
                <Checkbox
                  label={source?.label}
                  checked={filters?.dataSources?.includes(source?.id)}
                  onChange={(e) => handleDataSourceChange(source?.id, e?.target?.checked)}
                />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {source?.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Levels */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Severity Levels</h3>
          <div className="space-y-2">
            {severityLevels?.map(level => (
              <div key={level?.id} className="flex items-center justify-between">
                <Checkbox
                  label={
                    <span className={level?.color}>
                      {level?.label}
                    </span>
                  }
                  checked={filters?.severityLevels?.includes(level?.id)}
                  onChange={(e) => handleSeverityChange(level?.id, e?.target?.checked)}
                />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {level?.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button for Mobile */}
      {isMobile && (
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="default"
            fullWidth
            onClick={onToggle}
          >
            Apply Filters ({getTotalActiveFilters()})
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onToggle}
          />
        )}
        
        {/* Mobile Drawer */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {panelContent}
        </div>
      </>
    );
  }

  // Desktop Panel
  return (
    <div className={`absolute top-4 left-4 w-80 bg-white rounded-lg shadow-lg z-30 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {panelContent}
    </div>
  );
};

export default FilterPanel;