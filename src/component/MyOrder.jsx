import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { 
  FaMapMarkerAlt, 
  FaCreditCard, 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaUndo,
  FaExclamationTriangle,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const MyOrder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("In-Progress");
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const tabs = ["In-Progress", "Delivered", "Returned", "Cancelled"];

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  // Toggle order details expansion
  const toggleOrderDetails = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Cancel order function
  const handleCancelOrder = (order) => {
    setOrderToCancel(order);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      const updatedOrders = orders.map(order => 
        order.id === orderToCancel.id 
          ? { ...order, status: 'Cancelled', cancelledDate: new Date().toISOString() }
          : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setShowCancelModal(false);
      setOrderToCancel(null);
      
      // Switch to Cancelled tab if not already there
      if (activeTab !== 'Cancelled') {
        setActiveTab('Cancelled');
      }
    }
  };

  // Filter orders by status
  const filteredOrders = orders.filter(order => {
    if (activeTab === "In-Progress") {
      return order.status === "In-Progress" || order.status === "Confirmed" || order.status === "Pending Payment";
    }
    if (activeTab === "Delivered") return order.status === "Delivered";
    if (activeTab === "Returned") return order.status === "Returned";
    if (activeTab === "Cancelled") return order.status === "Cancelled";
    return false;
  });

  // Check if order can be cancelled
  const canCancelOrder = (order) => {
    return order.status === "In-Progress" || 
           order.status === "Confirmed" || 
           order.status === "Pending Payment";
  };

  // Get order tracking status
  const getOrderTrackingStatus = (order) => {
    const orderDate = new Date(order.date);
    const daysSinceOrder = Math.floor((Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (order.status === 'Cancelled') {
      return { step: 0, status: 'cancelled' };
    }
    if (order.status === 'Delivered') {
      return { step: 4, status: 'delivered' };
    }
    if (daysSinceOrder >= 5) {
      return { step: 3, status: 'shipped' };
    }
    if (daysSinceOrder >= 2) {
      return { step: 2, status: 'processing' };
    }
    return { step: 1, status: 'confirmed' };
  };

  // Check for delayed/backordered items
  const getItemStatus = (item, order) => {
    // Simulate some items being delayed or backordered
    const isDelayed = Math.random() > 0.7; // 30% chance of delay
    const isBackordered = Math.random() > 0.9; // 10% chance of backorder
    
    if (order.status === 'Cancelled' || order.status === 'Delivered') {
      return null;
    }
    
    if (isBackordered) {
      return { type: 'backordered', message: 'Item is backordered. Expected restock in 5-7 days.' };
    }
    if (isDelayed) {
      return { type: 'delayed', message: 'Item delivery delayed. Expected in 2-3 additional days.' };
    }
    return null;
  };

  // Count orders by status
  const getOrderCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'In-Progress':
        return <FaBox className="text-blue-500" />;
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Returned':
        return <FaUndo className="text-orange-500" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'In-Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Returned':
        return 'bg-orange-100 text-orange-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Open Google Maps with address
  const handleOpenMap = (address) => {
    const fullAddress = `${address.address}, ${address.cityState}, ${address.postalCode}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 sm:mb-3 md:mb-8">
          <h1 className="text-base sm:text-lg md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-0">
            My <span className="text-red-500">Orders</span>
          </h1>
        
        </div>

        {/* Tabs */}
        <div className="flex space-x-1.5 sm:space-x-2 md:space-x-10 border-b border-gray-300 mb-2 sm:mb-3 md:mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 sm:pb-1.5 md:pb-2 px-0.5 sm:px-1 font-medium whitespace-nowrap transition-colors text-[9px] sm:text-xs md:text-base ${
                activeTab === tab
                  ? "text-sky-500 border-b-2 border-sky-500"
                  : "text-gray-500 hover:text-sky-500"
              }`}
            >
              {tab} ({getOrderCount(tab)})
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12 md:py-20 bg-white rounded-xl shadow-sm">
            <div className="text-3xl sm:text-4xl md:text-6xl mb-2 sm:mb-3 md:mb-4">📦</div>
            <p className="text-gray-600 text-xs sm:text-sm md:text-lg mb-2 sm:mb-3 md:mb-4">
              No {activeTab} orders
            </p>
            <Link
              to="/"
              className="bg-red-400 hover:bg-red-500 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-4 rounded-md transition text-[10px] sm:text-xs md:text-base"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {filteredOrders.map((order) => {
              const trackingStatus = getOrderTrackingStatus(order);
              const isExpanded = expandedOrders[order.id];
              
              return (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-2 sm:p-3 md:p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 sm:gap-2 md:gap-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
                      <div className="text-sm sm:text-base md:text-2xl">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="text-[10px] sm:text-xs md:text-lg font-semibold text-gray-800">
                          Order #{order.id}
                        </h3>
                        <p className="text-[9px] sm:text-[10px] md:text-sm text-gray-600">
                          Placed on {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
                      <span
                        className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] md:text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <div className="text-right">
                        <p className="text-[9px] sm:text-[10px] md:text-sm text-gray-600">Total Amount</p>
                        <p className="text-xs sm:text-sm md:text-xl font-bold text-gray-800">
                          ₹{order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-3 mt-1.5 sm:mt-2 md:mt-4 flex-wrap">
                    {canCancelOrder(order) && (
                      <button
                        onClick={() => handleCancelOrder(order)}
                        className="px-1.5 sm:px-2 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="px-1.5 sm:px-2 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-0.5 sm:gap-1 md:gap-2"
                    >
                      {isExpanded ? (
                        <>
                          <FaChevronUp className="text-[7px] sm:text-[8px] md:text-[10px]" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <FaChevronDown className="text-[7px] sm:text-[8px] md:text-[10px]" />
                          View Tracking
                        </>
                      )}
                    </button>
                    <Link
                      to={`/checkout/confirmation?orderId=${order.id}`}
                      className="px-1.5 sm:px-2 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      View Receipt
                    </Link>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-2 sm:p-3 md:p-6">
                  <div className="space-y-1.5 sm:space-y-2 md:space-y-4">
                    {order.items.map((item, index) => {
                      const itemStatus = getItemStatus(item, order);
                      
                      return (
                      <div
                        key={index}
                        className={`flex gap-1.5 sm:gap-2 md:gap-4 pb-1.5 sm:pb-2 md:pb-4 border-b border-gray-100 last:border-b-0 ${
                          itemStatus ? 'bg-yellow-50 p-1.5 sm:p-2 md:p-4 rounded-lg border-yellow-200' : ''
                        }`}
                      >
                        <img
                          src={item.imageUrl || "https://via.placeholder.com/100"}
                          alt={item.name}
                          className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-0.5 sm:mb-1">
                            <h4 className="font-semibold text-gray-800 text-[10px] sm:text-xs md:text-base">
                              {item.name}
                            </h4>
                            {itemStatus && (
                              <div className={`flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded text-[7px] sm:text-[9px] md:text-xs font-medium ${
                                itemStatus.type === 'backordered' 
                                  ? 'bg-orange-100 text-orange-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {itemStatus.type === 'backordered' ? (
                                  <FaBox className="text-[7px] sm:text-[8px] md:text-xs" />
                                ) : (
                                  <FaClock className="text-[7px] sm:text-[8px] md:text-xs" />
                                )}
                                {itemStatus.type === 'backordered' ? 'Backordered' : 'Delayed'}
                              </div>
                            )}
                          </div>
                          <p className="text-[9px] sm:text-[10px] md:text-sm text-gray-600 mb-0.5">
                            {item.partNumber || item.id}
                          </p>
                          <p className="text-[9px] sm:text-[10px] md:text-sm text-gray-600 mb-1 sm:mb-1.5 md:mb-2">
                            Brand: {item.brand || "N/A"} | Sold by: {item.seller}
                          </p>
                          {itemStatus && (
                            <div className="mb-1 sm:mb-1.5 md:mb-2 p-1 sm:p-1.5 md:p-2 bg-white rounded border border-yellow-300">
                              <div className="flex items-start gap-1 sm:gap-1.5 md:gap-2">
                                <FaExclamationTriangle className={`text-[7px] sm:text-[9px] md:text-xs mt-0.5 ${
                                  itemStatus.type === 'backordered' ? 'text-orange-500' : 'text-yellow-500'
                                }`} />
                                <p className={`text-[9px] sm:text-[10px] md:text-xs ${
                                  itemStatus.type === 'backordered' ? 'text-orange-700' : 'text-yellow-700'
                                }`}>
                                  {itemStatus.message}
                                </p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
                            <span className="text-[9px] sm:text-[10px] md:text-sm text-gray-600">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-xs sm:text-sm md:text-lg font-semibold text-gray-800">
                              ₹
                              {(
                                (item.discountPrice || item.price) *
                                item.quantity
                              ).toFixed(2)}
                            </span>
                            {item.discountPrice && (
                              <span className="text-[9px] sm:text-[10px] md:text-sm text-gray-500 line-through">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                </div>

                {/* Order Tracking Timeline - Expanded View */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-6 bg-blue-50 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4 flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-base">
                          <FaTruck className="text-blue-600 text-[10px] sm:text-xs md:text-sm" />
                          Order Tracking
                        </h4>
                        <div className="relative">
                          <div className="space-y-3 sm:space-y-4">
                            {/* Step 1: Order Confirmed */}
                            <div className="flex gap-2 sm:gap-3 md:gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                                  trackingStatus.step >= 1 ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                  <FaCheckCircle className={`text-white text-xs sm:text-sm md:text-lg ${
                                    trackingStatus.step >= 1 ? 'opacity-100' : 'opacity-50'
                                  }`} />
                                </div>
                                {trackingStatus.step < 4 && (
                                  <div className={`w-0.5 h-8 sm:h-10 md:h-12 mt-1 sm:mt-1.5 md:mt-2 ${
                                    trackingStatus.step >= 2 ? 'bg-green-500' : 'bg-gray-300'
                                  }`}></div>
                                )}
                              </div>
                              <div className="flex-1 pb-3 sm:pb-3.5 md:pb-4">
                                <h5 className={`font-medium mb-0.5 sm:mb-1 text-[10px] sm:text-xs md:text-base ${
                                  trackingStatus.step >= 1 ? 'text-gray-800' : 'text-gray-400'
                                }`}>
                                  Order Confirmed
                                </h5>
                                <p className={`text-[10px] sm:text-xs md:text-sm ${
                                  trackingStatus.step >= 1 ? 'text-gray-600' : 'text-gray-400'
                                }`}>
                                  Your order has been confirmed
                                </p>
                                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 mt-0.5 sm:mt-1">{formatDate(order.date)}</p>
                              </div>
                            </div>

                            {/* Step 2: Processing */}
                            <div className="flex gap-2 sm:gap-3 md:gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                                  trackingStatus.step >= 2 ? 'bg-blue-500' : 'bg-gray-300'
                                }`}>
                                  <FaBox className={`text-white text-xs sm:text-sm md:text-lg ${
                                    trackingStatus.step >= 2 ? 'opacity-100' : 'opacity-50'
                                  }`} />
                                </div>
                                {trackingStatus.step < 4 && (
                                  <div className={`w-0.5 h-8 sm:h-10 md:h-12 mt-1 sm:mt-1.5 md:mt-2 ${
                                    trackingStatus.step >= 3 ? 'bg-blue-500' : 'bg-gray-300'
                                  }`}></div>
                                )}
                              </div>
                              <div className="flex-1 pb-3 sm:pb-3.5 md:pb-4">
                                <h5 className={`font-medium mb-0.5 sm:mb-1 text-[10px] sm:text-xs md:text-base ${
                                  trackingStatus.step >= 2 ? 'text-gray-800' : 'text-gray-400'
                                }`}>
                                  Processing
                                </h5>
                                <p className={`text-[10px] sm:text-xs md:text-sm ${
                                  trackingStatus.step >= 2 ? 'text-gray-600' : 'text-gray-400'
                                }`}>
                                  Your order is being prepared for shipment
                                </p>
                              </div>
                            </div>

                            {/* Step 3: Shipped */}
                            <div className="flex gap-2 sm:gap-3 md:gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                                  trackingStatus.step >= 3 ? 'bg-purple-500' : 'bg-gray-300'
                                }`}>
                                  <FaTruck className={`text-white text-xs sm:text-sm md:text-lg ${
                                    trackingStatus.step >= 3 ? 'opacity-100' : 'opacity-50'
                                  }`} />
                                </div>
                                {trackingStatus.step < 4 && (
                                  <div className={`w-0.5 h-8 sm:h-10 md:h-12 mt-1 sm:mt-1.5 md:mt-2 ${
                                    trackingStatus.step >= 4 ? 'bg-purple-500' : 'bg-gray-300'
                                  }`}></div>
                                )}
                              </div>
                              <div className="flex-1 pb-3 sm:pb-3.5 md:pb-4">
                                <h5 className={`font-medium mb-0.5 sm:mb-1 text-[10px] sm:text-xs md:text-base ${
                                  trackingStatus.step >= 3 ? 'text-gray-800' : 'text-gray-400'
                                }`}>
                                  Shipped
                                </h5>
                                <p className={`text-[10px] sm:text-xs md:text-sm ${
                                  trackingStatus.step >= 3 ? 'text-gray-600' : 'text-gray-400'
                                }`}>
                                  Your order has been shipped
                                </p>
                              </div>
                            </div>

                            {/* Step 4: Delivered */}
                            <div className="flex gap-2 sm:gap-3 md:gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                                  trackingStatus.step >= 4 ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                  <FaCheckCircle className={`text-white text-xs sm:text-sm md:text-lg ${
                                    trackingStatus.step >= 4 ? 'opacity-100' : 'opacity-50'
                                  }`} />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h5 className={`font-medium mb-0.5 sm:mb-1 text-[10px] sm:text-xs md:text-base ${
                                  trackingStatus.step >= 4 ? 'text-gray-800' : 'text-gray-400'
                                }`}>
                                  Delivered
                                </h5>
                                <p className={`text-[10px] sm:text-xs md:text-sm ${
                                  trackingStatus.step >= 4 ? 'text-gray-600' : 'text-gray-400'
                                }`}>
                                  Your order has been delivered
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Support Link */}
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                            Need help tracking your order?{' '}
                            <Link to="/support" className="text-blue-600 hover:underline font-medium">
                              Contact Support
                            </Link>
                            {' '}or check{' '}
                            <Link to="/faq" className="text-blue-600 hover:underline font-medium">
                              FAQs
                            </Link>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Order Summary */}
                <div className="px-2 sm:px-3 md:px-6 py-2 sm:py-2.5 md:py-4 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5 md:gap-4">
                    {/* Shipping Address */}
                    {order.shippingAddress && (
                      <div>
                        <div className="flex items-center justify-between mb-1 sm:mb-1.5 md:mb-2">
                          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                            <FaMapMarkerAlt className="text-gray-600 text-[10px] sm:text-xs md:text-sm" />
                            <h4 className="font-semibold text-gray-800 text-[10px] sm:text-xs md:text-base">
                              Shipping Address
                            </h4>
                          </div>
                          <button
                            onClick={() => handleOpenMap(order.shippingAddress)}
                            className="flex items-center gap-0.5 sm:gap-1 hover:opacity-80 transition-colors cursor-pointer text-[9px] sm:text-[10px] md:text-sm"
                            title="Open in Google Maps"
                            style={{ color: '#EA4335' }}
                          >
                            <FaMapMarkerAlt className="text-[9px] sm:text-[10px] md:text-xs" />
                            <span>View Map</span>
                          </button>
                        </div>
                        <p className="text-[9px] sm:text-[10px] md:text-sm text-gray-600">
                          {order.shippingAddress.name} - {order.shippingAddress.mobile}
                        </p>
                        <p className="text-[9px] sm:text-[10px] md:text-sm text-gray-600">
                          {order.shippingAddress.address}, {order.shippingAddress.cityState}, {order.shippingAddress.postalCode}
                        </p>
                      </div>
                    )}

                    {/* Payment Method */}
                    <div>
                      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-1.5 md:mb-2">
                        <FaCreditCard className="text-gray-600 text-[10px] sm:text-xs md:text-sm" />
                        <h4 className="font-semibold text-gray-800 text-[10px] sm:text-xs md:text-base">
                          Payment Method
                        </h4>
                      </div>
                      <p className="text-[9px] sm:text-[10px] md:text-sm text-gray-600">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  {/* Order Totals */}
                  <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-[9px] sm:text-[10px] md:text-sm text-gray-600 mb-1 sm:mb-1.5 md:mb-2">
                      <span>Subtotal ({order.totalItems} items)</span>
                      <span>₹{order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[9px] sm:text-[10px] md:text-sm text-gray-600 mb-1 sm:mb-1.5 md:mb-2">
                      <span>Delivery Charge</span>
                      <span>₹{order.deliveryCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[9px] sm:text-[10px] md:text-sm text-gray-600 mb-1 sm:mb-1.5 md:mb-2">
                      <span>Platform Fee</span>
                      <span>₹{order.platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm md:text-lg font-bold text-gray-800 pt-1 sm:pt-1.5 md:pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}

        {/* Cancel Order Modal */}
        <AnimatePresence>
          {showCancelModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCancelModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaTimesCircle className="text-red-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Cancel Order
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Are you sure you want to cancel order <span className="font-semibold">#{orderToCancel?.id}</span>?
                </p>
                
                {orderToCancel?.paymentStatus === 'Paid' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <FaInfoCircle className="text-yellow-600 mt-0.5" />
                      <p className="text-sm text-yellow-800">
                        Your payment will be refunded to your original payment method within 5-7 business days.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={confirmCancelOrder}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Cancel Order
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
