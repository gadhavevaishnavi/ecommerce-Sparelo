import React, { useState } from "react";
import { Link } from "react-router-dom";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import Article_Review from "../Article_Review";
import { getOriPartsLink } from "../../utils/oripartsBackUrl";

// 🔹 Models Data - Exported for use in other components
export const renaultModels = [
  {
    id: 1,
    name: "RENAULT CAPTUR",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/a0600b4.webp",
    years: "11.2017 - 06.2020",
    link: "/vehicles/renault-375/captur-12268/",
    modifications: [
      {
        generation: "CAPTUR 11.2017 - 06.2020",
        options: [
          "1.5L/Diesel/BS4",
          "1.5L/Petrol/BS4"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "RENAULT DUSTER",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/a4310ce.webp",
    years: "01.2012 - 02.2022",
    link: "/vehicles/renault-375/duster-11358/",
    modifications: [
      {
        generation: "DUSTER 1ST GEN 01.2012 - 02.2016",
        options: [
          "1.5L HSAF (TYPE 1) MT/Diesel/BS4",
          "1.5L HSAF (TYPE 2) MT/Diesel/BS4",
          "1.5L HSM3 (TYPE 1) MT/Diesel/BS4",
          "1.5L HSM3 (TYPE 2) MT/Diesel/BS4",
          "1.5L HSMW (TYPE 1) MT/Diesel/BS4",
          "1.5L HSMW (TYPE 2) MT/Diesel/BS4",
          "1.5L RXE MT/Diesel/BS4",
          "1.5L RXE MT/Petrol/BS4",
          "1.5L RXL MT/Diesel/110h.p./BS4",
          "1.5L RXL MT/Petrol/BS4",
          "1.5L RXL MT/Diesel/85h.p./BS4",
          "1.5L RXZ MT/Diesel/BS4",
          "1.6L HSA8 (TYPE 1) MT/Petrol/BS4",
          "1.6L HSA8 (TYPE 2) MT/Petrol/BS4"
        ]
      },
      {
        generation: "DUSTER 1ST GEN F/L 03.2016 - 07.2019",
        options: [
          "1.5L RXE MT/Diesel/BS4",
          "1.5L RXE MT/Petrol/BS4",
          "1.5L RXL ADVENTURE MT/Diesel/BS4",
          "1.5L RXL MT/Petrol/BS4",
          "1.5L RXL MT/Diesel/85h.p./BS4",
          "1.5L RXL MT/Diesel/110h.p./BS4",
          "1.5L RXS MT/Diesel/BS4",
          "1.5L RXZ ADVENTURE 4WD MT/Diesel/BS4",
          "1.5L RXZ MT/Diesel/85h.p./BS4",
          "1.5L RXZ MT/Diesel/110h.p./BS4"
        ]
      },
      {
        generation: "DUSTER 2ND GEN 08.2020 - 02.2022",
        options: [
          "1.3L AT/Petrol/BS6",
          "1.3L MT/Petrol/BS6",
          "1.5L MT/Petrol/BS6"
        ]
      }
    ]
  },
   
  {
    id: 3,
    name: "RENAULT FLUENCE",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/fabe20f.webp",
    years: "02.2010 - 10.2017",
    link: "/vehicles/renault-375/fluence-11359/",
    modifications: [
      {
        generation: "FLUENCE 02.2010 - 10.2017",
        options: [
          "1.5L L30B/Diesel/BS4",
          "1.5L L333/Diesel/BS4",
          "2.0L L30T/Petrol/BS4"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "RENAULT KIGER",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/cb8cb78.webp",
    years: "02.2021 - now",
    link: "/vehicles/renault-375/kiger-12399/",
    modifications: [
      {
        generation: "KIGER 02.2021 - now",
        options: [
          "1.0L RXE/Petrol/BS6",
          "1.0L RXL/Petrol/BS6",
          "1.0L RXL AMT/Petrol/BS6",
          "1.0L RXL TURBO/Petrol/BS6",
          "1.0L RXT/Petrol/BS6",
          "1.0L RXT AMT/Petrol/BS6",
          "1.0L RXT TURBO/Petrol/BS6",
          "1.0L RXT TURBO CVT/Petrol/BS6",
          "1.0L RXZ/Petrol/BS6",
          "1.0L RXZ AMT/Petrol/BS6",
          "1.0L RXZ TURBO/Petrol/BS6",
          "1.0L RXZ TURBO CVT/Petrol/BS6"
        ]
      },
      {
        generation: "KIGER F/L 08.2025 - now",
        options: [
          "1.0L AUTHENTIC MT/Petrol/BS6.2",
          "1.0L EMOTION MT/Petrol/BS6.2",
          "1.0L EMOTION TURBO CVT/Petrol/BS6.2",
          "1.0L EMOTION TURBO MT/Petrol/BS6.2",
          "1.0L EVOLUTION AMT/Petrol/BS6.2",
          "1.0L EVOLUTION MT/Petrol/BS6.2",
          "1.0L TECHNO AMT/Petrol/BS6.2",
          "1.0L TECHNO MT/Petrol/BS6.2",
          "1.0L TECHNO TURBO CVT/Petrol/BS6.2"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "RENAULT KOLEOS",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/c8ada14.webp",
    years: "09.2008 - 01.2016",
    link: "/vehicles/renault-375/koleos-11360/",
    modifications: [
      {
        generation: "KOLEOS 09.2008 - 01.2016",
        options: [
          "2.0L HY0K/Diesel/BS4",
          "2.0L HY0L/Diesel/BS4"
        ]
      }
    ]
  },
  {
    id: 6,
    name: "RENAULT KWID",
    image: "https://boodmo.com/media/cache/vehicle_model/images/model/dd58ebc.webp",
    years: "02.2015 - now",
    link: "/vehicles/renault-375/kwid-12004/",
    modifications: [
      {
        generation: "KWID 02.2015 - 09.2019",
        options: [
          "0.8L BWMA MT/Petrol/BS4",
          "1.0L AMT/Petrol/BS4",
          "1.0L BWMB MT/Petrol/BS4",
          "1.0L CLIMBER MT/Petrol/BS4"
        ]
      },
      {
        generation: "KWID F/L 10.2019 - now",
        options: [
          "0.8L MT/Petrol",
          "1.0L AMT/Petrol",
          "1.0L CLIMBER MT/Petrol",
          "1.0L MT/Petrol"
        ]
      }
    ]
  },
  

  
];

export const Renault = () => {
  const link = getOriPartsLink(35, "RENAULT");

  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Use exported models
  const models = renaultModels;

  const categories = [
    { name: "Maintenance Service Parts", img: "https://boodmo.com/media/images/categories/ebba234.svg", link: "/catalog/maintenance_service_parts/" },
    { name: "Filters", img: "https://boodmo.com/media/images/categories/fab8332.svg", link: "/catalog/filters/" },
    { name: "Windscreen Cleaning System", img: "https://boodmo.com/media/images/categories/d36974e.svg", link: "/catalog/windscreen_cleaning_system/" },
    { name: "Car Accessories", img: "https://boodmo.com/media/images/categories/4372565.svg", link: "/catalog/car_accessories/" },
    { name: "Lighting", img: "https://boodmo.com/media/images/categories/c009512.svg", link: "/catalog/lighting/" },
    { name: "Control Cables", img: "https://boodmo.com/media/images/categories/64b9f40.svg", link: "/catalog/control_cables/" },
    { name: "Brake System", img: "https://boodmo.com/media/images/categories/5c30d1d.svg", link: "/catalog/brakes/" },
    { name: "Bearings", img: "https://boodmo.com/media/images/categories/d5dd6ce.svg", link: "/catalog/bearings/" },
    { name: "Clutch System", img: "https://boodmo.com/media/images/categories/bc1a73f.svg", link: "/catalog/clutch/" },
    { name: "Electric Components", img: "https://boodmo.com/media/images/categories/e1aba2b.svg", link: "/catalog/electric_components/" },
    { name: "Engine", img: "https://boodmo.com/media/images/categories/f6afc8e.svg", link: "/catalog/engine/" },
    { name: "Engine Cooling System", img: "https://boodmo.com/media/images/categories/e39dc1a.svg", link: "/catalog/cooling_system/" },
    { name: "Exhaust System", img: "https://boodmo.com/media/images/categories/83cd783.svg", link: "/catalog/exhaust/" },
    { name: "Air Conditioning", img: "https://boodmo.com/media/images/categories/10f1952.svg", link: "/catalog/air_conditioning/" },
    { name: "Fuel Supply System", img: "https://boodmo.com/media/images/categories/457f4a4.svg", link: "/catalog/fuelsystem/" },
    { name: "Gaskets and Sealing Rings", img: "https://boodmo.com/media/images/categories/38d5de9.svg", link: "/catalog/Gasket_SealingRings/" },
    { name: "Ignition and Glowplug System", img: "https://boodmo.com/media/images/categories/bfcf2c1.svg", link: "/catalog/ignition_glowplug/" },
    { name: "Interior and Comfort", img: "https://boodmo.com/media/images/categories/7e1a432.svg", link: "/catalog/interior_comfort/" },
    { name: "Body", img: "https://boodmo.com/media/images/categories/50008e4.svg", link: "/catalog/body/" },
    { name: "Oils and Fluids", img: "https://boodmo.com/media/images/categories/de978f4.svg", link: "/catalog/oilsfluids/" },
    { name: "Pipes and Hoses", img: "https://boodmo.com/media/images/categories/eeab7a3.svg", link: "/catalog/pipes_hoses/" },
    { name: "Repair Kits", img: "https://boodmo.com/media/images/categories/38427d6.svg", link: "/catalog/repair_kits/" },
    { name: "Sensors Relays and Control Units", img: "https://boodmo.com/media/images/categories/878a84e.svg", link: "/catalog/sensors_control_units/" },
    { name: "Steering", img: "https://boodmo.com/media/images/categories/15cfbae.svg", link: "/catalog/steering/" },
    { name: "Suspension and Arms", img: "https://boodmo.com/media/images/categories/9bcc0da.svg", link: "/catalog/suspension/" },
    { name: "Towbar Parts", img: "https://boodmo.com/media/images/categories/95660dc.svg", link: "/catalog/towbar/" },
    { name: "Transmission", img: "https://boodmo.com/media/images/categories/5924137.svg", link: "/catalog/transmission/" },
    { name: "Trims", img: "https://boodmo.com/media/images/categories/ecd08bd.svg", link: "/catalog/trims/" },
    { name: "Tyres and Alloys", img: "https://boodmo.com/media/images/categories/b1b2c08.svg", link: "/catalog/tyres_and_alloys/" },
    { name: "Universal", img: "https://boodmo.com/media/images/categories/8c5ddeb.svg", link: "/catalog/universal/" },
    { name: "Wheels", img: "https://boodmo.com/media/images/categories/1bb7d48.svg", link: "/catalog/wheels/" },
    { name: "Belts Chains and Rollers", img: "https://boodmo.com/media/images/categories/51eb913.svg", link: "/catalog/drive_belts/" },
  ];

  // 🔹 Filtering Logic
  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(filter.toLowerCase())
  );

  // 🔹 Filter parts/categories by title or name using the categoryFilter state
  const filteredParts = categories.filter((c) =>
    (c.title || c.name || "").toLowerCase().includes(categoryFilter.toLowerCase())
  );

  return (
    <section className="min-h-screen py-6">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
        <VehicleBreadcrumbs />

        <h1 className="text-2xl sm:text-3xl md:text-4xl px-2 font-bold text-gray-800 uppercase mb-4 sm:mb-6">
          RENAULT
        </h1>

        {/* OEM Catalogue Button */}
        <a
          href={link}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-block border border-1 border-gray-600 mb-2 text-black text-xs sm:text-sm rounded-md px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:bg-red-400"
        >
          View OEM Catalogue
        </a>
      </div>

      {/* Brand Info Section */}
      <div className="max-w-7xl mx-auto heading-filters flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b border-gray-200 pb-3 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        {/* Left Section - Heading */}
        <div className="h2-section text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Choose Your{" "}
          <span className="h2-section__name text-red-500 font-bold">Model</span>
        </div>

        {/* Right Section - Search Input */}
        <div className="heading-filters__action w-full sm:w-auto">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter Model"
            className="form-control form-control--search w-full sm:w-64 md:w-72 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />
        </div>
      </div>

      {/* Vehicle Model Grid */}
      <ul className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        {filteredModels.map((model) => (
          <li
            key={model.id}
            className="bg-white dark:bg-gray-800 rounded-md shadow-md hover:shadow-red-500/30 transform hover:-translate-y-1 transition duration-110 overflow-hidden"
          >
            {/* Image */}
            <div className="bg-white dark:bg-gray-700 flex items-center justify-center h-32 sm:h-40">
              <img
                src={model.image}
                alt={model.name}
                className="object-contain h-full w-full p-4 sm:p-6"
              />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 space-y-2">
              <Link
                to={`/vehicles/renault/${model.id}`}
                className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white transition block hover:text-red-500"
              >
                {model.name}
              </Link>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {model.years}
              </p>

              {/* Dropdown */}
              <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm rounded-md px-2 sm:px-3 py-1.5 sm:py-2 outline-none transition">
                <option className="font-semibold" value="">
                  SELECT YOUR CAR
                </option>

                {model.modifications.map((group, i) => (
                  <optgroup key={i} label={group.generation}>
                    {group.options.map((option, j) => (
                      <option key={j} value={option}>
                        {option}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </li>
        ))}
        {filteredModels.length === 0 && (
          <li className="col-span-full text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No models found.
            </p>
          </li>
        )}
      </ul>

      {/* ---------renault parts and accessories------------- */}
      <section className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
            RENAULT Parts and{" "}
            <span className="text-red-600 dark:text-pink-400">Accessories</span>
          </h2>

          {/* Search Filter */}
          <div className="w-full md:w-1/3">
            <input
              type="search"
              placeholder="Filter Category ..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                     px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 
                     transition duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {filteredParts.map((part, index) => {
            const displayName = part.title || part.name || "Category";
            const href = part.href || part.link || "#";
            const itemKey = `${displayName.replace(/\s+/g, "_")}-${index}`;
            return (
              <a
                key={itemKey}
                href={href}
                title={displayName}
                aria-label={displayName}
                className="flex flex-col items-center bg-white shadow hover:shadow-lg rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 transition-transform transform hover:scale-105"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mb-2 sm:mb-3">
                  {part.img ? (
                    <img
                      src={part.img}
                      alt={displayName}
                      className="max-w-[90%] max-h-[90%] object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg"
                      aria-hidden
                    />
                  )}
                </div>
                <span className="mt-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200 text-center font-medium break-words">
                  {displayName}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <Article_Review />
    </section>
  );
};
