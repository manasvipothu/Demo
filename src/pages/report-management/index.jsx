import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import StatusFilterBar from './components/StatusFilterBar';
import ReportTable from './components/ReportTable';
import ReportDetailsPanel from './components/ReportDetailsPanel';
import Icon from '../../components/AppIcon';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedReports, setSelectedReports] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusCounts, setStatusCounts] = useState({});

  // Mock data for reports
  const mockReports = [
    {
      id: "RPT-2024-001",
      timestamp: "2024-09-17T14:30:00Z",
      location: "Marina Beach, Chennai",
      coordinates: "13.0827,80.2707",
      hazardType: "Oil Spill",
      severity: "Critical",
      status: "Pending",
      priority: true,
      submitter: {
        name: "Rajesh Kumar",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        contact: "+91 9876543210"
      },
      description: `Observed a significant oil spill approximately 200 meters from the shore near Marina Beach. The spill appears to be spreading rapidly with the current tide.\n\nEstimated affected area: 500 square meters\nVisible wildlife impact: Several seabirds affected\nWind direction: Southwest\nTide condition: High tide approaching`,
      media: [
        { url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400", type: "image" },
        { url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400", type: "image" }
      ],
      notes: [
        {
          author: "Coast Guard Officer",
          timestamp: "2024-09-17T15:00:00Z",
          content: "Initial assessment completed. Deploying containment booms immediately."
        }
      ]
    },
    {
      id: "RPT-2024-002",
      timestamp: "2024-09-17T12:15:00Z",
      location: "Kovalam Beach, Kerala",
      coordinates: "8.4004,76.9784",
      hazardType: "Rip Current",
      severity: "High",
      status: "Verified",
      priority: false,
      submitter: {
        name: "Priya Nair",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        contact: "+91 9876543211"
      },
      description: `Strong rip current observed at the northern section of Kovalam Beach. Multiple swimmers had to be assisted by lifeguards.\n\nCurrent strength: Very strong\nAffected area: 100-meter stretch\nVisibility: Clear water, current visible from surface\nWeather conditions: Moderate winds, partly cloudy`,
      media: [
        { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400", type: "image" }
      ],
      notes: [
        {
          author: "Beach Safety Officer",
          timestamp: "2024-09-17T12:45:00Z",
          content: "Warning signs posted. Lifeguard patrol increased in the area."
        },
        {
          author: "Marine Biologist",
          timestamp: "2024-09-17T13:30:00Z",
          content: "Current patterns consistent with seasonal changes. Monitoring continues."
        }
      ]
    },
    {
      id: "RPT-2024-003",
      timestamp: "2024-09-17T10:45:00Z",
      location: "Goa Beach, Panaji",
      coordinates: "15.2993,74.1240",
      hazardType: "Jellyfish Swarm",
      severity: "Medium",
      status: "Escalated",
      priority: false,
      submitter: {
        name: "Carlos D\'Souza",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        contact: "+91 9876543212"
      },
      description: `Large swarm of jellyfish spotted near the popular swimming area. Several tourists reported stings.\n\nSpecies: Appears to be Moon Jellyfish\nSwarm size: Approximately 200-300 individuals\nMovement: Moving towards shore with incoming tide\nStings reported: 5 minor cases treated by beach medics`,
      media: [
        { url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400", type: "image" },
        { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400", type: "image" }
      ],
      notes: [
        {
          author: "Marine Biologist",
          timestamp: "2024-09-17T11:15:00Z",
          content: "Species identified as Aurelia aurita. Generally harmless but can cause mild irritation."
        }
      ]
    },
    {
      id: "RPT-2024-004",
      timestamp: "2024-09-17T08:20:00Z",
      location: "Puri Beach, Odisha",
      coordinates: "19.8135,85.8312",
      hazardType: "Debris Accumulation",
      severity: "Low",
      status: "Rejected",
      priority: false,
      submitter: {
        name: "Anita Patel",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        contact: "+91 9876543213"
      },
      description: `Significant amount of plastic debris washed ashore overnight. Affecting beach aesthetics and potentially harmful to marine life.\n\nDebris type: Mostly plastic bottles, bags, and fishing nets\nAffected length: Approximately 2 kilometers\nSource: Likely from recent storm activity\nCleanup required: Yes, immediate action needed`,
      media: [
        { url: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400", type: "image" }
      ],
      notes: [
        {
          author: "Environmental Officer",
          timestamp: "2024-09-17T09:00:00Z",
          content: "Regular debris accumulation. Scheduled cleanup already in progress."
        }
      ]
    },
    {
      id: "RPT-2024-005",
      timestamp: "2024-09-16T16:30:00Z",
      location: "Digha Beach, West Bengal",
      coordinates: "21.6279,87.5519",
      hazardType: "Shark Sighting",
      severity: "High",
      status: "Pending",
      priority: true,
      submitter: {
        name: "Suresh Mondal",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        contact: "+91 9876543214"
      },
      description: `Large shark spotted approximately 300 meters from shore. Species appears to be a Bull Shark based on size and behavior.\n\nEstimated size: 8-10 feet\nBehavior: Circling pattern, not aggressive\nWater depth: Approximately 15 feet\nVisibility: Good, clear identification possible\nSwimmers evacuated as precaution`,
      media: [
        { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400", type: "image" }
      ],
      notes: []
    },
    {
      id: "RPT-2024-006",
      timestamp: "2024-09-16T14:15:00Z",
      location: "Varkala Beach, Kerala",
      coordinates: "8.7379,76.7160",
      hazardType: "Algae Bloom",
      severity: "Medium",
      status: "Verified",
      priority: false,
      submitter: {
        name: "Dr. Lakshmi Menon",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        contact: "+91 9876543215"
      },
      description: `Red algae bloom observed covering approximately 1 square kilometer of water surface. Water discoloration and strong odor present.\n\nBloom type: Red algae (suspected Noctiluca scintillans)\nWater color: Reddish-brown\nOdor: Strong fishy smell\nMarine life impact: Dead fish observed floating\nSwimming advisory: Not recommended`,
      media: [
        { url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400", type: "image" },
        { url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400", type: "image" }
      ],
      notes: [
        {
          author: "Marine Biologist",
          timestamp: "2024-09-16T15:00:00Z",
          content: "Water samples collected for laboratory analysis. Bloom expected to dissipate within 3-5 days."
        }
      ]
    }
  ];

  useEffect(() => {
    setReports(mockReports);
    setFilteredReports(mockReports);
    calculateStatusCounts(mockReports);
  }, []);

  useEffect(() => {
    filterReports();
  }, [activeFilter, searchQuery, reports]);

  const calculateStatusCounts = (reportsList) => {
    const counts = {
      all: reportsList?.length,
      pending: reportsList?.filter(r => r?.status?.toLowerCase() === 'pending')?.length,
      verified: reportsList?.filter(r => r?.status?.toLowerCase() === 'verified')?.length,
      rejected: reportsList?.filter(r => r?.status?.toLowerCase() === 'rejected')?.length,
      escalated: reportsList?.filter(r => r?.status?.toLowerCase() === 'escalated')?.length
    };
    setStatusCounts(counts);
  };

  const filterReports = () => {
    let filtered = [...reports];

    // Filter by status
    if (activeFilter !== 'all') {
      filtered = filtered?.filter(report => 
        report?.status?.toLowerCase() === activeFilter?.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(report =>
        report?.location?.toLowerCase()?.includes(query) ||
        report?.hazardType?.toLowerCase()?.includes(query) ||
        report?.description?.toLowerCase()?.includes(query) ||
        report?.submitter?.name?.toLowerCase()?.includes(query)
      );
    }

    setFilteredReports(filtered);
  };

  const handleStatusChange = (reportId, newStatus) => {
    setReports(prevReports => {
      const updatedReports = prevReports?.map(report => {
        if (report?.id === reportId) {
          return { ...report, status: newStatus === 'request-info' ? 'Pending' : newStatus?.charAt(0)?.toUpperCase() + newStatus?.slice(1) };
        }
        return report;
      });
      calculateStatusCounts(updatedReports);
      return updatedReports;
    });

    // Close details panel if the current report was updated
    if (selectedReport?.id === reportId) {
      setSelectedReport(prev => ({
        ...prev,
        status: newStatus === 'request-info' ? 'Pending' : newStatus?.charAt(0)?.toUpperCase() + newStatus?.slice(1)
      }));
    }
  };

  const handleBulkAction = (action, reportIds) => {
    switch (action) {
      case 'selectAll':
        setSelectedReports(reportIds);
        break;
      case 'deselectAll':
        setSelectedReports([]);
        break;
      case 'approve':
        reportIds?.forEach(id => handleStatusChange(id, 'verified'));
        setSelectedReports([]);
        break;
      case 'reject':
        reportIds?.forEach(id => handleStatusChange(id, 'rejected'));
        setSelectedReports([]);
        break;
      case 'escalate':
        reportIds?.forEach(id => handleStatusChange(id, 'escalated'));
        setSelectedReports([]);
        break;
      case 'export':
        // Mock export functionality
        console.log('Exporting reports:', reportIds);
        break;
      default:
        break;
    }
  };

  const handleSelectReport = (reportId) => {
    if (selectedReports?.includes(reportId)) {
      setSelectedReports(prev => prev?.filter(id => id !== reportId));
    } else {
      setSelectedReports(prev => [...prev, reportId]);
    }
  };

  const handleAddNote = (reportId, noteContent) => {
    const newNote = {
      author: "Current User",
      timestamp: new Date()?.toISOString(),
      content: noteContent
    };

    setReports(prevReports => 
      prevReports?.map(report => {
        if (report?.id === reportId) {
          return {
            ...report,
            notes: [...(report?.notes || []), newNote]
          };
        }
        return report;
      })
    );

    // Update selected report if it's the same one
    if (selectedReport?.id === reportId) {
      setSelectedReport(prev => ({
        ...prev,
        notes: [...(prev?.notes || []), newNote]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Report Management</h1>
          </div>
          <p className="text-gray-600">
            Review, verify, and moderate citizen-submitted hazard reports through comprehensive administrative workflows.
          </p>
        </div>

        {/* Status Filter Bar */}
        <StatusFilterBar
          statusCounts={statusCounts}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          selectedReports={selectedReports}
          onBulkAction={handleBulkAction}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Reports Table */}
        <div className="mt-6">
          <ReportTable
            reports={filteredReports}
            onSelectReport={setSelectedReport}
            selectedReport={selectedReport}
            onStatusChange={handleStatusChange}
            onBulkAction={handleBulkAction}
            selectedReports={selectedReports}
            onToggleSelect={handleSelectReport}
          />
        </div>

        {/* Empty State */}
        {filteredReports?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search criteria' : 'No reports match the selected filter'}
            </p>
          </div>
        )}
      </div>
      {/* Report Details Panel */}
      {selectedReport && (
        <ReportDetailsPanel
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onStatusChange={handleStatusChange}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
};

export default ReportManagement;