import React from 'react';

const Analytics = ({ timeSeriesData, stats }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics & Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border border-purple-100">
          <h4 className="font-semibold text-purple-900 mb-2">Sales Performance</h4>
          <p className="text-3xl font-bold text-purple-900 mb-1">
            ₹{(timeSeriesData.reduce((sum, d) => sum + d.revenue, 0) / 1000000).toFixed(2)}M
          </p>
          <p className="text-sm text-purple-700">Total revenue</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-6 border border-orange-100">
          <h4 className="font-semibold text-orange-900 mb-2">Order Volume</h4>
          <p className="text-3xl font-bold text-orange-900 mb-1">
            {timeSeriesData.reduce((sum, d) => sum + d.orders, 0).toLocaleString()}
          </p>
          <p className="text-sm text-orange-700">Total orders</p>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-6 border border-teal-100">
          <h4 className="font-semibold text-teal-900 mb-2">Average Order Value</h4>
          <p className="text-3xl font-bold text-teal-900 mb-1">
            ₹{Math.round(timeSeriesData.reduce((sum, d) => sum + d.revenue, 0) / timeSeriesData.reduce((sum, d) => sum + d.orders, 0)).toLocaleString()}
          </p>
          <p className="text-sm text-teal-700">Per order</p>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-6 border border-pink-100">
          <h4 className="font-semibold text-pink-900 mb-2">User Growth</h4>
          <p className="text-3xl font-bold text-pink-900 mb-1">
            +{stats[0]?.change || '12%'}
          </p>
          <p className="text-sm text-pink-700">This month</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

