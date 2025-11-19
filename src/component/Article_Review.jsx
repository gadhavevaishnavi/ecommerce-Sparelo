// 











"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const articles = [
  {
    id: 1,
    title: "Engine Types: Overview of Car Engines by Cylinder Configuration",
    date: "27 Apr, 2024",
    img: "https://boodmo.com/media/cache/articles_image_medium/images/articles/111b7cf.webp",
    desc: "Understanding these different engines enhances appreciation for automotive engineering and informs choices in car ownership.",
    tags: ["DIESEL", "ELECTRIC CARS", "ENGINE", "PETROL"],
    link: "/pages/article/engine_types_overview/",
  },
  {
    id: 2,
    title: "Unveiling the Secrets of Your Car's Exhaust System",
    date: "19 Apr, 2024",
    img: "https://boodmo.com/media/cache/articles_image_medium/images/articles/863c2e3.webp",
    desc: "A deep dive into the critical component of a car's performance and environmental impact.",
    tags: ["CATALYST", "ENGINE", "EXHAUST"],
    link: "/pages/article/exhaust_system/",
  },
  {
    id: 3,
    title: "Investment or Loss: A Guide to Buying a Car in India",
    date: "15 Apr, 2024",
    img: "https://boodmo.com/media/cache/articles_image_medium/images/articles/d894ef0.webp",
    desc: "Insights into navigating the complexities of the vibrant Indian car market.",
    tags: ["INDIAN AUTOMOBILE INDUSTRY"],
    link: "/pages/article/investment_or_loss_a_guide_to_buying_a_car_in_india/",
  },
  {
    id: 4,
    title: "The Importance of Regular Car Maintenance",
    date: "10 Apr, 2024",
    img: "https://boodmo.com/media/cache/articles_image_medium/images/articles/maintenance_image.webp",
    desc: "Tips and best practices for keeping your vehicle in top condition.",
    tags: ["MAINTENANCE", "VEHICLE CARE"],
    link: "/pages/article/importance_of_regular_car_maintenance/",
  },
  {
    id: 5,
    title: "Electric Vehicles: The Future of Transportation",
    date: "1 Apr, 2024",
    img: "https://boodmo.com/media/cache/articles_image_medium/images/articles/ev_image.webp",
    desc: "Exploring the rise of electric vehicles and their impact on the automotive industry.",
    tags: ["ELECTRIC VEHICLES", "SUSTAINABILITY"],
    link: "/pages/article/electric_vehicles_future/",
  },
];

export default function ArticleReview() {
  const [showAll, setShowAll] = useState(false);
  const visibleArticles = showAll ? articles.length : 3;

  return (
    <section className="py-14 bg-gradient-to-b from-blue-50 to-pink-50">
      {/* Section Header */}
      <div className="px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Article & <span className="text-red-500">Review</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Stay updated with expert insights, maintenance tips, and automotive trends.
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="px-6 mt-10">
        <Swiper
          spaceBetween={25}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {articles.slice(0, visibleArticles).map((article) => (
            <SwiperSlide key={article.id}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    {article.date}
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between h-[240px]">
                  <a
                    href={article.link}
                    className="text-lg font-semibold text-blue-700 hover:underline line-clamp-2"
                  >
                    {article.title}
                  </a>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {article.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Button */}
        {!showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="bg-sky-500 text-white px-6 py-2 rounded-full font-medium hover:bg-sky-600 transition-all duration-300"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
