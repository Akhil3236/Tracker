"use client";

import React from "react";
import useUserstate from "./Store/store";
import useProduct from "./Store/products";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import axios from "axios";
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

  const router = useRouter();
  const [loading, setLoading] = useState(true);


  const setUser = useUserstate((state) => state.setUser);
  const setProduct = useProduct((state) => state.setProduct);

  const user = useUserstate((state) => state.user);
  // const product=useProduct((state)=>state.product);

  useEffect(() => {

    /*--------------------------------
       user details storage in zustand 
    ----------------------------------*/
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, {
          withCredentials: true,
        });
        setUser(res.data);

        setLoading(false);
      } catch (err) {
        console.error("Not authenticated", err);
        setLoading(false);
        // router.push("login"); 
      }
    };
    /*------------------------------------
       product details storage in zustand 
    ------------------------------------*/
    const getproducts = async () => {

      try {

        const products = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}product`, {
          withCredentials: true,
        });
        setProduct(products.data);
        setLoading(false);
      } catch (error) {
        // router.push("login");
      }
    }
    checkAuth();
    getproducts();
  }, [setUser, setProduct]);

  const redirect = () => {

    if (user) {
      router.push("dashboard");
    }
    else {
      router.push("login");
    }
  }

  if (loading) return <p>Loading...</p>;

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