import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaMapMarkerAlt, FaFileAlt, FaCreditCard, FaArrowLeft, FaFileInvoice, FaPlus, FaCheck } from "react-icons/fa";
import LocationConfirmModal from "./LocationConfirmModal";
import AddAddressModal from "./AddAddressModal";

const ShippingAddress = () => {
  const navigate = useNavigate();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [pendingAddressData, setPendingAddressData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    postalCode: "412406",
    cityState: "Pune, MAHARASHTRA, India",
    addressTitle: "",
  });

  // Load saved addresses from localStorage
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('savedAddresses');
    return saved ? JSON.parse(saved) : [];
  });

  // Load selected address ID from localStorage
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const saved = localStorage.getItem('shippingAddress');
    if (saved) {
      const address = JSON.parse(saved);
      return address.id || null;
    }
    return null;
  });

  const selectedAddress = savedAddresses.find(addr => addr.id === selectedAddressId);

  // Auto-show address selection if addresses exist
  useEffect(() => {
    if (savedAddresses.length > 0 && !showAddressSelection) {
      setShowAddressSelection(true);
      // If no address is selected but addresses exist, select the first one
      if (!selectedAddressId && savedAddresses.length > 0) {
        setSelectedAddressId(savedAddresses[0].id);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Step 1: Form submission - opens map confirmation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Show location confirmation modal
    setShowLocationModal(true);
  };

  // Handler for when AddAddressModal wants to confirm location
  const handleNewAddressConfirmLocation = (addressFormData) => {
    // Store pending address data
    setPendingAddressData(addressFormData);
    setIsAddingNewAddress(true);
    // Close AddAddressModal and open LocationModal
    setShowAddAddressModal(false);
    setShowLocationModal(true);
  };

  // Step 2: After map confirmation, save address and show selection page
  const handleConfirmLocation = () => {
    // Determine which data to use (initial form or new address)
    const dataToUse = isAddingNewAddress ? pendingAddressData : formData;
    
    // Create address object from form data
    const newAddress = {
      id: Date.now(),
      title: dataToUse.addressTitle || `${dataToUse.firstName}'s Address`,
      name: `${dataToUse.firstName} ${dataToUse.lastName}`,
      mobile: dataToUse.mobile,
      address: dataToUse.address,
      cityState: dataToUse.cityState,
      postalCode: dataToUse.postalCode,
    };

    // Add to saved addresses
    setSavedAddresses(prev => {
      const updated = [...prev, newAddress];
      // Save to localStorage
      localStorage.setItem('savedAddresses', JSON.stringify(updated));
      return updated;
    });
    // Select this address
    setSelectedAddressId(newAddress.id);
    
    // Reset flags
    setIsAddingNewAddress(false);
    setPendingAddressData(null);
    
    // Close modal
    setShowLocationModal(false);
    
    // If this is the first address (from initial form), show address selection page
    // If this is a new address (from AddAddressModal), stay on address selection page
    if (!showAddressSelection) {
      setShowAddressSelection(true);
    }
  };

  // Step 3: Final proceed from address selection page
  const handleFinalProceed = () => {
    if (selectedAddress) {
      // Save selected address and proceed to review
      localStorage.setItem('shippingAddress', JSON.stringify(selectedAddress));
      navigate('/checkout/review');
    }
  };

  const handleBack = () => {
    if (showAddressSelection) {
      // Go back to form
      setShowAddressSelection(false);
    } else {
      // Go back to cart
      navigate('/cart');
    }
  };

  // Open Google Maps with address
  const handleOpenMap = (address, e) => {
    if (e) {
      e.stopPropagation(); // Prevent card selection when clicking map icon
    }
    const fullAddress = `${address.address}, ${address.cityState}, ${address.postalCode}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(googleMapsUrl, '_blank');
  };

  // Show Address Selection Page (after map confirmation)
  if (showAddressSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Enhanced Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 md:mt-16 mb-8 bg-white rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 border border-gray-200"
          >
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              <motion.button
                onClick={() => navigate('/cart')}
                className="flex flex-col items-center cursor-pointer group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-300 transition-colors shadow-md group-hover:shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaShoppingCart className="text-blue-600 text-lg" />
                </motion.div>
                <span className="text-sm text-blue-600 font-medium">Cart</span>
              </motion.button>
              <motion.div 
                className="h-1 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.div 
                className="flex flex-col items-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-2 shadow-xl ring-4 ring-blue-100 relative overflow-hidden"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0px rgba(37, 99, 235, 0.4)",
                      "0 0 0 8px rgba(37, 99, 235, 0)",
                      "0 0 0 0px rgba(37, 99, 235, 0.4)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <FaMapMarkerAlt className="text-white text-lg relative z-10" />
                </motion.div>
                <span className="text-sm text-blue-600 font-bold">Address</span>
              </motion.div>
              <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full"></div>
              <motion.button
                onClick={() => {
                  const savedAddress = localStorage.getItem('shippingAddress');
                  if (savedAddress) {
                    navigate('/checkout/review');
                  }
                }}
                className="flex flex-col items-center cursor-pointer group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-300 transition-colors shadow-md group-hover:shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaFileAlt className="text-blue-600 text-lg" />
                </motion.div>
                <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">Review</span>
              </motion.button>
              <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full"></div>
              <motion.button
                onClick={() => {
                  const savedAddress = localStorage.getItem('shippingAddress');
                  if (savedAddress) {
                    navigate('/checkout/payment');
                  }
                }}
                className="flex flex-col items-center cursor-pointer group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-300 transition-colors shadow-md group-hover:shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaCreditCard className="text-blue-600 text-lg" />
                </motion.div>
                <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">Pay</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-blue-900">Shipping</span>{" "}
              <span className="text-blue-600">Address</span>
            </h1>
            <p className="text-gray-600">Select or add a delivery address</p>
          </motion.div>

          {/* Address Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Enhanced Saved Address Cards */}
            <AnimatePresence mode="popLayout">
              {savedAddresses.map((address, index) => (
                <motion.div 
                  key={address.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, x: -100 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.03, y: -8, rotate: 0.5 }}
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-all shadow-lg hover:shadow-2xl relative overflow-hidden ${
                    selectedAddressId === address.id 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 shadow-blue-200 ring-4 ring-blue-100' 
                      : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-blue-50/30'
                  }`}
                  onClick={() => setSelectedAddressId(address.id)}
                >
                  {selectedAddressId === address.id && (
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-bl-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <FaCheck className="text-white absolute top-2 right-2 text-lg" />
                    </motion.div>
                  )}
                <div className="flex items-start gap-3 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleOpenMap(address, e)}
                    className="text-xl mt-1 flex-shrink-0 hover:opacity-80 transition-colors cursor-pointer"
                    title="Open in Google Maps"
                    style={{ color: '#EA4335' }}
                  >
                    <FaMapMarkerAlt />
                  </motion.button>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      {address.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">
                      {address.name} - {address.mobile}
                    </p>
                    <p className="text-xs text-gray-600">
                      {address.address}, {address.cityState}, {address.postalCode}
                    </p>
                  </div>
                </div>
                <AnimatePresence>
                  {selectedAddressId === address.id && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <FaCheck />
                      SELECTED ADDRESS
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            </AnimatePresence>

            {/* Enhanced Add New Address Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: savedAddresses.length * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all flex flex-col items-center justify-center min-h-[200px] bg-white shadow-lg hover:shadow-2xl group relative overflow-hidden"
              onClick={() => setShowAddAddressModal(true)}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-100/0 to-blue-200/0 group-hover:from-blue-100/50 group-hover:to-blue-200/50 transition-all"
              />
              <motion.div 
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl relative z-10"
              >
                <FaPlus className="text-blue-600 text-3xl font-bold" />
              </motion.div>
              <p className="text-base text-blue-600 font-bold relative z-10 group-hover:text-blue-700">Add New Address</p>
            </motion.div>

            {/* Register as Business Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (savedAddresses.length + 1) * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all flex flex-col items-center justify-center min-h-[200px] bg-white shadow-md hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaFileInvoice className="text-blue-600 text-2xl" />
              </div>
              <p className="text-sm text-blue-600 font-medium text-center">
                Register as Business with <span className="font-semibold">Sparelo.com</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center pt-6 border-t border-gray-200"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold bg-white shadow-md"
            >
              <FaArrowLeft />
              Back
            </motion.button>
            <motion.button
              whileHover={selectedAddress ? { scale: 1.05, y: -2 } : {}}
              whileTap={selectedAddress ? { scale: 0.95 } : {}}
              onClick={handleFinalProceed}
              disabled={!selectedAddress}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-xl relative overflow-hidden ${
                selectedAddress
                  ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white hover:from-blue-700 hover:via-blue-600 hover:to-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedAddress && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
              <span className="relative z-10">Proceed</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Add Address Modal */}
        <AddAddressModal
          isOpen={showAddAddressModal}
          onClose={() => setShowAddAddressModal(false)}
          onConfirmLocation={handleNewAddressConfirmLocation}
        />
      </div>
    );
  }

  // Show Form Entry Page (initial state)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 md:mt-16 bg-white py-6 mb-8 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            <button
              onClick={() => navigate('/cart')}
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <FaShoppingCart className="text-blue-600 text-lg" />
              </div>
              <span className="text-sm text-blue-600 font-medium">Cart</span>
            </button>
            <div className="h-1 w-16 md:w-24 bg-blue-600"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                <FaMapMarkerAlt className="text-white text-lg" />
              </div>
              <span className="text-sm text-blue-600 font-semibold">Address</span>
            </div>
            <div className="h-1 w-16 md:w-24 bg-blue-200"></div>
            <button
              onClick={() => {
                const savedAddress = localStorage.getItem('shippingAddress');
                if (savedAddress) {
                  navigate('/checkout/review');
                }
              }}
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <FaFileAlt className="text-blue-600 text-lg" />
              </div>
              <span className="text-sm text-gray-500">Review</span>
            </button>
            <div className="h-1 w-16 md:w-24 bg-blue-200"></div>
            <button
              onClick={() => {
                const savedAddress = localStorage.getItem('shippingAddress');
                if (savedAddress) {
                  navigate('/checkout/payment');
                }
              }}
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                <FaCreditCard className="text-blue-600 text-lg" />
              </div>
              <span className="text-sm text-gray-500">Pay</span>
            </button>
          </div>
        </motion.div>

        {/* Page Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-8"
        >
          <span className="text-blue-900">Shipping</span>{" "}
          <span className="text-blue-500">Address</span>
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Main Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 -m-6 md:-m-8 mb-6 md:mb-8 p-6 md:p-8 text-white">
              <h2 className="text-2xl font-bold mb-1">Delivery Information</h2>
              <p className="text-blue-100 text-sm">Enter your shipping details</p>
            </div>
            <form onSubmit={handleFormSubmit}>
              {/* Contact Details Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-lg font-semibold text-blue-900 mb-4">
                  Contact Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-blue-300 shadow-sm focus:shadow-md"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-blue-300 shadow-sm focus:shadow-md"
                    />
                  </motion.div>
                </div>

                {/* Mobile Number */}
                <div className="flex gap-2">
                  <div className="w-20">
                    <input
                      type="text"
                      value="+91"
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-center font-medium"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile"
                      required
                      pattern="[0-9]{10}"
                      maxLength="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Address Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-blue-900 mb-4">
                  Address
                </h2>
                
                {/* Address Textarea */}
                <div className="mb-4">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    rows="4"
                    maxLength="110"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.address.length}/110
                  </div>
                </div>

                {/* Postal Code and City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal Code"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="cityState"
                      value={formData.cityState}
                      onChange={handleChange}
                      placeholder="City, State, Country"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Address Title */}
                <div>
                  <input
                    type="text"
                    name="addressTitle"
                    value={formData.addressTitle}
                    onChange={handleChange}
                    placeholder="Address Title (Optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-between items-center pt-6 border-t border-gray-200"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold shadow-md"
                >
                  <FaArrowLeft />
                  Back
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-lg"
                >
                  Proceed
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Right Sidebar - Business Registration */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-80 flex-shrink-0"
          >
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl border border-blue-200 shadow-lg p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FaFileInvoice className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Register as Business with{" "}
                  <span className="text-blue-600">Sparelo.com</span>
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  Get exclusive business benefits and bulk pricing
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium shadow-md"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Location Confirmation Modal */}
      <LocationConfirmModal
        isOpen={showLocationModal}
        onClose={() => {
          setShowLocationModal(false);
          // If we were adding a new address, reset the flag
          if (isAddingNewAddress) {
            setIsAddingNewAddress(false);
            setPendingAddressData(null);
          }
        }}
        onConfirm={handleConfirmLocation}
        address={isAddingNewAddress ? pendingAddressData : formData}
      />
    </div>
  );
};

export default ShippingAddress;