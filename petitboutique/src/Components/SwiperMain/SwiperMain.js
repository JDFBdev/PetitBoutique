import React from "react";
import Slide from "./Slide";
import s from './SwiperMain.module.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
        className={s.swiper}
      >
        <SwiperSlide className={s.swiperSlide}><Slide selector={0}/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Slide selector={1}/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Slide selector={2}/></SwiperSlide>
      </Swiper>
    </>
  );
}
