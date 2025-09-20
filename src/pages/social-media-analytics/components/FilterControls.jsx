import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ filters, onFilterChange, onExport, onReset }) => {
  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' }
  ];

  const sentimentOptions = [
    { value: 'all', label: 'All Sentiments' },
    { value: 'positive', label: 'Positive' },
    { value: 'negative', label: 'Negative' },
    { value: 'neutral', label: 'Neutral' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai Coast' },
    { value: 'goa', label: 'Goa Beaches' },
    { value: 'kerala', label: 'Kerala Backwaters' },
    { value: 'chennai', label: 'Chennai Marina' },
    { value: 'kolkata', label: 'Kolkata Port' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 lg:mb-0">
          Social Media Analytics
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export Data
          </Button>
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onReset}
          >
            Reset Filters
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Platform Filter */}
        <div>
          <Select
            label="Platform"
            options={platformOptions}
            value={filters?.platform}
            onChange={(value) => onFilterChange('platform', value)}
            className="w-full"
          />
        </div>

        {/* Sentiment Filter */}
        <div>
          <Select
            label="Sentiment"
            options={sentimentOptions}
            value={filters?.sentiment}
            onChange={(value) => onFilterChange('sentiment', value)}
            className="w-full"
          />
        </div>

        {/* Location Filter */}
        <div>
          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => onFilterChange('location', value)}
            className="w-full"
          />
        </div>

        {/* Time Range Filter */}
        <div>
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={filters?.timeRange}
            onChange={(value) => onFilterChange('timeRange', value)}
            className="w-full"
          />
        </div>

        {/* Keyword Search */}
        <div>
          <Input
            label="Keywords"
            type="text"
            placeholder="Search keywords..."
            value={filters?.keywords}
            onChange={(e) => onFilterChange('keywords', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Minimum Engagement */}
        <div>
          <Input
            label="Min Engagement"
            type="number"
            placeholder="0"
            value={filters?.minEngagement}
            onChange={(e) => onFilterChange('minEngagement', e?.target?.value)}
            className="w-full"
          />
        </div>
      </div>
      {/* Custom Date Range */}
      {filters?.timeRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div>
            <Input
              label="Start Date"
              type="datetime-local"
              value={filters?.startDate}
              onChange={(e) => onFilterChange('startDate', e?.target?.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              label="End Date"
              type="datetime-local"
              value={filters?.endDate}
              onChange={(e) => onFilterChange('endDate', e?.target?.value)}
              className="w-full"
            />
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {(filters?.platform !== 'all' || filters?.sentiment !== 'all' || filters?.location !== 'all' || filters?.keywords) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {filters?.platform !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                Platform: {filters?.platform}
                <button
                  onClick={() => onFilterChange('platform', 'all')}
                  className="ml-1 hover:text-blue-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.sentiment !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-50 text-green-700">
                Sentiment: {filters?.sentiment}
                <button
                  onClick={() => onFilterChange('sentiment', 'all')}
                  className="ml-1 hover:text-green-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.location !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-50 text-purple-700">
                Location: {filters?.location}
                <button
                  onClick={() => onFilterChange('location', 'all')}
                  className="ml-1 hover:text-purple-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.keywords && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-50 text-orange-700">
                Keywords: {filters?.keywords}
                <button
                  onClick={() => onFilterChange('keywords', '')}
                  className="ml-1 hover:text-orange-900"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;