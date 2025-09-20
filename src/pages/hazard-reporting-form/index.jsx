import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import HazardTypeSelector from './components/HazardTypeSelector';
import LocationSelector from './components/LocationSelector';
import MediaUploader from './components/MediaUploader';
import SeveritySelector from './components/SeveritySelector';
import IncidentDetails from './components/IncidentDetails';
import ContactInformation from './components/ContactInformation';
import FormActions from './components/FormActions';

const HazardReportingForm = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    hazardType: '',
    location: {
      address: '',
      latitude: '',
      longitude: ''
    },
    severity: '',
    description: '',
    incidentTime: '',
    files: [],
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    },
    allowContact: false
  });

  const [errors, setErrors] = useState({});

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('hazard-report-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.hazardType) {
      newErrors.hazardType = 'Please select a hazard type';
    }

    if (!formData?.location?.address) {
      newErrors.location = 'Please provide a location';
    }

    if (!formData?.severity) {
      newErrors.severity = 'Please select severity level';
    }

    if (!formData?.description || formData?.description?.length < 20) {
      newErrors.description = 'Please provide a detailed description (minimum 20 characters)';
    }

    if (!formData?.incidentTime) {
      newErrors.incidentTime = 'Please specify when the incident occurred';
    }

    if (formData?.allowContact) {
      if (!formData?.contactInfo?.name) {
        newErrors.name = 'Name is required when allowing contact';
      }
      if (!formData?.contactInfo?.email && !formData?.contactInfo?.phone) {
        newErrors.email = 'Either email or phone is required when allowing contact';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft from localStorage
      localStorage.removeItem('hazard-report-draft');
      
      // Show success message and redirect
      alert('Report submitted successfully! Thank you for helping keep our oceans safe.');
      navigate('/report-management');
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('hazard-report-draft', JSON.stringify(formData));
      
      // Simulate API call for online draft saving
      if (isOnline) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      alert('Draft saved successfully!');
      
    } catch (error) {
      console.error('Draft save error:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      localStorage.removeItem('hazard-report-draft');
      navigate('/interactive-map-dashboard');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-deep transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Enhanced Header with Glass Effect */}
      <div className="glass border-b border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto container-mobile">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/interactive-map-dashboard')}
                className="p-2 text-slate-400 hover:text-primary transition-colors duration-200 hover:bg-slate-700/50 rounded-lg"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div className="animate-slide-up">
                <h1 className="text-lg sm:text-xl font-semibold bg-gradient-ocean bg-clip-text text-transparent">
                  Report Ocean Hazard
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Help protect our marine environment
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 animate-scale-in">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-glow' : 'bg-red-500 animate-pulse'}`} />
              <span className="text-xs text-slate-400">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content with Enhanced Mobile Layout */}
      <div className="max-w-4xl mx-auto container-mobile py-6 sm:py-8">
        <div className="glass rounded-xl border border-slate-600/50 animate-slide-up">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="space-responsive">
              {/* Enhanced Progress Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 space-y-2 sm:space-y-0">
                <span className="flex items-center">
                  <Icon name="CheckSquare" size={16} className="mr-2 text-primary" />
                  Complete all required fields to submit your report
                </span>
                <span className="flex items-center animate-bounce-gentle">
                  <Icon name="Shield" size={16} className="mr-1 text-teal-400" />
                  Secure & Anonymous
                </span>
              </div>

              {/* Form Sections with Staggered Animation */}
              <div className="space-responsive">
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <HazardTypeSelector
                    value={formData?.hazardType}
                    onChange={(value) => setFormData({ ...formData, hazardType: value })}
                    error={errors?.hazardType}
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <LocationSelector
                    location={formData?.location}
                    onLocationChange={(location) => setFormData({ ...formData, location })}
                    error={errors?.location}
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <SeveritySelector
                    value={formData?.severity}
                    onChange={(value) => setFormData({ ...formData, severity: value })}
                    error={errors?.severity}
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <IncidentDetails
                    description={formData?.description}
                    incidentTime={formData?.incidentTime}
                    onDescriptionChange={(description) => setFormData({ ...formData, description })}
                    onTimeChange={(incidentTime) => setFormData({ ...formData, incidentTime })}
                    errors={errors}
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                  <MediaUploader
                    files={formData?.files}
                    onFilesChange={(files) => setFormData({ ...formData, files })}
                    error={errors?.files}
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  <ContactInformation
                    contactInfo={formData?.contactInfo}
                    onContactChange={(contactInfo) => setFormData({ ...formData, contactInfo })}
                    allowContact={formData?.allowContact}
                    onAllowContactChange={(allowContact) => setFormData({ ...formData, allowContact })}
                    errors={errors}
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
                  <FormActions
                    onSubmit={handleSubmit}
                    onSaveDraft={handleSaveDraft}
                    onCancel={handleCancel}
                    isSubmitting={isSubmitting}
                    isSavingDraft={isSavingDraft}
                    isOnline={isOnline}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Help Section */}
        <div className="mt-6 sm:mt-8 glass rounded-xl p-4 sm:p-6 border border-teal-500/30 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Icon name="Info" size={20} className="text-teal-400 flex-shrink-0 animate-bounce-gentle" />
            <div>
              <h3 className="text-sm font-medium bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                Reporting Guidelines
              </h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1 sm:space-y-2">
                {[
                  'Be as specific as possible in your description',
                  'Include photos or videos if available',
                  'Provide accurate location information',
                  'Report immediately for critical hazards',
                  'Your report helps protect marine life and coastal communities'
                ]?.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-1 h-1 bg-teal-400 rounded-full mr-2 animate-pulse" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardReportingForm;