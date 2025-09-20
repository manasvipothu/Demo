import React, { useState } from 'react';
import SocialMediaPost from './SocialMediaPost';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialMediaFeed = ({ posts, loading, hasMore, onLoadMore }) => {
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortOptions = [
    { value: 'timestamp', label: 'Latest First' },
    { value: 'engagement', label: 'Most Engaged' },
    { value: 'influence', label: 'Most Influential' },
    { value: 'sentiment', label: 'Sentiment' }
  ];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedPosts = [...posts]?.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'timestamp':
        aValue = new Date(a.timestamp);
        bValue = new Date(b.timestamp);
        break;
      case 'engagement':
        aValue = a?.likes + a?.comments + a?.shares;
        bValue = b?.likes + b?.comments + b?.shares;
        break;
      case 'influence':
        aValue = a?.influenceScore;
        bValue = b?.influenceScore;
        break;
      case 'sentiment':
        const sentimentOrder = { positive: 3, neutral: 2, negative: 1 };
        aValue = sentimentOrder?.[a?.sentiment];
        bValue = sentimentOrder?.[b?.sentiment];
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (loading && posts?.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading social media posts...</p>
        </div>
      </div>
    );
  }

  if (posts?.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center">
          <Icon name="MessageSquare" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600">
            Try adjusting your filters to see more social media content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Icon name="Filter" size={20} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleSort(option?.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  sortBy === option?.value
                    ? 'bg-blue-100 text-blue-700' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option?.label}
                {sortBy === option?.value && (
                  <Icon 
                    name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                    className="ml-1 inline" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Posts Feed */}
      <div className="space-y-6">
        {sortedPosts?.map((post) => (
          <SocialMediaPost key={post?.id} post={post} />
        ))}
      </div>
      {/* Load More */}
      {hasMore && (
        <div className="text-center py-8">
          <Button
            variant="outline"
            loading={loading}
            onClick={onLoadMore}
            iconName="ChevronDown"
            iconPosition="right"
          >
            {loading ? 'Loading more posts...' : 'Load More Posts'}
          </Button>
        </div>
      )}
      {/* Results Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {posts?.length} posts</span>
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaFeed;