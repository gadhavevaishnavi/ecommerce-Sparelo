import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaPaperclip } from "react-icons/fa";

const Contact = () => {
  return (
    <main className="wrapper bg-white p-8">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Help & <span className="text-red-500">Support</span>
        </h1>
        <div className="flex gap-6 text-red-600 font-medium">
          <a href="/faq" className="hover:underline">
            FAQ
          </a>
          <a href="/my-tickets" className="hover:underline">
            My Tickets
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section - Location & Phone */}
        <div className="md:w-1/2 flex flex-col gap-8">
          {/* Location */}
          <div className="flex gap-4 items-start">
            <FaMapMarkerAlt className="text-red-500 text-2xl mt-1" />
            <div>
              <h2 className="text-lg font-semibold">Location</h2>
              <p className="text-gray-600 leading-relaxed">
                Smart Parts Online Private Limited <br />
                Unit Nos. 1609 &amp; 1610, 16th floor, Magnum Global Park <br />
                Golf Course Extension Road, Sector - 58 <br />
                Gurugram, Haryana, 122011
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 items-center">
            <FaPhoneAlt className="text-sky-500 text-2xl" />
            <div>
              <h2 className="text-lg font-semibold">Phone</h2>
              <a
                href="tel:+911141189222"
                className="text-sky-600 hover:underline"
              >
                +91 114 1189222
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2">
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value="abc@gmail.com"
              disabled
              className="w-full border p-3 rounded bg-white"
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded"
            />
            <select className="w-full border p-3 rounded">
              <option>Question type</option>
              <option>Help me find spare part for my car</option>
              <option>Order related query</option>
              <option>Refund and return related</option>
              <option>I want to become seller</option>
              <option>I want to become B2B customer</option>
              <option>Error or problem with website/app</option>
              <option>Other</option>
            </select>
            <textarea
              placeholder="Comment"
              rows="4"
              className="w-full border p-3 rounded"
            ></textarea>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 hover:bg-sky-400 hover:text-white border border-dashed px-4 py-2 rounded w-1/2 justify-center text-gray-600 cursor-pointer">
                <FaPaperclip /> Attach files
                <input type="file" multiple hidden />
              </label>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded w-1/2 hover:bg-red-600"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-12 border-t pt-6 text-gray-700 space-y-6">
        <p>
          At boodmo, we are committed to providing exceptional service and
          support. If you have any questions, concerns, or feedback, please
          don’t hesitate to reach out to us.
        </p>

        <h3 className="text-xl font-semibold">Customer Support</h3>
        <ul className="list-disc ml-6">
          <li>
            <strong>Phone (IVR):</strong>{" "}
            <a href="tel:+911141189222" className="text-red-600">
              +91 114 1189222
            </a>
          </li>
          <li>
            <strong>Operating Hours:</strong> All days, 10:00 to 19:00 IST
            (except public holidays)
          </li>
        </ul>

        <h3 className="text-xl font-semibold">Address</h3>
        <p>
          Smart Parts Online Private Limited <br />
          Unit Nos. 1609 &amp; 1610, 16th floor, Magnum Global Park <br />
          Golf Course Extension Road, Sector - 58 <br />
          Gurugram, Haryana, 122011
        </p>
        <p className="text-red-500 font-semibold">
          Please do not send order returns to the above-mentioned address. They
          will not be delivered and returned to you.
        </p>

        <h3 className="text-xl font-semibold">Business Inquiries</h3>
        <p>
          For business partnerships, bulk orders, or corporate-related
          questions:{" "}
          <a
            href="https://boodmo.com/pages/static/become_a_vendor_on_boodmo/"
            className="text-sky-600"
          >
            Become a Vendor
          </a>
        </p>

        <h3 className="text-xl font-semibold">Follow Us</h3>
        <ul className="flex gap-6">
          <li>
            <a
              href="https://www.facebook.com/boodmocom/"
              className="text-sky-600 hover:underline"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.x.com/boodmo_In"
              className="text-sky-600 hover:underline"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/boodmo-com"
              className="text-sky-600 hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Contact;
