import React, { useState } from 'react';
import { Navbar } from './Navbar';

export const Document = () => {
  const [documentType, setDocumentType] = useState('All Documents');
  const [itemsPerPage, setItemsPerPage] = useState('10 per page');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleApply = () => {
    console.log({ documentType, itemsPerPage, fromDate, toDate });
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-10 py-10 pb-3">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          <span className="text-red-500">Documents</span>
        </h1>
        <Navbar />
      </div>

      {/* Filters Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Document Type Dropdown */}
          <div className="relative">
            <select
              className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-6 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option>All Documents</option>
              <option>Invoices</option>
              <option>Credit Notes</option>
              <option>Debit Notes</option>
            </select>
          </div>

          {/* Items per page Dropdown */}
          <div className="relative">
            <select
              className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-6 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
            >
              <option>10 per page</option>
              <option>20 per page</option>
              <option>50 per page</option>
              <option>100 per page</option>
            </select>
          </div>

          {/* From Date Input */}
          <div className="flex items-center border border-gray-300 rounded shadow">
            <input
              type="date"
              className="px-6 py-2 focus:outline-none"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date Input */}
          <div className="flex items-center border border-gray-300 rounded shadow">
            <input
              type="date"
              className="px-6 py-2 focus:outline-none"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* Apply Button */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-10 rounded shadow focus:outline-none focus:shadow-outline"
            onClick={handleApply}
          >
            Apply
          </button>

          {/* Export Button */}
          <button
            className="border border-gray-300 hover:bg-sky-500 hover:text-white text-black py-2 px-6 rounded shadow focus:outline-none focus:shadow-outline ml-auto"
            onClick={handleExport}
          >
            Export
          </button>
        </div>

        <div className="bg-gray-100 p-4 text-center text-gray-600 font-bold border-solid rounded">
          No items found
        </div>
      </div>
    </div>
  );
};
