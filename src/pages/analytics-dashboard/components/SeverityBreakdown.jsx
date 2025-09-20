import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SeverityBreakdown = () => {
  const data = [
    { name: 'Critical', value: 156, color: '#dc2626' },
    { name: 'High', value: 234, color: '#ea580c' },
    { name: 'Medium', value: 389, color: '#d97706' },
    { name: 'Low', value: 567, color: '#65a30d' },
    { name: 'Informational', value: 123, color: '#0891b2' }
  ];

  const total = data?.reduce((sum, item) => sum + item?.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      const percentage = ((data?.value / total) * 100)?.toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data?.name}</p>
          <p className="text-sm text-gray-600">{data?.value} incidents ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Severity Level Distribution</h3>
        <div className="text-sm text-gray-600">
          Total: {total?.toLocaleString()} incidents
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Statistics */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Breakdown by Severity</h4>
          {data?.map((item, index) => {
            const percentage = ((item?.value / total) * 100)?.toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <span className="font-medium text-gray-900">{item?.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{item?.value}</div>
                  <div className="text-sm text-gray-600">{percentage}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Response Time Metrics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Average Response Times</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {data?.map((item, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">
                {Math.floor(Math.random() * 120 + 30)}m
              </div>
              <div className="text-sm text-gray-600">{item?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeverityBreakdown;