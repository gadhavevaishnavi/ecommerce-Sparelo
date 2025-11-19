import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import vehiclesearch from "../assets/img/vehiclesearch.jpg";

const SearchSection = () => {
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [modifications, setModifications] = useState([]);
  const [selectedModification, setSelectedModification] = useState("");
  const [showAllMakers, setShowAllMakers] = useState(false);
  const [partNumber, setPartNumber] = useState("");

  // ✅ Car Data
  const carData = {
    CHEVROLET: {
      AVEO: {
        2021: ["Base", "Mid"],
        2022: ["Base", "Mid"],
        2023: ["Top"],
        2024: ["Premier", "LTZ"],
        2025: ["Hybrid LTZ"],
      },
      BEAT: {
        2021: ["PS", "LS"],
        2022: ["Base", "LS"],
        2023: ["LT", "Diesel"],
        2024: ["LTZ", "Premier Edition"],
        2025: ["EV Prototype"],
      },
      CAPTIVA: {
        2021: ["LT", "LTZ"],
        2022: ["LT"],
        2023: ["LTZ"],
        2024: ["Premier"],
        2025: ["Hybrid AWD"],
      },
      CRUZE: {
        2021: ["LT", "LTZ"],
        2022: ["LT", "LTZ"],
        2023: ["LTZ Plus"],
        2024: ["RS", "Premier Turbo"],
        2025: ["Cruze Hybrid"],
      },
      ENJOY: {
        2021: ["Base", "LS"],
        2022: ["Base"],
        2023: ["Top"],
        2024: ["LTZ", "Premier"],
        2025: ["CNG Variant"],
      },
      FORESTER: {
        2021: ["2.0 Petrol"],
        2022: ["2.0 Petrol"],
        2023: ["AWD"],
        2024: ["AWD XT"],
        2025: ["Hybrid AWD"],
      },
      OPTRA: {
        2021: ["Base"],
        2022: ["Base"],
        2023: ["Top"],
        2024: ["LTZ"],
        2025: ["Premier Edition"],
      },
      SAIL: {
        2021: ["Base", "LS"],
        2022: ["Base"],
        2023: ["Top"],
        2024: ["LTZ"],
        2025: ["EV Concept"],
      },
      SPARK: {
        2021: ["LS"],
        2022: ["LS"],
        2023: ["LT"],
        2024: ["LTZ"],
        2025: ["Spark EV"],
      },
      TAVERA: {
        2021: ["Neo 2", "Base"],
        2022: ["Base"],
        2023: ["Neo 3"],
        2024: ["Neo+"],
        2025: ["CNG Neo+"],
      },
      TRAILBLAZER: {
        2021: ["LT"],
        2022: ["LT"],
        2023: ["LTZ"],
        2024: ["Premier AWD"],
        2025: ["EV RS"],
      },
    },

    FIAT: {
      LINEA: {
        2021: ["Active", "Dynamic"],
        2022: ["Active", "Emotion"],
        2023: ["T-Jet"],
        2024: ["T-Jet Plus"],
        2025: ["Hybrid"],
      },
      PUNTO: {
        2021: ["Active", "Emotion"],
        2022: ["Active", "Sports"],
        2023: ["Evo"],
        2024: ["Abarth Edition"],
        2025: ["Evo Turbo"],
      },
      ABARTH: {
        2021: ["Base"],
        2022: ["Base"],
        2023: ["Competizione"],
        2024: ["Performance Edition"],
        2025: ["Abarth EV Concept"],
      },
    },

    FORD: {
      ECO: {
        2021: ["Trend", "Titanium"],
        2022: ["Trend", "Titanium"],
        2023: ["Thunder"],
        2024: ["S Edition"],
        2025: ["Eco EV"],
      },
      ENDEAVOUR: {
        2021: ["Titanium", "Titanium+"],
        2022: ["Titanium"],
        2023: ["Sport"],
        2024: ["Platinum"],
        2025: ["Everest Hybrid"],
      },
      FIGO: {
        2021: ["Base", "Trend"],
        2022: ["Base", "Titanium"],
        2023: ["Blu"],
        2024: ["Sport Edition"],
        2025: ["Hybrid"],
      },
      ASPIRE: {
        2021: ["Trend", "Titanium"],
        2022: ["Trend"],
        2023: ["Titanium+"],
        2024: ["Blu Edition"],
        2025: ["Hybrid Titanium"],
      },
    },

    HONDA: {
      City: {
        2021: ["SV", "V"],
        2022: ["SV", "V"],
        2023: ["VX", "ZX"],
        2024: ["e:HEV VX", "Hybrid ZX"],
        2025: ["RS Hybrid"],

      },
      Civic: {
        2021: ["V", "VX"],
        2022: ["V", "VX"],
        2023: ["ZX"],
        2024: ["RS Turbo"],
        2025: ["Hybrid ZX+"],
      },
      Amaze: {
        2021: ["E", "S"],
        2022: ["E", "S"],
        2023: ["VX"],
        2024: ["Special Edition"],
        2025: ["e:HEV"],
      },
      Jazz: {
        2021: ["V", "VX"],
        2022: ["V", "VX"],
        2023: ["ZX"],
        2024: ["ZX CVT"],
        2025: ["Hybrid ZX"],
      },
    },

    HYUNDAI: {
      i20: {
        2021: ["Magna", "Sportz"],
        2022: ["Magna", "Sportz"],
        2023: ["Asta"],
        2024: ["N Line"],
        2025: ["Turbo Asta+"],
      },
      Creta: {
        2021: ["E", "EX"],
        2022: ["E", "EX"],
        2023: ["SX", "SX(O)"],
        2024: ["Adventure Edition", "Knight Edition"],
        2025: ["Creta EV"],
      },
      Venue: {
        2021: ["S", "SX"],
        2022: ["S", "SX"],
        2023: ["N Line"],
        2024: ["Knight Edition"],
        2025: ["Venue EV"],
      },
      Verna: {
        2021: ["S", "SX"],
        2022: ["S", "SX"],
        2023: ["SX(O)"],
        2024: ["Turbo DCT"],
        2025: ["Hybrid SX(O)"],
      },
    },

    KIA: {
      Seltos: {
        2021: ["HTE", "HTK"],
        2022: ["HTE", "HTK"],
        2023: ["GTX", "X-Line"],
        2024: ["Facelift HTX+", "Diesel AT"],
        2025: ["EV X-Line"],
      },
      Sonet: {
        2021: ["HTE", "HTK"],
        2022: ["HTE", "HTK"],
        2023: ["GTX+"],
        2024: ["Facelift HTX", "X-Line"],
        2025: ["Sonet EV"],
      },
      Carnival: {
        2021: ["Premium", "Prestige"],
        2022: ["Premium"],
        2023: ["Limousine"],
        2024: ["KA4 Edition"],
        2025: ["Carnival EV"],
      },
    },

    MAHINDRA: {
      XUV300: {
        2021: ["W4", "W6"],
        2022: ["W4", "W6"],
        2023: ["W8", "W8(O)"],
        2024: ["TurboSportz"],
        2025: ["XUV300 EV"],
      },
      Scorpio: {
        2021: ["S3", "S5"],
        2022: ["S3", "S5"],
        2023: ["S11"],
        2024: ["Scorpio N Z8L"],
        2025: ["Scorpio EV"],
      },
      Thar: {
        2021: ["AX", "LX"],
        2022: ["AX", "LX"],
        2023: ["Diesel", "Petrol"],
        2024: ["RWD Variant"],
        2025: ["Thar.e"],
      },
      Bolero: {
        2021: ["B2", "B4"],
        2022: ["B4", "B6"],
        2023: ["B8"],
        2024: ["Neo+"],
        2025: ["Neo EV"],
      },
    },

    MARUTI: {
      Swift: {
        2021: ["LXI", "VXI"],
        2022: ["LXI", "VXI"],
        2023: ["ZXI", "ZXI+"],
        2024: ["CNG ZXI"],
        2025: ["Hybrid ZXI+"],
      },
      Baleno: {
        2021: ["Delta", "Zeta"],
        2022: ["Delta", "Zeta"],
        2023: ["Alpha"],
        2024: ["RS Turbo"],
        2025: ["Hybrid Alpha+"],
      },
      WagonR: {
        2021: ["LXI", "VXI"],
        2022: ["LXI", "VXI"],
        2023: ["ZXI"],
        2024: ["CNG VXI"],
        2025: ["WagonR EV"],
      },
      Alto: {
        2021: ["Std", "LXI"],
        2022: ["Std", "LXI"],
        2023: ["VXI+"],
        2024: ["K10 CNG"],
        2025: ["Alto EV"],
      },
      Dzire: {
        2021: ["LXI", "VXI"],
        2022: ["LXI", "VXI"],
        2023: ["ZXI"],
        2024: ["ZXI+"],
        2025: ["Hybrid ZXI+"],
      },
    },

    NISSAN: {
      Magnite: {
        2021: ["XE", "XL"],
        2022: ["XE", "XL"],
        2023: ["XV Premium"],
        2024: ["Turbo CVT"],
        2025: ["EV Concept"],
      },
      Kicks: {
        2021: ["XL"],
        2022: ["XL"],
        2023: ["XV"],
        2024: ["XV Premium Turbo"],
        2025: ["Hybrid"],
      },
      Sunny: {
        2021: ["XE", "XL"],
        2022: ["XE", "XL"],
        2023: ["XV"],
        2024: ["XV Premium CVT"],
        2025: ["Sunny e-Power"],
      },
    },

    RENAULT: {
      Kwid: {
        2021: ["RXE", "RXL"],
        2022: ["RXE", "RXL"],
        2023: ["Climber"],
        2024: ["AMT Climber"],
        2025: ["EV Concept"],
      },
      Triber: {
        2021: ["RXE", "RXL"],
        2022: ["RXE", "RXL"],
        2023: ["RXZ"],
        2024: ["Urban Night Edition"],
        2025: ["Triber EV"],
      },
      Duster: {
        2021: ["RXE", "RXL"],
        2022: ["RXE", "RXL"],
        2023: ["RXZ AWD"],
        2024: ["Next-Gen AWD"],
        2025: ["Hybrid AWD"],
      },
      Captur: {
        2021: ["RXT", "RXZ"],
        2022: ["RXT", "RXZ"],
        2023: ["Turbo RXZ"],
        2024: ["Turbo RXZ+"],
        2025: ["Captur EV"],
      },


    },

  };


  // ✅ Handlers
  const handleMakerChange = (e) => {
    const maker = e.target.value;
    setSelectedMaker(maker);
    setModels(maker ? Object.keys(carData[maker]) : []);
    setSelectedModel("");
    setSelectedYear("");
    setYears([]);
    setModifications([]);
    setSelectedModification("");
  };

  // ✅ Model Handler
  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    setYears(model ? Object.keys(carData[selectedMaker][model]) : []);
    setSelectedYear("");
    setModifications([]);
    setSelectedModification("");
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setModifications(year ? carData[selectedMaker][selectedModel][year] : []);
    setSelectedModification("");
  };

  // ✅ Limit and show all makers
  const makers = Object.keys(carData);
  const visibleMakers = showAllMakers ? makers : makers.slice(0, 10);

  const openOripartsWithBackLink = () => {
    if (!partNumber.trim()) return;
    const pn = encodeURIComponent(partNumber.trim());
    // Keep the {pn} placeholder UNENCODED so Oriparts can substitute it
    const backUrlBase = `${window.location.origin}/search/`;
    const url = `https://oriparts.com/?search=${pn}&back_url_pn=${encodeURIComponent(backUrlBase)}{pn}`;
    window.open(url, "_blank", "noopener");
  };

  const handleVehicleSearch = () => {
    const params = new URLSearchParams();
    if (selectedMaker) params.set("maker", selectedMaker);
    if (selectedModel) params.set("model", selectedModel);
    if (selectedYear) params.set("year", selectedYear);
    if (modifications.length) params.set("mod", modifications[0]);
    window.location.href = `/vehicle-search?${params.toString()}`;
  };

  return (
    <section
      className="relative px-4 md:px-6 py-10 md:py-16 bg-cover bg-center "
      style={{ backgroundImage: `url(${vehiclesearch})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0"></div>
      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* 🔹 Title */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Search by <span className="text-red-600">Vehicle</span>
          </h2>
          <p className="text-white mt-2 text-sm md:text-base">
            Find compatible car parts by selecting your car details
          </p>
        </div>

        {/* 🔹 Dropdowns and Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 bg-transparent p-4 md:p-6 shadow-md flex-wrap">
          {/* Maker */}
          <div className="flex flex-col items-center">
            <select
              value={selectedMaker}
              onChange={handleMakerChange}
              className="w-full md:w-auto min-w-[180px] px-5 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition text-gray-700 hover:border-gray-300"
            >
              <option value="">Select Car Maker</option>
              {visibleMakers.map((maker) => (
                <option key={maker} value={maker}>
                  {maker}
                </option>
              ))}
            </select>
            {makers.length > 10 && !showAllMakers && (
              <button
                onClick={() => setShowAllMakers(true)}
                className="mt-2 text-xs md:text-sm text-sky-600 hover:underline"
              >
                View More
              </button>
            )}
          </div>

          {/* Model */}
          <select
            value={selectedModel}
            onChange={handleModelChange}
            disabled={!selectedMaker}
            className={`w-full md:w-auto min-w-[180px] px-5 py-3 rounded-lg border ${!selectedMaker
                ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                : "bg-gray-50 border-gray-200 hover:border-gray-300"
              } focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition`}
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={selectedYear}
            onChange={handleYearChange}
            disabled={!selectedModel}
            className={`w-full md:w-auto min-w-[150px] px-5 py-3 rounded-lg border ${!selectedModel
                ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                : "bg-gray-50 border-gray-200 hover:border-gray-300"
              } focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition`}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Modification */}
          <select
            value={selectedModification}
            onChange={(e) => setSelectedModification(e.target.value)}
            disabled={!selectedYear}
            className={`w-full md:w-auto min-w-[180px] px-5 py-3 rounded-lg border ${!selectedYear
                ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                : "bg-gray-50 border-gray-200 hover:border-gray-300"
              } focus:ring-2 focus:ring-sky-500 focus:border-sky-400 transition`}
          >
            <option value="">Select Modification</option>
            {modifications.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>

          {/* 🔹 Search Button */}
          <button
            onClick={handleVehicleSearch}
            disabled={!selectedMaker || !selectedModel || !selectedYear || !selectedModification}
            className={`px-6 py-3 rounded-lg font-semibold shadow transition-transform transform ${selectedMaker, selectedModel, selectedYear, selectedModification
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            Search Parts
          </button>
        </div>

        {/* 🔹 Dynamic Buttons Section */}
        {selectedMaker && selectedModel && selectedYear && selectedModification && (
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {/* OEM Catalogue */}
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  maker: selectedMaker,
                  model: selectedModel,
                  year: selectedYear,
                  mod: selectedModification,
                });
                window.location.href = `/catalog?${params.toString()}`;
              }}
               className="px-4 py-2 rounded-lg font-semibold shadow bg-transparent border border-red-300 text-red-300 hover:bg-red-50 hover:text-gray-900 transition-colors"
             >
              OEM Catalogue
            </button>

            {/* OEM Service Kit */}
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  maker: selectedMaker,
                  model: selectedModel,
                  year: selectedYear,
                  mod: selectedModification,
                });
                window.location.href = `/oem-service-kit?${params.toString()}`;
              }}
            className="px-4 py-2 rounded-lg font-semibold shadow bg-transparent border border-red-300 text-red-300 hover:bg-red-50 hover:text-gray-900 transition-colors"
               >
              OEM Service Kit
            </button>

            {/* Aftermarket Service Kit */}
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  maker: selectedMaker,
                  model: selectedModel,
                  year: selectedYear,
                  mod: selectedModification,
                });
                window.location.href = `/aftermarket-service-kit?${params.toString()}`;
              }}
               className="px-4 py-2 rounded-lg font-semibold shadow bg-transparent border border-red-300 text-red-300 hover:bg-red-50 hover:text-gray-900 transition-colors"
            >
              Aftermarket Service Kit
            </button>

            {/* Save Car in My Garage */}
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  maker: selectedMaker,
                  model: selectedModel,
                  year: selectedYear,
                  mod: selectedModification,
                });
                window.location.href = `/my-garage/save?${params.toString()}`;
              }}
              className="px-4 py-2 rounded-lg font-semibold shadow bg-transparent border border-red-300 text-red-300 hover:bg-red-50 hover:text-gray-900 transition-colors"
            >
              Save Car in My Garage
            </button>
          </div>
        )}

        {/* 🔹 Part Number Search */}
        <div className="flex justify-end mt-4 md:mt-6 ">
          <div className="flex w-full md:w-[420px] shadow-md rounded-lg overflow-hidden bg-white border border-gray-100">
            <input
              type="text"
              placeholder="Search by part number (PN)..."
              className="flex-1 px-4 py-3 md:py-4 text-gray-700 border-0 outline-none focus:ring-2 focus:ring-sky-400 text-sm md:text-base"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openOripartsWithBackLink();
              }}
            />
            <button
              onClick={openOripartsWithBackLink}
              className="bg-red-500 text-white px-4 md:px-5 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <FaSearch className="text-sm md:text-base" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchSection;

