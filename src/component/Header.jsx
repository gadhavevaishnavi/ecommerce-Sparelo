import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
  FaCamera,
  FaVideo,
  FaTimes,
  FaUpload,
} from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import logo3 from "./logo3.png"; 
import { Sider } from "./Sider";
import { useCart } from '../contexts/CartContext';

export const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerPN, setHeaderPN] = useState("");
  const { getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [isScrolled, setIsScrolled] = useState(false);
  const [show360UploadModal, setShow360UploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('photo'); // 'photo' or 'video'
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Scroll effect for header - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header at the top of the page
      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down
          setIsHeaderVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsHeaderVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const categories = [
    { value: "0", label: "All Categories", href: "/category" },
    { value: "1", label: "Air Conditioning", href: "/catalog/air_conditioning/" },
    { value: "2", label: "Bearings", href: "/catalog/bearings/" },
    { value: "3", label: "Belts Chains And Rollers", href: "/catalog/drive_belts/" },
    { value: "4", label: "Body", href: "/catalog/body/" },
    { value: "5", label: "Brake System", href: "/catalog/brakes/" },
    { value: "6", label: "Car Accessories", href: "/catalog/car_accessories/" },
    { value: "7", label: "Clutch System", href: "/catalog/clutch/" },
    { value: "8", label: "Control Cables", href: "/catalog/control_cables/" },
    { value: "9", label: "Electrical Components", href: "/catalog/electric_components/" },
    { value: "10", label: "Engine", href: "/catalog/engine/" },
    { value: "11", label: "Engine Cooling System", href: "/catalog/cooling_system/" },
    { value: "12", label: "Exhaust System", href: "/catalog/exhaust/" },
    { value: "13", label: "Filters", href: "/catalog/filters/" },
    { value: "14", label: "Fuel Supply System", href: "/catalog/fuelsystem/" },
    { value: "15", label: "Gaskets & Seals", href: "/catalog/Gasket_SealingRings/" },
    { value: "16", label: "Interior and Comfort", href: "/catalog/interior_comfort/" },
    { value: "17", label: "Lighting", href: "/catalog/lighting/" },
    { value: "18", label: "Maintenance Service Parts", href: "/catalog/maintenance_service_parts/" },
    { value: "19", label: "Oils and Fluids", href: "/catalog/oilsfluids/" },
    { value: "20", label: "Pipes & Hoses", href: "/catalog/pipes_hoses/" },
    { value: "21", label: "Sensors Relays and Control Units", href: "/catalog/sensors_control_units/" },
    { value: "22", label: "Steering", href: "/catalog/steering/" },
    { value: "23", label: "Suspension and Arms", href: "/catalog/suspension/" },
    { value: "24", label: "Towbar Parts", href: "/catalog/towbar/" },
    { value: "25", label: "Transmission", href: "/catalog/transmission/" },
    { value: "26", label: "Trims", href: "/catalog/trims/" },
    { value: "27", label: "Universal", href: "/catalog/universal/" },
    { value: "28", label: "Wheels", href: "/catalog/wheels/" },
    { value: "29", label: "Windscreen Cleaning System", href: "/catalog/windscreen_cleaning_system/" }
  ];

  // Navigation handlers
  const handleSelectChange = (e) => {
    const href = e.target.selectedOptions[0].getAttribute("data-href");
    setSelectedCategory(e.target.value);
    if (href && href !== "0") {
      navigate(href);
    }
  };

  const handleSearch = () => {
    const pn = headerPN.trim();
    if (!pn) return;

    // Oriparts search functionality
    const search = encodeURIComponent(pn);
    const backUrl = `${window.location.origin}/search/`;
    const url = `https://oriparts.com/?search=${search}&back_url_pn=${encodeURIComponent(backUrl)}${pn}`;
    window.open(url, "_blank", "noopener");
  };

  const goToWishlist = () => navigate("/mywishlist");
  const goToCart = () => navigate("/cart");
  const goToHomePage = () => navigate("/");

  return (
    <motion.header
      className={`w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50
         ${isScrolled ? "shadow-xl bg-white/95 backdrop-blur-sm" : "shadow-sm"
        }`}
      initial={{ y: 0 }}
      animate={{ 
        y: isHeaderVisible ? 0 : -100,
        opacity: isHeaderVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {/* ===== MAIN HEADER ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Logo & Departments */}
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img
              onClick={goToHomePage}
              src={logo3}
              alt="Logo"
              className="h-10 w-auto cursor-pointer drop-shadow-lg"
            />
          </motion.div>

        </div>

        {/* Search Bar with Category & Vehicle Selector */}
        <div className="flex items-center bg-white rounded-xl shadow-lg overflow-hidden flex-1 max-w-2xl border border-gray-200">
          {/* Category Selector */}
          <div className="relative">
            <select
              className="px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs outline-none border-r border-gray-300 cursor-pointer appearance-none pr-6"
              value={selectedCategory}
              onChange={handleSelectChange}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value} data-href={category.href}>
                  {category.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by number plate or part number..."
            className="flex-1 px-3 py-2 bg-transparent text-gray-700 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={headerPN}
            onChange={(e) => setHeaderPN(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Search Button */}
          <motion.button
            onClick={handleSearch}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-gray-700 px-4 py-2 hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch className="text-sm" />
          </motion.button>

                  </div>

        {/* 360 Degree Upload Button */}
        <motion.button
          onClick={() => setShow360UploadModal(true)}
          className="relative px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-1.5 text-gray-700"
                        whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          title="Upload  Image/Video"
        >
          <div className="relative">
            <FaCamera className="text-sm text-red-700" />
            <span className="absolute -top-1 -right-1 text-xs font-bold text-gray-700">+</span>
                        </div>
          <span className="text-xs font-medium">Upload Image/Video</span>
                    </motion.button>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <motion.button
            onClick={goToWishlist}
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart className="text-xl text-red-900" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-gray-700 text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-lg text-[10px]">
              0
            </span>
          </motion.button>


          {/* Cart */}
            <motion.button
              onClick={goToCart}
            className="relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShoppingCart className="text-xl text-red-900" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-gray-700 text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-lg text-[10px]">
                  {getTotalItems()}
                </span>
              )}
            </motion.button>

          {/* Sidebar button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-2xl text-blue-900 hover:scale-110 transition-transform"
          >
            <IoReorderThreeOutline />
          </button>

        </div>
      </div>


      {/* Sidebar */}
      <Sider isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 360 Degree Upload Modal */}
      <AnimatePresence>
        {show360UploadModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setShow360UploadModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 md:p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">Upload 360° Content</h2>
                    <button
                      onClick={() => setShow360UploadModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>

                  {/* Type Selection */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setUploadType('photo')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        uploadType === 'photo'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FaCamera className="inline-block mr-1.5 text-xs" />
                      Image
                    </button>
                    <button
                      onClick={() => setUploadType('video')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        uploadType === 'video'
                          ? 'bg-cyan-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FaVideo className="inline-block mr-1.5 text-xs" />
                      Video
                    </button>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-5 text-center hover:border-blue-400 transition-colors mb-4 bg-gray-50">
                    <div className="flex flex-col items-center">
                      {uploadType === 'photo' ? (
                        <FaCamera className="text-3xl md:text-4xl text-gray-400 mb-2" />
                      ) : (
                        <FaVideo className="text-3xl md:text-4xl text-gray-400 mb-2" />
                      )}
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                        Upload {uploadType === 'photo' ? 'Image' : '360° Video'}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Drag and drop or click to browse
                      </p>
                      <input
                        type="file"
                        accept={uploadType === 'photo' ? 'image/*' : 'video/*'}
                        className="hidden"
                        id="360-upload-input"
                        multiple
                      />
                      <label
                        htmlFor="360-upload-input"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all cursor-pointer text-sm shadow-sm"
                      >
                        <FaUpload className="text-xs" />
                        <span>Choose File</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        {uploadType === 'photo' ? 'JPG, PNG, HEIC' : 'MP4, MOV, AVI'} (Max 100MB)
                      </p>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder={`Enter ${uploadType === 'photo' ? 'photo' : 'video'} title...`}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Description (Optional)
                      </label>
                      <textarea
                        rows="2"
                        placeholder="Add a description..."
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tags (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., car, parts, review"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShow360UploadModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Handle upload logic here
                        alert(`${uploadType === 'photo' ? 'Photo' : 'Video'} upload functionality will be implemented`);
                        setShow360UploadModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all font-medium text-sm shadow-md"
                    >
                      Upload {uploadType === 'photo' ? 'Photo' : 'Video'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
