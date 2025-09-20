import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterControls from './components/FilterControls';
import SocialMediaFeed from './components/SocialMediaFeed';
import MetricsPanel from './components/MetricsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SocialMediaAnalytics = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    platform: 'all',
    sentiment: 'all',
    location: 'all',
    timeRange: '24h',
    keywords: '',
    minEngagement: '',
    startDate: '',
    endDate: ''
  });
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [metricsCollapsed, setMetricsCollapsed] = useState(true);

  // Mock social media posts data
  const mockPosts = [
    {
      id: 1,
      platform: 'Twitter',
      username: 'mumbai_fisher',
      content: `Massive oil spill spotted near Juhu Beach! The water is completely black and there's a strong smell. This is a major environmental disaster. #OilSpill #JuhuBeach #MarinePollution #Emergency`,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      sentiment: 'negative',location: 'Mumbai Coast',
      keywords: [
        { word: 'oil spill', confidence: 0.95 },
        { word: 'environmental disaster', confidence: 0.88 },
        { word: 'pollution', confidence: 0.82 }
      ],
      likes: 1247,
      comments: 89,
      shares: 156,
      influenceScore: 8.7,
      isViral: true,
      media: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      platform: 'Facebook',username: 'goa_beach_patrol',
      content: `Warning to all beach visitors: Strong undercurrents detected at Baga Beach today. Several rescue operations already conducted. Please avoid swimming in the marked areas until further notice.`,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      sentiment: 'neutral',location: 'Goa Beaches',
      keywords: [
        { word: 'undercurrents', confidence: 0.92 },
        { word: 'rescue operations', confidence: 0.87 },
        { word: 'warning', confidence: 0.85 }
      ],
      likes: 892,
      comments: 45,
      shares: 78,
      influenceScore: 7.2,
      isViral: false,
      media: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      platform: 'Instagram',username: 'kerala_backwaters',
      content: `Beautiful sunset at Vembanad Lake today! The water quality has improved significantly after the recent cleanup drive. Great to see marine life returning to these waters. 🌅🐟 #KeralaTourism #CleanWater`,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      sentiment: 'positive',location: 'Kerala Backwaters',
      keywords: [
        { word: 'water quality', confidence: 0.89 },
        { word: 'cleanup', confidence: 0.84 },
        { word: 'marine life', confidence: 0.91 }
      ],
      likes: 2156,
      comments: 134,
      shares: 89,
      influenceScore: 6.8,
      isViral: false,
      media: 'https://images.pixabay.com/photo/2019/08/19/07/45/boat-4416274_1280.jpg?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      platform: 'Twitter',username: 'chennai_marina_news',
      content: `Jellyfish bloom reported along Marina Beach. Authorities advise caution while swimming. Medical teams on standby for any stinging incidents. #MarinaBreach #Jellyfish #PublicSafety`,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      sentiment: 'neutral',location: 'Chennai Marina',
      keywords: [
        { word: 'jellyfish bloom', confidence: 0.94 },
        { word: 'medical teams', confidence: 0.86 },
        { word: 'public safety', confidence: 0.88 }
      ],
      likes: 567,
      comments: 67,
      shares: 45,
      influenceScore: 5.9,
      isViral: false
    },
    {
      id: 5,
      platform: 'Facebook',username: 'kolkata_port_authority',
      content: `Successful rescue operation completed at Hooghly River. All 15 passengers from the capsized boat have been safely evacuated. Kudos to our rescue team for their quick response! 👏`,
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      sentiment: 'positive',location: 'Kolkata Port',
      keywords: [
        { word: 'rescue operation', confidence: 0.96 },
        { word: 'capsized boat', confidence: 0.93 },
        { word: 'evacuated', confidence: 0.89 }
      ],
      likes: 1834,
      comments: 156,
      shares: 234,
      influenceScore: 8.1,
      isViral: true
    },
    {
      id: 6,
      platform: 'Instagram',username: 'ocean_conservancy_india',
      content: `Plastic debris cleanup drive at Versova Beach was a huge success! Over 2 tons of waste removed by 500+ volunteers. Together we can make our oceans plastic-free! 🌊♻️ #BeatPlasticPollution`,
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      sentiment: 'positive',location: 'Mumbai Coast',
      keywords: [
        { word: 'plastic debris', confidence: 0.91 },
        { word: 'cleanup drive', confidence: 0.87 },
        { word: 'volunteers', confidence: 0.83 }
      ],
      likes: 3245,
      comments: 289,
      shares: 456,
      influenceScore: 9.2,
      isViral: true,
      media: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=500&h=300&fit=crop'
    }
  ];

  // Mock metrics data
  const mockMetrics = {
    totalPosts: 1247,
    avgEngagement: 12.5,
    viralPosts: 23,
    avgInfluence: 7.3,
    volumeTrends: [
      { time: '00:00', posts: 45 },
      { time: '04:00', posts: 23 },
      { time: '08:00', posts: 78 },
      { time: '12:00', posts: 156 },
      { time: '16:00', posts: 134 },
      { time: '20:00', posts: 189 }
    ],
    sentimentDistribution: [
      { name: 'positive', value: 45 },
      { name: 'neutral', value: 35 },
      { name: 'negative', value: 20 }
    ],
    topKeywords: [
      { keyword: 'oil spill', frequency: 89 },
      { keyword: 'rescue', frequency: 67 },
      { keyword: 'pollution', frequency: 54 },
      { keyword: 'cleanup', frequency: 43 },
      { keyword: 'warning', frequency: 38 }
    ],
    platformDistribution: [
      { name: 'Twitter', percentage: 35 },
      { name: 'Facebook', percentage: 28 },
      { name: 'Instagram', percentage: 22 },
      { name: 'LinkedIn', percentage: 10 },
      { name: 'TikTok', percentage: 5 }
    ]
  };

  useEffect(() => {
    // Simulate loading posts
    setLoading(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = () => {
    // Simulate export functionality
    const dataStr = JSON.stringify(posts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `social-media-analytics-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement?.setAttribute('href', dataUri);
    linkElement?.setAttribute('download', exportFileDefaultName);
    linkElement?.click();
  };

  const handleResetFilters = () => {
    setFilters({
      platform: 'all',
      sentiment: 'all',
      location: 'all',
      timeRange: '24h',
      keywords: '',
      minEngagement: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading more posts
    setTimeout(() => {
      setLoading(false);
      setHasMore(false); // No more posts to load in this demo
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="ArrowLeft" size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Social Media Analytics</h1>
                <p className="text-sm text-gray-600">Monitor ocean hazard discussions across platforms</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="BarChart3"
                onClick={() => navigate('/analytics-dashboard')}
              >
                Analytics
              </Button>
              <Button
                variant="outline"
                iconName="Map"
                onClick={() => navigate('/interactive-map-dashboard')}
              >
                Map View
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Controls */}
        <FilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          onExport={handleExport}
          onReset={handleResetFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            <SocialMediaFeed
              posts={posts}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </div>

          {/* Metrics Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <MetricsPanel
                metrics={mockMetrics}
                isCollapsed={metricsCollapsed}
                onToggleCollapse={() => setMetricsCollapsed(!metricsCollapsed)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <div className="flex flex-col space-y-2">
          <Button
            variant="default"
            size="icon"
            onClick={() => navigate('/hazard-reporting-form')}
            className="rounded-full shadow-lg"
          >
            <Icon name="Plus" size={20} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setMetricsCollapsed(!metricsCollapsed)}
            className="rounded-full shadow-lg"
          >
            <Icon name="BarChart3" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAnalytics;