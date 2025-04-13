import w1 from "../../public/WelcomeImage/w_1.jpg";
import w2 from "../../public/WelcomeImage/w_2.jpg";
import w3 from "../../public/WelcomeImage/w_3.jpg";
import w4 from "../../public/WelcomeImage/w_4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";



const HomeContent = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-12 py-2">
      {/* main div */}
      <div className="flex items-center justify-center p-6 gap-2">
        {/* text content */}
        <div className="w-1/2">
          <h1 className="text-7xl font-bold mb-4">Sicho Arena</h1>
          <p className="text-wrap text-xl text-slate-600">
            If you're seeking a high-end indoor sports arena, Sicho Arena is the
            perfect choice! Our cutting-edge facilities and premium amenities
            offer an unbeatable experience for football and cricket lovers.
              </p>
              <div className="flex gap-4 mt-6">
                  <button 
        className="btn py-4 px-8 bg-[#28a5da] text-white"
        onClick={() => navigate("/booking")}
      >
        Book Now
      </button>
      <button 
        className="btn py-4 px-8 bg-[#4169e1] text-white"
        onClick={() => navigate("/service")}
      >
        Our Services
      </button>
              </div>
            
        </div>

        {/* image content */}
        <div className="w-1/2">
          {/* <img src={w1}/> */}
          <Swiper
            spaceBetween={30}
                 slidesPerView={1.3}
                
               pagination={{ clickable: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <img src={w1} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={w2} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={w3} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={w4} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
