import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Pipes_Hoses = () => {
  const pipesCategories = [
    {
      name: "Air Filter Pipe",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f38f506.jpg",
      link: "/catalog/4526-intake_pipe_air_filter/",
    },
    {
      name: "Brake Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/7664137.jpg",
      link: "/catalog/4319-brake_hydraulics_hoses/",
    },
    {
      name: "Brake Pipe",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/151a598.jpg",
      link: "/catalog/4324-brake_pipes/",
    },
    {
      name: "Fuel Line",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/0290ce5.jpg",
      link: "/catalog/4520-fuel_tank_lines/",
    },
    {
      name: "HVAC Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/8890bc4.jpg",
      link: "/catalog/4272-air_conditioning_pipe/",
    },
    {
      name: "Oil Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/041e518.jpg",
      link: "/catalog/4570-oil_hose/",
    },
    {
      name: "PCV Breather Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/588789f.jpg",
      link: "/catalog/4970-crankcase_breather_hose/",
    },
    {
      name: "Radiator Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f02e68a.jpg",
      link: "/catalog/4532-radiator_hose/",
    },
    {
      name: "Steering Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bc7d2d4.jpg",
      link: "/catalog/4550-steering_hydraulics_hoses/",
    },
    {
      name: "Transmission Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/859dfa3.jpg",
      link: "/catalog/5005-transmission_hose/",
    },
    {
      name: "Turbocharger Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/38b3dfc.jpg",
      link: "/catalog/4561-turbocharger_hose/",
    },
    {
      name: "Vacuum Hose",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/1322d53.jpg",
      link: "/catalog/4846-brake_vacuum_hose/",
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(pipesCategories);

  useEffect(() => {
    const filtered = pipesCategories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    if (value === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pipes and Hoses
          </h1>
          <p className="text-gray-600">
            Explore our extensive range of pipes and hoses designed for various automotive applications.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="pipesCategories"
        />

        <div className="flex gap-6">
          <CatalogueSidebar />

          <div className="flex-1">
            {/* ✅ Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 my-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={product.link}
                  className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-md mb-2 mx-auto"
                  />
                  <span className="text-gray-800 font-medium text-xs">
                    {product.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* ✅ SEO Section */}
            <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
              <div
                className={`space-y-4 overflow-hidden transition-all duration-500 ${expanded ? "max-h-full" : "max-h-[400px]"
                  }`}
              >
                <h2 className="text-2xl font-bold text-red-600">
                  Price for Pipes and Hoses Parts
                </h2>

                <p>
                  Today, almost everything can be purchased online by placing an order in a specialized
                  store. Spare parts for cars, in particular, were no exception. There are trusted online
                  portals that offer first-class products, whether original or analog. You can buy pipes and
                  hoses parts online in India at <strong>Sparelo</strong>, where components for any car brand
                  are available. It’s easy to choose new or modified parts by car code or name.
                </p>

                <p>
                  Sparelo’s auto parts store offers a wide range of components and accessories for foreign
                  cars at reasonable prices. All parts in the catalog come with a quality certificate,
                  unlike those often found in open markets — and our prices are much lower than those at
                  dealer service centers.
                </p>

                <p>
                  You’ll be pleasantly surprised by the service and the pricing. The parts you need start
                  from <strong>₹589</strong> and go up to several thousand rupees depending on the part.
                </p>

                <h2 className="text-2xl font-bold text-red-600">
                  Catalog of Pipes and Hoses Parts
                </h2>

                <p>
                  A hose is generally an elastic, flexible connection that transports gases, liquids, or
                  solids. Together with a coupling, it connects to other components and is often called a
                  connecting hose. The quality of hoses varies widely since they serve many functions across
                  industries.
                </p>

                <p>
                  In cars, hoses are used in various systems — engine management, tires, intake tract, water
                  cooling, power steering, windshield wiper, brake system, cable harness, and heating. They
                  must insulate, seal, resist heat and external damage, and easily fit around corners and
                  edges.
                </p>

                <p>
                  The Sparelo catalog allows you to find every required component easily. Our inventory
                  includes only high-quality parts, with more than <strong>195,000+</strong> options such as:
                </p>

                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>A set of radiator hoses</li>
                  <li>Diesel pump hoses and pipes</li>
                  <li>Rubber hose for coolant</li>
                  <li>Air cleaner cover and more</li>
                </ul>

                <p>
                  Choosing and buying spare parts is quick and easy — just select your car model and
                  modification. After ordering, you can either pick up your purchase or opt for courier
                  delivery.
                </p>

                <h3 className="text-xl font-semibold text-red-600">
                  Buy Online Pipes and Hoses Parts in India: Sale Offers on Sparelo
                </h3>

                <p>
                  To make car maintenance more affordable, <strong>Sparelo</strong> regularly offers sales and
                  discounts ranging from <strong>11%</strong> to <strong>26%</strong> on various parts.
                  There’s no need to search elsewhere — here you’ll find a wide range of products, great
                  prices, and excellent customer service.
                </p>

                <p>
                  Didn’t find what you need? Simply leave a request, and our managers will arrange delivery
                  from partner warehouses as soon as possible.
                </p>

                <p>
                  For high-quality and reliable components without overpaying, shop confidently at{" "}
                  <strong>Sparelo</strong>.
                </p>
              </div>

              {/* View More / View Less Button */}
              <div className="seo-text__action mt-6 text-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  {expanded ? "View Less" : "View More"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipes_Hoses;
