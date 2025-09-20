import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    startDate: '',
    endDate: '',
    location: '',
    hazardType: '',
    severity: '',
    dataSource: 'all',
    status: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const hazardTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'storm', label: 'Storms' },
    { value: 'pollution', label: 'Pollution' },
    { value: 'debris', label: 'Marine Debris' },
    { value: 'wildlife', label: 'Wildlife Incidents' },
    { value: 'oil-spill', label: 'Oil Spills' },
    { value: 'algae', label: 'Algae Blooms' },
    { value: 'collision', label: 'Vessel Collisions' }
  ];

  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'informational', label: 'Informational' }
  ];

  const dataSourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'citizen-reports', label: 'Citizen Reports' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'official', label: 'Official Reports' },
    { value: 'sensors', label: 'IoT Sensors' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai Coast' },
    { value: 'goa', label: 'Goa Beaches' },
    { value: 'kerala', label: 'Kerala Backwaters' },
    { value: 'chennai', label: 'Chennai Marina' },
    { value: 'visakhapatnam', label: 'Visakhapatnam Port' },
    { value: 'kochi', label: 'Kochi Harbor' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'last30days',
      startDate: '',
      endDate: '',
      location: '',
      hazardType: '',
      severity: '',
      dataSource: 'all',
      status: ''
    };
    setFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.location) count++;
    if (filters?.hazardType) count++;
    if (filters?.severity) count++;
    if (filters?.dataSource !== 'all') count++;
    if (filters?.status) count++;
    if (filters?.dateRange === 'custom' && (filters?.startDate || filters?.endDate)) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            iconName="RotateCcw"
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
      {/* Always visible filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
        
        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          searchable
        />
        
        <Select
          label="Hazard Type"
          options={hazardTypeOptions}
          value={filters?.hazardType}
          onChange={(value) => handleFilterChange('hazardType', value)}
        />
        
        <Select
          label="Severity"
          options={severityOptions}
          value={filters?.severity}
          onChange={(value) => handleFilterChange('severity', value)}
        />
      </div>
      {/* Custom date range inputs */}
      {filters?.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          <Input
            label="Start Date"
            type="date"
            value={filters?.startDate}
            onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={filters?.endDate}
            onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
          />
        </div>
      )}
      {/* Expandable filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <Select
            label="Data Source"
            options={dataSourceOptions}
            value={filters?.dataSource}
            onChange={(value) => handleFilterChange('dataSource', value)}
          />
          
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
          
          <div className="flex items-end">
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              onClick={() => {
                // Export with current filters
                console.log('Exporting with filters:', filters);
              }}
            >
              Export Filtered Data
            </Button>
          </div>
        </div>
      )}
      {/* Quick filter chips */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-700 mr-2">Quick filters:</span>
        <button
          onClick={() => handleFilterChange('severity', 'critical')}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
        >
          <Icon name="AlertTriangle" size={12} className="mr-1" />
          Critical Only
        </button>
        <button
          onClick={() => handleFilterChange('status', 'active')}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
        >
          <Icon name="Activity" size={12} className="mr-1" />
          Active Incidents
        </button>
        <button
          onClick={() => handleFilterChange('dateRange', 'today')}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
        >
          <Icon name="Calendar" size={12} className="mr-1" />
          Today Only
        </button>
      </div>
    </div>
  );
};

export default FilterControls;