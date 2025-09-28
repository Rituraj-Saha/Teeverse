import React from "react";
import styles from "./bannerMid.module.css";
import sample from "../../../../../assets/banner.jpeg";
const BannerMid = () => {
  return (
    <div className={styles.parent}>
      <img
        src={sample}
        width={"100%"}
        style={{
          objectFit: "fill",
        }}
      ></img>
    </div>
  );
};

export default BannerMid;
