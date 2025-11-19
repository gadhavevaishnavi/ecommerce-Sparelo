import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaSearch, FaCar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

// 🔹 Car Search Section (Vehicle Modal)
const SearchVehicleSection = () => {
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [modifications, setModifications] = useState([]);

  const carData = {
    CHEVROLET: {
      AVEO: { 2022: ["Base", "Mid"], 2023: ["Top", "RS"] },
      BEAT: { 2022: ["LS", "LT"], 2023: ["LTZ", "Diesel"] },
      CRUZE: { 2021: ["LT", "LTZ"], 2022: ["LTZ"] },
    },
    HONDA: {
      City: { 2021: ["SV", "V"], 2022: ["VX", "ZX"], 2023: ["ZX+", "Sport"] },
      Civic: { 2021: ["V", "VX"], 2022: ["ZX"], 2023: ["ZX+", "Type R"] },
      Amaze: { 2022: ["E", "S"], 2023: ["VX", "ZX"] },
    },
    MARUTI: {
      Swift: { 2021: ["LXI", "VXI"], 2022: ["ZXI", "ZXI+"], 2023: ["ZXI+", "Sport"] },
      Alto: { 2021: ["Std", "LXI"], 2022: ["VXI", "VXI+"], 2023: ["VXI+"] },
      Dzire: { 2022: ["LXI", "VXI"], 2023: ["ZXI", "ZXI+"] },
      Baleno: { 2022: ["Sigma", "Delta"], 2023: ["Zeta", "Alpha"] },
    },
    HYUNDAI: {
      Creta: { 2021: ["E", "S"], 2022: ["SX", "SX+"], 2023: ["SX+", "SX(O)"] },
      Venue: { 2022: ["E", "S"], 2023: ["SX", "SX(O)"] },
      i20: { 2021: ["Magna", "Sportz"], 2022: ["Asta", "Asta(O)"] },
    },
    KIA: {
      Seltos: { 2021: ["HTK+", "HTX"], 2022: ["HTX+", "GT Line"] },
      Sonet: { 2022: ["HTE", "HTK"], 2023: ["HTX", "HTX+"] },
    },
    TATA: {
      Nexon: { 2021: ["XE", "XM"], 2022: ["XZ", "XZ+"] },
      Harrier: { 2022: ["XE", "XZ"], 2023: ["XZ+", "XZA"] },
      Altroz: { 2022: ["XE", "XT"], 2023: ["XZ", "XZ+"] },
    },
    TOYOTA: {
      Fortuner: { 2021: ["GX", "VX"], 2022: ["ZX", "ZX(O)"] },
      Innova: { 2022: ["E", "G"], 2023: ["V", "Z"] },
    },
    FORD: {
      EcoSport: { 2021: ["Ambiente", "Trend"], 2022: ["Titanium", "Titanium+"] },
      Figo: { 2021: ["Trend", "Titanium"], 2022: ["Titanium+", "Sports"] },
    },
    NISSAN: {
      Magnite: { 2022: ["XE", "XL"], 2023: ["XV", "XV Premium"] },
      Kicks: { 2022: ["XL", "XV"], 2023: ["XV Premium", "XV Premium (O)"] },
    },
    RENAULT: {
      Kwid: { 2021: ["RXT", "RXL"], 2022: ["RXZ", "RXZ Opt"] },
      Duster: { 2021: ["RxE", "RxL"], 2022: ["RxZ", "RxZ Opt"] },
    },
  };

  const handleMakerChange = (e) => {
    const maker = e.target.value;
    setSelectedMaker(maker);
    setModels(maker ? Object.keys(carData[maker]) : []);
    setSelectedModel(""); setSelectedYear(""); setYears([]); setModifications([]);
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    setYears(model ? Object.keys(carData[selectedMaker][model]) : []);
    setSelectedYear(""); setModifications([]);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setModifications(year ? carData[selectedMaker][selectedModel][year] : []);
  };

  return (
    <div className="text-left flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-gray-700 mb-2">
        Search by <span className="text-red-500">Vehicle</span>
      </h2>

      {/* Dropdowns */}
      <div className="flex flex-col gap-3 mb-4">
        <select className="border px-4 py-3 rounded focus:ring-2 focus:ring-sky-500" value={selectedMaker} onChange={handleMakerChange}>
          <option value="">Select Car Maker</option>
          {Object.keys(carData).map((maker) => <option key={maker} value={maker}>{maker}</option>)}
        </select>

        <select className="border px-4 py-3 rounded focus:ring-2 focus:ring-sky-500" value={selectedModel} onChange={handleModelChange} disabled={!selectedMaker}>
          <option value="">Select Model</option>
          {models.map((model) => <option key={model} value={model}>{model}</option>)}
        </select>

        <select className="border px-4 py-3 rounded focus:ring-2 focus:ring-sky-500" value={selectedYear} onChange={handleYearChange} disabled={!selectedModel}>
          <option value="">Select Year</option>
          {years.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>

        <select className="border px-4 py-3 rounded focus:ring-2 focus:ring-sky-500" disabled={!selectedYear}>
          <option value="">Select Modification</option>
          {modifications.map((mod) => <option key={mod} value={mod}>{mod}</option>)}
        </select>


        <div className="text-center mt-3">
          <span className="hover:underline text-blue-600 cursor-pointer">
            Search by Number Plate
          </span>
        </div>
        <button className="bg-sky-400 hover:bg-sky-500 text-white px-8 py-3 shadow rounded w-full">SEARCH PARTS </button>
      </div>
    </div>
  );
};

// 🔹 Number Plate Modal
const SearchNumberPlateSection = () => (
  <div className="text-left flex flex-col gap-4">
    <h3 className="text-2xl font-bold text-gray-700">
      Search by <span className="text-red-500">Number Plate</span>
    </h3>
    <div className="flex items-center border rounded-lg px-3 py-3 shadow-md mb-4">
      <span className="bg-gray-200 px-3 py-2 rounded-l">IND</span>
      <input type="text" maxLength={11} placeholder="DL1AA2345" className="flex-1 px-3 py-2 outline-none text-gray-700" />
      <FaSearch className="text-gray-500 text-xl cursor-pointer" />
    </div>
    <span className="text-blue-600 cursor-pointer underline">Select your car manually</span>
  </div>
);

// 🔹 Main Sider Component
export const Sider = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // ✅ Added navigate
  const [isSearchVehicleOpen, setIsSearchVehicleOpen] = useState(false);
  const [isSearchNumberOpen, setIsSearchNumberOpen] = useState(false);

  const topMenuItems = [
    { label: "Search by Vehicle", action: () => setIsSearchVehicleOpen(true) },
    { label: "Search by Number Plate", action: () => setIsSearchNumberOpen(true) },
    { label: "Brands", action: () => { onClose(); navigate("/brands"); } },
    { label: "Car Makers", action: () => { onClose(); navigate("/vehicles"); } },
    { label: "Contact Us", action: () => { onClose(); navigate("/contact"); } },
    { label: "Sell Your Car", href: "https://www.spinny.com/sell-used-car/", external: true },
  ];

  const bottomMenuItems = [
    { label: "FAQ", href: "/faq" },
    { label: "Discovery Points", href: "/discovery-points" },
    { label: "Boodmo API Solution", href: "/api-solution" },
    { label: "Return Policy", href: "/return-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Sellers Policy", href: "/sellers-policy" },
    { label: "Suppliers Relations", href: "/suppliers-relations" },
    { label: "Anti-corruption Policy", href: "/anti-corruption" },
    { label: "Remove Account", href: "/remove-account" },
    { label: "Become a Vendor", href: "/become-vendor" },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-auto`}>
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold text-gray-700">Menu</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500"><IoClose size={24} /></button>
        </div>

        {/* Top Menu */}
        <ul className="flex flex-col p-4 space-y-2 border-b">
          {topMenuItems.map((item, idx) => (
            <li key={idx} className="cursor-pointer hover:text-blue-600 font-medium" onClick={() => {
              if (item.action) item.action();
              if (item.href && !item.external) navigate(item.href);
              if (item.external) window.open(item.href, "_blank");
            }}>
              {item.label}
            </li>
          ))}
        </ul>

        {/* Bottom Menu */}
        <ul className="flex flex-col p-4 space-y-2">
          {bottomMenuItems.map((item, idx) => (
            <li key={idx} className="cursor-pointer text-gray-400 hover:text-blue-600 font-medium"><a href={item.href}>{item.label}</a></li>
          ))}
        </ul>

        {/* Logout */}
        <div className="px-4 py-3 border-t mt-auto">
          <button className="w-full text-left font-medium text-red-500 hover:text-red-700">Logout</button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 py-4 border-b">
          <a href="https://www.facebook.com/boodmocom/"
            target="_blank"
            rel="nofollow"
            className="text-blue-500 hover:scale-110 transition-transform duration-200" >
            <FaFacebookF size={20} />
          </a>
          <a href="https://www.instagram.com/boodmo_expert/"
            target="_blank"
            rel="nofollow"
            className="text-pink-500 hover:scale-110 transition-transform duration-200">
            <FaInstagram size={20} />
          </a>
          <a href="https://www.linkedin.com/company/boodmo-com/"
            target="_blank"
            rel="nofollow"
            className="text-blue-700 hover:scale-110 transition-transform duration-200" >
            <FaLinkedinIn size={20} />
          </a>
        </div>

      </div>

      {/* Search Vehicle Modal */}
      {isSearchVehicleOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative flex flex-col gap-4">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold" onClick={() => setIsSearchVehicleOpen(false)}>✕</button>
            <SearchVehicleSection />
          </div>
        </div>
      )}

      {/* Search Number Plate Modal */}
      {isSearchNumberOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative flex flex-col gap-4">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold" onClick={() => setIsSearchNumberOpen(false)}>✕</button>
            <SearchNumberPlateSection />
          </div>
        </div>
      )}
    </>
  );
};