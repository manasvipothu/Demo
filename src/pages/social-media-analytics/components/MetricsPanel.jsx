import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const MetricsPanel = ({ metrics, isCollapsed, onToggleCollapse }) => {
  const sentimentColors = {
    positive: '#10B981',
    negative: '#EF4444',
    neutral: '#6B7280'
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Mobile Toggle Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icon 
            name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
            size={20} 
            className="text-gray-600" 
          />
        </button>
      </div>
      <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block`}>
        {/* Stats Cards */}
        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics?.totalPosts?.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics?.avgEngagement}%</div>
              <div className="text-sm text-gray-600">Avg Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{metrics?.viralPosts}</div>
              <div className="text-sm text-gray-600">Viral Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics?.avgInfluence}</div>
              <div className="text-sm text-gray-600">Avg Influence</div>
            </div>
          </div>
        </div>

        {/* Post Volume Trends */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Post Volume Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics?.volumeTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="posts" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics?.sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metrics?.sentimentDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={sentimentColors?.[entry?.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Keywords */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Keywords</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.topKeywords} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="keyword" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="frequency" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h4>
          <div className="space-y-3">
            {metrics?.platformDistribution?.map((platform, index) => (
              <div key={platform?.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{platform?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${platform?.percentage}%`,
                        backgroundColor: COLORS?.[index % COLORS?.length]
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {platform?.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;