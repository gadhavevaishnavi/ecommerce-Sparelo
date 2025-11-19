import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaCar } from "react-icons/fa";
import { useVehicle } from "../contexts/VehicleContext";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { 
  getVehicleData, 
  getVehicleMakers, 
  getModelsForMaker, 
  getYearsForModel, 
  getModificationsForYear,
  getVehicleImageUrl 
} from "../data/vehicleData";

// ✅ Local images (inside src/assets/img/)
import bannerui from "../assets/img/bannerui.jpg";

export const SearchSection = ({ onClose, initialVehicle = null }) => {
  const { addVehicle, updateVehicle } = useVehicle();
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedModification, setSelectedModification] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [vin, setVin] = useState("");
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [modifications, setModifications] = useState([]);

  // ✅ Get vehicle data from Vehicles folder
  const vehicleData = useMemo(() => getVehicleData(), []);
  const availableMakers = useMemo(() => getVehicleMakers(), []);

  // Pre-fill form when editing
  useEffect(() => {
    if (initialVehicle) {
      setSelectedMaker(initialVehicle.make || "");
      setNumberPlate(initialVehicle.registrationNumber || "");
      setVin(initialVehicle.vin || "");
      setSelectedYear(initialVehicle.year || "");
      setSelectedModification(initialVehicle.variant || "");
      
      if (initialVehicle.make) {
        const makerModels = getModelsForMaker(initialVehicle.make);
        setModels(makerModels);
        setSelectedModel(initialVehicle.model || "");
        
        if (initialVehicle.model) {
          const modelYears = getYearsForModel(initialVehicle.make, initialVehicle.model);
          setYears(modelYears);
          
          if (initialVehicle.year) {
            const yearModifications = getModificationsForYear(
              initialVehicle.make, 
              initialVehicle.model, 
              parseInt(initialVehicle.year)
            );
            setModifications(yearModifications);
          }
        }
      }
    } else {
      // Reset form if not editing
      setSelectedMaker("");
      setSelectedModel("");
      setSelectedYear("");
      setSelectedModification("");
      setNumberPlate("");
      setVin("");
      setModels([]);
      setYears([]);
      setModifications([]);
    }
  }, [initialVehicle]);

  const handleMakerChange = (e) => {
    const maker = e.target.value;
    setSelectedMaker(maker);
    const makerModels = getModelsForMaker(maker);
    setModels(makerModels);
    setSelectedModel("");
    setSelectedYear("");
    setYears([]);
    setModifications([]);
    setSelectedModification("");
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    const modelYears = getYearsForModel(selectedMaker, model);
    setYears(modelYears);
    setSelectedYear("");
    setModifications([]);
    setSelectedModification("");
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    const yearModifications = getModificationsForYear(selectedMaker, selectedModel, parseInt(year));
    setModifications(yearModifications);
    setSelectedModification("");
  };

  const handleModificationChange = (e) => {
    setSelectedModification(e.target.value);
  };

  const handleSave = () => {
    // Validate required fields
    if (!selectedMaker || !selectedModel || !selectedYear || !selectedModification) {
      alert("Please select Car Maker, Model, Year, and Modification");
      return;
    }

    // Create vehicle object
    const vehicleData = {
      make: selectedMaker,
      model: selectedModel,
      variant: selectedModification,
      year: selectedYear.toString(),
      registrationNumber: numberPlate.trim() || undefined,
      vin: vin.trim() || undefined,
    };

    // Update or add vehicle
    if (initialVehicle) {
      updateVehicle(initialVehicle.id, vehicleData);
      alert(`Vehicle updated successfully!\n${selectedMaker} ${selectedModel} ${selectedModification} (${selectedYear})`);
    } else {
      addVehicle(vehicleData);
      alert(`Vehicle saved successfully!\n${selectedMaker} ${selectedModel} ${selectedModification} (${selectedYear})`);
    }

    // Reset form
    setSelectedMaker("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedModification("");
    setNumberPlate("");
    setVin("");
    setModels([]);
    setYears([]);
    setModifications([]);

    // Close modal
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="text-left">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {initialVehicle ? (
          <>Edit <span className="text-red-500">Car</span></>
        ) : (
          <>Add new <span className="text-red-500">Car</span></>
        )}
      </h2>
      <h2 className="text-lg mb-4">Find your car by Number Plate:</h2>

      {/* Number Plate Input */}
      <div className="flex items-center border rounded-lg px-3 py-2 shadow-md mb-4">
        <span className="bg-gray-200 px-3 py-2 rounded-l">IND</span>
        <input
          type="text"
          placeholder="DL1AA2345"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
          className="flex-1 px-3 py-2 outline-none text-gray-700"
        />
        <FaSearch className="text-gray-500 text-xl cursor-pointer" />
      </div>

      <p className="text-gray-500 my-4">OR</p>

      {/* Dropdowns */}
      <div className="flex flex-col gap-3 mb-4">
        <select
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-sky-500"
          value={selectedMaker}
          onChange={handleMakerChange}
        >
          <option value="">Select Car Maker</option>
          {availableMakers.map((maker) => (
            <option key={maker} value={maker}>
              {maker}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-sky-500"
          value={selectedModel}
          onChange={handleModelChange}
          disabled={!selectedMaker}
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-sky-500"
          value={selectedYear}
          onChange={handleYearChange}
          disabled={!selectedModel}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-sky-500"
          value={selectedModification}
          onChange={handleModificationChange}
          disabled={!selectedYear}
        >
          <option value="">Select Modification</option>
          {modifications.map((mod) => (
            <option key={mod} value={mod}>
              {mod}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter VIN (Optional)"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <button 
        onClick={handleSave}
        className="bg-sky-500 font-bold hover:bg-sky-600 text-white px-8 py-3 shadow rounded w-full transition-colors"
      >
        {initialVehicle ? 'Update' : 'Save'}
      </button>
    </div>
  );
};

// 🔹 Main Component
export const BoodmoUi = () => {
  const { vehicles } = useVehicle();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  
  // Banner images for scrolling carousel
  const bannerImages = [
    bannerui,
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
   
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.vehicle-dropdown-container')) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  // Get latest 3 vehicles sorted by creation date (most recent first)
  const latestVehicles = useMemo(() => {
    return [...vehicles]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt || 0);
        const dateB = new Date(b.createdAt || b.updatedAt || 0);
        return dateB - dateA;
      })
      .slice(0, 3);
  }, [vehicles]);

  // Get vehicle image
  const getVehicleImage = (make, model) => {
    const imageUrl = getVehicleImageUrl(make, model);
    return imageUrl || 'https://via.placeholder.com/100x60?text=Car';
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (vehicleId, e) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === vehicleId ? null : vehicleId);
  };

  // Handle OEM Service Kit
  const handleOemServiceKit = (vehicle) => {
    const params = new URLSearchParams({
      maker: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mod: vehicle.variant || '',
    });
    navigate(`/oem-service-kit?${params.toString()}`);
    setOpenDropdownId(null);
  };

  // Handle Aftermarket Service Kit
  const handleAftermarketServiceKit = (vehicle) => {
    const params = new URLSearchParams({
      maker: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mod: vehicle.variant || '',
    });
    navigate(`/aftermarket-service-kit?${params.toString()}`);
    setOpenDropdownId(null);
  };

  // Handle View OEM Catalog
  const handleViewOemCatalog = (vehicle) => {
    const params = new URLSearchParams({
      maker: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mod: vehicle.variant || '',
    });
    navigate(`/oem-catalog?${params.toString()}`);
    setOpenDropdownId(null);
  };

  return (
    <section className="bg-red-50">
      {/* 🔹 Banner Section with Scrolling Images */}
      <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center">
        {/* 🔹 Scrolling Banner Carousel */}
        <div className="absolute inset-0 w-full h-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            className="w-full h-full"
          >
            {bannerImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={image}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover opacity-70"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/1200x600?text=Banner';
                    }}
                  />
                  {/* 🔹 Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🔹 Centered Content - No Background */}
        <div className="relative z-10 w-full max-w-6xl px-6 md:px-8 text-center text-white">
          {/* Main Heading */}
          <h1 className="text-2xl md:text-4xl mb-4 text-white font-semibold">
            Find Genuine <span className="text-red-400">OEM</span> & <br />
            <span className="text-blue-400">Aftermarket</span> Auto Parts
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
            Your one-stop solution for all automotive spare parts
          </p>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 w-full px-4 sm:px-6">
    
         {/* Add Car button */}
            <button
              className="text-sm sm:text-base md:text-lg font-semibold text-white flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 
              py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl transition-all duration-300 transform hover:scale-105
               hover:shadow-2xl mx-auto w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <FaCar className="text-lg sm:text-xl md:text-2xl" />
              <span className="hidden sm:inline">ADD CAR TO MY GARAGE</span>
              <span className="sm:hidden">ADD CAR</span>
            </button>

            {/* Your Vehicles Section - Latest 3 */}
            {latestVehicles.length > 0 && (
              <div className="mt-2 sm:mt-2 md:mt-2 w-full">
              
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 px-2 sm:px-0">
                  {latestVehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="vehicle-dropdown-container relative bg-white rounded-md shadow-sm overflow-visible flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-2.5 py-1 sm:py-1.5 md:py-2 hover:shadow-md transition-shadow cursor-pointer min-w-[100px] sm:min-w-[120px] md:min-w-[140px] max-w-[120px] sm:max-w-[150px] md:max-w-[180px]"
                      onClick={(e) => handleDropdownToggle(vehicle.id, e)}
                    >
                      <div className="w-10 h-6 sm:w-12 sm:h-8 md:w-14 md:h-10 flex-shrink-0 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                        <img
                          src={getVehicleImage(vehicle.make, vehicle.model)}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x60?text=Car';
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1 flex-1 min-w-0">
                        <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-blue-900 truncate">
                          {vehicle.model?.toUpperCase() || 'N/A'}
                        </p>
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-blue-900 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      {/* Dropdown Menu */}
                      {openDropdownId === vehicle.id && (
                        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[200px] sm:min-w-[220px] py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOemServiceKit(vehicle);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors"
                          >
                            Open OEM Service Kit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAftermarketServiceKit(vehicle);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors"
                          >
                            Open Aftermarket Service Kit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewOemCatalog(vehicle);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors"
                          >
                            View OEM Catalog
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
         
        </div>
      </div>

      {/* 🔹 Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[50%] lg:w-[30%] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <SearchSection onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
};