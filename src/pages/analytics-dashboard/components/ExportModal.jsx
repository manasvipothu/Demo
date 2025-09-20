import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: 'current',
    includeCharts: false,
    includeRawData: true,
    includeAnalytics: true,
    includeMaps: false,
    customFields: []
  });

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated)' },
    { value: 'xlsx', label: 'Excel Spreadsheet' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' }
  ];

  const dateRangeOptions = [
    { value: 'current', label: 'Current Filter Range' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'all', label: 'All Available Data' }
  ];

  const availableFields = [
    { id: 'incident_id', label: 'Incident ID', checked: true },
    { id: 'timestamp', label: 'Timestamp', checked: true },
    { id: 'location', label: 'Location', checked: true },
    { id: 'coordinates', label: 'GPS Coordinates', checked: false },
    { id: 'hazard_type', label: 'Hazard Type', checked: true },
    { id: 'severity', label: 'Severity Level', checked: true },
    { id: 'status', label: 'Current Status', checked: true },
    { id: 'reporter', label: 'Reporter Information', checked: false },
    { id: 'response_team', label: 'Response Team', checked: false },
    { id: 'description', label: 'Description', checked: false },
    { id: 'media_urls', label: 'Media URLs', checked: false },
    { id: 'social_sentiment', label: 'Social Media Sentiment', checked: false }
  ];

  const [selectedFields, setSelectedFields] = useState(
    availableFields?.filter(field => field?.checked)?.map(field => field?.id)
  );

  const handleFieldToggle = (fieldId) => {
    setSelectedFields(prev => 
      prev?.includes(fieldId) 
        ? prev?.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleExport = () => {
    const config = {
      ...exportConfig,
      customFields: selectedFields
    };
    onExport?.(config);
    onClose();
  };

  const getEstimatedSize = () => {
    const baseSize = selectedFields?.length * 0.5; // KB per field per record
    const recordCount = 1469; // Mock total records
    const estimated = (baseSize * recordCount) / 1024; // Convert to MB
    return estimated > 1 ? `${estimated?.toFixed(1)} MB` : `${(estimated * 1024)?.toFixed(0)} KB`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Export Analytics Data</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              description="Choose the format for your exported data"
              options={formatOptions}
              value={exportConfig?.format}
              onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
            />
          </div>

          {/* Date Range */}
          <div>
            <Select
              label="Date Range"
              description="Select the time period for data export"
              options={dateRangeOptions}
              value={exportConfig?.dateRange}
              onChange={(value) => setExportConfig(prev => ({ ...prev, dateRange: value }))}
            />
          </div>

          {/* Export Options */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Export Options</h3>
            <div className="space-y-3">
              <Checkbox
                label="Include Raw Data"
                description="Export all incident records and details"
                checked={exportConfig?.includeRawData}
                onChange={(e) => setExportConfig(prev => ({ ...prev, includeRawData: e?.target?.checked }))}
              />
              
              <Checkbox
                label="Include Analytics Summary"
                description="Export calculated metrics and trends"
                checked={exportConfig?.includeAnalytics}
                onChange={(e) => setExportConfig(prev => ({ ...prev, includeAnalytics: e?.target?.checked }))}
              />
              
              {exportConfig?.format === 'pdf' && (
                <>
                  <Checkbox
                    label="Include Charts and Graphs"
                    description="Embed visualizations in the report"
                    checked={exportConfig?.includeCharts}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, includeCharts: e?.target?.checked }))}
                  />
                  
                  <Checkbox
                    label="Include Maps"
                    description="Embed geographic visualizations"
                    checked={exportConfig?.includeMaps}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, includeMaps: e?.target?.checked }))}
                  />
                </>
              )}
            </div>
          </div>

          {/* Field Selection */}
          {exportConfig?.includeRawData && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Data Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {availableFields?.map((field) => (
                  <Checkbox
                    key={field?.id}
                    label={field?.label}
                    checked={selectedFields?.includes(field?.id)}
                    onChange={() => handleFieldToggle(field?.id)}
                    size="sm"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {selectedFields?.length} of {availableFields?.length} fields selected
              </p>
            </div>
          )}

          {/* Export Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Export Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Format:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {formatOptions?.find(opt => opt?.value === exportConfig?.format)?.label}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Estimated Size:</span>
                <span className="ml-2 font-medium text-gray-900">{getEstimatedSize()}</span>
              </div>
              <div>
                <span className="text-gray-600">Records:</span>
                <span className="ml-2 font-medium text-gray-900">~1,469 incidents</span>
              </div>
              <div>
                <span className="text-gray-600">Fields:</span>
                <span className="ml-2 font-medium text-gray-900">{selectedFields?.length} selected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleExport}
            iconName="Download"
            disabled={!exportConfig?.includeRawData && !exportConfig?.includeAnalytics}
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;