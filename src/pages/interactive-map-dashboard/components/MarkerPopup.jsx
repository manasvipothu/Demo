import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarkerPopup = ({ report, onClose, onViewDetails, onNavigate }) => {
  if (!report) return null;

  const getHazardIcon = (type) => {
    switch (type) {
      case 'oil-spill': return 'Droplets';
      case 'debris': return 'Trash2';
      case 'algae-bloom': return 'Waves';
      case 'chemical-discharge': return 'Zap';
      case 'wildlife-distress': return 'Fish';
      case 'water-pollution': return 'AlertTriangle';
      default: return 'MapPin';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case 'citizen': return { icon: 'User', label: 'Citizen Report', color: 'bg-blue-100 text-blue-800' };
      case 'social-media': return { icon: 'MessageSquare', label: 'Social Media', color: 'bg-purple-100 text-purple-800' };
      case 'official': return { icon: 'Shield', label: 'Official Source', color: 'bg-green-100 text-green-800' };
      default: return { icon: 'Info', label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sourceBadge = getSourceBadge(report?.source);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 max-w-sm">
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-gray-100">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2 rounded-lg ${getSeverityColor(report?.severity)}`}>
              <Icon name={getHazardIcon(report?.type)} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {report?.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${sourceBadge?.color}`}>
                  <Icon name={sourceBadge?.icon} size={12} />
                  {sourceBadge?.label}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="flex-shrink-0 -mt-1 -mr-1"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Severity Badge */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(report?.severity)}`}>
              <div className={`w-2 h-2 rounded-full mr-1 ${
                report?.severity === 'high' ? 'bg-red-500' :
                report?.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
              {report?.severity} Priority
            </span>
            <span className="text-xs text-gray-500">
              {formatTimestamp(report?.timestamp)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {report?.description}
          </p>

          {/* Reporter Info */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Icon name="User" size={12} />
            <span>Reported by {report?.reportedBy}</span>
          </div>

          {/* Location Info */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Icon name="MapPin" size={12} />
            <span>Lat: {report?.lat?.toFixed(4)}, Lng: {report?.lng?.toFixed(4)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(report)}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onNavigate(report)}
            className="flex-1"
            iconName="Navigation"
            iconPosition="left"
          >
            Navigate
          </Button>
        </div>

        {/* Popup Arrow */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default MarkerPopup;