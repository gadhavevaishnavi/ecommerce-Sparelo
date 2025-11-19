import React, { useState, useMemo } from 'react';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaReply,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaTag,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaExclamationCircle,
  FaUserShield,
  FaComments,
  FaStar,
  FaPaperPlane
} from 'react-icons/fa';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Mock support tickets data
  const tickets = useMemo(() => [
    {
      id: 1,
      ticketId: 'TKT-2024-001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 98765 43210'
      },
      subject: 'Order not delivered',
      category: 'order',
      priority: 'high',
      status: 'open',
      assignedTo: 'Support Agent 1',
      createdAt: '2024-01-15 10:30:00',
      updatedAt: '2024-01-15 14:20:00',
      lastReply: 'customer',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'John Doe',
          message: 'I placed an order 5 days ago but haven\'t received it yet. Order ID: ORD-001',
          timestamp: '2024-01-15 10:30:00'
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Support Agent 1',
          message: 'Thank you for contacting us. Let me check your order status and get back to you shortly.',
          timestamp: '2024-01-15 11:15:00'
        }
      ],
      orderId: 'ORD-001',
      rating: null
    },
    {
      id: 2,
      ticketId: 'TKT-2024-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 98765 43211'
      },
      subject: 'Product quality issue',
      category: 'product',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'Support Agent 2',
      createdAt: '2024-01-14 09:15:00',
      updatedAt: '2024-01-15 09:30:00',
      lastReply: 'agent',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'Jane Smith',
          message: 'The product I received is damaged. Please help me with a replacement or refund.',
          timestamp: '2024-01-14 09:15:00'
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Support Agent 2',
          message: 'We apologize for the inconvenience. Please share photos of the damaged product, and we will process a replacement immediately.',
          timestamp: '2024-01-14 14:30:00'
        }
      ],
      orderId: 'ORD-002',
      rating: null
    },
    {
      id: 3,
      ticketId: 'TKT-2024-003',
      customer: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+91 98765 43212'
      },
      subject: 'Payment refund request',
      category: 'payment',
      priority: 'high',
      status: 'resolved',
      assignedTo: 'Support Agent 1',
      createdAt: '2024-01-13 16:45:00',
      updatedAt: '2024-01-14 10:20:00',
      lastReply: 'agent',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'Bob Johnson',
          message: 'I need a refund for order ORD-003. The product was cancelled.',
          timestamp: '2024-01-13 16:45:00'
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Support Agent 1',
          message: 'Your refund has been processed. It will reflect in your account within 5-7 business days.',
          timestamp: '2024-01-14 10:20:00'
        }
      ],
      orderId: 'ORD-003',
      rating: 5
    },
    {
      id: 4,
      ticketId: 'TKT-2024-004',
      customer: {
        name: 'Alice Brown',
        email: 'alice@example.com',
        phone: '+91 98765 43213'
      },
      subject: 'Account access issue',
      category: 'account',
      priority: 'low',
      status: 'closed',
      assignedTo: 'Support Agent 2',
      createdAt: '2024-01-12 11:30:00',
      updatedAt: '2024-01-12 15:45:00',
      lastReply: 'agent',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'Alice Brown',
          message: 'I cannot log into my account. It says password is incorrect.',
          timestamp: '2024-01-12 11:30:00'
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Support Agent 2',
          message: 'I\'ve reset your password. Please check your email for the new password.',
          timestamp: '2024-01-12 15:45:00'
        }
      ],
      orderId: null,
      rating: 4
    },
    {
      id: 5,
      ticketId: 'TKT-2024-005',
      customer: {
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        phone: '+91 98765 43214'
      },
      subject: 'General inquiry about products',
      category: 'general',
      priority: 'low',
      status: 'open',
      assignedTo: null,
      createdAt: '2024-01-15 08:20:00',
      updatedAt: '2024-01-15 08:20:00',
      lastReply: 'customer',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'Charlie Wilson',
          message: 'Do you have spare parts for Honda City 2020 model?',
          timestamp: '2024-01-15 08:20:00'
        }
      ],
      orderId: null,
      rating: null
    },
  ], []);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
    const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
    const closedTickets = tickets.filter(t => t.status === 'closed').length;
    const highPriorityTickets = tickets.filter(t => t.priority === 'high' && (t.status === 'open' || t.status === 'in_progress')).length;
    const avgRating = tickets
      .filter(t => t.rating !== null)
      .reduce((sum, t) => sum + t.rating, 0) / tickets.filter(t => t.rating !== null).length || 0;

    return {
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
      highPriorityTickets,
      avgRating: avgRating.toFixed(1),
      totalTickets: tickets.length
    };
  }, [tickets]);

  // Filter tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = 
        ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const getStatusBadge = (status) => {
    const badges = {
      open: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-orange-100 text-orange-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return badges[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <FaClock className="text-blue-600" />;
      case 'in_progress':
        return <FaExclamationCircle className="text-yellow-600" />;
      case 'resolved':
        return <FaCheckCircle className="text-green-600" />;
      case 'closed':
        return <FaTimesCircle className="text-gray-600" />;
      default:
        return null;
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    // In a real app, this would send the reply to the backend
    console.log('Sending reply:', replyText);
    setReplyText('');
    // Update ticket with new message
    if (selectedTicket) {
      const updatedTicket = {
        ...selectedTicket,
        messages: [
          ...selectedTicket.messages,
          {
            id: selectedTicket.messages.length + 1,
            sender: 'agent',
            senderName: 'Support Agent',
            message: replyText,
            timestamp: new Date().toISOString()
          }
        ],
        status: 'in_progress',
        lastReply: 'agent'
      };
      setSelectedTicket(updatedTicket);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Support Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage customer queries, complaints, and support tickets</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.openTickets}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaClock className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.inProgressTickets}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaExclamationCircle className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.resolvedTickets}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.avgRating}</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xs ${
                      i < Math.floor(summaryStats.avgRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaStar className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.ticketId}</div>
                    {ticket.orderId && (
                      <div className="text-xs text-gray-500">Order: {ticket.orderId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{ticket.customer.name}</div>
                    <div className="text-xs text-gray-500">{ticket.customer.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{ticket.subject}</div>
                    <div className="text-xs text-gray-500">{ticket.messages.length} messages</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {ticket.assignedTo || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(ticket.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-green-600 hover:text-green-900"
                        title="Reply"
                      >
                        <FaReply />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTicket.subject}</h3>
                  <p className="text-sm text-gray-600 mt-1">Ticket ID: {selectedTicket.ticketId}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimesCircle className="text-xl" />
                </button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Customer</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedTicket.customer.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="text-sm text-gray-900">{selectedTicket.customer.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Phone</p>
                  <p className="text-sm text-gray-900">{selectedTicket.customer.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Priority</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4">
              <h4 className="font-semibold text-gray-900">Conversation</h4>
              {selectedTicket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'customer' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {message.sender === 'customer' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUser className="text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.sender === 'customer'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold">{message.senderName}</p>
                      <p className={`text-xs ${
                        message.sender === 'customer' ? 'text-gray-600' : 'text-blue-100'
                      }`}>
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                  {message.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <FaUserShield className="text-green-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Reply Section */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Reply to Customer</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Type your reply here..."
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedTicket(null);
                      setReplyText('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleReply}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FaPaperPlane />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;

