import React, { useState } from "react";
import { FaDatabase, FaFacebook, FaApple } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { BiFingerprint } from "react-icons/bi";
import { Navbar } from "./Navbar";

export const MyProfile = () => {
  const [toast, setToast] = useState("");
  const email = "abc@gmail.com";

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    showToast("Email copied succesfully!");
  };

  const handleSavePhone = () => {
    showToast("Phone number saved!");
  };

  const handleChangePassword = () => {
    showToast(" Password change requested!");
  };

  const handleSaveProfile = () => {
    showToast("Profile saved!");
  };

  const handlePurchase = () => {
    showToast("Points purchased!");
  };

  return (
    <section className="px-10  bg-white min-h-screen relative">

      {toast && (
        <div className="fixed top-5 right-5 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {toast}
        </div>
      )}

      {/* Page Header */}
     <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t-2 mb-8 px-5 py-5 pb-3">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          My <span className="text-red-500">Profile</span>
        </h1>
        <Navbar/>
      </div>

      <div>
        <h2 className="text-2xl text-cyan-800 font-semibold ">
          Personal Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 py-6">
        {/* Personal Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Personal Information
          </h2>

          <form className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  defaultValue={email}
                  className="flex-1 px-3 py-3 border rounded-lg text-gray-400 focus:ring-2 focus:ring-sky-500"
                  readOnly
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-3 text-sm border rounded-lg text-red-400 hover:bg-red-500 hover:text-white"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 px-3 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Phone */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="+91"
                  className="w-1/4 px-3 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="flex-1 px-3 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={handleSavePhone}
                  className="px-6 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Notification Preferences */}
            <a href="#" className="text-sky-600 text-sm py-3 hover:underline">
              Notification preferences
            </a>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleChangePassword}
                className="px-4 py-3 border rounded-lg hover:bg-red-400"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-6 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Points + Profile Connections */}
        <div className="space-y-6">
          {/* Points */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
              Profile Connections <CiCircleQuestion />
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-800 font-medium"> <FaDatabase />0 Points</span>
              <select className="px-3 py-3 border rounded-lg">
                <option>30 Points (₹2.3/point) - ₹69</option>
                <option>300 Points (₹ 1/point) - ₹299</option>
                <option>1000 Points (₹0.8/point) - ₹799</option>
                <option>5000 Points (₹0.7/point) - ₹3,499</option>
                <option>10000 Points (₹0.6/point) - ₹6,499</option>
                <option>30000 Points (₹0.5/point) - ₹15,999</option>
              </select>
              <button
                type="button"
                onClick={handlePurchase}
                className="px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Purchase
              </button>
            </div>
            <a
              href="#"
              className="text-sky-600 text-sm hover:underline block mt-2"
            >
              Check usage history
            </a>
          </div>

          {/* Profile Connections */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
              Profile Connections <CiCircleQuestion />
            </h2>

            <div className="flex gap-10 text-3xl text-gray-600">
              <FcGoogle className="hover:scale-110 border transition cursor-pointer" />
              <FaFacebook className="hover:text-blue-600 hover:scale-110 border transition cursor-pointer" />
              <FaApple className="hover:text-red-600 hover:scale-110 border transition cursor-pointer" />
              <BiFingerprint className="hover:text-red-600 hover:scale-110 border transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
