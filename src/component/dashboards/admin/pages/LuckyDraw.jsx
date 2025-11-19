import React, { useState } from 'react';
import {
  FaGift,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCar,
  FaMotorcycle,
  FaCog,
  FaPlay,
  FaPause,
  FaDownload,
  FaMapMarkerAlt,
  FaRupeeSign
} from 'react-icons/fa';

const LuckyDraw = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [drawMode, setDrawMode] = useState('auto'); // auto or manual

  // Vehicle base values
  const vehicleBaseValues = [
    { id: 1, vehicle: 'Hyundai i10', category: 'Car', baseValue: 500000, status: 'active' },
    { id: 2, vehicle: 'Maruti Swift', category: 'Car', baseValue: 650000, status: 'active' },
    { id: 3, vehicle: 'Honda Activa', category: 'Bike', baseValue: 75000, status: 'active' },
    { id: 4, vehicle: 'Hero Splendor', category: 'Bike', baseValue: 65000, status: 'active' },
  ];

  // Coupon tiers
  const couponTiers = [
    { id: 1, tier: 'Tier 1', value: 1000, percentage: 0.2, applicable: 'Cars & Bikes' },
    { id: 2, tier: 'Tier 2', value: 500, percentage: 0.1, applicable: 'Cars & Bikes' },
    { id: 3, tier: 'Tier 3', value: 250, percentage: 0.05, applicable: 'Cars & Bikes' },
  ];

  // Previous draws
  const previousDraws = [
    { id: 1, date: '2024-01-15', category: 'Cars', participants: 1250, winners: 25, totalCoupons: 2500, status: 'completed' },
    { id: 2, date: '2024-01-10', category: 'Bikes', participants: 890, winners: 18, totalCoupons: 1780, status: 'completed' },
    { id: 3, date: '2024-01-05', category: 'Cars', participants: 1100, winners: 22, totalCoupons: 2200, status: 'completed' },
  ];

  // Region-wise settings
  const regionSettings = [
    { id: 1, region: 'North', state: 'Delhi', eligible: true, prizePool: 50000 },
    { id: 2, region: 'South', state: 'Karnataka', eligible: true, prizePool: 45000 },
    { id: 3, region: 'West', state: 'Maharashtra', eligible: true, prizePool: 55000 },
    { id: 4, region: 'East', state: 'West Bengal', eligible: true, prizePool: 40000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lucky Draw Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage lucky draws for Cars and Bikes</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <FaDownload /> Export Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FaPlus /> New Draw
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        {['settings', 'draws', 'regions'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Draw Execution Mode</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setDrawMode('auto')}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  drawMode === 'auto'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaCog className="text-xl" />
                  <span className="font-semibold">Auto Mode</span>
                </div>
                <p className="text-sm text-gray-600 text-center">Automatically execute draws based on schedule</p>
              </button>
              <button
                onClick={() => setDrawMode('manual')}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  drawMode === 'manual'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaPlay className="text-xl" />
                  <span className="font-semibold">Manual Mode</span>
                </div>
                <p className="text-sm text-gray-600 text-center">Execute draws manually under admin supervision</p>
              </button>
            </div>
          </div>

          {/* Vehicle Base Values */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Vehicle Base Values</h3>
              <button className="btn-primary flex items-center gap-2">
                <FaPlus /> Add Vehicle
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vehicleBaseValues.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {vehicle.category === 'Car' ? <FaCar className="text-blue-600" /> : <FaMotorcycle className="text-green-600" />}
                          <span className="font-medium text-gray-900">{vehicle.vehicle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vehicle.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900 flex items-center gap-1">
                          <FaRupeeSign className="text-sm" />
                          {vehicle.baseValue.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
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
          </div>

          {/* Coupon Tiers */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Coupon Tiers</h3>
              <button className="btn-primary flex items-center gap-2">
                <FaPlus /> Add Tier
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {couponTiers.map((tier) => (
                  <div key={tier.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{tier.tier}</span>
                      <span className="text-sm text-gray-600">{tier.percentage * 100}% of base value</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 flex items-center gap-1 mb-2">
                      <FaRupeeSign />
                      {tier.value}
                    </div>
                    <p className="text-sm text-gray-600">{tier.applicable}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Previous Draws Tab */}
      {activeTab === 'draws' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Winners</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Coupons</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {previousDraws.map((draw) => (
                <tr key={draw.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{draw.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {draw.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{draw.participants.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{draw.winners}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{draw.totalCoupons.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {draw.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Region Settings Tab */}
      {activeTab === 'regions' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Eligible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prize Pool</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regionSettings.map((region) => (
                <tr key={region.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-600" />
                      <span className="font-medium text-gray-900">{region.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{region.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      region.eligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {region.eligible ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900 flex items-center gap-1">
                      <FaRupeeSign className="text-sm" />
                      {region.prizePool.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FaEdit />
                    </button>
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

export default LuckyDraw;

