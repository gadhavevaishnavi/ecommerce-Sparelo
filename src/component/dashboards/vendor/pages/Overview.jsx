import React, { useMemo } from 'react';
import { FaChartLine, FaMoneyBillWave, FaShoppingCart, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Overview = ({ timeSeriesData, dateRange, recentOrders }) => {
  // Calculate earnings breakdown
  const earningsData = useMemo(() => {
    const totalRevenue = timeSeriesData?.reduce((sum, d) => sum + d.revenue, 0) || 0;
    const totalOrders = timeSeriesData?.reduce((sum, d) => sum + d.orders, 0) || 0;
    const totalSales = timeSeriesData?.reduce((sum, d) => sum + d.sales, 0) || 0;
    
    // Calculate breakdown
    const commission = totalRevenue * 0.15; // 15% commission
    const netEarnings = totalRevenue - commission;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const avgItemsPerOrder = totalOrders > 0 ? totalSales / totalOrders : 0;
    
    // Calculate growth
    const previousPeriodRevenue = totalRevenue * 0.85; // Simulated previous period
    const revenueGrowth = ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;
    
    return {
      totalRevenue,
      commission,
      netEarnings,
      totalOrders,
      totalSales,
      avgOrderValue,
      avgItemsPerOrder,
      revenueGrowth
    };
  }, [timeSeriesData]);

  // Revenue Chart component
  const RevenueChart = () => {
    if (!timeSeriesData || timeSeriesData.length === 0) return null;
    const maxRevenue = Math.max(...timeSeriesData.map(d => d.revenue));
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between h-32 gap-1">
          {timeSeriesData.slice(-7).map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all hover:opacity-80"
                style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                title={`₹${data.revenue.toLocaleString()}`}
              />
              <span className="text-xs text-gray-500 mt-1">
                {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-orange-600">
            {recentOrders.filter(o => o.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Processing</p>
          <p className="text-2xl font-bold text-yellow-600">
            {recentOrders.filter(o => o.status === 'Processing').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Shipped</p>
          <p className="text-2xl font-bold text-blue-600">
            {recentOrders.filter(o => o.status === 'Shipped').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Delivered</p>
          <p className="text-2xl font-bold text-green-600">
            {recentOrders.filter(o => o.status === 'Delivered').length}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Recent Orders</h4>
        <div className="space-y-3">
          {recentOrders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition">
              <div>
                <h5 className="font-semibold text-gray-900">{order.orderId}</h5>
                <p className="text-sm text-gray-600">{order.customer} • {order.items} items</p>
                <p className="text-xs text-gray-500 mt-1">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₹{order.amount.toLocaleString()}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;

