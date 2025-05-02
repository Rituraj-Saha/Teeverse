import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./testimonial.module.css";
const Testimonial = () => {
  return (
    <div className={styles.parent}>
      <Swiper
        spaceBetween={40}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{
          paddingRight: "70px",
        }}
      >
        <SwiperSlide>
          <div
            style={{
              width: "30vw",
              height: "30vh",
              background: "blue",
              margin: "50px",
            }}
          >
            abc
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              width: "30vw",
              height: "30vh",
              background: "blue",
              margin: "50px",
            }}
          >
            abc
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              width: "30vw",
              height: "30vh",
              background: "blue",
              margin: "50px",
            }}
          >
            abc
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              width: "30vw",
              height: "30vh",
              background: "blue",
              margin: "50px",
            }}
          >
            abc
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
