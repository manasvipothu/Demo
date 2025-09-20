import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatusFilterBar = ({ 
  statusCounts, 
  activeFilter, 
  onFilterChange, 
  selectedReports, 
  onBulkAction,
  searchQuery,
  onSearchChange 
}) => {
  const statusFilters = [
    { key: 'all', label: 'All Reports', icon: 'FileText', color: 'text-gray-600' },
    { key: 'pending', label: 'Pending', icon: 'Clock', color: 'text-yellow-600' },
    { key: 'verified', label: 'Verified', icon: 'CheckCircle', color: 'text-green-600' },
    { key: 'rejected', label: 'Rejected', icon: 'XCircle', color: 'text-red-600' },
    { key: 'escalated', label: 'Escalated', icon: 'AlertTriangle', color: 'text-purple-600' }
  ];

  const bulkActions = [
    { key: 'approve', label: 'Approve Selected', icon: 'Check', variant: 'success' },
    { key: 'reject', label: 'Reject Selected', icon: 'X', variant: 'destructive' },
    { key: 'escalate', label: 'Escalate Selected', icon: 'AlertTriangle', variant: 'warning' },
    { key: 'export', label: 'Export Selected', icon: 'Download', variant: 'outline' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-4 space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search reports by location, type, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Filter"
            iconPosition="left"
            size="sm"
          >
            Advanced Filters
          </Button>
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            size="sm"
          >
            Refresh
          </Button>
        </div>
      </div>
      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusFilters?.map((filter) => (
          <button
            key={filter?.key}
            onClick={() => onFilterChange(filter?.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter?.key
                ? 'bg-blue-100 text-blue-700 border border-blue-200' :'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Icon name={filter?.icon} size={16} className={filter?.color} />
            <span>{filter?.label}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              activeFilter === filter?.key
                ? 'bg-blue-200 text-blue-800' :'bg-gray-200 text-gray-700'
            }`}>
              {statusCounts?.[filter?.key] || 0}
            </span>
          </button>
        ))}
      </div>
      {/* Bulk Actions */}
      {selectedReports?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 text-sm text-blue-700">
            <Icon name="CheckSquare" size={16} />
            <span>{selectedReports?.length} report{selectedReports?.length > 1 ? 's' : ''} selected</span>
          </div>
          
          <div className="flex flex-wrap gap-2 ml-auto">
            {bulkActions?.map((action) => (
              <Button
                key={action?.key}
                variant={action?.variant}
                size="sm"
                iconName={action?.icon}
                iconPosition="left"
                onClick={() => onBulkAction(action?.key, selectedReports)}
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusFilterBar;