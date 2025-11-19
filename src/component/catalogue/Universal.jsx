import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const Universal = () => {
  const universalCategories = [
  {
    name: "Bolt",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/af8d099.jpg",
    link: "/catalog/4789-bolt/",
  },
  {
    name: "Cable Strap",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/7455b44.jpg",
    link: "/catalog/4850-cable_strap/",
  },
  {
    name: "Circlip",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/d741fdb.jpg",
    link: "/catalog/4839-circlip/",
  },
  {
    name: "Clamp",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/ba081e3.jpg",
    link: "/catalog/4809-clamp/",
  },
  {
    name: "Clip",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4d382fb.jpg",
    link: "/catalog/4578-clip/",
  },
  {
    name: "Fasteners",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/f9b277f.webp",
    link: "/catalog/5227-fasteners/",
  },
  {
    name: "Grease",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/c89ce20.jpg",
    link: "/catalog/4915-grease/",
  },
  {
    name: "Grommet",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/b75343b.jpg",
    link: "/catalog/4837-grommet/",
  },
  {
    name: "Nut",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/9f2ba20.jpg",
    link: "/catalog/4788-nut/",
  },
  {
    name: "O-Ring",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/14b8753.jpg",
    link: "/catalog/4792-o_ring/",
  },
  {
    name: "Plug",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/e53edf2.jpg",
    link: "/catalog/4834-plug/",
  },
  {
    name: "Rivet",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4a4381a.jpg",
    link: "/catalog/4882-rivet/",
  },
  {
    name: "Screw",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/cb643f8.jpg",
    link: "/catalog/4791-screw/",
  },
  {
    name: "Sealing Substance",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/bb8ff15.jpg",
    link: "/catalog/4987-sealing_substance/",
  },
  {
    name: "Spacer",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/5f462c5.jpg",
    link: "/catalog/4871-spacer/",
  },
  {
    name: "Stud",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/86c294b.jpg",
    link: "/catalog/4833-stud/",
  },
  {
    name: "Tightening Strap",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/53cf219.jpg",
    link: "/catalog/4945-tightening_strap/",
  },
  {
    name: "Washer",
    img: "https://boodmo.com/media/cache/catalog_image/images/categories/4f5e864.jpg",
    link: "/catalog/4790-washer/",
  },
];


  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(universalCategories
);

  useEffect(() => {
    const filtered = universalCategories
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Universal parts
          </h1>
          <p className="text-gray-600">
            Explore our wide range of universal parts and accessories designed to fit various vehicle makes and models.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Universal"
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
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Universal;
