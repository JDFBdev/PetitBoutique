import React from "react";
import Slide from "./Slide";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function SwiperMain() {
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        speed={1500}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Slide selector={0}/></SwiperSlide>
        <SwiperSlide><Slide selector={1}/></SwiperSlide>
        <SwiperSlide><Slide selector={2}/></SwiperSlide>
      </Swiper>
    </>
  );
}
