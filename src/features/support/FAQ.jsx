import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaShippingFast, 
  FaExchangeAlt,
  FaPhone,
  FaWhatsapp,
  FaArrowRight,
  FaShoppingCart,
  FaUser,
  FaHeadset,
  FaComments,
  FaBook,
  FaStar
} from 'react-icons/fa';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Main categories exactly like Sparelo.com
  const mainCategories = [
    {
      id: 'buying',
      name: 'Buying on Sparelo',
      icon: <FaShoppingCart className="text-blue-600" />,
      description: 'Questions about ordering, payments, and account',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'shipping',
      name: 'Shipping & Delivery',
      icon: <FaShippingFast className="text-green-600" />,
      description: 'Tracking, delivery times, and shipping options',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'returns',
      name: 'Returns & Refunds',
      icon: <FaExchangeAlt className="text-orange-600" />,
      description: 'Return policy, refund process, and exchanges',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'account',
      name: 'My Account',
      icon: <FaUser className="text-purple-600" />,
      description: 'Account management and personal information',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // Popular questions like Sparelo.com
  const popularQuestions = [
    {
      id: 1,
      question: 'How to track my order?',
      category: 'shipping',
      views: '15,243'
    },
    {
      id: 2,
      question: 'What is your return policy?',
      category: 'returns',
      views: '12,876'
    },
    {
      id: 3,
      question: 'How do I place an order?',
      category: 'buying',
      views: '10,542'
    },
    {
      id: 4,
      question: 'What payment methods do you accept?',
      category: 'buying',
      views: '9,876'
    },
    {
      id: 5,
      question: 'How to create an account?',
      category: 'account',
      views: '8,932'
    },
    {
      id: 6,
      question: 'Do you ship internationally?',
      category: 'shipping',
      views: '7,654'
    }
  ];

  // FAQ data organized by categories
  const faqData = {
    buying: [
      {
        id: 1,
        question: 'How do I place an order on Sparelo?',
        answer: 'To place an order: 1. Search for the auto part you need using part number or vehicle details 2. Add items to your cart 3. Proceed to checkout 4. Select shipping method 5. Complete payment 6. Receive order confirmation via email and SMS'
      },
      {
        id: 2,
        question: 'What payment methods are accepted?',
        answer: 'We accept: Credit Cards, Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), Digital Wallets, and Cash on Delivery (available for orders below ₹50,000)'
      },
      {
        id: 3,
        question: 'Is it safe to use my credit card on Sparelo?',
        answer: 'Yes, absolutely. We use 256-bit SSL encryption and are PCI-DSS compliant. Your payment information is securely processed through certified payment gateways.'
      },
      {
        id: 4,
        question: 'Can I modify or cancel my order after placement?',
        answer: 'You can cancel your order within 30 minutes of placement from your account. After 30 minutes, please contact our customer support team for assistance.'
      },
      {
        id: 5,
        question: 'Do you offer bulk discounts for workshops?',
        answer: 'Yes, we offer special pricing for registered workshops and garages. Please contact our business team for bulk order discounts and special arrangements.'
      }
    ],
    shipping: [
      {
        id: 6,
        question: 'How can I track my order?',
        answer: 'You can track your order through: 1. Your Sparelo account dashboard 2. Tracking link in your order confirmation email 3. SMS updates 4. Contact our customer support with your order number'
      },
      {
        id: 7,
        question: 'What are the shipping charges?',
        answer: 'Shipping charges vary based on: Order value (Free shipping on orders above ₹999), Delivery location, Package weight and size, Shipping speed (Standard/Express)'
      },
      {
        id: 8,
        question: 'How long does delivery take?',
        answer: 'Standard delivery: 3-7 business days. Express delivery: 1-3 business days (additional charges apply). Same-day delivery available in select metro cities.'
      },
      {
        id: 9,
        question: 'Do you ship to my location?',
        answer: 'We ship across India including tier 2 and tier 3 cities. Enter your PIN code during checkout to check serviceability in your area.'
      },
      {
        id: 10,
        question: 'What if I\'m not available during delivery?',
        answer: 'Our delivery partner will attempt delivery 3 times. After that, the package will be returned to our warehouse. You can reschedule delivery through your tracking link.'
      }
    ],
    returns: [
      {
        id: 11,
        question: 'What is your return policy?',
        answer: '30-day return policy for most items. The item must be unused, in original packaging with all tags and invoices. Electrical and special order items may have different return policies.'
      },
      {
        id: 12,
        question: 'How do I initiate a return?',
        answer: '1. Go to "My Orders" in your account 2. Select the item to return 3. Choose return reason 4. Generate return label 5. Schedule pickup or drop at nearest service center'
      },
      {
        id: 13,
        question: 'How long does refund processing take?',
        answer: 'Refunds are processed within 5-7 business days after we receive and verify the returned item. The time to reflect in your account depends on your bank/payment method.'
      },
      {
        id: 14,
        question: 'What if I receive a wrong or damaged item?',
        answer: 'Contact us within 48 hours of delivery with photos of the product and packaging. We will arrange free pickup and provide replacement/refund immediately.'
      },
      {
        id: 15,
        question: 'Are there any non-returnable items?',
        answer: 'Yes, the following are non-returnable: Opened electrical items, Custom ordered parts, Items marked as "non-returnable" on product page, Software and digital products'
      }
    ],
    account: [
      {
        id: 16,
        question: 'How do I create a Sparelo account?',
        answer: 'Click "Sign Up" and provide your email or mobile number. Verify through OTP and complete your profile. You can also sign up using your Google or Facebook account.'
      },
      {
        id: 17,
        question: 'I forgot my password. How to reset?',
        answer: 'Click "Forgot Password" on login page. Enter your registered email/mobile to receive reset instructions. Follow the link to create a new password.'
      },
      {
        id: 18,
        question: 'How do I update my address and contact details?',
        answer: 'Go to "My Account" > "Profile Settings" to update your personal information, addresses, and communication preferences.'
      },
      {
        id: 19,
        question: 'How do I check my order history?',
        answer: 'Login to your account and go to "My Orders" section. Here you can view all your past and current orders with detailed information.'
      },
      {
        id: 20,
        question: 'Is my personal information secure?',
        answer: 'Yes, we follow strict data protection policies and never share your personal information with third parties without your explicit consent.'
      }
    ]
  };

  // Contact support options
  const supportOptions = [
    {
      icon: <FaHeadset className="text-3xl" />,
      title: 'Help Center',
      description: 'Browse help articles and FAQs',
      link: '/help',
      buttonText: 'Browse Articles'
    },
    {
      icon: <FaComments className="text-3xl" />,
      title: 'Contact Support',
      description: 'Get help from our support team',
      link: '/contact',
      buttonText: 'Contact Us'
    },
    {
      icon: <FaBook className="text-3xl" />,
      title: 'Community Forum',
      description: 'Ask questions to our community',
      link: '/community',
      buttonText: 'Visit Forum'
    }
  ];

  // Get all FAQs for search
  const allFaqs = Object.values(faqData).flat();

  // Filter FAQs based on search
  const filteredFaqs = activeCategory === 'all' 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData[activeCategory]?.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
     
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-5xl md:text-xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers to all your questions about ordering, shipping, returns, and more.
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Describe your issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular Questions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularQuestions.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {mainCategories.find(cat => cat.id === item.category)?.name}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {item.views}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {item.question}
                </h3>
                <button className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700 text-sm">
                  Read answer <FaArrowRight className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Main Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`bg-gradient-to-r ${category.color} text-white rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Results */}
        {searchQuery && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results for "{searchQuery}"
              </h2>
              <span className="text-gray-500">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} found
              </span>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-500 mb-4">Try different keywords or browse the categories above</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        )}

        {/* Category-specific FAQs */}
        {!searchQuery && activeCategory !== 'all' && faqData[activeCategory] && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {mainCategories.find(cat => cat.id === activeCategory)?.name} - Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqData[activeCategory].map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All FAQs when no category selected */}
        {!searchQuery && activeCategory === 'all' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Frequently Asked Questions</h2>
            <div className="space-y-6">
              {mainCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg border border-gray-200">
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <FaArrowRight className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Support Options */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 text-lg">We're here to assist you with any questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <Link
                  to={option.link}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {option.buttonText} <FaArrowRight className="text-sm" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Contact */}
        <section className="mt-12 text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h3>
            <p className="text-gray-600 mb-6">Our support team is available 24/7 to help you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <FaPhone className="text-sm" />
                Call Support: +91 98765 43210
              </a>
              <a 
                href="https://wa.me/919876543210"
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
              >
                <FaWhatsapp className="text-sm" />
                WhatsApp Support
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;