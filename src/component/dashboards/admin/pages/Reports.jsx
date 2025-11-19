import React, { useState } from 'react';
import {
  FaFileExcel,
  FaDownload,
  FaCalendarAlt,
  FaFilter,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign
} from 'react-icons/fa';

const Reports = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('30d');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const reportTypes = [
    { id: 'sales', label: 'Sales Report', icon: FaChartLine },
    { id: 'users', label: 'User Activity', icon: FaUsers },
    { id: 'orders', label: 'Order Report', icon: FaShoppingCart },
    { id: 'lucky-draw', label: 'Lucky Draw Report', icon: FaChartPie },
    { id: 'vendor', label: 'Vendor Performance', icon: FaChartBar },
    { id: 'revenue', label: 'Revenue Report', icon: FaRupeeSign },
  ];

  const sampleReportData = {
    sales: {
      totalSales: '₹45,67,890',
      totalOrders: 1234,
      avgOrderValue: '₹3,702',
      growth: '+15.3%'
    },
    users: {
      totalUsers: 12500,
      newUsers: 450,
      activeUsers: 8900,
      growth: '+12.5%'
    },
    orders: {
      totalOrders: 1234,
      completed: 1156,
      pending: 45,
      cancelled: 33,
      growth: '+18.2%'
    }
  };

  const handleExport = (format) => {
    // In production, this would trigger an API call to generate and download the report
    alert(`Exporting ${reportType} report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-600 mt-1">Generate and export comprehensive platform reports</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('excel')}
            className="btn-primary flex items-center gap-2"
          >
            <FaFileExcel /> Export to Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="btn-outline flex items-center gap-2"
          >
            <FaDownload /> Export PDF
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                reportType === type.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className={`text-2xl mb-2 ${reportType === type.id ? 'text-blue-600' : 'text-gray-600'}`} />
              <p className={`text-sm font-medium ${reportType === type.id ? 'text-blue-600' : 'text-gray-700'}`}>
                {type.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span className="font-medium text-gray-700">Date Range:</span>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d', 'custom'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  dateRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === 'custom' ? 'Custom' : `Last ${range}`}
              </button>
            ))}
          </div>
          {dateRange === 'custom' && (
            <div className="flex gap-2 items-center">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
              <span className="text-gray-600">to</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {reportTypes.find(r => r.id === reportType)?.label}
          </h3>
          <button className="btn-outline flex items-center gap-2">
            <FaFilter /> Apply Filters
          </button>
        </div>

        {/* Sample Report Data Display */}
        {reportType === 'sales' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.sales.totalSales}</p>
              <p className="text-xs text-green-600 mt-1">{sampleReportData.sales.growth}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.sales.totalOrders.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.sales.avgOrderValue}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.sales.growth}</p>
            </div>
          </div>
        )}

        {reportType === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.users.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">New Users</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.users.newUsers}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.users.activeUsers.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.users.growth}</p>
            </div>
          </div>
        )}

        {reportType === 'orders' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.orders.totalOrders.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.orders.completed}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.orders.pending}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-gray-600 mb-1">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900">{sampleReportData.orders.cancelled}</p>
            </div>
          </div>
        )}

        {/* Placeholder for other report types */}
        {!['sales', 'users', 'orders'].includes(reportType) && (
          <div className="text-center py-12">
            <p className="text-gray-600">Select filters and click "Export to Excel" to generate the report</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;

