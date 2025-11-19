import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useVehicle } from "../../contexts/VehicleContext";
import { getVehicleImageUrl } from "../../data/vehicleData";

const CatalogueSidebar = () => {
  const { vehicles } = useVehicle();
  const [selectedMaker, setSelectedMaker] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const location = useLocation();

  // Get car image from vehicle data
  const getCarImage = (make, model) => {
    const imageUrl = getVehicleImageUrl(make, model);
    return imageUrl || 'https://via.placeholder.com/100x60?text=Car';
  };

  const popularCarmakers = [
    "CHEVROLET", "FIAT", "FORD", "HONDA", "HYUNDAI", "KIA",
    "MAHINDRA", "MARUTI", "NISSAN", "RENAULT", "SKODA", "TATA", "TOYOTA", "VW",
  ];

  const alphabeticalCarmakers = [
    "ASHOK LEYLAND", "AUDI", "BMW", "CHEVROLET", "CITROEN", "DAEWOO",
    "DATSUN", "FIAT", "FORCE", "FORD", "HINDUSTAN MOTORS", "HONDA",
    "HYUNDAI", "ICML", "ISUZU", "JAGUAR", "JEEP", "KIA", "LAND ROVER",
    "LEXUS", "MAHINDRA", "MARUTI", "MERCEDES-BENZ", "MINI", "MITSUBISHI",
    "MORRIS GARAGES", "NISSAN", "OPEL", "PORSCHE", "RENAULT", "SKODA",
    "TATA", "TATA COMMERCIAL", "TOYOTA", "VOLVO", "VW",
  ];

  // Categories with sub-categories structure
  const categories = [
    { name: "Maintenance Service Parts", link: "/catalog/maintenance_service_parts/" },
    { name: "Brake", link: "/catalog/brakes/" },
    { name: "Air Conditioning", link: "/catalog/air_conditioning/" },
    { name: "Body", link: "/catalog/body/" },
    { name: "Bearings", link: "/catalog/bearings/" },
    { name: "Belts Chains And Rollers", link: "/catalog/drive_belts/" },
    { name: "Break System", link: "/catalog/brakes/" },
    { name: "Car Accessories", link: "/catalog/car_accessories/" },
    { name: "Clutch", link: "/catalog/clutch/" },
    { name: "Control Cables", link: "/catalog/control_cables/" },
    { name: "Electrical Components", link: "/catalog/electric_components/" },
    { name: "Engine", link: "/catalog/engine/" },
    { name: "Engine Cooling System", link: "/catalog/cooling_system/" },
    { name: "Exhaust System", link: "/catalog/exhaust/" },
    { name: "Filters", link: "/catalog/filters/" },
    { name: "Fuel Supply System", link: "/catalog/fuelsystem/" },
    { name: "Gaskets & Seals", link: "/catalog/Gasket_SealingRings/" },
    { name: "Ignition & Glowplug System", link: "/catalog/ignition_glowplug/" },
    { name: "Interior Comfort", link: "/catalog/interior_comfort/" },
    { name: "Lighting", link: "/catalog/lighting/" },
    { name: "Oils & Fluids", link: "/catalog/oilsfluids/" },
    { name: "Pipes & Hoses", link: "/catalog/pipes_hoses/" },
    { name: "Repair Kits", link: "/catalog/repair_kits/" },
    { name: "Sensors Relay and Control Units", link: "/catalog/sensors_control_units/" },
    { name: "Steering", link: "/catalog/steering/" },
    { name: "Suspension and Arms", link: "/catalog/suspension/" },
    { name: "Towbar Parts", link: "/catalog/towbar/" },
    { name: "Trims", link: "/catalog/trims/" },
    { name: "Tyres and Alloys", link: "/catalog/tyres_and_alloys/" },
    { name: "Transmission", link: "/catalog/transmission/" },
    { name: "Universal", link: "/catalog/universal/" },
    { name: "Wheels", link: "/catalog/wheels/" },
    { name: "Windscreen Cleaning System", link: "/catalog/windscreen_cleaning_system/" },
  ];

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleReset = () => {
    setSelectedMaker("");
    setExpandedCategories({});
  };

  const brands = [
    { name: "Bosch", link: "/catalog/brands/bosch/" },
    { name: "Fram", link: "/catalog/brands/fram/" },
    { name: "Hengst", link: "/catalog/brands/hengst/" },
    { name: "Mahle", link: "/catalog/brands/mahle/" },
    { name: "Mann Filter", link: "/catalog/brands/mann_filter/" },
    { name: "Wix", link: "/catalog/brands/wix/" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full lg:w-64 flex-shrink-0 mb-6 lg:mb-0">
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 sticky top-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100">Filters</h3>
          <button 
            onClick={handleReset}
            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
          >
            RESET
          </button>
        </div>

        {/* Garage Section */}
        <div
          className={`filters__item  rounded-lg overflow-hidden mb-2 ${
            isOpen ? "bg-white dark:bg-gray-900" : "bg-white dark:bg-gray-800"
          }`}
        >
          <div
            className="flex items-center justify-between px-4 py-2 cursor-pointer border-b dark:border-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              Garage
            </span>
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {isOpen ? "−" : "+"}
            </span>
          </div>

          {isOpen && (
            <div className="p-3 space-y-3">
              {/* Vehicles from Garage */}
              {vehicles.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {vehicles.slice(0, 6).map((vehicle) => (
                    <Link
                      key={vehicle.id}
                      to={`/catalog?maker=${encodeURIComponent(vehicle.make)}&model=${encodeURIComponent(vehicle.model)}&year=${vehicle.year}`}
                      className="flex flex-col items-center p-2 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-200"
                      title={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                    >
                      <img
                        src={getCarImage(vehicle.make, vehicle.model)}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-auto object-contain mb-1"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x60?text=Car';
                        }}
                      />
                      <span className="text-[10px] text-gray-700 font-medium text-center line-clamp-1">
                        {vehicle.model}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2 mb-3">
                  <p className="text-[10px] text-gray-500">No vehicles in garage</p>
                </div>
              )}

              <form className="space-y-1.5">
                <label
                  htmlFor="carMaker"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  Choose car maker
                </label>
                <select
                  id="carMaker"
                  value={selectedMaker}
                  onChange={(e) => setSelectedMaker(e.target.value)}
                  className="form-select w-full p-1.5 border rounded-md text-xs dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                >
                  <option value="">Choose car maker</option>
                  <optgroup label="Popular carmakers">
                    {popularCarmakers.map((maker) => (
                      <option key={maker} value={maker}>
                        {maker}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Carmakers in alphabetical order">
                    {alphabeticalCarmakers.map((maker) => (
                      <option key={maker} value={maker}>
                        {maker}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </form>
            </div>
          )}
        </div>

        {/* Category Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-300 mb-3">
            Category
          </h4>
          <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between">
                  <Link
                    to={category.link}
                    className={`flex-1 block text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                      isActive(category.link)
                        ? "font-semibold text-white bg-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {category.name}
                  </Link>
                  {category.subCategories && (
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="text-gray-500 hover:text-gray-700 px-1 text-xs"
                    >
                      {expandedCategories[category.name] ? "−" : "+"}
                    </button>
                  )}
                </div>
                {category.subCategories && expandedCategories[category.name] && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
                    {category.subCategories.map((subCat) => (
                      <div key={subCat.name || subCat.link}>
                        {subCat.subItems ? (
                          // Nested sub-category (e.g., Belt with sub-items)
                          <div>
                            <div className="text-[10px] font-medium text-gray-700 px-2 py-1 mb-0.5">
                              {subCat.name}
                            </div>
                            <div className="ml-2 space-y-0.5">
                              {subCat.subItems.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.link}
                                  className={`block text-[10px] px-2 py-0.5 rounded transition-all duration-200 ${
                                    isActive(item.link)
                                      ? "font-medium text-blue-600 bg-blue-50"
                                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          // Regular sub-category
                          <Link
                            to={subCat.link}
                            className={`block text-[10px] px-2 py-1 rounded transition-all duration-200 ${
                              isActive(subCat.link)
                                ? "font-medium text-blue-600 bg-blue-50"
                                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            }`}
                          >
                            {subCat.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Brand Section */}
        <div className="mb-6">
          <h4 className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-300 mb-3">Brand</h4>
          <div className="space-y-1">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                to={brand.link}
                className={`block text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                  isActive(brand.link)
                    ? "font-semibold text-white bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
                }`}
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogueSidebar;
