import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReportTable = ({ reports, onSelectReport, selectedReport, onStatusChange, onBulkAction, selectedReports, onSelectReport: onToggleSelect }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedReports = () => {
    return [...reports]?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (sortField === 'timestamp') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'verified': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'escalated': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      onBulkAction('selectAll', reports?.map(r => r?.id));
                    } else {
                      onBulkAction('deselectAll', []);
                    }
                  }}
                />
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Timestamp</span>
                  <Icon 
                    name={sortField === 'timestamp' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center space-x-1">
                  <span>Location</span>
                  <Icon 
                    name={sortField === 'location' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('hazardType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Hazard Type</span>
                  <Icon 
                    name={sortField === 'hazardType' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('severity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Severity</span>
                  <Icon 
                    name={sortField === 'severity' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Submitter</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getSortedReports()?.map((report) => (
              <tr 
                key={report?.id}
                className={`hover:bg-gray-50 cursor-pointer ${selectedReport?.id === report?.id ? 'bg-blue-50' : ''} ${report?.priority ? 'border-l-4 border-red-500' : ''}`}
                onClick={() => onSelectReport(report)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedReports?.includes(report?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      onToggleSelect(report?.id);
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatDate(report?.timestamp)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} className="text-gray-400" />
                    <span>{report?.location}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {report?.hazardType}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(report?.severity)}`}>
                    {report?.severity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report?.status)}`}>
                    {report?.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <Image 
                      src={report?.submitter?.avatar} 
                      alt={report?.submitter?.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{report?.submitter?.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Check"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onStatusChange(report?.id, 'verified');
                      }}
                      className="text-green-600 hover:text-green-700"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onStatusChange(report?.id, 'rejected');
                      }}
                      className="text-red-600 hover:text-red-700"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MessageSquare"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onStatusChange(report?.id, 'request-info');
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {getSortedReports()?.map((report) => (
          <div 
            key={report?.id}
            className={`p-4 border-b border-gray-200 ${selectedReport?.id === report?.id ? 'bg-blue-50' : ''} ${report?.priority ? 'border-l-4 border-red-500' : ''}`}
            onClick={() => onSelectReport(report)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedReports?.includes(report?.id)}
                  onChange={(e) => {
                    e?.stopPropagation();
                    onToggleSelect(report?.id);
                  }}
                />
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(report?.severity)}`}>
                  {report?.severity}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report?.status)}`}>
                  {report?.status}
                </span>
              </div>
              <span className="text-xs text-gray-500">{formatDate(report?.timestamp)}</span>
            </div>
            
            <div className="mb-2">
              <h3 className="font-medium text-gray-900">{report?.hazardType}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Icon name="MapPin" size={14} />
                <span>{report?.location}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image 
                  src={report?.submitter?.avatar} 
                  alt={report?.submitter?.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-600">{report?.submitter?.name}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Check"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onStatusChange(report?.id, 'verified');
                  }}
                  className="text-green-600"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onStatusChange(report?.id, 'rejected');
                  }}
                  className="text-red-600"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageSquare"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onStatusChange(report?.id, 'request-info');
                  }}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportTable;