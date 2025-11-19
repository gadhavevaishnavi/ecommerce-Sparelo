import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const replacementPartsData = [
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

const ReplacementParts = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredParts = replacementPartsData.filter((part) =>
    part.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800">
          Replacement <span className="text-sky-600">Parts</span>
        </h3>

        <input
          type="search"
          placeholder="Filter Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 md:mt-0 w-full md:w-64 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredParts.map((part, index) => (
          <a
            key={index}
            href={part.link}
            className="flex flex-col items-center bg-white shadow hover:shadow-lg rounded-xl p-2 transition-transform transform hover:scale-105"
          >
            <img
              src={part.img}
              alt={part.name}
              className="w-14 h-14 object-contain mb-2"
            />
            <span className="text-xs text-gray-700 text-center font-medium">
              {part.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ReplacementParts;
