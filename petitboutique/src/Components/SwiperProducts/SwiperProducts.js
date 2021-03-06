import React from "react";
import s from './SwiperProducts.module.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from '../Card/Card';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

export default function SwiperProducts({products, setCartLength}) {
  const skeletonCards = [0,1,2,3,4,5]

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={18}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className={s.swiper}
      >
        { 
          products ?
          products?.map((p, i)=>{
            return <SwiperSlide key={i} className={s.swiperSlide}><Card product={p} setCartLength={setCartLength} /></SwiperSlide>
          }) :
          skeletonCards.map((p, i)=>{
            return (
              <SwiperSlide key={i} className={s.swiperSlide}>
                <div key={i} className={s.skeletonCard} >
                    <div className={s.skeletonImg}/>
                    <div className={s.skeletonTitle}/>
                    <div className={s.skeletonTitle2}/>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
}
