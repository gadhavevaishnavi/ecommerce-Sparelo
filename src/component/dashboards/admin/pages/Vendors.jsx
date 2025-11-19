import React from 'react';

const Vendors = ({ topVendors }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Vendor Management</h3>
      <div className="space-y-4">
        {topVendors.map((vendor) => (
          <div key={vendor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {vendor.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{vendor.name}</h4>
                  <p className="text-sm text-gray-600">{vendor.orders} orders • {vendor.revenue} revenue</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-700">{vendor.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-outline text-sm">View Details</button>
                <button className="btn-primary text-sm">Manage</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendors;

