import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./testimonial.module.css";
const Testimonial = () => {
  const testimonials = [
    {
      review: "Great produt, Worth buying it again.",
      name: "annonymus",
      image: "",
    },
    {
      review: "Great produt, Worth buying it again.",
      name: "annonymus",
      image: "",
    },
    {
      review: "Great produt, Worth buying it again.",
      name: "annonymus",
      image: "",
    },
    {
      review: "Great produt, Worth buying it again.",
      name: "annonymus",
      image: "",
    },
  ];
  return (
    <div className={styles.parent}>
      <div
        style={{
          display: "block",
          // border: "1px solid black",
          width: "20%",
          flexDirection: "column",
        }}
      >
        <div
          style={{ border: "1px solid black", height: "1px", width: "25px" }}
        ></div>
        <span className={styles.boldTextHeader}>Testimonials</span>
        <div
          style={{
            position: "relative",
            border: "1px solid black",
            height: "1px",
            width: "25px",
            left: "50%",
          }}
        ></div>
      </div>
      <div style={{ height: "70%", width: "100%" }}>
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
    </div>
  );
};

export default Testimonial;
