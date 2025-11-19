import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import SearchFilterBar from "./SearchFilterBar";
import CatalogueSidebar from "./CatalogueSidebar";

const MaintainanceCategories = [
  { id: 1, name: "Belt", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ddbeb81.jpg", link: "/catalog/4032-belts/" },
  { id: 2, name: "Brake", img: "https://boodmo.com/media/cache/catalog_image/images/categories/437bfd0.jpg", link: "/catalog/3713-brakes/" },
  { id: 3, name: "Catalogue Service Manual", img: "https://boodmo.com/media/cache/catalog_image/images/categories/140c4a2.jpg", link: "/catalog/4054-catalogues_service_manuals/" },
  { id: 4, name: "Clutch", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg", link: "/catalog/4027-clutch/" },
  { id: 5, name: "Engine Oil", img: "https://boodmo.com/media/cache/catalog_image/images/categories/4614ecf.webp", link: "/catalog/5193-engine_oil/" },
  { id: 6, name: "Filter", img: "https://boodmo.com/media/cache/catalog_image/images/categories/33d30ef.jpg", link: "/catalog/3625-filters/" },
  { id: 7, name: "Glow Plug", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d6d71f0.jpg", link: "/catalog/4385-glow_plug/" },
  { id: 8, name: "Horn", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d5b3ac7.jpg", link: "/catalog/4064-horns/" },
  { id: 9, name: "Light", img: "https://boodmo.com/media/cache/catalog_image/images/categories/53380d3.webp", link: "/catalog/4028-light/" },
  { id: 10, name: "Repair Service Kit", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5f75a07.jpg", link: "/catalog/4058-repair_service_kits/" },
  { id: 11, name: "Shock Absorber and Strut", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f26073e.jpg", link: "/catalog/3629-shock_absorber/" },
  { id: 12, name: "Spark Plug", img: "https://boodmo.com/media/cache/catalog_image/images/categories/acd0058.jpg", link: "/catalog/4384-spark_glow_plug/" },
  { id: 13, name: "Wiper Blade and Sets", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1053d82.jpg", link: "/catalog/4055-windscreen_cleaning_part/" },
];

const MaintenanceServiceParts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(MaintainanceCategories);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const filtered = MaintainanceCategories.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm]);

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredCategories];
    if (value === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredCategories(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs />

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
            Maintenance Service Parts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover high-quality maintenance parts designed to keep your vehicle in top performance and condition.
          </p>
        </div>

        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          handleSort={handleSort}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          categoryName="Maintenance Parts"
        />

        <div className="flex flex-col md:flex-row gap-6">
          <CatalogueSidebar />

          <div className="flex-1">
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={category.link}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden border border-gray-100"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-14 h-14 object-cover rounded-md mb-2 mx-auto"
                  />

                  <div className="p-3">
                    <span className="text-gray-800 font-semibold text-xs md:text-sm">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No categories found matching your criteria.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-red-600 hover:text-red-700 underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Content Section */}
            <section className="bg-white text-gray-800 py-6 px-4 rounded-2xl shadow-sm mt-6">
              <div className={`transition-all duration-500 ease-in-out ${showMore ? "max-h-full" : "max-h-[600px] overflow-hidden"}`}>
                <h2 className="text-lg md:text-xl font-bold text-red-700 border-b-2 border-red-300 inline-block pb-2 mb-4">
                  About Car Maintenance Parts
                </h2>

                <p className="font-medium leading-relaxed text-sm mb-4">
                  There are regular maintenance parts like oil and air filters, headlights, drive belts, brake pads,
                  wheel speed, humidity and temperature sensors, joints, and others. They may last longer, though the
                  result depends on driving habits and environment conditions.
                </p>

                <p className="font-medium leading-relaxed text-sm mb-4">
                  It is vital to take preventative measures with maintenance to avoid paying to the mechanics. Inspecting
                  your car regularly ensures it runs smoothly and safely for longer. Always refer to your owner’s manual
                  for recommended service intervals.
                </p>

                <h3 className="text-base font-semibold text-red-700 mt-8 mb-2">
                  When should car maintenance parts be replaced?
                </h3>
                <p className="font-medium leading-relaxed text-sm mb-4">
                  Car makers usually determine the time when maintenance should be performed. Some parts need replacement
                  after 30,000 miles, others can last up to 90,000 miles. Always check:
                </p>

                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 font-medium">
                  <li>Engine oil and fluids — should not appear muddy or dark.</li>
                  <li>Battery — ensures the vehicle runs smoothly.</li>
                  <li>Tires — must be properly inflated and checked regularly.</li>
                  <li>Filters — keep the air and engine clean from contaminants.</li>
                  <li>Belts — replace if cracked, loose, or frayed.</li>
                </ul>

                <h3 className="text-base font-semibold text-red-700 mt-8 mb-2">Our Advantages</h3>
                <p className="font-medium leading-relaxed text-sm mb-4">
                  When you choose <span className="text-red-600 font-semibold">Sparelo</span> — India's largest online marketplace
                  for car parts, you get access to:
                </p>

                <ol className="list-decimal list-inside space-y-2 ml-4 text-gray-700 font-medium">
                  <li>Licensed access to a vast database of auto parts and services.</li>
                  <li>High-quality aftermarket and OEM components from trusted suppliers.</li>
                  <li>Accurate, updated information with prices, pictures, and specs.</li>
                  <li>Secure online payment options, supporting international cards.</li>
                </ol>

                <p className="font-medium leading-relaxed text-sm mt-4">
                  Fix your car issues today by exploring
                  <span className="text-red-600 font-semibold"> Sparelo’s</span> unmatched catalogue of spare parts — even
                  without registration. You’re sure to find what you need!
                </p>
              </div>

              {/* View More / Less Button */}
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md"
                >
                  {showMore ? "View Less" : "View More"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceServiceParts;
