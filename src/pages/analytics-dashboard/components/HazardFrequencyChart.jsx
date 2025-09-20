import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const HazardFrequencyChart = ({ data, timeRange }) => {
  const chartData = [
    { month: 'Jan', storms: 45, pollution: 23, debris: 18, wildlife: 12 },
    { month: 'Feb', storms: 52, pollution: 28, debris: 22, wildlife: 15 },
    { month: 'Mar', storms: 38, pollution: 31, debris: 25, wildlife: 18 },
    { month: 'Apr', storms: 29, pollution: 35, debris: 28, wildlife: 22 },
    { month: 'May', storms: 34, pollution: 42, debris: 31, wildlife: 25 },
    { month: 'Jun', storms: 67, pollution: 38, debris: 35, wildlife: 28 },
    { month: 'Jul', storms: 89, pollution: 45, debris: 42, wildlife: 32 },
    { month: 'Aug', storms: 76, pollution: 41, debris: 38, wildlife: 29 },
    { month: 'Sep', storms: 58, pollution: 36, debris: 33, wildlife: 26 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Hazard Frequency Trends</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Period: {timeRange || 'Last 9 months'}</span>
        </div>
      </div>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="storms" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Storms"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="pollution" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Pollution"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="debris" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Debris"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="wildlife" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Wildlife Incidents"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HazardFrequencyChart;