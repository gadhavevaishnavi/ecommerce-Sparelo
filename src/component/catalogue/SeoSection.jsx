import React, { useState } from "react";

const SeoSection = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="bg-white shadow-md rounded-2xl p-6 md:p-10 mb-12">
      <div
        className={`transition-all duration-700 ease-in-out ${
          showMore ? "max-h-full" : "max-h-[480px] overflow-hidden"
        }`}
      >
        <div className="space-y-6 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <h3 className="text-2xl font-semibold text-gray-900">
            Discover India's Premier Online Hub for Car Parts and More
          </h3>
          <p>
            <span className="font-semibold text-pink-600">Sparelo</span> stands
            out as your go-to destination for an extensive selection of car
            parts and accessories across India. Our comprehensive inventory
            features both OEM originals and high-quality aftermarket options,
            ensuring you get the perfect fit for your vehicle at unbeatable
            value. Whether you're maintaining a classic ride or upgrading a
            modern SUV, we've got parts for every brand, model, and era
            available on Indian roads—and beyond.
          </p>
          <p>
            Explore offerings from trusted names like genuine Toyota, Kia
            certified, Skoda authentic, Renault OEM, and a host of other
            reputable suppliers, all curated for reliability and performance.
          </p>

          {/* Section 2 */}
          <h3 className="text-2xl font-semibold text-gray-900">
            Effortless Shopping: Navigate Sparelo's User-Friendly Catalog
          </h3>
          <p>
            As India's leading digital platform for automotive spares,
            <span className="font-semibold text-pink-600"> Sparelo</span> delivers
            a seamless catalog experience packed with smart tools. Dive into our
            advanced search and sorting features to pinpoint the ideal component
            without hassle. Getting started is straightforward—here's how:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Choose your vehicle make.</li>
            <li>Select the specific model and production year.</li>
            <li>Narrow down by part category and subcategory.</li>
            <li>
              Opt for authenticity level: OEM genuine, certified replicas, or
              budget-friendly alternatives.
            </li>
            <li>Set your budget range for tailored recommendations.</li>
          </ul>
          <p className="italic text-gray-600">
            In mere moments, our platform curates top matches for you. Shop
            smart from anywhere—home, garage, or on the go—with total ease.
          </p>

          {/* Section 3 */}
          <h3 className="text-2xl font-semibold text-gray-900">
            Beyond Essentials: Elevate Your Drive with Sparelo Accessories
          </h3>
          <p>
            At <span className="font-semibold text-pink-600">Sparelo</span>, we're
            more than just replacement parts—we're your source for premium
            add-ons that enhance every journey. From practical upgrades to
            stylish touches, our collection covers all bases for protection,
            convenience, and flair. Stock up on must-haves like floor mats,
            dash cams, alloy wheel protectors, GPS trackers, LED lighting kits,
            portable vacuums, and air purifiers, plus a treasure trove of other
            innovations ready for immediate dispatch.
          </p>

          {/* Section 4 */}
          <h3 className="text-2xl font-semibold text-gray-900">
            What Sets Sparelo Apart as Your Trusted Partner?
          </h3>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <span className="font-semibold text-gray-900">
                Unmatched Inventory Depth.
              </span>{" "}
              With over a hundred thousand items, <span className="font-semibold text-pink-600">Sparelo</span>
              's vast selection of authentic and compatible spares covers every
              need for personal and professional use.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                Intuitive Digital Experience.
              </span>{" "}
              Our refined search engine and customizable filters make discovering
              the exact match a breeze—precision at your fingertips.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                Nationwide Reach and Speed.
              </span>{" "}
              Count on prompt fulfillment and swift shipping to any corner of
              India, keeping your projects on track without delays.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                Dedicated Customer Excellence.
              </span>{" "}
              Our expert team is on hand 24/7 to guide, resolve, and ensure your
              satisfaction every step of the way.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                Value-Driven Pricing.
              </span>{" "}
              Competitive rates across the board mean quality repairs and
              upgrades that won't break the bank—smart savings for savvy drivers.
            </li>
          </ul>
          <p>
            <span className="font-semibold text-pink-600">Sparelo</span> empowers
            everyday enthusiasts, mechanics, retailers, and B2B fleets with an
            all-in-one resource for automotive excellence.
          </p>
        </div>
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowMore(!showMore)}
          className="px-8 py-3 bg-gray-200 text-black font-semibold rounded- shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          {showMore ? "View Less" : "View More"}
        </button>
      </div>
    </section>
  );
};

export default SeoSection;