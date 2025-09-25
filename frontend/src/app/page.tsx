"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import BestSeller from "../component/bestseller/BestSeller";
import Category from "../component/category/Category";
import Combos from "../component/combo/Combo";
import TestimonialSection from "../component/testimonial/Testimonial";
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const slides = [
    { src: "/assets/banner.png", alt: "Slide 1" },
    { src: "/assets/banner2.png", alt: "Slide 2" },
    { src: "/assets/banner3.png", alt: "Slide 3" },
  ];

  return (
    <>
      <div data-aos="fade-up" style={{ width: "100%", marginTop: 0 }}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          style={{ width: "100%", height: "90vh" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1920}
                height={600}
                style={{ width: "100%", height: "92%", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div data-aos="fade-up">
        <BestSeller />
      </div>

      <div data-aos="fade-up">
        <Category />
      </div>

      <div data-aos="fade-up">
        <Combos />
      </div>

      <div data-aos="fade-up">
        <TestimonialSection />
      </div>
    </>
  );
};

export default Page;
