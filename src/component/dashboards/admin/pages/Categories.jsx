import React, { useState } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaBox,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

const Categories = () => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [searchTerm, setSearchTerm] = useState('');

  // Vehicle Categories
  const vehicleCategories = [
    { id: 1, name: 'Cars', icon: FaCar, status: 'active', partsCount: 12500, createdAt: '2024-01-01' },
    { id: 2, name: 'Bikes', icon: FaMotorcycle, status: 'active', partsCount: 8900, createdAt: '2024-01-01' },
    { id: 3, name: 'Trucks', icon: FaTruck, status: 'active', partsCount: 3200, createdAt: '2024-01-02' },
    { id: 4, name: 'Tractors', icon: FaTruck, status: 'active', partsCount: 2100, createdAt: '2024-01-02' },
    { id: 5, name: 'JCBs', icon: FaTruck, status: 'active', partsCount: 1500, createdAt: '2024-01-03' },
    { id: 6, name: 'Boats', icon: FaCar, status: 'active', partsCount: 800, createdAt: '2024-01-03' },
    { id: 7, name: 'Autos', icon: FaCar, status: 'active', partsCount: 1100, createdAt: '2024-01-04' },
    { id: 8, name: 'EVs', icon: FaCar, status: 'active', partsCount: 950, createdAt: '2024-01-04' },
  ];

  // Part Categories
  const partCategories = [
    { id: 1, name: 'Engine Parts', parent: 'Maintenance', status: 'active', productsCount: 4500 },
    { id: 2, name: 'Brake System', parent: 'Safety', status: 'active', productsCount: 3200 },
    { id: 3, name: 'Suspension', parent: 'Chassis', status: 'active', productsCount: 2800 },
    { id: 4, name: 'Electrical', parent: 'Electronics', status: 'active', productsCount: 2100 },
    { id: 5, name: 'Body Parts', parent: 'Exterior', status: 'active', productsCount: 1800 },
    { id: 6, name: 'Filters', parent: 'Maintenance', status: 'active', productsCount: 1500 },
    { id: 7, name: 'Lighting', parent: 'Electronics', status: 'active', productsCount: 1200 },
    { id: 8, name: 'Transmission', parent: 'Drivetrain', status: 'active', productsCount: 900 },
  ];

  const filteredVehicleCategories = vehicleCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPartCategories = partCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage vehicle and part categories</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'vehicles'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Vehicle Categories
        </button>
        <button
          onClick={() => setActiveTab('parts')}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'parts'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Part Categories
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Vehicle Categories Table */}
      {activeTab === 'vehicles' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parts Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {category.partsCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        category.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {category.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Part Categories Table */}
      {activeTab === 'parts' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPartCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FaBox className="text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {category.parent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {category.productsCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Categories;

