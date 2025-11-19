import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaShare, FaStar, FaTruck, FaShieldAlt, FaCheckCircle, FaHome, FaEye, FaMapMarkerAlt, FaFileInvoice } from "react-icons/fa";
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);

  // Get car maker from URL params or location state
  const searchParams = new URLSearchParams(location.search);
  const carMaker = searchParams.get('maker') || location.state?.maker || null;

  useEffect(() => {
    // Simulate API call to fetch product by item_id
    const fetchProduct = async () => {
      setLoading(true);
      // In a real app, you would fetch from your API: `/api/products/${itemId}`
      // For now, we'll create mock data based on itemId
      setTimeout(() => {
        setProduct({
          id: itemId,
          name: "HOUSING,A/CL",
          partNumber: `J96...721`,
          fullPartNumber: `J96${itemId}721`,
          brand: carMaker || "CHEVROLET",
          seller: "CH(5m)RN(2m)/MTC/1",
          price: 543.00,
          originalPrice: 543.00,
          category: "Engine",
          subCategory: "Air Supply",
          subSubCategory: "Air Filter Housing",
          rating: 4.5,
          reviews: 23,
          images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
          ],
          compatibility: carMaker ? `Compatible with ${carMaker}` : "Not compatible with your car",
          isCompatible: false,
          warranty: "2 Years",
          delivery: "Delivery within 24 days",
          stock: 15,
          isOEM: true,
          origin: "OEM",
          class: "Cover",
          description: `Cover for ${carMaker || "CHEVROLET"} BEAT 1ST GEN, BEAT 1ST GEN F/L, SPARK - J96${itemId}721 - ${carMaker || "CHEVROLET"} (UPR)(UPR)`,
          compatibleVehicles: carMaker ? [
            `${carMaker} BEAT 1ST GEN`,
            `${carMaker} BEAT 1ST GEN F/L`,
            `${carMaker} SPARK`
          ] : [],
        });
        setLoading(false);
      }, 800);
    };

    if (itemId) {
      fetchProduct();
    }
  }, [itemId, carMaker]);

  const handleAddToCart = () => {
    if (product) {
      const cartProduct = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.originalPrice || product.price,
        discountPrice: product.originalPrice && product.originalPrice > product.price ? product.price : null,
        discount: product.originalPrice && product.originalPrice > product.price
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-red-600 flex items-center">
                <FaHome className="mr-1" />
                Home
              </Link>
            </li>
            <li><span>/</span></li>
            <li>
              <Link to="/catalog" className="hover:text-red-600">
                Catalogues
              </Link>
            </li>
            <li><span>/</span></li>
            <li>
              <Link to={`/catalog/${product.category.toLowerCase()}/`} className="hover:text-red-600">
                {product.category}
              </Link>
            </li>
            <li><span>/</span></li>
            <li>
              <span className="hover:text-red-600">
                {product.subCategory}
              </span>
            </li>
            <li><span>/</span></li>
            <li>
              <span className="hover:text-red-600">
                {product.subSubCategory}
              </span>
            </li>
            <li><span>/</span></li>
            <li className="text-gray-800 font-medium">
              {product.name} {product.brand} {product.partNumber}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Product Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 relative">
              {product.isOEM && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold z-10">
                  OEM
                </div>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-red-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Brand */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.brand}</h2>
            
            {/* Product Name */}
            <h1 className="text-xl font-semibold text-gray-800 mb-3">{product.name}</h1>

            {/* Seller */}
            <p className="text-sm text-gray-600 mb-4">
              Sold by: <span className="font-medium">{product.seller}</span>
            </p>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-gray-800">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice === product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                  Incl. of all taxes
                </div>
              </div>
            </div>

            {/* Compatibility Warning */}
            {!product.isCompatible && (
              <div className="mb-4">
                <p className="text-red-600 text-sm font-medium">
                  {product.compatibility}
                </p>
              </div>
            )}

            {/* Part Specifications Table */}
            <div className="border border-gray-200 rounded-lg mb-4">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">Part Number</td>
                    <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-2">
                      {product.fullPartNumber}
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">Origin</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.origin}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">Class</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.class}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Links */}
            <div className="mb-4 space-y-2">
              <Link to={`/vehicles/${product.brand.toLowerCase()}`} className="text-blue-600 hover:text-blue-800 text-sm block">
                View OEM Catalog
              </Link>
              <button className="text-blue-600 hover:text-blue-800 text-sm block">
                View Compatibility
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Buy now
              </button>
            </div>

            {/* Delivery Location */}
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>Deliver to </span>
              <button className="text-blue-600 hover:text-blue-800">
                {getShippingAddress()}
              </button>
            </div>

            {/* Wishlist */}
            <div className="mb-4">
              <button
                onClick={handleToggleWishlist}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                <FaHeart className={inWishlist ? "text-red-500 fill-current" : ""} />
                <span>{inWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}</span>
              </button>
            </div>

            {/* Delivery Timeframe */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <FaTruck className="text-gray-400" />
              <span>{product.delivery}</span>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Guarantees/Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <FaTruck className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{product.delivery}</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <FaShieldAlt className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">10 Days Assured Return</p>
              <button className="text-blue-600 text-xs mt-1">ℹ️</button>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <FaFileInvoice className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">GST invoice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
