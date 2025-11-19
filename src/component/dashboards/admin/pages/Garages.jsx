import React, { useState } from 'react';
import {
  FaTools,
  FaSearch,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar
} from 'react-icons/fa';

const Garages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const garagesData = [
    {
      id: 1,
      name: 'ABC Auto Service',
      owner: 'John Smith',
      email: 'abc@example.com',
      phone: '+91 9876543210',
      location: 'Mumbai, Maharashtra',
      status: 'active',
      rating: 4.8,
      jobsCompleted: 245,
      revenue: '₹12,50,000',
      documents: ['GST', 'PAN', 'License'],
      registeredAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'XYZ Garage',
      owner: 'Jane Doe',
      email: 'xyz@example.com',
      phone: '+91 9876543211',
      location: 'Delhi, NCR',
      status: 'active',
      rating: 4.6,
      jobsCompleted: 189,
      revenue: '₹9,80,000',
      documents: ['GST', 'PAN', 'License', 'Certification'],
      registeredAt: '2024-01-05'
    },
    {
      id: 3,
      name: 'Quick Fix Auto',
      owner: 'Bob Johnson',
      email: 'quickfix@example.com',
      phone: '+91 9876543212',
      location: 'Bangalore, Karnataka',
      status: 'pending',
      rating: 0,
      jobsCompleted: 0,
      revenue: '₹0',
      documents: ['GST', 'PAN'],
      registeredAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'Premium Auto Care',
      owner: 'Alice Brown',
      email: 'premium@example.com',
      phone: '+91 9876543213',
      location: 'Pune, Maharashtra',
      status: 'suspended',
      rating: 3.2,
      jobsCompleted: 45,
      revenue: '₹2,30,000',
      documents: ['GST', 'PAN', 'License'],
      registeredAt: '2023-12-20',
      suspensionReason: 'Multiple customer complaints'
    },
  ];

  const filteredData = garagesData.filter(garage => {
    const matchesFilter = filter === 'all' || garage.status === filter;
    const matchesSearch = garage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         garage.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         garage.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Garage Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage garage registrations and approvals</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search garages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'suspended'].map((status) => (
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

      {/* Garages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((garage) => (
          <div key={garage.id} className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaTools className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{garage.name}</h3>
                  <p className="text-sm text-gray-600">{garage.owner}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(garage.status)}`}>
                {garage.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>{garage.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaPhone className="text-gray-400" />
                <span>{garage.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaEnvelope className="text-gray-400" />
                <span>{garage.email}</span>
              </div>
            </div>

            {garage.rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold text-gray-900">{garage.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({garage.jobsCompleted} jobs)</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600">Jobs Completed</p>
                <p className="text-lg font-bold text-gray-900">{garage.jobsCompleted}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Revenue</p>
                <p className="text-lg font-bold text-gray-900">{garage.revenue}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">Documents</p>
              <div className="flex flex-wrap gap-1">
                {garage.documents.map((doc, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {garage.suspensionReason && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                <strong>Reason:</strong> {garage.suspensionReason}
              </div>
            )}

            <div className="flex gap-2">
              <button className="flex-1 btn-outline flex items-center justify-center gap-2">
                <FaEye /> View
              </button>
              {garage.status === 'pending' && (
                <>
                  <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                    <FaCheckCircle /> Approve
                  </button>
                  <button className="flex-1 btn-outline text-red-600 border-red-600 flex items-center justify-center gap-2">
                    <FaTimesCircle /> Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Garages;

