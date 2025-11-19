import React, { useState } from 'react';
import {
  FaExclamationTriangle,
  FaRupeeSign,
  FaSearch,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

const Fines = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const finesData = [
    {
      id: 1,
      vendorName: 'Auto Parts Hub',
      vendorId: 'VND-001',
      reason: 'Failed to deliver within SLA',
      amount: 5000,
      orderId: 'ORD-12345',
      status: 'pending',
      issuedAt: '2024-01-15',
      dueDate: '2024-01-22',
      description: 'Order was supposed to be delivered within 3 days but was delayed by 2 days'
    },
    {
      id: 2,
      vendorName: 'Premium Spares',
      vendorId: 'VND-002',
      reason: 'Wrong part delivered',
      amount: 3000,
      orderId: 'ORD-12346',
      status: 'paid',
      issuedAt: '2024-01-10',
      dueDate: '2024-01-17',
      paidAt: '2024-01-12',
      description: 'Customer ordered part SKU-123 but received SKU-456'
    },
    {
      id: 3,
      vendorName: 'Quick Auto Solutions',
      vendorId: 'VND-003',
      reason: 'Damaged item delivered',
      amount: 4500,
      orderId: 'ORD-12347',
      status: 'overdue',
      issuedAt: '2024-01-08',
      dueDate: '2024-01-15',
      description: 'Item was damaged during packaging/shipping'
    },
    {
      id: 4,
      vendorName: 'Budget Auto Parts',
      vendorId: 'VND-004',
      reason: 'SLA violation - multiple orders',
      amount: 10000,
      orderId: 'ORD-12348, ORD-12349',
      status: 'pending',
      issuedAt: '2024-01-12',
      dueDate: '2024-01-19',
      description: 'Multiple orders failed to meet delivery SLA in the same week'
    },
  ];

  const filteredData = finesData.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch = item.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vendorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPending = finesData.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = finesData.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalOverdue = finesData.filter(f => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fines & Penalties</h2>
          <p className="text-sm text-gray-600 mt-1">Manage vendor fines for SLA violations and policy breaches</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <FaDownload /> Export
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FaExclamationTriangle /> Issue Fine
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Fines</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 flex items-center gap-1">
                <FaRupeeSign className="text-lg" />
                {totalPending.toLocaleString()}
              </p>
            </div>
            <FaExclamationTriangle className="text-3xl text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid Fines</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 flex items-center gap-1">
                <FaRupeeSign className="text-lg" />
                {totalPaid.toLocaleString()}
              </p>
            </div>
            <FaCheckCircle className="text-3xl text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue Fines</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 flex items-center gap-1">
                <FaRupeeSign className="text-lg" />
                {totalOverdue.toLocaleString()}
              </p>
            </div>
            <FaTimesCircle className="text-3xl text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by vendor, order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'paid', 'overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Fines Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issued</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((fine) => (
              <tr key={fine.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="font-medium text-gray-900">{fine.vendorName}</div>
                    <div className="text-sm text-gray-500">{fine.vendorId}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{fine.reason}</div>
                  <div className="text-xs text-gray-500 mt-1">{fine.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {fine.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-bold text-gray-900 flex items-center gap-1">
                    <FaRupeeSign className="text-sm" />
                    {fine.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(fine.status)}`}>
                    {fine.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {fine.issuedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${fine.status === 'overdue' ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                    {fine.dueDate}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-600 hover:text-blue-900" title="View Details">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fines;

