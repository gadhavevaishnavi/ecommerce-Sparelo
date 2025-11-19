import React, { useState, useMemo } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaCalendar,
  FaTag,
  FaChartLine,
  FaUsers,
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaCopy
} from 'react-icons/fa';

const Marketing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // Mock campaigns data
  const campaigns = useMemo(() => [
    {
      id: 1,
      name: 'Summer Sale 2024',
      type: 'discount',
      code: 'SUMMER2024',
      discount: 20,
      discountType: 'percentage',
      minPurchase: 1000,
      maxDiscount: 5000,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'active',
      usageLimit: 1000,
      usedCount: 456,
      totalRevenue: 1250000,
      totalOrders: 456,
      targetAudience: 'all',
      description: 'Get 20% off on all auto parts this summer'
    },
    {
      id: 2,
      name: 'New Customer Welcome',
      type: 'discount',
      code: 'WELCOME50',
      discount: 50,
      discountType: 'percentage',
      minPurchase: 500,
      maxDiscount: 2000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      usageLimit: 5000,
      usedCount: 1234,
      totalRevenue: 890000,
      totalOrders: 1234,
      targetAudience: 'new_customers',
      description: '50% off for new customers on first order'
    },
    {
      id: 3,
      name: 'Flash Sale - Engine Parts',
      type: 'flash_sale',
      code: 'FLASHENGINE',
      discount: 30,
      discountType: 'percentage',
      minPurchase: 2000,
      maxDiscount: 10000,
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      status: 'scheduled',
      usageLimit: 500,
      usedCount: 0,
      totalRevenue: 0,
      totalOrders: 0,
      targetAudience: 'all',
      description: 'Flash sale on engine parts - 30% off'
    },
    {
      id: 4,
      name: 'Loyalty Rewards',
      type: 'loyalty',
      code: 'LOYALTY100',
      discount: 100,
      discountType: 'fixed',
      minPurchase: 5000,
      maxDiscount: 100,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      usageLimit: null,
      usedCount: 789,
      totalRevenue: 4500000,
      totalOrders: 789,
      targetAudience: 'loyal_customers',
      description: '₹100 off for loyal customers'
    },
    {
      id: 5,
      name: 'Weekend Special',
      type: 'discount',
      code: 'WEEKEND15',
      discount: 15,
      discountType: 'percentage',
      minPurchase: 1500,
      maxDiscount: 3000,
      startDate: '2024-01-13',
      endDate: '2024-01-14',
      status: 'expired',
      usageLimit: 200,
      usedCount: 198,
      totalRevenue: 345000,
      totalOrders: 198,
      targetAudience: 'all',
      description: '15% off on weekends'
    },
  ], []);

  // Mock promotional offers
  const offers = useMemo(() => [
    {
      id: 1,
      title: 'Free Shipping on Orders Above ₹2000',
      type: 'shipping',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      impressions: 125000,
      clicks: 12500,
      conversions: 2500
    },
    {
      id: 2,
      title: 'Buy 2 Get 1 Free - Selected Items',
      type: 'bogo',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      impressions: 89000,
      clicks: 8900,
      conversions: 1780
    },
    {
      id: 3,
      title: 'Cashback on UPI Payments',
      type: 'cashback',
      status: 'scheduled',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      impressions: 0,
      clicks: 0,
      conversions: 0
    },
  ], []);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.totalRevenue, 0);
    const totalOrders = campaigns.reduce((sum, c) => sum + c.totalOrders, 0);
    const totalUsage = campaigns.reduce((sum, c) => sum + c.usedCount, 0);
    const avgConversionRate = campaigns.length > 0 
      ? (campaigns.reduce((sum, c) => sum + (c.usedCount / c.usageLimit * 100 || 0), 0) / campaigns.length).toFixed(1)
      : 0;

    return {
      activeCampaigns,
      totalRevenue,
      totalOrders,
      totalUsage,
      avgConversionRate
    };
  }, [campaigns]);

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      expired: 'bg-gray-100 text-gray-800',
      paused: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FaCheckCircle className="text-green-600" />;
      case 'scheduled':
        return <FaClock className="text-blue-600" />;
      case 'expired':
        return <FaTimesCircle className="text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketing & Promotion Management</h2>
          <p className="text-sm text-gray-600 mt-1">Create and manage promotional campaigns and discount codes</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus />
          Create Campaign
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.activeCampaigns}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaTag className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(summaryStats.totalRevenue / 1000000).toFixed(2)}M</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaChartLine className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.totalOrders.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaShoppingCart className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Conversion</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.avgConversionRate}%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaUsers className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Discount Codes & Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-xs text-gray-500">{campaign.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{campaign.code}</code>
                      <button
                        onClick={() => navigator.clipboard.writeText(campaign.code)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy code"
                      >
                        <FaCopy className="text-xs" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {campaign.discountType === 'percentage' 
                        ? `${campaign.discount}%` 
                        : `₹${campaign.discount}`}
                    </div>
                    {campaign.minPurchase > 0 && (
                      <div className="text-xs text-gray-500">Min: ₹{campaign.minPurchase}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {campaign.usedCount} / {campaign.usageLimit || '∞'}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${campaign.usageLimit ? (campaign.usedCount / campaign.usageLimit * 100) : 0}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{campaign.totalRevenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{campaign.totalOrders} orders</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{new Date(campaign.startDate).toLocaleDateString()}</div>
                    <div className="text-xs">to {new Date(campaign.endDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => setEditingCampaign(campaign)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
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

      {/* Promotional Offers Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Promotional Offers</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{offer.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(offer.status)}`}>
                    {offer.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{offer.type}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Impressions</p>
                    <p className="font-semibold">{offer.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Clicks</p>
                    <p className="font-semibold">{offer.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversions</p>
                    <p className="font-semibold">{offer.conversions.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    <FaEdit className="inline mr-1" />
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    <FaEye className="inline mr-1" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Create New Campaign</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter campaign name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Code</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="SUMMER2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="1000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Campaign description"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;

