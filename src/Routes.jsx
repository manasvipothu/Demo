import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SocialMediaAnalytics from './pages/social-media-analytics';
import AnalyticsDashboard from './pages/analytics-dashboard';
import HazardReportingForm from './pages/hazard-reporting-form';
import InteractiveMapDashboard from './pages/interactive-map-dashboard';
import ReportManagement from './pages/report-management';
import UserProfileSettings from './pages/user-profile-settings';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnalyticsDashboard />} />
        <Route path="/social-media-analytics" element={<SocialMediaAnalytics />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/hazard-reporting-form" element={<HazardReportingForm />} />
        <Route path="/interactive-map-dashboard" element={<InteractiveMapDashboard />} />
        <Route path="/report-management" element={<ReportManagement />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
