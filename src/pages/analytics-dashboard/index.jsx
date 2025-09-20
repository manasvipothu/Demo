import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import HazardFrequencyChart from './components/HazardFrequencyChart';
import GeographicHeatmap from './components/GeographicHeatmap';
import SeverityBreakdown from './components/SeverityBreakdown';
import HighPriorityIncidents from './components/HighPriorityIncidents';
import FilterControls from './components/FilterControls';
import ExportModal from './components/ExportModal';

const AnalyticsDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [filters, setFilters] = useState({});
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock KPI data with enhanced styling
  const kpiData = [
    {
      title: 'Total Reports',
      value: '1,469',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'FileText',
      trend: true,
      gradient: 'bg-gradient-ocean',
      glowClass: 'shadow-glow'
    },
    {
      title: 'Active Hazards',
      value: '23',
      change: '-8.2%',
      changeType: 'positive',
      icon: 'AlertTriangle',
      trend: true,
      gradient: 'bg-gradient-sunset',
      glowClass: 'shadow-glow-orange'
    },
    {
      title: 'Avg Response Time',
      value: '45m',
      change: '-15.3%',
      changeType: 'positive',
      icon: 'Clock',
      trend: true,
      gradient: 'bg-gradient-to-br from-teal-500 to-green-500',
      glowClass: 'shadow-glow-teal'
    },
    {
      title: 'Resolution Rate',
      value: '87.4%',
      change: '+3.1%',
      changeType: 'positive',
      icon: 'CheckCircle',
      trend: true,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
      glowClass: 'shadow-glow'
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  const handleExport = (exportConfig) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Exporting with config:', exportConfig);
      // In a real app, this would trigger the actual export
    }, 2000);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1500);
  };

  const formatLastUpdated = (date) => {
    return date?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-deep transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Enhanced Header with Glass Effect */}
      <div className="glass border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Link 
                to="/interactive-map-dashboard" 
                className="text-slate-400 hover:text-primary transition-colors duration-200 p-2 hover:bg-slate-700/50 rounded-lg"
              >
                <Icon name="ArrowLeft" size={20} />
              </Link>
              <div className="animate-slide-up">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Comprehensive trend analysis and maritime safety insights
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
              <div className="text-xs sm:text-sm text-slate-400">
                Last updated: {formatLastUpdated(lastUpdated)}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshData}
                  loading={isLoading}
                  iconName="RefreshCw"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                >
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsExportModalOpen(true)}
                  iconName="Download"
                  className="bg-gradient-ocean hover:shadow-glow transition-all duration-200"
                >
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced Navigation with Mobile-First Design */}
      <div className="glass border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto container-mobile">
          <nav className="flex flex-wrap items-center gap-2 sm:gap-4 py-3 sm:py-4">
            {[
              { to: "/hazard-reporting-form", icon: "Plus", label: "Report", color: "text-orange-400" },
              { to: "/interactive-map-dashboard", icon: "Map", label: "Map View", color: "text-teal-400" },
              { to: "/social-media-analytics", icon: "MessageSquare", label: "Social", color: "text-purple-400" },
              { icon: "BarChart3", label: "Analytics", color: "text-primary", active: true },
              { to: "/report-management", icon: "FileText", label: "Reports", color: "text-green-400" },
              { to: "/user-profile-settings", icon: "Settings", label: "Settings", color: "text-slate-400" }
            ]?.map((item, index) => (
              item?.active ? (
                <span 
                  key={index}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-primary/20 border border-primary/30 ${item?.color} font-medium text-xs sm:text-sm animate-scale-in`}
                >
                  <Icon name={item?.icon} size={14} />
                  <span>{item?.label}</span>
                </span>
              ) : (
                <Link
                  key={index}
                  to={item?.to}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg ${item?.color} hover:bg-slate-700/50 transition-all duration-200 text-xs sm:text-sm hover:scale-105`}
                >
                  <Icon name={item?.icon} size={14} />
                  <span>{item?.label}</span>
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content with Enhanced Mobile Layout */}
      <div className="max-w-7xl mx-auto container-mobile py-6 sm:py-8 space-responsive">
        {/* Filter Controls */}
        <div className="animate-slide-up">
          <FilterControls onFiltersChange={handleFiltersChange} />
        </div>

        {/* Enhanced KPI Cards with Staggered Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {kpiData?.map((kpi, index) => (
            <div 
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <KPICard
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                trend={kpi?.trend}
                gradient={kpi?.gradient}
                glowClass={kpi?.glowClass}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <HazardFrequencyChart data={[]} timeRange="Last 9 months" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <SeverityBreakdown />
          </div>
        </div>

        {/* Geographic Analysis */}
        <div className="mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <GeographicHeatmap />
        </div>

        {/* High Priority Incidents */}
        <div className="mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <HighPriorityIncidents />
        </div>

        {/* Enhanced Comparative Analysis Section */}
        <div className="glass rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6 bg-gradient-ocean bg-clip-text text-transparent">
            Period Comparison
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: '+23%', label: 'vs Previous Month', sublabel: 'Report Volume', color: 'from-blue-500 to-cyan-500' },
              { value: '-15%', label: 'vs Previous Month', sublabel: 'Response Time', color: 'from-green-500 to-teal-500' },
              { value: '+8%', label: 'vs Previous Month', sublabel: 'Resolution Rate', color: 'from-orange-500 to-yellow-500' }
            ]?.map((item, index) => (
              <div key={index} className={`text-center p-4 bg-gradient-to-br ${item?.color} rounded-lg animate-float`}>
                <div className="text-xl sm:text-2xl font-bold text-white">{item?.value}</div>
                <div className="text-sm text-white/80">{item?.label}</div>
                <div className="text-xs text-white/60 mt-1">{item?.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Forecasting Section */}
        <div className="glass rounded-lg p-4 sm:p-6 animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-100 bg-gradient-sunset bg-clip-text text-transparent">
              Forecasting Indicators
            </h3>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
              <Icon name="TrendingUp" size={16} />
              <span>Based on 90-day trends</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: 'Storm Season', risk: 'High Risk', period: 'Next 30 days', icon: 'CloudRain', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
              { title: 'Pollution Events', risk: 'Moderate', period: 'Next 30 days', icon: 'Droplets', color: 'text-red-400', bgColor: 'bg-red-500/20' },
              { title: 'Marine Traffic', risk: 'Peak Period', period: 'Next 14 days', icon: 'Ship', color: 'text-green-400', bgColor: 'bg-green-500/20' },
              { title: 'Response Capacity', risk: '85% Utilized', period: 'Current status', icon: 'Users', color: 'text-orange-400', bgColor: 'bg-orange-500/20' }
            ]?.map((item, index) => (
              <div key={index} className={`p-4 glass rounded-lg border border-slate-600/50 hover:${item?.bgColor} transition-all duration-300 hover:scale-105 animate-bounce-gentle`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">{item?.title}</span>
                  <Icon name={item?.icon} size={16} className={item?.color} />
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-100">{item?.risk}</div>
                <div className="text-xs text-slate-400">{item?.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
      {/* Enhanced Footer */}
      <footer className="glass border-t border-slate-700/50 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto container-mobile py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 animate-float">
                <Icon name="Waves" size={24} className="text-primary" />
                <span className="text-lg sm:text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">Oceansaathi</span>
              </div>
              <span className="text-slate-400 text-sm">Analytics Dashboard</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              © {new Date()?.getFullYear()} Oceansaathi. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnalyticsDashboard;