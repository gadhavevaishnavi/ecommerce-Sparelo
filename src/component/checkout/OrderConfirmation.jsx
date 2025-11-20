import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaBox, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaCreditCard,
  FaDownload,
  FaHome,
  FaShoppingBag
} from "react-icons/fa";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get('orderId') || location.state?.orderId;
    
    if (orderId) {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = savedOrders.find(o => o.id === orderId);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        navigate('/myorder');
      }
    } else {
      navigate('/myorder');
    }
  }, [location, navigate]);

  // Format date
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  // Get estimated delivery date
  const getEstimatedDelivery = useCallback(() => {
    if (!order) return '';
    const date = new Date(order.date);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  }, [order]);

  // Order Timeline Steps Component
  const TimelineStep = React.memo(({ icon: Icon, title, description, date, isActive, isCompleted }) => (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
          isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
        }`}>
          <Icon className={`text-xl ${
            isCompleted || isActive ? 'text-white' : 'text-gray-500'
          }`} />
        </div>
        {title !== 'Delivered' && (
          <div className={`w-0.5 h-16 mt-2 ${
            isCompleted ? 'bg-green-500' : 'bg-gray-300'
          }`}></div>
        )}
      </div>
      <div className="flex-1 pb-6">
        <h3 className={`font-semibold mb-1 ${
          isCompleted || isActive ? 'text-gray-800' : 'text-gray-400'
        }`}>
          {title}
        </h3>
        <p className={`text-sm mb-1 ${
          isCompleted || isActive ? 'text-gray-600' : 'text-gray-500'
        }`}>
          {description}
        </p>
        {date && (
          <p className="text-xs text-gray-500">{date}</p>
        )}
      </div>
    </div>
  ));

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
            >
              <FaCheckCircle className="text-white text-5xl" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute inset-0 bg-green-500 rounded-full opacity-20"
            />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-2"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-2"
          >
            Thank you for your purchase
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500"
          >
            Order ID: <span className="font-semibold text-gray-700">{order.id}</span>
          </motion.p>
        </motion.div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          
          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {order.items.slice(0, 3).map((item, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100?text=Product';
                  }}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {item.partNumber || item.id} | Qty: {item.quantity}
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    ₹{((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            {order.items.length > 3 && (
              <p className="text-sm text-gray-600 text-center pt-2">
                + {order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <h3 className="font-semibold text-gray-800">Delivery Address</h3>
                </div>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.name}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.address}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.cityState}, {order.shippingAddress.postalCode}
                </p>
              </div>
            )}

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaCreditCard className="text-green-600" />
                <h3 className="font-semibold text-gray-800">Payment</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                Method: <span className="font-medium">{order.paymentMethod}</span>
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-lg font-bold text-gray-800 mt-2">
                ₹{order.total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaTruck className="text-blue-600 text-xl" />
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="text-lg font-semibold text-blue-800">
                  {getEstimatedDelivery()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Tracking Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Tracking</h2>
          
          <div className="relative">
            <div className="space-y-6">
              <TimelineStep
                icon={FaCheckCircle}
                title="Order Confirmed"
                description="Your order has been confirmed and payment received"
                date={formatDate(order.date)}
                isCompleted={true}
              />
              <TimelineStep
                icon={FaBox}
                title="Processing"
                description="Your order is being prepared for shipment"
                date={formatDate(new Date(Date.now() + 86400000).toISOString())}
                isActive={true}
              />
              <TimelineStep
                icon={FaTruck}
                title="Shipped"
                description="Your order will be shipped soon"
                isActive={false}
              />
              <TimelineStep
                icon={FaCheckCircle}
                title="Delivered"
                description="Your order will be delivered to your address"
                isActive={false}
              />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/myorder"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
          >
            <FaShoppingBag />
            View All Orders
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-lg"
          >
            <FaHome />
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold shadow-lg"
          >
            <FaDownload />
            Download Receipt
          </button>
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600 mb-2">
            Need help? Check our{" "}
            <Link to="/support" className="text-blue-600 hover:underline font-medium">
              Support Center
            </Link>
            {" "}or{" "}
            <Link to="/faq" className="text-blue-600 hover:underline font-medium">
              FAQs
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
