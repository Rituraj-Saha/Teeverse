import React from "react";
import styles from "./vision.module.css";
import SvgStringRenderer from "../../../reusableComponent/SvgReusableRenderer";
import { useTheme } from "@mui/material";
import { customDesign, trendyWear } from "../../../assets/svgAssets";

const offering = [
  {
    tag: "Shop for trendy wear",
    desc: "Get the trendy fashion at your fingerTip",
    svg: trendyWear,
  },
  {
    tag: "Customise with your design",
    desc: "Get the trendy fashion at your fingerTip",
    svg: customDesign,
  },
  {
    tag: "Premium quality",
    desc: "Get the trendy fashion at your fingerTip",
    svg: trendyWear,
  },
  {
    tag: "Shop for trendy wear",
    desc: "Get the trendy fashion at your fingerTip",
    svg: customDesign,
  },
];
const Vision = () => {
  const theme = useTheme();
  return (
    <div className={styles.parent}>
      <div>
        <div
          style={{ border: "1px solid black", height: "1px", width: "25px" }}
        ></div>
        <span className={styles.boldTextHeader}>We Deliver</span>
        <div
          style={{
            position: "relative",
            border: "1px solid black",
            height: "1px",
            width: "25px",
            left: "70%",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          // border: "1px solid black",
          width: "80%",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          background: theme.palette.lightBackdropForDeliver.main,
          boxShadow: "0 4px 30px rgba(225, 94, 114, 0.632)",
          backdropFilter: "blur(5px)",
          borderRadius: "5px",
        }}
      >
        {offering.map((item, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                width: "34vw",
                margin: "10px",
                padding: "10px",
                border: "1px solid black",
                height: "15vh",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 0.2,

                  padding: "5px",
                }}
              >
                {" "}
                <SvgStringRenderer
                  svgString={item.svg}
                  height={"70%"}
                  width={"80%"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid black",
                  flex: ".8",
                }}
              >
                <span>{item.tag}</span>
                <span>{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vision;
