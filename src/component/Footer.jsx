import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter, 
  FaYoutube, 
  FaPinterest,
  FaPinterestP
} from "react-icons/fa";
import logo2 from "./logo2.png";


const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t-2 border-gray-200 text-sm text-gray-700">
      {/* 🔹 App Download Section */}
      <div className="gradient-primary text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Download</h2>
              <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">Our Mobile App</h3>
              <p className="mt-2 text-white/90 text-xs sm:text-base md:text-lg max-w-md">
                Experience the complete Sparelo journey anytime, anywhere.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              <a
                href="https://itunes.apple.com/in/app/id1154010647"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-all duration-200"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-12 md:h-14"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.boodmo"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-all duration-200"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-12 md:h-14"
                />
              </a>
            </div>
        </div>
      </div>

      {/* 🔹 Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid py-8 sm:py-12 md:py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">

          {/* Logo and Social */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src={logo2}
                alt="Sparelo Logo"
                className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="mt-4 text-gray-600 text-[10px] sm:text-sm md:text-base leading-relaxed">
              India's leading online hub for automotive spare parts, where quality meets convenience in the world of vehicle maintenance.
            </p>

            {/* <div className="flex justify-center md:justify-start gap-3 text-xl mt-8 flex-wrap">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all shadow-md hover:shadow-lg"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transform hover:scale-110 transition-all shadow-md hover:shadow-lg"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transform hover:scale-110 transition-all shadow-md hover:shadow-lg"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transform hover:scale-110 transition-all shadow-md hover:shadow-lg"
                title="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transform hover:scale-110 transition-all shadow-md hover:shadow-lg"
                title="YouTube"
              >
                <FaYoutube />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center hover:bg-red-800 transform hover:scale-110 transition-all shadow-md hover:shadow-lg"
                title="Pinterest"
              >
                <FaPinterest />
              </a>
            </div> */}
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs sm:text-base md:text-lg font-bold text-primary-700 mb-3 sm:mb-4">About</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/about" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">About us</Link></li>
              <li><Link to="/contact" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Contact us</Link></li>
              <li><Link to="/faq" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">FAQ</Link></li>
              <li><Link to="/careers" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Careers</Link></li>
              <li><Link to="/investor-relations" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Investor Relations</Link></li>
              <li><Link to="/suppliers" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Suppliers Relations</Link></li>
              <li><Link to="/discovery-points" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Discovery Points</Link></li>
              <li><Link to="/api-solution" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Sparelo API Solution</Link></li>
              <li><Link to="/vendor" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Become a Vendor</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-xs sm:text-base md:text-lg font-bold text-primary-700 mb-3 sm:mb-4">Policy</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/return-policy" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Disclaimer</Link></li>
              <li><Link to="/terms-of-use" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Terms of Use</Link></li>
              <li><Link to="/buyers-policy" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Buyers Policy</Link></li>
              <li><Link to="/sellers-policy" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Sellers Policy</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xs sm:text-base md:text-lg font-bold text-primary-700 mb-3 sm:mb-4">Useful Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/articles" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Articles</Link></li>
              <li><Link to="/brands" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Brands</Link></li>
              <li><Link to="/catalog" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Catalogues</Link></li>
              <li><Link to="/vehicles" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Car Makers</Link></li>
              <li><Link to="/damaged-parts" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Damaged Parts</Link></li>
              <li><Link to="/offers" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Best Offers</Link></li>
              <li><Link to="/sitemap" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Sitemap</Link></li>
              <li><Link to="/sitemap2" className="text-[10px] sm:text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors">Sitemap2</Link></li>
            </ul>
          </div>
      </div>

      {/* Newsletter & Social Media Section */}
      <div className="bg-gray-800 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Social Media Icons */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center md:justify-start">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                  title="Facebook"
                >
                  <FaFacebookF className="text-lg" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                  title="Twitter"
                >
                  <FaTwitter className="text-lg" />
                </a>
                <a
                  href="https://plus.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                  title="Google+"
                >
                  <span className="text-lg font-bold">G+</span>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                  title="Pinterest"
                >
                  <FaPinterestP className="text-lg" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                  title="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                  title="YouTube"
                >
                  <FaYoutube className="text-lg" />
                </a>
              </div>

              {/* Newsletter Section */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-1 justify-center md:justify-end w-full md:w-auto">
               
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="px-3 sm:px-4 py-2 rounded text-[9px] sm:text-xs md:text-sm text-gray-800 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 flex-1 sm:flex-none sm:w-56 md:w-64"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded text-[9px] sm:text-xs md:text-sm whitespace-nowrap transition-colors"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              </div>
            </div>
          </div>
      </div>

      {/* Copyright & Payment Methods Section */}
      <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="text-gray-600 text-[9px] sm:text-xs md:text-sm text-center md:text-left">
                Autoparts © {new Date().getFullYear()} Demo Store. All Rights Reserved. Designed by Vaishnavi
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Maestro_logo.svg/200px-Maestro_logo.svg.png"
                  alt="Maestro"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <img
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                  alt="PayPal"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Western_Union_logo.svg/200px-Western_Union_logo.svg.png"
                  alt="Western Union"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                  alt="Visa"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                  alt="Mastercard"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/200px-EBay_logo.svg.png"
                  alt="eBay"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
