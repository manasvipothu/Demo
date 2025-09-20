import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialMediaPost = ({ post }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      case 'neutral':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'twitter':
        return 'Twitter';
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      default:
        return 'MessageSquare';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name={getPlatformIcon(post?.platform)} size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-900">{post?.platform}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">@{post?.username}</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">{formatTimestamp(post?.timestamp)}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(post?.sentiment)}`}>
          {post?.sentiment}
        </div>
      </div>
      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">
          {post?.content?.split(' ')?.map((word, index) => {
            const isKeyword = post?.keywords?.some(keyword => 
              word?.toLowerCase()?.includes(keyword?.word?.toLowerCase())
            );
            return (
              <span
                key={index}
                className={isKeyword ? 'bg-yellow-100 text-yellow-800 px-1 rounded' : ''}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>
      {/* Media */}
      {post?.media && (
        <div className="mb-4">
          <div className="rounded-lg overflow-hidden">
            <Image 
              src={post?.media} 
              alt="Social media post content" 
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      )}
      {/* Location */}
      {post?.location && (
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MapPin" size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">{post?.location}</span>
        </div>
      )}
      {/* Keywords */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {post?.keywords?.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700"
            >
              {keyword?.word}
              <span className="ml-1 text-blue-500">({Math.round(keyword?.confidence * 100)}%)</span>
            </span>
          ))}
        </div>
      </div>
      {/* Engagement Metrics */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <Icon name="Heart" size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{post?.likes?.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{post?.comments?.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Share" size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{post?.shares?.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {post?.isViral && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-50 text-orange-700">
              <Icon name="TrendingUp" size={12} className="mr-1" />
              Viral
            </span>
          )}
          <span className="text-xs text-gray-500">Influence: {post?.influenceScore}</span>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPost;