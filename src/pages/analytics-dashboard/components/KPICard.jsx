import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, trend, gradient, glowClass }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-400';
    if (changeType === 'negative') return 'text-red-400';
    return 'text-slate-400';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeBackgroundColor = () => {
    if (changeType === 'positive') return 'bg-green-500/20 border-green-500/30';
    if (changeType === 'negative') return 'bg-red-500/20 border-red-500/30';
    return 'bg-slate-500/20 border-slate-500/30';
  };

  return (
    <div className={`glass rounded-xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 border border-slate-600/50 group ${glowClass || ''} hover:shadow-2xl`}>
      <div className="flex flex-col space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${gradient || 'bg-gradient-ocean'} animate-float group-hover:animate-glow`}>
            <Icon name={icon} size={20} className="text-white drop-shadow-lg" />
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getChangeBackgroundColor()} ${getChangeColor()} animate-pulse-subtle`}>
            <div className="flex items-center space-x-1">
              <Icon name={getChangeIcon()} size={12} />
              <span>{change}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-100 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
            {value}
          </p>
        </div>

        {/* Trend Section */}
        {trend && (
          <div className="flex items-center justify-center pt-2 border-t border-slate-700/50">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>Trend</span>
              <div className="relative w-12 h-6 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                    changeType === 'positive' ?'bg-gradient-to-r from-green-500/50 to-green-400/50 animate-slide-in' 
                      : changeType === 'negative' ?'bg-gradient-to-r from-red-500/50 to-red-400/50 animate-slide-in' :'bg-gradient-to-r from-slate-500/50 to-slate-400/50'
                  }`}
                  style={{
                    transform: changeType === 'positive' ? 'translateX(0%)' : changeType === 'negative' ? 'translateX(-100%)' : 'translateX(-50%)'
                  }}
                />
                <div className="absolute inset-1 bg-slate-800 rounded-full" />
                <div 
                  className={`absolute top-1 bottom-1 w-4 rounded-full transition-all duration-1000 ${
                    changeType === 'positive' ?'bg-green-400 right-1 shadow-glow-teal' 
                      : changeType === 'negative' ?'bg-red-400 left-1 shadow-glow-orange' :'bg-slate-400 left-1/2 transform -translate-x-1/2'
                  }`}
                />
              </div>
              <Icon name={getChangeIcon()} size={12} className={getChangeColor()} />
            </div>
          </div>
        )}

        {/* Mobile-specific enhancement */}
        <div className="sm:hidden">
          <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                changeType === 'positive' ? 'bg-green-400' : 'bg-red-400'
              }`}
              style={{ 
                width: `${Math.abs(parseFloat(change?.replace(/[^\d.-]/g, ''))) * 2}%`,
                maxWidth: '100%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;