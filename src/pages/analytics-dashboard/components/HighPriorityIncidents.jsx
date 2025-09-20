import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HighPriorityIncidents = () => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');

  const incidents = [
    {
      id: 'INC-2024-001',
      type: 'Oil Spill',
      location: 'Mumbai Harbor, Maharashtra',
      severity: 'Critical',
      timestamp: new Date('2024-09-17T14:30:00'),
      reporter: 'Coast Guard Station',
      status: 'Active',
      responseTeam: 'Team Alpha',
      coordinates: '19.0760, 72.8777'
    },
    {
      id: 'INC-2024-002',
      type: 'Severe Storm',
      location: 'Visakhapatnam Port, Andhra Pradesh',
      severity: 'High',
      timestamp: new Date('2024-09-17T12:15:00'),
      reporter: 'Port Authority',
      status: 'Investigating',
      responseTeam: 'Team Beta',
      coordinates: '17.6868, 83.2185'
    },
    {
      id: 'INC-2024-003',
      type: 'Marine Debris',
      location: 'Kochi Backwaters, Kerala',
      severity: 'High',
      timestamp: new Date('2024-09-17T10:45:00'),
      reporter: 'Local Fisherman',
      status: 'Resolved',
      responseTeam: 'Team Gamma',
      coordinates: '9.9312, 76.2673'
    },
    {
      id: 'INC-2024-004',
      type: 'Toxic Algae Bloom',
      location: 'Chennai Marina, Tamil Nadu',
      severity: 'Critical',
      timestamp: new Date('2024-09-17T08:20:00'),
      reporter: 'Environmental Monitor',
      status: 'Active',
      responseTeam: 'Team Delta',
      coordinates: '13.0827, 80.2707'
    },
    {
      id: 'INC-2024-005',
      type: 'Vessel Collision',
      location: 'Goa Beaches, Goa',
      severity: 'High',
      timestamp: new Date('2024-09-16T22:30:00'),
      reporter: 'Tourist',
      status: 'Under Review',
      responseTeam: 'Team Echo',
      coordinates: '15.2993, 74.1240'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Investigating': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    }
    return `${minutes}m ago`;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">High Priority Incidents</h3>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-blue-600"
                >
                  <span>Incident ID</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 hover:text-blue-600"
                >
                  <span>Type</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                <button
                  onClick={() => handleSort('severity')}
                  className="flex items-center space-x-1 hover:text-blue-600"
                >
                  <span>Severity</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 hover:text-blue-600"
                >
                  <span>Time</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents?.map((incident) => (
              <tr key={incident?.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className="font-mono text-sm text-blue-600">{incident?.id}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">{incident?.type}</span>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className="text-sm text-gray-900">{incident?.location}</div>
                    <div className="text-xs text-gray-500 font-mono">{incident?.coordinates}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(incident?.severity)}`}>
                    {incident?.severity}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-900">{formatTimestamp(incident?.timestamp)}</div>
                  <div className="text-xs text-gray-500">{incident?.reporter}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(incident?.status)}`}>
                    {incident?.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MapPin">
                      Map
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {incidents?.map((incident) => (
          <div key={incident?.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="font-mono text-sm text-blue-600">{incident?.id}</span>
                <h4 className="font-medium text-gray-900">{incident?.type}</h4>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(incident?.severity)}`}>
                {incident?.severity}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600">{incident?.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600">{formatTimestamp(incident?.timestamp)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600">{incident?.reporter}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(incident?.status)}`}>
                {incident?.status}
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Eye">
                  View
                </Button>
                <Button variant="ghost" size="sm" iconName="MapPin">
                  Map
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighPriorityIncidents;