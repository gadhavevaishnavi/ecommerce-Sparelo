import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaHeart, FaShare, FaStar, FaFilter, FaTruck, FaShieldAlt, FaSyncAlt, FaCheckCircle } from "react-icons/fa";
import { useCart } from '../contexts/CartContext';

const PartSearchResults = () => {
  const { pn } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  // Get car maker from URL params or location state
  const searchParams = new URLSearchParams(location.search);
  const carMaker = searchParams.get('maker') || location.state?.maker || null;
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState(pn || "");

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pn]);

  // Handle Add to Cart
  const handleAddToCart = (part) => {
    // Convert part data to match cart context format
    const cartProduct = {
      id: part.id,
      name: part.name,
      brand: part.brand,
      price: part.originalPrice || part.price,
      discountPrice: part.originalPrice ? part.price : null,
      discount: part.originalPrice ? Math.round(((part.originalPrice - part.price) / part.originalPrice) * 100) : null,
      imageUrl: part.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      rating: part.rating,
      reviews: part.reviews,
    };
    addToCart(cartProduct);
    alert(`${part.name} added to cart!`);
  };

  // Mock parts data
  const parts = [
    {
      id: 1,
      name: "Genuine OEM Spark Plug",
      partNumber: "SP-1234-OEM",
      oem: pn,
      price: 459.99,
      originalPrice: 659.99,
      brand: "NGK",
      category: "Ignition System",
      rating: 4.8,
      reviews: 342,
      image: "/spark-plug.jpg",
      compatibility: "Direct Fit",
      warranty: "2 Years",
      delivery: "Free 2-Day Shipping",
      stock: 28,
      isOEM: true,
      features: ["Iridium Tip", "Anti-Corrosion", "Pre-gapped"]
    },
    {
      id: 2,
      name: "Premium Aftermarket Equivalent",
      partNumber: "SP-1234-PRE",
      oem: pn,
      price: 329.99,
      originalPrice: 499.99,
      brand: "Bosch",
      category: "Ignition System",
      rating: 4.6,
      reviews: 215,
      image: "/spark-plug-equivalent.jpg",
      compatibility: "Perfect Match",
      warranty: "3 Years",
      delivery: "Free Shipping",
      stock: 45,
      isOEM: false,
      features: ["Platinum Electrode", "Copper Core", "Easy Installation"]
    },
    {
      id: 3,
      name: "Performance Upgrade Version",
      partNumber: "SP-1234-PERF",
      oem: pn,
      price: 689.99,
      originalPrice: 899.99,
      brand: "Denso",
      category: "Ignition System",
      rating: 4.9,
      reviews: 178,
      image: "/spark-plug-performance.jpg",
      compatibility: "Enhanced Performance",
      warranty: "Lifetime",
      delivery: "Free Next Day",
      stock: 12,
      isOEM: false,
      features: ["Iridium Power", "Lifetime Warranty", "Performance Tuned"]
    },
    {
      id: 4,
      name: "Economy Replacement",
      partNumber: "SP-1234-ECO",
      oem: pn,
      price: 189.99,
      originalPrice: 299.99,
      brand: "Standard Motor",
      category: "Ignition System",
      rating: 4.2,
      reviews: 89,
      image: "/spark-plug-economy.jpg",
      compatibility: "Universal Fit",
      warranty: "1 Year",
      delivery: "Free Shipping",
      stock: 67,
      isOEM: false,
      features: ["Copper Core", "Reliable Performance", "Cost Effective"]
    },
    {
      id: 5,
      name: "OEM Manufacturer Part",
      partNumber: "SP-1234-GEN",
      oem: pn,
      price: 529.99,
      originalPrice: 729.99,
      brand: "Original Equipment",
      category: "Ignition System",
      rating: 4.7,
      reviews: 421,
      image: "/spark-plug-oem.jpg",
      compatibility: "Exact OEM Spec",
      warranty: "2 Years",
      delivery: "Free 2-Day Shipping",
      stock: 34,
      isOEM: true,
      features: ["Factory Spec", "Direct Replacement", "Quality Assured"]
    },
    {
      id: 6,
      name: "Professional Grade",
      partNumber: "SP-1234-PRO",
      oem: pn,
      price: 399.99,
      originalPrice: 599.99,
      brand: "Champion",
      category: "Ignition System",
      rating: 4.5,
      reviews: 156,
      image: "/spark-plug-pro.jpg",
      compatibility: "Professional Fit",
      warranty: "5 Years",
      delivery: "Free Shipping",
      stock: 23,
      isOEM: false,
      features: ["Professional Grade", "Long Life", "Easy Installation"]
    }
  ];

  const filters = [
    { name: "Brand", options: ["All Brands", "NGK", "Bosch", "Denso", "Champion", "Standard Motor"] },
    { name: "Price Range", options: ["All Prices", "Under ₹500", "₹500-₹1000", "₹1000-₹2000", "Above ₹2000"] },
    { name: "Warranty", options: ["Any Warranty", "1 Year", "2 Years", "3 Years", "5 Years+"] },
    { name: "Type", options: ["All Types", "OEM", "Aftermarket", "Performance", "Economy"] }
  ];

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-8"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-32 bg-gray-300 rounded-xl"></div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-xl p-4 shadow">
                  <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Parts Matching: <span className="text-red-600">{pn}</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Found {parts.length} compatible parts for your search. Compare options and choose the best fit.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by part number, brand, or description..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Matches", value: parts.length, color: "bg-blue-500" },
            { label: "OEM Parts", value: parts.filter(p => p.isOEM).length, color: "bg-green-500" },
            { label: "Brands", value: new Set(parts.map(p => p.brand)).size, color: "bg-purple-500" },
            { label: "In Stock", value: parts.filter(p => p.stock > 0).length, color: "bg-orange-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center group hover:shadow-xl transition-all duration-300">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} text-white rounded-full mb-2 group-hover:scale-110 transition-transform`}>
                <span className="font-bold text-lg">{stat.value}</span>
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters and Sort Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaFilter />
                Filters
              </button>
              
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-red-600">{parts.length}</span> results for <span className="font-mono bg-gray-100 px-2 py-1 rounded">{pn}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-600 font-medium">Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="relevance">Best Match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="brand">Brand Name</option>
                <option value="warranty">Warranty Length</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filters.map((filter, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {filter.name}
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                      {filter.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Reset Filters
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map((part) => (
            <div 
              key={part.id} 
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate(`/catalog/part-p-${part.id}${carMaker ? `?maker=${carMaker}` : ''}`)}
            >
              
              {/* Part Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    part.isOEM 
                      ? "bg-blue-100 text-blue-800 border border-blue-200" 
                      : "bg-green-100 text-green-800 border border-green-200"
                  }`}>
                    {part.isOEM ? "GENUINE OEM" : "AFTERMARKET"}
                  </span>
                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                      <FaHeart className="text-sm" />
                    </button>
                    <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                      <FaShare className="text-sm" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 font-mono">Ref: {part.partNumber}</div>
              </div>

              {/* Part Image */}
              <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <FaSearch className="text-2xl text-gray-400" />
                </div>
                {part.isOEM && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                    CERTIFIED
                  </div>
                )}
              </div>

              {/* Part Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {part.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {part.brand}
                  </span>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                    <FaCheckCircle className="text-xs" />
                    {part.compatibility}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(part.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {part.rating} ({part.reviews} reviews)
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {part.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                      {feature}
                    </span>
                  ))}
                  {part.features.length > 2 && (
                    <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                      +{part.features.length - 2} more
                    </span>
                  )}
                </div>

                {/* Price and Warranty */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-600">₹{part.price}</span>
                      {part.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">₹{part.originalPrice}</span>
                      )}
                    </div>
                    {part.originalPrice && (
                      <div className="text-sm text-green-600 font-semibold">
                        Save ₹{(part.originalPrice - part.price).toFixed(2)}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FaShieldAlt />
                      {part.warranty}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FaTruck />
                      {part.delivery}
                    </div>
                  </div>
                </div>

                {/* Stock and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className={`font-medium ${
                      part.stock > 10 ? "text-green-600" : 
                      part.stock > 5 ? "text-orange-600" : "text-red-600"
                    }`}>
                      {part.stock > 10 ? "In Stock" : 
                       part.stock > 5 ? "Low Stock" : "Last Few"}
                    </span>
                  </div>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => navigate(`/catalog/part-p-${part.id}${carMaker ? `?maker=${carMaker}` : ''}`)}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => handleAddToCart(part)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More and Help Section */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 font-semibold mb-8">
            Load More Parts
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help Finding the Right Part?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-4">
                <FaSyncAlt className="text-3xl text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Compare Options</div>
                <p className="text-gray-600 mt-1">View detailed specifications and compare different brands</p>
              </div>
              <div className="text-center p-4">
                <FaShieldAlt className="text-3xl text-green-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Warranty Protected</div>
                <p className="text-gray-600 mt-1">All parts come with manufacturer warranty</p>
              </div>
              <div className="text-center p-4">
                <FaTruck className="text-3xl text-orange-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Fast Shipping</div>
                <p className="text-gray-600 mt-1">Get your parts delivered quickly and reliably</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartSearchResults;