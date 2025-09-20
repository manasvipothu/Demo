import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReportDetailsPanel = ({ report, onClose, onStatusChange, onAddNote }) => {
  const [newNote, setNewNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  if (!report) return null;

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onAddNote(report?.id, newNote);
      setNewNote('');
      setShowNoteForm(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'verified': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'escalated': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">Report Details</h2>
            {report?.priority && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-full">
                <Icon name="AlertTriangle" size={12} className="mr-1" />
                Priority
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Report ID</label>
                    <p className="text-sm text-gray-900">{report?.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Timestamp</label>
                    <p className="text-sm text-gray-900">{formatDate(report?.timestamp)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Hazard Type</label>
                    <p className="text-sm text-gray-900">{report?.hazardType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Severity</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(report?.severity)}`}>
                      {report?.severity}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(report?.status)}`}>
                      {report?.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Submitter</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={16} className="text-gray-400" />
                      <p className="text-sm text-gray-900">{report?.location}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Coordinates</label>
                    <p className="text-sm text-gray-900">{report?.coordinates}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Submitted by</label>
                    <div className="flex items-center space-x-2">
                      <Image 
                        src={report?.submitter?.avatar} 
                        alt={report?.submitter?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-900">{report?.submitter?.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contact</label>
                    <p className="text-sm text-gray-900">{report?.submitter?.contact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{report?.description}</p>
              </div>
            </div>

            {/* Media Attachments */}
            {report?.media && report?.media?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Media Attachments</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {report?.media?.map((item, index) => (
                    <div key={index} className="relative group">
                      <Image 
                        src={item?.url} 
                        alt={`Evidence ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          className="opacity-0 group-hover:opacity-100 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Location Map</h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden h-64">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={report?.location}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${report?.coordinates}&z=14&output=embed`}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 border-l border-gray-200 bg-gray-50">
            {/* Action Buttons */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="success"
                  fullWidth
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => onStatusChange(report?.id, 'verified')}
                >
                  Approve Report
                </Button>
                <Button
                  variant="destructive"
                  fullWidth
                  iconName="X"
                  iconPosition="left"
                  onClick={() => onStatusChange(report?.id, 'rejected')}
                >
                  Reject Report
                </Button>
                <Button
                  variant="warning"
                  fullWidth
                  iconName="AlertTriangle"
                  iconPosition="left"
                  onClick={() => onStatusChange(report?.id, 'escalated')}
                >
                  Escalate Report
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="MessageSquare"
                  iconPosition="left"
                  onClick={() => onStatusChange(report?.id, 'request-info')}
                >
                  Request More Info
                </Button>
              </div>
            </div>

            {/* Official Notes */}
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Official Notes</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Plus"
                  onClick={() => setShowNoteForm(!showNoteForm)}
                />
              </div>

              {showNoteForm && (
                <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                  <Input
                    type="text"
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e?.target?.value)}
                    className="mb-2"
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleAddNote}
                    >
                      Add Note
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowNoteForm(false);
                        setNewNote('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {report?.notes && report?.notes?.map((note, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">{note?.author}</span>
                      <span className="text-xs text-gray-500">{formatDate(note?.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{note?.content}</p>
                  </div>
                ))}
                
                {(!report?.notes || report?.notes?.length === 0) && !showNoteForm && (
                  <p className="text-sm text-gray-500 text-center py-4">No notes added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsPanel;