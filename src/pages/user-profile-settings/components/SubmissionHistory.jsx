import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SubmissionHistory = ({ reports, onViewReport }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const statusOptions = [
    { value: 'all', label: 'All Reports' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'verified', label: 'Verified' },
    { value: 'investigating', label: 'Under Investigation' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'status', label: 'By Status' },
    { value: 'type', label: 'By Hazard Type' }
  ];

  const mockReports = [
    {
      id: 'RPT-2024-001',
      title: 'Oil Spill Near Juhu Beach',
      type: 'Oil Spill',
      status: 'investigating',
      submittedAt: '2024-09-15T10:30:00Z',
      location: 'Juhu Beach, Mumbai',
      description: 'Large oil spill observed near the shoreline affecting marine life and beach area.',
      photos: ['https://images.pexels.com/photos/3800471/pexels-photo-3800471.jpeg'],
      priority: 'high',
      views: 245,
      likes: 12
    },
    {
      id: 'RPT-2024-002', 
      title: 'Plastic Debris Accumulation',
      type: 'Marine Debris',
      status: 'verified',
      submittedAt: '2024-09-12T14:15:00Z',
      location: 'Versova Beach, Mumbai',
      description: 'Significant accumulation of plastic waste and debris along the coastline.',
      photos: ['https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg'],
      priority: 'medium',
      views: 189,
      likes: 8
    },
    {
      id: 'RPT-2024-003',
      title: 'Unusual Marine Life Behavior',
      type: 'Marine Life',
      status: 'resolved',
      submittedAt: '2024-09-10T09:45:00Z',
      location: 'Gateway of India, Mumbai',
      description: 'Large school of fish behaving unusually near the harbor area.',
      photos: ['https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg'],
      priority: 'low',
      views: 156,
      likes: 15
    },
    {
      id: 'RPT-2024-004',
      title: 'Coastal Erosion Alert',
      type: 'Coastal Erosion',
      status: 'pending',
      submittedAt: '2024-09-08T16:20:00Z',
      location: 'Alibaug Beach, Raigad',
      description: 'Rapid coastal erosion observed after recent storms affecting local infrastructure.',
      photos: ['https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg'],
      priority: 'high',
      views: 98,
      likes: 6
    },
    {
      id: 'RPT-2024-005',
      title: 'Water Quality Concern',
      type: 'Pollution',
      status: 'rejected',
      submittedAt: '2024-09-05T11:10:00Z',
      location: 'Chowpatty Beach, Mumbai',
      description: 'Discolored water and unusual odor reported by multiple beachgoers.',
      photos: [],
      priority: 'medium',
      views: 67,
      likes: 3
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      verified: 'bg-green-100 text-green-800 border-green-200',
      investigating: 'bg-blue-100 text-blue-800 border-blue-200',
      resolved: 'bg-gray-100 text-gray-800 border-gray-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: { name: 'AlertTriangle', color: 'text-red-600' },
      medium: { name: 'AlertCircle', color: 'text-yellow-600' },
      low: { name: 'Info', color: 'text-blue-600' }
    };
    return icons?.[priority] || icons?.low;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReports = mockReports?.filter(report => 
    filterStatus === 'all' || report?.status === filterStatus
  );

  const sortedReports = [...filteredReports]?.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.submittedAt) - new Date(b.submittedAt);
      case 'status':
        return a?.status?.localeCompare(b?.status);
      case 'type':
        return a?.type?.localeCompare(b?.type);
      default: // newest
        return new Date(b.submittedAt) - new Date(a.submittedAt);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="FileText" size={24} className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Submission History</h2>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="FileText" size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Total Reports</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">{mockReports?.length}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={20} className="text-green-600" />
            <span className="text-sm font-medium text-green-900">Verified</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-1">
            {mockReports?.filter(r => r?.status === 'verified')?.length}
          </p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={20} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-900">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900 mt-1">
            {mockReports?.filter(r => r?.status === 'pending')?.length}
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="Eye" size={20} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Total Views</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-1">
            {mockReports?.reduce((sum, r) => sum + r?.views, 0)}
          </p>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select
          label="Filter by Status"
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
          className="sm:w-48"
        />
        
        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          className="sm:w-48"
        />
      </div>
      {/* Reports List */}
      <div className="space-y-4">
        {sortedReports?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileX" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">No reports match your current filter criteria.</p>
          </div>
        ) : (
          sortedReports?.map((report) => (
            <div key={report?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Report Image */}
                <div className="lg:w-32 lg:h-24 w-full h-48 flex-shrink-0">
                  {report?.photos?.length > 0 ? (
                    <Image
                      src={report?.photos?.[0]}
                      alt={report?.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon name="ImageOff" size={24} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Report Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{report?.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{report?.id}</span>
                        <span>•</span>
                        <span>{report?.type}</span>
                        <span>•</span>
                        <span>{formatDate(report?.submittedAt)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 text-xs font-medium border rounded-full ${getStatusColor(report?.status)}`}>
                        {report?.status?.charAt(0)?.toUpperCase() + report?.status?.slice(1)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon 
                          name={getPriorityIcon(report?.priority)?.name} 
                          size={16} 
                          className={getPriorityIcon(report?.priority)?.color} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mb-3">
                    <Icon name="MapPin" size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{report?.location}</span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{report?.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        <span>{report?.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Heart" size={16} />
                        <span>{report?.likes}</span>
                      </div>
                      {report?.photos?.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Icon name="Camera" size={16} />
                          <span>{report?.photos?.length}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="right"
                      onClick={() => onViewReport(report?.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Load More */}
      {sortedReports?.length > 0 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More Reports
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;