import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Trims = () => {
  const trimsCategories = [
    {
      name: "Bumper",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e6a4c.jpg",
      link: "/catalog/4494-bumper/",
    },
    {
      name: "Bumper Trim",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/beccd06.jpg",
      link: "/catalog/4402-bumper_trim/",
    },
    {
      name: "Emblem",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/f42606f.jpg",
      link: "/catalog/4388-emblems/",
    },
    {
      name: "Front Grill",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/28dccef.jpg",
      link: "/catalog/4146-bumper_grill/",
    },
    {
      name: "Inner Wing Panel",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/08a1674.jpg",
      link: "/catalog/4518-fender_lining/",
    },
    {
      name: "Mirrors",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/1435593.webp",
      link: "/catalog/5199-mirrors/",
    },
    {
      name: "Sill Trim",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb7c7ad.jpg",
      link: "/catalog/4677-sill_trim/",
    },
    {
      name: "Spoiler",
      img: "https://boodmo.com/media/cache/catalog_image/images/categories/52ac5f5.jpg",
      link: "/catalog/4547-spoilers_wings/",
    },
  ];


  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(trimsCategories
  );

  useEffect(() => {
    const filtered = trimsCategories
      .filter((item) =>
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
          <h1 className="text-xl font-semibold text-red-800 mb-2">
            Trims
          </h1>
          <p className="text-gray-600">
            Explore our wide range of trims and accessories.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Trims"
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
            <section>
              <div className="mb-8">
                <h1 className="text-xl font-semibold text-red-800 mb-2">About Car Trims</h1>
                <p className="text-gray-600">
                  The trims are elements incorporated into the jointing edges of the walls, windows, and doors to cover the gap between the glass and the frame and protect the cabin of the car from running water.
                  They can also be used for aesthetic purposes and come in different widths and lengths to fit specific sections.
                  When looking for a trim, it’s important to know its intended purpose and consider all parameters including shape.
                  If the old one is partially damaged, you’ll need to buy and install a new trim instead. The cost varies depending on the car model.
                  A mechanic at a service station can determine whether the trim needs replacement or if it can be repaired and restored.
                </p>
              </div>

              <div className="mb-8">
                <h1 className="text-xl font-semibold text-red-800 mb-2">When Should Car Trims Be Replaced?</h1>
                <p className="text-gray-600">
                  The best way to restore your car is to install new trims to prevent water leakage through the windows, which could cause dashboard issues or interior damage.
                  You can tell it’s time to replace them if:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>You see leaks around the edges of your doors and windows.</li>
                  <li>The original color of the trim changes.</li>
                  <li>There is a musty smell and mold in the cabin.</li>
                  <li>The windows become foggy from the inside.</li>
                  <li>Exterior trim pieces have become weak and loose.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h1 className="text-xl font-semibold text-red-800 mb-2">Our Advantages</h1>
                <p className="text-gray-600">
                  Boodmo — India’s largest online marketplace for car spare parts — is where everyone can achieve their goals.
                  Sellers can reach a wide audience, and buyers can purchase needed items under the most favorable conditions.
                  We provide a convenient, efficient experience with access to a diverse selection of auto spares and accessories from all over the world. You’ll enjoy:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>An efficient search system with three ways to find products and smart filters to narrow results.</li>
                  <li>A well-designed product page with detailed descriptions and accurate images.</li>
                  <li>Shopping tools like related parts and compatible product suggestions.</li>
                  <li>Frequent discounts and special offers, including weekly delivery deals.</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Need trims for your car? Browse Boodmo’s unmatched catalogue featuring the widest range of car spare parts and find items that help you restore your vehicle cost-efficiently.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Trims;
