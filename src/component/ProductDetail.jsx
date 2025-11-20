import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaShare, FaStar, FaTruck, FaShieldAlt, FaCheckCircle, FaHome, FaEye, FaMapMarkerAlt, FaFileInvoice, FaRedoAlt, FaInfoCircle } from "react-icons/fa";
import { useCart } from '../contexts/CartContext';
import Breadcrumbs from './catalogue/Breadcrumbs';

const ProductDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);

  // Get product from location state (passed from TimingBelt) or fetch it
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      // If product data is passed via state, use it
      if (location.state?.product) {
        const productData = location.state.product;
        setProduct({
          ...productData,
          images: [
            productData.image,
            productData.image,
            productData.image,
            productData.image,
          ],
          fullPartNumber: productData.partNumber,
          mrp: productData.mrp || productData.price,
          stock: 9,
          isCompatible: false,
          compatibility: "Not compatible with your cars",
          compatibleVehicles: [],
          replacementsPrice: 316,
          category: "Maintenance Service Parts",
          subCategory: "Belt",
          subSubCategory: "Timing Belt",
        });
        setLoading(false);
        return;
      }

      // Otherwise, fetch mock data based on itemId
      setTimeout(() => {
        setProduct({
          id: itemId,
          name: "BELT,TIMING",
          partNumber: "127600C20",
          fullPartNumber: "127600C20",
          brand: "MARUTI SUZUKI",
          seller: "Bengaluru/BPN",
          price: 850.00,
          mrp: 850.00,
          category: "Maintenance Service Parts",
          subCategory: "Belt",
          subSubCategory: "Timing Belt",
          rating: 4.5,
          reviews: 23,
          images: [
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
            "https://boodmo.com/media/cache/catalog_image/images/categories/92bef24.jpg",
          ],
          compatibility: "Not compatible with your cars",
          isCompatible: false,
          stock: 9,
          isOEM: true,
          origin: "OEM",
          class: "Timing Belt",
          fulfilledBySparelo: true,
          spareloChoice: true,
          deliveryDays: 4,
          replacementsPrice: 316,
          description: "Timing Belt for MARUTI EECO, ESTEEM, GYPSY, SUPER CARRY, SWIFT, SWIFT DZIRE, VERSA, ZEN - 127600C20 - MARUTI SUZUKI",
          compatibleVehicles: [],
        });
        setLoading(false);
      }, 800);
    };

    if (itemId) {
      fetchProduct();
    }
  }, [itemId, location.state]);

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.mrp || product.price,
        discountPrice: product.mrp && product.mrp > product.price ? product.price : null,
        discount: product.mrp && product.mrp > product.price
          ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
          : null,
        imageUrl: product.images[0],
        rating: product.rating,
        reviews: product.reviews,
        partNumber: product.partNumber,
        seller: product.seller,
      };
      addToCart(cartProduct);
      alert(`${product.name} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
    alert(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Get shipping address for delivery location
  const getShippingAddress = () => {
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      const address = JSON.parse(savedAddress);
      return `${address.cityState} - ${address.postalCode}`;
    }
    return "MAHARASHTRA - Pune 412406";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Format part number for display (truncate if needed)
  const displayPartNumber = product.partNumber.length > 10 
    ? `${product.partNumber.substring(0, 4)}...${product.partNumber.substring(product.partNumber.length - 4)}`
    : product.partNumber;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Left Column - Product Images */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Thumbnail Images - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex flex-col gap-2 flex-shrink-0">
              {product.images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden w-20 h-20 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain bg-white"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Timing+Belt';
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-2 sm:p-4 relative">
              {product.isOEM && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-[8px] sm:text-xs font-bold z-10">
                  OEM
                </div>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto rounded-lg object-contain"
                style={{ minHeight: '250px' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Timing+Belt';
                }}
              />
            </div>

            {/* Thumbnail Images - Horizontal scroll on mobile */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-3 sm:-mx-4 px-3 sm:px-4">
              {product.images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain bg-white"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Timing+Belt';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="px-0 sm:px-2">
            {/* Brand */}
            <h2 className="text-[9px] sm:text-sm text-gray-600 mb-1">{product.brand}</h2>
            
            {/* Product Name */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <h1 className="text-sm sm:text-xl md:text-2xl font-bold text-gray-800">{product.name}</h1>
              <div className="flex items-center gap-1 text-[9px] sm:text-sm text-blue-600">
                <FaTruck className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Delivery within {product.deliveryDays || 4} days</span>
              </div>
            </div>

            {/* Fulfillment & Choice Badges */}
            <div className="flex items-center gap-2 mb-3">
              {product.fulfilledBySparelo && (
                <div className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded">
                  <FaCheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-[9px] text-gray-700">Fulfilled by</span>
                  <span className="text-blue-600 font-bold text-[10px]">S</span>
                </div>
              )}
              {product.spareloChoice && (
                <div className="bg-purple-600 text-white text-[9px] font-semibold px-2 py-1 rounded">
                  Sparelo's Choice
                </div>
              )}
            </div>

            {/* Seller */}
            <p className="text-[10px] sm:text-sm text-gray-600 mb-2">
              Sold by: <span className="font-medium">{product.seller}</span>
            </p>

            {/* Replacements Link */}
            {product.replacementsPrice && (
              <Link to="#" className="text-blue-600 hover:text-blue-800 text-[10px] sm:text-sm mb-4 inline-block">
                Replacements from ₹{product.replacementsPrice}
              </Link>
            )}

            {/* Price */}
            <div className="mb-3 sm:mb-4">
              <div className="mb-1">
                <span className="text-base sm:text-2xl md:text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-[9px] sm:text-sm text-gray-600">
                <span>MRP: ₹{(product.mrp || product.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <div className="text-[8px] sm:text-xs text-gray-500 mt-1">Incl. of all taxes</div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-3">
              <span className="text-[10px] sm:text-sm font-medium text-green-600">
                {product.stock || 9} in stock
              </span>
            </div>

            {/* Compatibility Warning */}
            {!product.isCompatible && (
              <div className="mb-4">
                <p className="text-[10px] sm:text-sm font-medium text-red-600">
                  {product.compatibility || "Not compatible with your cars"}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-sm md:text-base font-semibold transition-colors"
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-white border-2 border-blue-600 text-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-sm md:text-base font-semibold hover:bg-blue-50 transition-colors"
              >
                Buy now
              </button>
            </div>

            {/* Delivery Location */}
            <div className="mb-4 flex items-center gap-2 text-[10px] sm:text-sm text-gray-600">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>Deliver to </span>
              <button className="text-blue-600 hover:text-blue-800">
                {getShippingAddress()}
              </button>
            </div>

            {/* Wishlist */}
            <div className="mb-6">
              <button
                onClick={handleToggleWishlist}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-[10px] sm:text-sm font-medium"
              >
                <FaHeart className={inWishlist ? "text-red-500 fill-current" : ""} />
                <span>ADD TO WISHLIST</span>
              </button>
            </div>

            {/* Part Specifications Table */}
            <div className="border border-gray-200 rounded-lg mb-4 overflow-x-auto">
              <table className="w-full min-w-[280px]">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-xs md:text-sm font-medium text-gray-700 w-1/3">Part Number</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-xs md:text-sm text-gray-600 flex items-center gap-2">
                      {displayPartNumber}
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-xs md:text-sm font-medium text-gray-700">Origin</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-xs md:text-sm text-gray-600">{product.origin || "OEM"}</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-xs md:text-sm font-medium text-gray-700">Class</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-[9px] sm:text-xs md:text-sm text-gray-600">{product.class || "Timing Belt"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Links */}
            <div className="mb-6 space-y-2">
              <Link to="#" className="text-blue-600 hover:text-blue-800 text-[10px] sm:text-sm block">
                View OEM Catalog
              </Link>
              <Link to="#" className="text-blue-600 hover:text-blue-800 text-[10px] sm:text-sm block">
                View Compatibility
              </Link>
              {product.replacementsPrice && (
                <Link to="#" className="text-blue-600 hover:text-blue-800 text-[10px] sm:text-sm block">
                  View Replacements from ₹{product.replacementsPrice}
                </Link>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-[10px] sm:text-sm font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-[10px] sm:text-sm text-gray-600">{product.description || `${product.class} for ${product.brand} - ${product.partNumber}`}</p>
            </div>
          </div>
        </div>

        {/* Guarantees/Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaTruck className="text-blue-600 text-lg sm:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">Delivery within {product.deliveryDays || 4} days</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaRedoAlt className="text-blue-600 text-base sm:text-lg md:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">10 Days Assured Return</p>
              <button className="text-blue-600 text-[8px] sm:text-xs mt-1">
                <FaInfoCircle className="inline" />
              </button>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1">
            <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
              <FaFileInvoice className="text-blue-600 text-base sm:text-lg md:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-sm md:text-base font-semibold text-gray-800">GST invoice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
