import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
  FaStore,
  FaBlog,
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
} from 'react-icons/fa';

const BottomNavigation = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Mock user state - replace with your actual auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/40",
    role: "Customer"
  };

  // Animation variants for account dropdown (moved from Header.jsx)
  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu !== null && !event.target.closest('.bottom-nav-menu')) {
        setActiveMenu(null);
      }
    };
    if (activeMenu !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeMenu]);

  const mainMenu = [
    {
      name: 'Home',
      icon: FaHome,
      submenu: [
        { name: 'Home One', href: '/' },
        { name: 'Home Two', href: '/home-two' },
        {
          name: 'Header Spaceship',
          submenu: [
            { name: 'Variant One', href: '/header-spaceship-one' },
            { name: 'Variant Two', href: '/header-spaceship-two' },
            { name: 'Variant Three', href: '/header-spaceship-three' }
          ]
        },
        {
          name: 'Header Classic',
          submenu: [
            { name: 'Variant One', href: '/header-classic-one' },
            { name: 'Variant Two', href: '/header-classic-two' },
            { name: 'Variant Three', href: '/header-classic-three' },
          ]
        },
        {
          name: 'Mobile Header',
          submenu: [
            { name: 'Variant One', href: '/mobile-header-one' },
            { name: 'Variant Two', href: '/mobile-header-two' }
          ]
        }
      ]
    },
    {
      name: 'Shop',
      icon: FaStore,
      submenu: [
        {
          name: 'Category',
          submenu: [
            { name: "Air Conditioning", href: "/catalog/air_conditioning/" },
            { name: "Bearings", href: "/catalog/bearings/" },
            { name: "Belts Chains And Rollers", href: "/catalog/drive_belts/" },
            { name: "Body", href: "/catalog/body/" },
            { name: "Brake System", href: "/catalog/brakes/" },
            { name: "Car Accessories", href: "/catalog/car_accessories/" },
          ]
        },
        {
          name: 'Shop Grid',
          submenu: [
            { name: '6 Columns Full', href: '/shop-grid-6-full' },
            { name: '5 Columns Full', href: '/shop-grid-5-full' },
            { name: '4 Columns Full', href: '/shop-grid-4-full' },
          ]
        },
        { name: 'Shop List', href: '/shop-list' },
        { name: 'Shop Table', href: '/shop-table' },
        { name: 'Shop Right Sidebar', href: '/shop-right-sidebar' },
        {
          name: 'Shop Navigation',
          submenu: [
            { name: 'Cursor-Based', href: '/shop-cursor-navigation' },
            { name: 'Page-Based', href: '/shop-page-navigation' }
          ]
        },
        {
          name: 'Product',
          submenu: [
            { name: 'Full Width', href: '/product-full' },
            { name: 'Left Sidebar', href: '/product-sidebar' }
          ]
        },
      ]
    },
    {
      name: 'Blog',
      icon: FaBlog,
      submenu: [
        {
          name: 'Blog Classic',
          submenu: [
            { name: 'Left Sidebar', href: '/blog-classic-left' },
            { name: 'Right Sidebar', href: '/blog-classic-right' }
          ]
        },
        {
          name: 'Blog List',
          submenu: [
            { name: 'Left Sidebar', href: '/blog-list-left' },
            { name: 'Right Sidebar', href: '/blog-list-right' }
          ]
        },
        {
          name: 'Blog Grid',
          submenu: [
            { name: 'Left Sidebar', href: '/blog-grid-left' },
            { name: 'Right Sidebar', href: '/blog-grid-right' }
          ]
        },
        {
          name: 'Post Page',
          submenu: [
            { name: 'Full Width', href: '/post-full-width' },
            { name: 'Left Sidebar', href: '/post-left-sidebar' },
            { name: 'Right Sidebar', href: '/post-right-sidebar' }
          ]
        },
        { name: 'Post Without Image', href: '/post-without-image' }
      ]
    },
    {
      name: 'Account',
      icon: FaUser,
      submenu: [
        { name: 'Edit Profile', href: '/myprofile' },
        { name: 'Dashboard', href: '/account/dashboard' },
        { name: 'Garage', href: '/garage' },
        { name: 'Order Details', href: '/cart' },
        { name: 'Address Book', href: '/addresses' },
        { name: 'Edit Address', href: '/myaddresses' },
      ],
      showUserInfo: true, // Flag to show user profile section
    },
    {
      name: 'Pages',
      icon: FaFileAlt,
      submenu: [
        { name: 'About Us', href: '/about-us' },
        { name: 'Contact Us ', href: '/contact' },
        { name: 'Terms And Conditions', href: '/terms' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Components', href: '/components' },
      ]
    }
  ];

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl backdrop-blur-sm bg-transparent">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 py-3">
            {mainMenu.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative bottom-nav-menu">
                  <motion.button
                    onClick={() => toggleMenu(index)}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                      activeMenu === index
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="text-sm" />
                    <span>{item.name}</span>
                    <motion.div
                      animate={{ rotate: activeMenu === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown className="text-xs" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {activeMenu === index && (
                      <motion.div
                        variants={item.showUserInfo ? dropdownVariants : undefined}
                        initial={item.showUserInfo ? "hidden" : { opacity: 0, y: 10 }}
                        animate={item.showUserInfo ? "visible" : { opacity: 1, y: 0 }}
                        exit={item.showUserInfo ? "exit" : { opacity: 0, y: 10 }}
                        transition={item.showUserInfo ? undefined : { duration: 0.2 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 min-w-56 max-h-96 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-2">
                          {/* User Profile Section for Account Menu */}
                          {item.showUserInfo && (
                            <>
                              <div className="flex items-center space-x-3 px-4 py-3 pb-3 mb-2 border-b border-gray-200">
                                <img
                                  src={mockUser.avatar}
                                  alt={mockUser.name}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div>
                                  <div className="font-semibold text-gray-800 text-sm">{mockUser.name}</div>
                                  <div className="text-xs text-gray-500">{mockUser.email}</div>
                                </div>
                              </div>
                            </>
                          )}
                          
                          {item.submenu.map((subItem, subIndex) => (
                            <div key={subIndex} className="relative group/sub">
                              <Link
                                to={subItem.href || "#"}
                                onClick={() => setActiveMenu(null)}
                                className="flex items-center justify-between px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-purple-50 transition-all duration-200"
                              >
                                <span className="font-medium text-sm">{subItem.name}</span>
                                {subItem.submenu && (
                                  <FaChevronRight className="text-xs text-gray-400 group-hover/sub:text-red-600" />
                                )}
                              </Link>

                              {subItem.submenu && (
                                <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 min-w-56 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                                  <div className="py-2 max-h-96 overflow-y-auto">
                                    {subItem.submenu.map((nestedItem, nestedIndex) => (
                                      <Link
                                        key={nestedIndex}
                                        to={nestedItem.href}
                                        onClick={() => setActiveMenu(null)}
                                        className="block px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-purple-50 transition-all duration-200 font-medium text-sm"
                                      >
                                        {nestedItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          
                          {/* Sign Out Button for Account Menu */}
                          {item.showUserInfo && (
                            <div className="pt-2 mt-2 border-t border-gray-200">
                              <motion.button
                                onClick={() => {
                                  setIsLoggedIn(false);
                                  setActiveMenu(null);
                                }}
                                className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2.5 mx-4 rounded-lg hover:bg-gray-200 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <FaSignOutAlt className="text-sm" />
                                <span className="font-medium text-sm">Sign Out</span>
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {mainMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative bottom-nav-menu flex-1">
                <motion.button
                  onClick={() => toggleMenu(index)}
                  className={`flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all w-full ${
                    activeMenu === index
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="text-lg mb-1" />
                  <span className="text-xs font-medium">{item.name}</span>
                </motion.button>

                <AnimatePresence>
                  {activeMenu === index && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setActiveMenu(null)}
                      />
                      <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 max-h-[60vh] overflow-y-auto rounded-t-3xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                              <Icon className="text-red-600" />
                              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                            </div>
                            <button
                              onClick={() => setActiveMenu(null)}
                              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                            >
                              <FaChevronUp />
                            </button>
                          </div>
                          {/* User Profile Section for Account Menu (Mobile) */}
                          {item.showUserInfo && (
                            <div className="flex items-center space-x-3 px-4 py-3 mb-3 bg-gray-50 rounded-lg">
                              <img
                                src={mockUser.avatar}
                                alt={mockUser.name}
                                className="w-12 h-12 rounded-full"
                              />
                              <div>
                                <div className="font-semibold text-gray-800">{mockUser.name}</div>
                                <div className="text-sm text-gray-500">{mockUser.email}</div>
                              </div>
                            </div>
                          )}
                          
                          <div className="space-y-1">
                            {item.submenu.map((subItem, subIndex) => (
                              <div key={subIndex}>
                                {subItem.submenu ? (
                                  <div className="px-4 py-2 font-semibold text-gray-500 text-sm uppercase tracking-wide">
                                    {subItem.name}
                                  </div>
                                ) : (
                                  <Link
                                    to={subItem.href || "#"}
                                    onClick={() => setActiveMenu(null)}
                                    className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-gray-700 transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                )}
                                {subItem.submenu && (
                                  <div className="pl-4 space-y-1">
                                    {subItem.submenu.map((nestedItem, nestedIndex) => (
                                      <Link
                                        key={nestedIndex}
                                        to={nestedItem.href}
                                        onClick={() => setActiveMenu(null)}
                                        className="block px-4 py-2.5 rounded-lg hover:bg-gray-100 text-sm text-gray-600 transition-colors"
                                      >
                                        {nestedItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Sign Out Button for Account Menu (Mobile) */}
                          {item.showUserInfo && (
                            <div className="pt-3 mt-3 border-t border-gray-200">
                              <motion.button
                                onClick={() => {
                                  setIsLoggedIn(false);
                                  setActiveMenu(null);
                                }}
                                className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <FaSignOutAlt className="text-sm" />
                                <span className="font-medium">Sign Out</span>
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;

