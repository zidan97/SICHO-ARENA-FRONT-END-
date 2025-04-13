import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import cricket from "../../public/SportsCategory/cricket.jpeg"
import football  from "../../public/SportsCategory/football.jpeg"
import tableTennis from "../../public/SportsCategory/tablle tennis.jpeg"
import busket from "../../public/SportsCategory/busket.jpeg"
import badminton from "../../public/SportsCategory/badminton.jpeg"

export default function SportsCategory() {
  return (
    <div className='bg-gray-300 px-4 w-4/5 mx-auto'>
    <div className='mt-8 p-6 w-1/2 mx-auto mb-8'>
      <h1 className='mb-4 text-center text-5xl py-6 text-blue-700 font-semibold '>Sports We Offer! </h1>
      <Swiper
        
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={cricket} width={600}  /></SwiperSlide>
        <SwiperSlide><img src={football} width={600}   /></SwiperSlide>
        <SwiperSlide><img src={tableTennis} width={600}  /></SwiperSlide>
        <SwiperSlide><img src={busket} width={600}  /></SwiperSlide>
        <SwiperSlide><img src={badminton} width={600}  /></SwiperSlide>
        
        
      </Swiper>
      </div>
      </div>
  );
}
