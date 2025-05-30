import React from "react";
import styles from "./home.module.css";
import Hero from "./heroSection/Hero";
import ContentWrapper from "./content/ContentWrapper";
import Vision from "./vision/Vision";
import Testimonial from "./testimonial/Testimonial";
import Faq from "./content/faq/Faq";
import GrainyGradiant from "../../reusableComponent/backgroundGrainyGrad/GrainyGradiant";
const Home = () => {
  return (
    <div className={styles.parent}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GrainyGradiant>
          <Hero />
        </GrainyGradiant>
        <ContentWrapper />
      </div>

      <Vision />
      <Testimonial />
      <Faq />
    </div>
  );
};

export default Home;
