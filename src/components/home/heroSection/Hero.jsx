import React from "react";
import styles from "./Hero.module.css";
import SvgStringRenderer from "../../../reusableComponent/SvgReusableRenderer";
import { playBtn, svgOK } from "../../../assets/svgAssets";
import { Chip, useTheme } from "@mui/material";
import CaroualImpl from "../../../reusableComponent/carousal/Carousel";
import bl from "../../../assets/bl.png";
import wh from "../../../assets/wh.png";
const Hero = () => {
  const theme = useTheme();
  const valueAdder = [
    {
      svg: svgOK,
      msg: "Free Register",
    },
    {
      svg: svgOK,
      msg: "Great Service",
    },
    {
      svg: svgOK,
      msg: "Superior Quality",
    },
  ];
  const items = [
    <div style={{ display: "flex", width: "300px", height: "100%" }}>
      <img
        src={bl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>,
    <div style={{ display: "flex", width: "300px", height: "250px" }}>
      <img
        src={wh}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>,
    <div style={{ display: "flex", width: "300px", height: "250px" }}>
      <img
        src={bl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>,
  ];
  const boldMsg = {
    msg: "Getting the best and latest style has never",
    boldTxt: "been easier!",
  };
  const statMsg =
    "Tee-verse is a platform that helps to make fashion accessible to all. It brings fashion to your doorstep!";
  return (
    <div className={styles.parent}>
      <div className={styles.left}>
        <div className={styles.glassEffectOne}>
          {valueAdder.map((item, idx) => {
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <SvgStringRenderer
                  svgString={item.svg}
                  height={"30px"}
                  width={"30px"}
                />
                <span className={styles.valueAdderTextStyle}>{item.msg}</span>
              </div>
            );
          })}
        </div>
        <span className={styles.boldMsgTxt}>{boldMsg.msg}</span>
        <span className={styles.boldMsgTxtBolder}>{boldMsg.boldTxt}</span>
        <span className={styles.statMsg}>{statMsg}</span>

        <div
          style={{
            display: "flex",
            marginTop: "15px",
            gap: "50px",
            flex: 1,
            maxHeight: "8vh",
            width: "100%",
            paddingLeft: "5vw",
            paddingTop: "1vh",
            paddingBottom: "1vh",
          }}
        >
          <span
            style={{
              display: "flex",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingBottom: "10px",
              paddingTop: "10px",
              background: theme.palette.info.main,
              fontSize: "15px",
              color: "white",
              borderRadius: "5px",
              fontWeight: "100",
              alignItems: "center",
            }}
          >
            Shop Collection
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "5px",
            }}
          >
            <SvgStringRenderer
              svgString={playBtn}
              height={"30px"}
              width={"30px"}
            />
            <span
              style={{
                fontSize: "15px",
                fontWeight: "800",
              }}
            >
              Watch Review
            </span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <CaroualImpl items={items} />
      </div>
    </div>
  );
};

export default Hero;
