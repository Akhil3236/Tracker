"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import BestSeller from "../component/bestseller/BestSeller";
import Category from "../component/category/Category";
import Combos from "../component/combo/Combo";
const Page = () => {
  return (
    <>
      <div style={{ width: "100%", marginTop: "0" }}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          style={{ width: "100%", height: "90vh" }}
        >
          <SwiperSlide>
            <Image
              src="/assets/banner.png"
              alt="Slide 1"
              width={1920}
              height={600}
              style={{ width: "100%", height: "92%", objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/assets/banner2.png"
              alt="Slide 2"
              width={1920}
              height={600}
              style={{ width: "100%", height: "92%", objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/assets/banner3.png"
              alt="Slide 3"
              width={1920}
              height={600}
              style={{ width: "100%", height: "92%", objectFit: "cover" }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <BestSeller /> {/* <-- Add here */}
      <Category />
      <Combos />
    </>
  );
};

export default Page;