import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  // Extract the last part of the URL (after the last slash)
  const pathParts = location.pathname.split("/").filter(Boolean);
  const categorySlug = pathParts[pathParts.length - 1];

  // Convert slug to readable format (e.g. "maintenance_service_parts" → "Maintenance Service Parts")
  const categoryName = categorySlug
    ? categorySlug
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "Catalog";

  return (
    <nav className="mb-4 sm:mb-6">
      <ol className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-medium text-gray-600 flex-wrap">
        <li>
          <Link to="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
        </li>
        <li><span className="text-gray-400">/</span></li>
        <li>
          <Link to="/catalog" className="hover:text-red-600 transition-colors">
            Catalog
          </Link>
        </li>
        {categorySlug && (
          <>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-800 font-semibold">{categoryName}</li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
